// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { HttpVariant } from '@/types';

export const renameFile = (originalFile: File, newName: string) => {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
};

export const getFilesWebkitDataTransferItems = (dataTransferItems, accept) => {
  function traverseFileTreePromise(item, path = '') {
    return new Promise((resolve, reject) => {
      if (!item) {
        reject('No item');
      }
      if (item.isFile) {
        item.file((file: any) => {
          file.filepath = path + file.name; //save full path
          files.push(file);
          resolve(file);
        });
      } else if (item.isDirectory) {
        const dirReader = item.createReader();
        dirReader.readEntries((entries: FileList) => {
          const entriesPromises = [];
          for (const entry of entries) {
            entriesPromises.push(
              traverseFileTreePromise(entry, path + item.name + '/'),
            );
          }
          resolve(Promise.all(entriesPromises));
        });
      }
    });
  }

  const files: any[] = [];
  return new Promise((resolve, reject) => {
    const entriesPromises = [];
    for (const it of dataTransferItems) {
      if (it.kind === 'string') {
        reject({
          message: 'No files found',
          header: '',
          variant: HttpVariant.error,
        });
        break;
      }
      if (!accept.includes(it.type)) {
        reject({
          message: 'File type not allowed',
          header: '',
          variant: HttpVariant.error,
        });
        break;
      }
      entriesPromises.push(traverseFileTreePromise(it.webkitGetAsEntry()));
    }
    Promise.all(entriesPromises).then(() => {
      resolve(files);
    });
  });
};

export const createFile = (data: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(data);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;
  a.click();
  document.body.removeChild(a);
};
