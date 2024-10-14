'use client';

import { Icon, Stack, Typography } from '@mui/material';

import ICON_UPLOAD from './assets/icon_upload.svg';
import { StyledButton } from '@/components/atoms';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { AUTO_HIDE_DURATION } from '@/constant';

import XLSX from 'xlsx';

export const UploadXLSX = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState<any[]>([]);
  const [cols, setCols] = useState<any[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validatorFileSize = useCallback(
    (files: FileList) => {
      let flag = true;
      Array.from(files).some((item) => {
        if (item.size / 1024 / 1024 > 100) {
          enqueueSnackbar('File size cannot exceed 100MB.', {
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
        onExtractFile(event.target.files[0]);
        // event.target.value = '';
      }
    },
    [validatorFileSize],
  );

  const onExtractFile = (file: File) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target!.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      setData(data);
      setCols(make_cols(ws['!ref']));
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <Stack
        alignItems={'center'}
        border={'1px dashed #D2D6E1'}
        borderRadius={1}
        gap={1}
        justifyContent={'center'}
        p={6}
      >
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
        <Typography color={'text.secondary'} variant={'body2'}>
          Drag & drop or click &#34;Select file&#34; above to browse your
          computer
        </Typography>
        <Typography color={'text.secondary'} variant={'body2'}>
          .xlsx and .csv files are supported
        </Typography>
      </Stack>

      <table>
        <thead>
          <tr>
            {cols.map((item, index) => (
              <th key={`${item.name}-${index}`}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={`${item.key}-${index}`}>
              {cols.map((c) => (
                <td
                  key={c.key}
                  style={{
                    border: '1px solid',
                  }}
                >
                  {item[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

/* list of supported file types */
//const SheetJSFT = [
//  'xlsx',
//  'xlsb',
//  'xlsm',
//  'xls',
//  'xml',
//  'csv',
//  'txt',
//  'ods',
//  'fods',
//  'uos',
//  'sylk',
//  'dif',
//  'dbf',
//  'prn',
//  'qpw',
//  '123',
//  'wb*',
//  'wq*',
//  'html',
//  'htm',
//]
//  .map(function (x) {
//    return '.' + x;
//  })
//  .join(',');

/* generate an array of column objects */
const make_cols = (refstr: any) => {
  const o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (let i = 0; i < C; ++i) {
    o[i] = { name: XLSX.utils.encode_col(i), key: i };
  }
  return o;
};
