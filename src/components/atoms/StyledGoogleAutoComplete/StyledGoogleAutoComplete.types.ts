import { SxProps } from '@mui/material';
import { InputBaseProps } from '@mui/material/InputBase';

import { IAddress } from '@/types';

export interface StyledGoogleAutoCompleteProps {
  address: IAddress;
  fullAddress?: boolean;
  disabled?: boolean;
  label?: string;
  cityLabel?: string;
  stateLabel?: string;
  zipcodeLabel?: string;
  required?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium';
  sx?: SxProps;
  onBlur?: InputBaseProps['onBlur'];
}

export interface StyledGoogleAutoCompleteRefProps {
  inputValue: string;
  onInputChange: (e: any, val: string) => void;
  fullAddress: boolean;
  handledPlaceSelect: (place: any) => void;
  disabled?: boolean;
  value: PlaceType | string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium';
  sx?: SxProps;
  onBlur?: InputBaseProps['onBlur'];
}

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}

interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}

export interface PlaceType {
  place_id?: string;
  description: string;
  structured_formatting: StructuredFormatting;
}
