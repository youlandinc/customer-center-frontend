import {
  ChangeEvent,
  FC,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  CircularProgress,
  Icon,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { AUTO_HIDE_DURATION } from '@/constant';

import {
  getFilesWebkitDataTransferItems,
  renameFile,
} from '@/utils/UnknowHandler';

import { StyledButton } from '@/components/atoms';

import ICON_UPLOAD from '@/components/molecules/XLSXUpload/assets/icon_upload.svg';

interface StyledUploadBoxProps {
  loading?: boolean;
  uploadText?: string | ReactNode;
  onUpload: (file: File) => Promise<void>;
  sx?: SxProps;
}

export const StyledUploadBox: FC<StyledUploadBoxProps> = ({
  sx,
  onUpload,
  loading,
  uploadText = (
    <>
      <Typography color={'text.secondary'} variant={'body2'}>
        Drag & drop or click &#34;Select file&#34; above to browse your computer
      </Typography>
      <Typography color={'text.secondary'} variant={'body2'}>
        .xlsx and .csv files are supported
      </Typography>
    </>
  ),
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const validatorFileSize = useCallback(
    (files: FileList) => {
      let flag = true;
      Array.from(files).some((item) => {
        if (item.size / 1024 / 1024 > 20) {
          enqueueSnackbar('File size cannot exceed 20MB.', {
            header: 'Upload Failed',
            variant: 'error',
            autoHideDuration: AUTO_HIDE_DURATION,
            isSimple: false,
          });
          flag = false;
          return true;
        }
      });
      return flag;
    },
    [enqueueSnackbar],
  );

  const onChangeEvent = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (event.target.files && validatorFileSize(event.target.files)) {
        await onUpload(event.target.files[0]);
        //event.target.value = '';
      }
    },
    [onUpload, validatorFileSize],
  );

  return (
    <Stack
      onDragEnter={(e) => {
        e.preventDefault();
        if (loading) {
          return;
        }
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        if (loading) {
          return;
        }
        setIsDragging(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (loading) {
          return;
        }
        setIsDragging(true);
      }}
      onDrop={async (e) => {
        e.preventDefault();
        if (loading) {
          return;
        }

        try {
          const fileList = await getFilesWebkitDataTransferItems(
            e.dataTransfer.items,
          );

          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          const reducedFileList = fileList
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            .filter((item) => item.name !== '.DS_Store')
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            .map((file) => {
              if (file?.name === file?.filepath) {
                return file;
              }

              return renameFile(file, file.filepath);
            });
          setIsDragging(false);

          await onUpload(reducedFileList[0]);
        } catch (err) {
          //eslint-disable-next-line no-console
          console.log(err);
        } finally {
          setIsDragging(false);
        }
      }}
      sx={{
        outline: isDragging
          ? '2px dashed hsla(222,42%,55%,.8)'
          : '1px dashed #D2D6E1',
        ...sx,
      }}
      width={'100%'}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <input
            accept={
              '.csv,.xlsx,.xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,'
            }
            hidden
            onChange={onChangeEvent}
            ref={fileInputRef}
            type="file"
          />
          <StyledButton
            onClick={() => {
              fileInputRef.current?.click();
            }}
            size={'small'}
            sx={{
              width: 144,
            }}
          >
            <Icon
              component={ICON_UPLOAD}
              sx={{
                height: 24,
                width: 24,
                mr: 1,
              }}
            />
            Select file
          </StyledButton>
          <Stack alignItems={'center'}>{uploadText}</Stack>
        </>
      )}
    </Stack>
  );
};
