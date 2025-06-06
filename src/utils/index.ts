import { URL_LOGOUT_REDIRECTION } from '@/components/atoms';

export const GetParamsFromUrl = (url: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const urlObj = new URL(url);
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

export const TypeOf = (input: unknown): string => {
  return Object.prototype.toString.call(input).slice(8, -1);
};

export const NotUndefined = (value: unknown): boolean => {
  return Object.prototype.toString.call(value).slice(8, -1) !== 'Undefined';
};

export const SystemLogout = () => {
  localStorage.clear();
  window.location.href = URL_LOGOUT_REDIRECTION(
    location.href.includes('alamedacapital') ? 'alamedacapital' : 'corepass',
  );
};

const freeGlobal =
  typeof global === 'object' &&
  global !== null &&
  global.Object === Object &&
  global;

/** Detect free variable `globalThis` */
const freeGlobalThis =
  typeof globalThis === 'object' &&
  globalThis !== null &&
  globalThis.Object === Object &&
  globalThis;

/** Detect free variable `self`. */
const freeSelf =
  typeof self === 'object' && self !== null && self.Object === Object && self;

/** Used as a reference to the global object. */
const root =
  freeGlobalThis || freeGlobal || freeSelf || Function('return this')();

const debounce = (
  func: (...args: any) => any,
  wait: number,
  options: { leading: boolean; trailing: boolean; maxWait: number },
) => {
  let lastArgs: any;
  let lastThis: any;
  let maxWait: any;
  let result: any;
  let timerId: any;
  let lastCallTime: any;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF =
    !wait && wait !== 0 && typeof root.requestAnimationFrame === 'function';

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  wait = +wait || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time: any) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function startTimer(
    pendingFunc: (...args: any) => any,
    milliseconds?: number,
  ) {
    if (useRAF) {
      root.cancelAnimationFrame(timerId);
      return root.requestAnimationFrame(pendingFunc);
    }
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return setTimeout(pendingFunc, milliseconds);
  }

  function cancelTimer(id: any) {
    if (useRAF) {
      root.cancelAnimationFrame(id);
      return;
    }
    clearTimeout(id);
  }

  function leadingEdge(time: any) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time: any) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time: any) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time));
    return undefined;
  }

  function trailingEdge(time: any) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function pending() {
    return timerId !== undefined;
  }

  function debounced(this: any, ...args: any) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
};

const isObject = (value: any) => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};

export const throttle = (
  func: (...args: any) => any,
  wait: number,
  options?: { leading: boolean; trailing: boolean; maxWait: number },
) => {
  let leading = true;
  let trailing = true;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  if (!!options && isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  });
};
