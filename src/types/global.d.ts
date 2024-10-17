type google = import('@types/google.maps');

interface Option {
  key: string | number;
  value: string | number;
  label: string | React.ReactNode;
  subComponent?: React.ReactNode;
}

type TOption = {
  key: string;
  value: string | number;
  label: string;
};

interface Window {
  google: typeof google;
}
