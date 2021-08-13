import React, { useRef, useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import { FileInput } from './FileInput';
import { FileInputDocs } from './docs/FileInput.docs';

import { withKnobs, array, number } from '@storybook/addon-knobs';

export default {
  title: 'Base/FileInput',
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: FileInputDocs,
    },
  },
};

const TestFileInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Служит для открытия меню выдора файла по нажатию на Label
  const handleClickLabel = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  return (
    <div
      style={{
        position: 'fixed',
        background: 'red',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ height: '50px', background: 'green' }}></div>
      <FileInput
        permittedFormats={array('permittedFormats', ['png', 'pdf', 'jpeg', 'doc', 'docx'])}
        maxSize={number('maxSize', 5 * 1000 * 1000)}
        ref={inputRef}
        onChange={(file, error) => {
          action('onChange')(file, error);
        }}
      >
        <div>Перетащите сюда файлы или</div>
        <label onClick={handleClickLabel}>выберите из списка</label>
      </FileInput>
    </div>
  );
};

export const example = () => <TestFileInput />;
