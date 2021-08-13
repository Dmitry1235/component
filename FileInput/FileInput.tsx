import React, { useState, useCallback, useRef, useMemo } from 'react';
import cn from 'classnames/bind';

//Libs
import { readFile } from 'libs/documents';
// Styles
import styles from './styles.styl';
const cx = cn.bind(styles);

export type FileInputType = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
};

export type ErrorFileInputType = {
  file: FileInputType;
  isMaxSize: boolean;
  isPermittedFormat: boolean;
  isEmptySize: boolean;
};

export interface FileInputProps {
  className?: string;
  multiple?: boolean;
  permittedFormats?: string[];
  maxSize?: number;
  onChange: (files: FileInputType[], filesError: ErrorFileInputType[]) => void;
  children: React.ReactNode;
}

const ACCEST_TYPE_FILES = {
  'application/pdf': 'pdf',
  'application/x-pdf': 'x-pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'image/jpeg': 'jpeg',
  'image/pjpeg': 'pjpeg',
  'image/png': 'png',
  'image/x-png': 'x-png',
};

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, multiple = true, permittedFormats, maxSize, onChange, children }, forwardRef) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isMoveFile, setMoveFile] = useState(false);

    const heightContainer = useMemo(() => {
      return contentRef.current && contentRef.current.clientHeight;
    }, [contentRef.current]);

    // Проверка файла на допустимые форматы
    const isPermittedFormat = useCallback(
      (file) => {
        if (permittedFormats) {
          const selectFile = file || '';
          const typeFile = selectFile ? ACCEST_TYPE_FILES[selectFile.type] : '';
          return permittedFormats.includes(typeFile);
        }
        return true;
      },
      [permittedFormats],
    );

    // Проверка файла на допустимые форматы //bate
    const isMaxSize = useCallback(
      (file) => {
        if (maxSize) {
          return file.size <= maxSize;
        }
        return true;
      },
      [maxSize],
    );

    // Проверка файла на валидность
    const handleChange = useCallback(
      (file) => {
        const files = file || [];
        const errorFiles: any = [];

        const promiseSucces = [];

        for (let i = 0; i < files.length; i++) {
          const isEmptySize = files[i].size === 0;
          const isMaxSizeError = isMaxSize(files[i]);
          const isPermittedFormatError = isPermittedFormat(files[i]);

          if (isMaxSizeError && isPermittedFormatError && !isEmptySize) {
            promiseSucces.push(readFile(files[i]));
          } else {
            errorFiles.push({
              file: files[i],
              isMaxSize: !isMaxSizeError,
              isPermittedFormat: !isPermittedFormatError,
              isEmptySize: isEmptySize,
            });
          }
        }

        Promise.all(promiseSucces).then((res) => {
          const succesFiles = res.map((item: any) => {
            Object.defineProperty(item.file, 'src', {
              writable: true,
              value: item.src,
            });

            return item.file;
          });

          onChange(succesFiles, errorFiles);
          setMoveFile(false);
        });
      },
      [onChange, isMaxSize, isPermittedFormat],
    );

    // Срабатывает при выборе файла из меню
    const onChangeInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        handleChange(file);
        e.preventDefault();
        return false;
      },
      [handleChange],
    );

    // Срабатывает когда пользователь "сбрасывает" перетаскиваемый элемент
    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        const file = e.dataTransfer.files;
        handleChange(file);
        e.preventDefault();
        e.stopPropagation();
      },
      [handleChange],
    );

    // Выполняется когда элемент перемещают над допустимой зоной
    const handleDragOver = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isMoveFile) {
          setMoveFile(true);
        }

        return false;
      },
      [isMoveFile],
    );

    // Выполняется когда элемент выходит из допустимой зоны для переноса
    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setMoveFile(false);
      return false;
    }, []);

    // Получение строки с разрешенными форматами файлов
    const acceptFormats = useMemo(() => {
      if (permittedFormats) {
        return `.${permittedFormats.join(', .')}`;
      }
      return '';
    }, [permittedFormats]);

    return (
      <div
        className={cx(
          'FileInput',
          { FileInput_move: isMoveFile },
          { [`${className}_move`]: className && isMoveFile },
          className,
        )}
        style={isMoveFile ? { minHeight: `${heightContainer || 0}px` } : {}}
      >
        <div ref={contentRef} className={cx('FileInput__label')} onDragOver={handleDragOver}>
          {children}
          <div
            className={cx('FileInput__mask')}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        </div>
        <input
          className={cx('FileInput__input')}
          type="file"
          onChange={onChangeInput}
          multiple={multiple}
          ref={forwardRef}
          accept={acceptFormats}
        />
      </div>
    );
  },
);

FileInput.displayName = 'FileInput';
