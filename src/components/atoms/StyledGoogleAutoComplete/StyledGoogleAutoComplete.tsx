import {
  Autocomplete,
  Box,
  Grid2 as Grid,
  Stack,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { LocationOnOutlined } from '@mui/icons-material';
import parse from 'autosuggest-highlight/parse';

import {
  StyledSelect,
  StyledTextField as StyledTextFieldInput,
} from '@/components/atoms';
import { RATE_PROPERTY_STATE } from '@/constant';

import { useGooglePlacesSearch } from '@/hooks';

import {
  _StyledGoogleAutoCompleteProps,
  PlaceType,
  StyledGoogleAutoCompleteProps,
  StyledGoogleAutoCompleteStyles,
} from './index';

export const StyledGoogleAutoComplete: FC<StyledGoogleAutoCompleteProps> = ({
  address,
  fullAddress = true,
  disabled,
  label,
  required,
  cityLabel,
  stateLabel,
  zipcodeLabel,
  placeholder,
  sx,
}) => {
  const { formatAddress } = address;

  const handledPlaceSelect = useCallback((place: any) => {
    if (!place.formatted_address) {
      return;
    }
    if (!fullAddress) {
      address.changeFieldValue('formatAddress', place.formatted_address);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    place.address_components.forEach((com) => {
      const type = com.types[0];
      if (!type) {
        return;
      }
      switch (type) {
        case 'administrative_area_level_1': {
          address.changeFieldValue('state', com.short_name);
          return;
        }
        case 'locality': {
          address.changeFieldValue('city', com.long_name);
          return;
        }
        case 'route': {
          address.changeFieldValue('street', com.long_name);
          return;
        }
        case 'postal_code': {
          address.changeFieldValue('postcode', com.long_name);
          return;
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack width={'100%'}>
      {fullAddress ? (
        <Stack width={'100%'}>
          <Stack width={'100%'}>
            <_StyledGoogleAutoComplete
              disabled={disabled}
              fullAddress={fullAddress}
              handledPlaceSelect={handledPlaceSelect}
              inputValue={formatAddress}
              label={label}
              onInputChange={(e, val) => {
                if (!val) {
                  address.reset();
                  return;
                }
                address.changeFieldValue('formatAddress', val);
              }}
              placeholder={placeholder}
              required={required}
              value={formatAddress}
            />
          </Stack>
          <Stack
            alignItems={'center'}
            flexDirection={{ lg: 'row', xs: 'column' }}
            gap={2.5}
            justifyContent={'flex-start'}
            mt={2.5}
            width={'100%'}
          >
            <StyledTextFieldInput
              disabled={disabled}
              label={cityLabel || 'City'}
              onChange={(e) => address.changeFieldValue('city', e.target.value)}
              placeholder={cityLabel || 'City'}
              required={required}
              sx={{ flex: 1 }}
              value={address.city}
              variant={'outlined'}
            />
            <StyledSelect
              id={'state_id'}
              label={stateLabel || 'State'}
              labelId={'state_label_id'}
              onChange={(e) => {
                address.changeFieldValue('state', e.target.value as string);
              }}
              options={RATE_PROPERTY_STATE}
              required={required}
              sx={{ flex: 1 }}
              value={address.state}
            />
            <StyledTextFieldInput
              disabled={disabled}
              label={zipcodeLabel || 'Zip code'}
              onChange={(e) =>
                address.changeFieldValue('postcode', e.target.value)
              }
              placeholder={zipcodeLabel || 'Zip code'}
              required={required}
              sx={{ flex: 1 }}
              value={address.postcode}
              variant={'outlined'}
            />
          </Stack>
        </Stack>
      ) : (
        <Stack>
          <_StyledGoogleAutoComplete
            disabled={disabled}
            fullAddress={fullAddress}
            handledPlaceSelect={handledPlaceSelect}
            inputValue={formatAddress}
            onInputChange={(e, val) =>
              address.changeFieldValue('formatAddress', val)
            }
            size={'small'}
            sx={sx}
            value={formatAddress}
          />
        </Stack>
      )}
    </Stack>
  );
};

const _StyledGoogleAutoComplete: FC<_StyledGoogleAutoCompleteProps> = ({
  inputValue,
  onInputChange,
  fullAddress,
  handledPlaceSelect,
  value,
  disabled,
  label,
  required,
  placeholder,
  ...rest
}) => {
  const [selfValue, setSelfValue] = useState<PlaceType | null | string>(value);

  const { options, loading, getPlaceDetailsRequest, serviceLoaded } =
    useGooglePlacesSearch(inputValue, fullAddress);

  return (
    <Autocomplete
      disabled={disabled}
      id="youland-google-map-autoComplete"
      sx={
        {
          ...StyledGoogleAutoCompleteStyles.inside.autoComplete,
          ...rest?.sx,
        } as SxProps
      }
      {...rest}
      autoComplete={false}
      autoSelect={false}
      clearOnBlur={false}
      filterOptions={(options) => options}
      filterSelectedOptions
      freeSolo
      getOptionLabel={(option) => {
        return typeof option === 'string'
          ? option
          : fullAddress
            ? option.structured_formatting.main_text
            : option.description;
      }}
      includeInputInList
      inputValue={inputValue}
      loading={loading}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onChange={async (event: any, newValue: PlaceType | null) => {
        setSelfValue(newValue);
        if (newValue?.place_id && fullAddress && serviceLoaded) {
          getPlaceDetailsRequest(
            {
              placeId: newValue.place_id,
              fields: [
                'address_components',
                'geometry.location',
                'place_id',
                'formatted_address',
              ],
            },
            (place: any) => handledPlaceSelect(place),
          );
        }
      }}
      onInputChange={onInputChange}
      options={options}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            fullWidth
            label={label}
            placeholder={placeholder}
            required={required}
            sx={{
              width: '100%',
              borderRadius: 2,
              padding: 0,
              '& label.Mui-focused': {
                color: 'text.focus',
                '& span': {
                  color: 'text.focus',
                },
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                boxShadow: 'none',
                input: {
                  '&::placeholder': {
                    color: 'text.placeholder',
                  },
                  color: 'text.primary',
                  lineHeight: 1,
                },
                '& fieldset': {
                  borderColor: 'background.border_default',
                },
                '&:hover fieldset': {
                  borderColor: 'background.border_hover',
                  color: 'background.border_hover',
                },
                '&.Mui-focused fieldset': {
                  border: '1px solid',
                  borderColor: 'background.border_focus',
                },
              },
              '& .Mui-disabled.MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'background.border_disabled',
                },
              },
              '& .Mui-disabled': {
                cursor: 'not-allowed',
                '&:hover fieldset': {
                  borderColor: 'background.border_default',
                },
              },
              '& .MuiFormHelperText-root': {
                margin: 0,
                fontSize: 12,
              },
            }}
            variant={'outlined'}
          />
        );
      }}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ]),
        );
        return (
          <Box component="li" {...props} key={props.id}>
            <Grid alignItems="center" container>
              <Grid sx={{ display: 'flex', width: 44 }}>
                <LocationOnOutlined sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                sx={{
                  width: 'calc(100% - 44px)',
                  wordWrap: 'break-word',
                }}
              >
                {parts.map((part, index) => (
                  <Box
                    component="span"
                    key={index}
                    sx={{
                      fontWeight: part.highlight ? 'bold' : 'regular',
                    }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography color="text.secondary" variant="body2">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      }}
      selectOnFocus={false}
      value={selfValue}
    />
  );
};
