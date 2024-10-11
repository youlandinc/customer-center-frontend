'use client';
import { createStore } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { enqueueSnackbar } from 'notistack';

import { AUTO_HIDE_DURATION } from '@/constant';
import { HttpError } from '@/types';
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
};

export type UserStateActions = {
  setIsHydration: (isHydration: boolean) => void;
  setAccessToken: (token: string) => void;
  loginSystem: (cb?: () => void) => Promise<void>;
  fetchUserInfo: () => Promise<void>;
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
