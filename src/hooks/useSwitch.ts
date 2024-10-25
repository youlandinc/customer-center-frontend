import { useCallback, useState } from 'react';

export const useSwitch = (initialState = false) => {
  const [visible, setVisible] = useState(initialState);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const toggle = useCallback(() => {
    setVisible((visible) => !visible);
  }, []);

  return {
    open,
    close,
    visible,
    toggle,
  };
};
