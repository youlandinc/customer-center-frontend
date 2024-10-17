import { useEffect, useMemo, useState } from 'react';

import { throttle } from '@/utils';

const autocompleteService: {
  current: null | google.maps.places.AutocompleteService;
} = {
  current: null,
};
const placesService: { current: null | google.maps.places.PlacesService } = {
  current: null,
};

export const useGooglePlacesSearch = (
  inputValue: string,
  fullAddress?: boolean,
) => {
  const [options, setOptions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [serviceLoaded, setServiceLoaded] = useState(false);

  const loadGooglePlaceService = (): void => {
    if (
      !autocompleteService.current &&
      !placesService.current &&
      (window as Window).google
    ) {
      autocompleteService.current = new (
        window as Window
      ).google.maps.places.AutocompleteService();
      placesService.current = new (
        window as Window
      ).google.maps.places.PlacesService(document.createElement('div'));
    }
    setServiceLoaded(!(!autocompleteService.current || !placesService.current));
  };

  const getAutocompletionRequest = useMemo(
    () =>
      throttle(
        (
          request: google.maps.places.AutocompletionRequest,
          callback?: (
            a: google.maps.places.AutocompletePrediction[] | null,
            b: google.maps.places.PlacesServiceStatus,
          ) => void,
        ) => {
          return autocompleteService.current!.getPlacePredictions(
            request,
            callback,
          );
        },
        200,
      ),
    [],
  );

  const getPlaceDetailsRequest = useMemo(
    () =>
      throttle(
        (
          request: google.maps.places.PlaceDetailsRequest,
          callback: (
            a: google.maps.places.PlaceResult | null,
            b: google.maps.places.PlacesServiceStatus,
          ) => void,
        ) => {
          return (placesService.current as any).getDetails(request, callback);
        },
        200,
      ),
    [],
  );

  useEffect(() => {
    loadGooglePlaceService();
  }, []);

  useEffect(() => {
    if (inputValue === '') {
      setOptions([]);
      setLoading(false);
      return undefined;
    }

    if (serviceLoaded) {
      setLoading(true);
      getAutocompletionRequest(
        {
          input: inputValue,
          types: ['geocode', 'establishment'],
          componentRestrictions: {
            country: 'us',
          },
        },
        (results: any) => {
          let newOptions: google.maps.places.AutocompletePrediction[] = [];

          // This will push the selected item into options , but autoComplete filterSelectedOptions props will hide the selected options from the list box.
          //if (autoCompleteValue) {
          //  newOptions = [autoCompleteValue];
          //}

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setLoading(false);
          setOptions(newOptions);
        },
      );
    }
  }, [serviceLoaded, inputValue, getAutocompletionRequest, fullAddress]);

  return {
    serviceLoaded,
    loading,
    options,
    setOptions,
    getPlaceDetailsRequest,
  };
};
