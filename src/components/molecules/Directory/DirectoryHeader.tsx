import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Fade, Icon, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { TypeOf } from '@/utils';
import { useSwitch } from '@/hooks';
import { AUTO_HIDE_DURATION, FILTER_OPERATIONS } from '@/constant';

import { useDirectoryStore } from '@/stores/directoryStores/useDirectoryStore';
import { useGridStore } from '@/stores/directoryStores/useGridStore';
import { useDirectoryToolbarStore } from '@/stores/directoryStores/useDirectoryToolbarStore';

import {
  StyledButton,
  StyledDialog,
  StyledSelect,
  StyledTextField,
} from '@/components/atoms';
import { CreateNewContact, HeaderFilter } from './index';

import { _createNewSegment, _updateExistSegment } from '@/request';
import {
  DirectoryPageMode,
  FilterOperationEnum,
  FilterProps,
  HttpError,
} from '@/types';

import ICON_UPLOAD from './assets/icon_upload.svg';
import ICON_CLOSE from './assets/icon_close.svg';
import ICON_SAVE from './assets/icon_save.svg';

export const DirectoryHeader: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { visible, open, close } = useSwitch(false);

  const {
    setPageMode,
    fetchSegmentDetails,
    selectedSegmentId,
    fetchSegmentsOptions,
    setSelectedSegmentId,
  } = useDirectoryStore((state) => state);
  const { columnOptions, tableId, tableName } = useGridStore((state) => state);
  const {
    segmentsFilters,
    addSegmentsFiltersGroup,
    addSegmentsFilters,
    deleteSegmentsFilters,
    onChangeSegmentsFilters,
    setSegmentsFilters,
    clearSegmentsFiltersGroup,
  } = useDirectoryToolbarStore((state) => state);

  const [showFooter, setShowFooter] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const filterGroup = useMemo(() => {
    const result: FilterProps[][] = [];
    if (segmentsFilters) {
      Object.entries(segmentsFilters).forEach(([, value]) => {
        if (value) {
          result.push(value);
        }
      });
    }
    return result;
  }, [segmentsFilters]);

  const onClickToCreateSegment = useCallback(async () => {
    const postData = {
      tableId,
      tableName,
      segmentName,
      segmentsFilters: segmentsFilters!,
    };
    setCreateLoading(true);
    try {
      const { data } = await _createNewSegment(postData);
      await fetchSegmentsOptions();
      setSelectedSegmentId(data);
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    } finally {
      setCreateLoading(false);
      close();
      setSegmentName('');
    }
  }, [
    tableId,
    tableName,
    segmentName,
    segmentsFilters,
    fetchSegmentsOptions,
    setSelectedSegmentId,
    enqueueSnackbar,
    close,
  ]);

  const onClickToSaveChanges = useCallback(async () => {
    if (selectedSegmentId) {
      const postData = {
        segmentsId: selectedSegmentId,
        segmentsFilters: segmentsFilters!,
      };
      setUpdateLoading(true);
      try {
        await _updateExistSegment(postData);
      } catch (err) {
        const { header, message, variant } = err as HttpError;
        enqueueSnackbar(message, {
          variant: variant || 'error',
          autoHideDuration: AUTO_HIDE_DURATION,
          isSimple: !header,
          header,
        });
      } finally {
        setUpdateLoading(false);
      }
    }
  }, [enqueueSnackbar, segmentsFilters, selectedSegmentId]);

  const onClickToCancelChanges = useCallback(async () => {
    if (!selectedSegmentId) {
      const postData = {
        segmentId: -1,
      };
      try {
        await _updateExistSegment(postData);
      } catch (err) {
        const { header, message, variant } = err as HttpError;
        enqueueSnackbar(message, {
          variant: variant || 'error',
          autoHideDuration: AUTO_HIDE_DURATION,
          isSimple: !header,
          header,
        });
      }
      clearSegmentsFiltersGroup();
    } else {
      setSegmentsFilters(await fetchSegmentDetails(selectedSegmentId));
    }
  }, [
    clearSegmentsFiltersGroup,
    enqueueSnackbar,
    fetchSegmentDetails,
    selectedSegmentId,
    setSegmentsFilters,
  ]);

  useEffect(() => {
    useDirectoryToolbarStore.subscribe((state, prevState) => {
      if (
        state.segmentsFilters !== prevState.segmentsFilters &&
        state.originalSegmentsFilters !== state.segmentsFilters
      ) {
        setShowFooter(true);
      }
      if (
        Object.keys(state.segmentsFilters!).length === 0 ||
        TypeOf(state.segmentsFilters) === 'Undefined'
      ) {
        setShowFooter(false);
      }
      for (const [, v] of Object.entries(state.segmentsFilters!)) {
        if (v.length === 0) {
          setShowFooter(false);
        }
        if (
          v.some(
            (item) =>
              !item.columnName || !item.operation || !item.operationText,
          )
        ) {
          setShowFooter(false);
        }
      }
    });
  }, []);

  return (
    <>
      <Stack flexDirection={'row'}>
        <HeaderFilter />

        <Stack flexDirection={'row'} ml={'auto'}>
          <CreateNewContact />

          <StyledButton
            color={'info'}
            onClick={() => setPageMode(DirectoryPageMode.import)}
            size={'small'}
            sx={{
              fontWeight: '400 !important',
            }}
            variant={'text'}
          >
            <Icon
              component={ICON_UPLOAD}
              sx={{ width: 24, height: 24, mr: 0.75 }}
            />
            <Typography color={'text.primary'} variant={'body2'}>
              Import contacts
            </Typography>
          </StyledButton>
        </Stack>
      </Stack>

      {filterGroup.map((group, index) => (
        <Stack gap={1.5} key={`group-${index}`}>
          {index !== 0 && (
            <Typography color={'#D2D6E1'} variant={'subtitle2'}>
              OR
            </Typography>
          )}
          <Stack border={'1px solid #D2D6E1'} borderRadius={2} gap={3} p={3}>
            {group.map((filter, filterIndex) => (
              <Stack
                alignItems={'center'}
                flexDirection={'row'}
                gap={3}
                key={`group-${index}-${filterIndex}`}
              >
                <StyledSelect
                  label={'Column'}
                  onChange={(e) => {
                    onChangeSegmentsFilters(
                      index,
                      filterIndex,
                      'columnName',
                      e.target.value as unknown as string | number,
                    );
                  }}
                  options={columnOptions}
                  size={'small'}
                  value={filter.columnName}
                />
                <StyledSelect
                  label={'Condition'}
                  onChange={(e) => {
                    onChangeSegmentsFilters(
                      index,
                      filterIndex,
                      'operation',
                      e.target.value as string as FilterOperationEnum,
                    );
                  }}
                  options={FILTER_OPERATIONS}
                  size={'small'}
                  value={filter.operation}
                />
                <StyledTextField
                  label={'Text'}
                  onChange={(e) =>
                    onChangeSegmentsFilters(
                      index,
                      filterIndex,
                      'operationText',
                      e.target.value,
                    )
                  }
                  size={'small'}
                  value={filter.operationText}
                />
                <Icon
                  component={ICON_CLOSE}
                  onClick={() => deleteSegmentsFilters(index, filterIndex)}
                  sx={{
                    width: 24,
                    height: 24,
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                />
              </Stack>
            ))}

            <StyledButton
              color={'info'}
              onClick={() => {
                addSegmentsFilters(index, {
                  filterId: '',
                  columnName: '',
                  operation: '',
                  operationText: '',
                });
              }}
              size={'small'}
              sx={{
                width: 'fit-content',
                borderWidth: '1px !important',
                fontWeight: '400 !important',
              }}
              variant={'outlined'}
            >
              + AND
            </StyledButton>
          </Stack>
        </Stack>
      ))}

      {filterGroup.length > 0 && (
        <StyledButton
          color={'info'}
          onClick={addSegmentsFiltersGroup}
          size={'small'}
          sx={{
            width: 'fit-content',
            borderWidth: '1px !important',
            fontWeight: '400 !important',
          }}
          variant={'outlined'}
        >
          + OR
        </StyledButton>
      )}

      <Fade in={showFooter} mountOnEnter timeout={100} unmountOnExit>
        <Stack flexDirection={'row'}>
          <StyledButton
            onClick={open}
            size={'small'}
            sx={{ width: 'fit-content', pl: '0 !important' }}
            variant={'text'}
          >
            Save as new segment
          </StyledButton>
          <Stack flexDirection={'row'} gap={3} ml={'auto'}>
            <StyledButton
              color={'info'}
              onClick={onClickToCancelChanges}
              size={'small'}
              sx={{ width: 'fit-content' }}
              variant={'outlined'}
            >
              Cancel
            </StyledButton>
            {!!selectedSegmentId && (
              <StyledButton
                disabled={updateLoading}
                loading={updateLoading}
                onClick={onClickToSaveChanges}
                size={'small'}
                sx={{ width: 160 }}
              >
                <Icon
                  component={ICON_SAVE}
                  sx={{ width: 20, height: 20, mr: 0.75 }}
                />
                Save changes
              </StyledButton>
            )}
          </Stack>
        </Stack>
      </Fade>

      <StyledDialog
        content={
          <Stack py={3}>
            <StyledTextField
              label={'Segment name'}
              onChange={(e) => setSegmentName(e.target.value)}
              size={'small'}
              value={segmentName}
            />
          </Stack>
        }
        footer={
          <Stack flexDirection={'row'} gap={1.5}>
            <StyledButton
              color={'info'}
              onClick={close}
              size={'small'}
              variant={'outlined'}
            >
              Cancel
            </StyledButton>
            <StyledButton
              disabled={createLoading || !segmentName}
              loading={createLoading}
              onClick={onClickToCreateSegment}
              size={'small'}
              sx={{
                width: '60px',
              }}
            >
              Save
            </StyledButton>
          </Stack>
        }
        header={'Save as segment'}
        onClose={close}
        open={visible}
      />
    </>
  );
};
