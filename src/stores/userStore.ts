'use client';
import { createStore } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { enqueueSnackbar } from 'notistack';

import { SystemLogout } from '@/utils';
import { AUTO_HIDE_DURATION } from '@/constant';

import { HttpError, SSEEvent } from '@/types';
import {
  _fetchUserDetailByAccountId,
  _fetchUserInfoWithToken,
  _fetchUserLicensedProduct,
} from '@/request';

export type UserState = {
  isAuth: boolean;
  accessToken: string;
  accountId: string;
  isHydration: boolean;
  initialized: boolean;
  setting: any;
  licensedProduct: any[];
  sse: EventSource | undefined;
  notificationList: any[];
};

export type UserStateActions = {
  setIsHydration: (isHydration: boolean) => void;
  setAccessToken: (token: string) => void;
  loginSystem: (cb?: () => void) => Promise<void>;
  fetchUserInfo: () => Promise<void>;
  createSSE: () => Promise<void>;
  updateNotificationList: (notificationList: any[]) => void;
  deleteNotification: (taskId: string | number) => void;
};

export type UserStore = UserState & UserStateActions;

export const defaultInitState: UserState = {
  isAuth: false,
  isHydration: false,
  accessToken: '',
  accountId: '',
  initialized: false,
  setting: {},
  licensedProduct: [],
  sse: void 0,
  notificationList: [],
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    devtools(
      persist(
        (set, get) => ({
          ...initState,
          setIsHydration: (isHydration: boolean) => set({ isHydration }),
          setAccessToken: (token: string) => set({ accessToken: token }),
          loginSystem: async (cb) => {
            if (get().isAuth) {
              return;
            }
            try {
              const { data } = await _fetchUserInfoWithToken(get().accessToken);
              set(() => ({
                accountId: data?.userProfile?.accountId,
                accessToken: data?.accessToken,
                isAuth: true,
              }));
              localStorage.setItem('USER_LOGIN_INFORMATION', data?.accessToken);
              cb?.();
            } catch (err) {
              const { header, message, variant } = err as HttpError;
              enqueueSnackbar(message, {
                variant: variant || 'error',
                autoHideDuration: AUTO_HIDE_DURATION,
                isSimple: !header,
                header,
              });
              return SystemLogout();
            }
          },
          fetchUserInfo: async () => {
            try {
              const { data: user } = await _fetchUserDetailByAccountId({
                accountId: get().accountId,
              });
              const { data: product } = await _fetchUserLicensedProduct();
              set(() => ({
                setting: user,
                licensedProduct: product.functions,
                initialized: true,
              }));
            } catch (err) {
              const { header, message, variant } = err as HttpError;
              enqueueSnackbar(message, {
                variant: variant || 'error',
                autoHideDuration: AUTO_HIDE_DURATION,
                isSimple: !header,
                header,
              });
            }
          },
          createSSE: async () => {
            const token =
              get().accessToken ||
              localStorage?.getItem('USER_LOGIN_INFORMATION');
            if (!token || get().sse) {
              return;
            }

            const eventSource = new EventSource(
              `${process.env.NEXT_PUBLIC_BASE_URL}/customer/task/notification?token=${token}`,
            );

            set({ sse: eventSource });

            eventSource.onmessage = (e) => {
              if (e.data === 'heart-beating:alive' || e.data === 'heartbeat') {
                return;
              }
              const data = JSON.parse(e.data);
              switch (data.event) {
                case SSEEvent.async_import_data: {
                  const list = get().notificationList;
                  const { taskId } = data.content;
                  const index = list.findIndex(
                    (item) => item.taskId === taskId,
                  );
                  if (index !== -1) {
                    list.splice(index, 1, data.content);
                  } else {
                    list.push(data.content);
                  }
                  get().updateNotificationList(list);
                  break;
                }
              }
            };

            eventSource.onerror = (e) => {
              //eslint-disable-next-line no-console
              console.log(e);
              eventSource.close();
              set({ sse: void 0 });
              throw new Error('SSE connection error');
            };
          },
          updateNotificationList: (notificationList) => {
            set({ notificationList });
          },
          deleteNotification: (taskId) => {
            const list = get().notificationList;
            const index = list.findIndex((item) => item.taskId === taskId);
            if (index !== -1) {
              list.splice(index, 1);
              get().updateNotificationList(list);
            }
          },
        }),
        {
          name: 'PERSIST_DATA',
          storage: createJSONStorage(() => localStorage),
          partialize: (state) => ({
            accessToken: state.accessToken,
            accountId: state.accountId,
          }),
          onRehydrateStorage: () => {
            return (state) => {
              if (state) {
                state.setIsHydration(true);
              }
            };
          },
        },
      ),
    ),
  );
};
