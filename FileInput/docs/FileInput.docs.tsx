import React from 'react';
import { FileInput } from '../FileInput';
import { Title, Subtitle, Props, Source, Description } from '@storybook/addon-docs/blocks';

export const FileInputDocs = () => (
  <>
    <Title>FileInput</Title>
    <Subtitle>Компонент служит для загрузки фалов</Subtitle>
    <Description>
      При перетаскивании файла на компонент он становиться absolute и растягивается на всю область
      родителя
    </Description>
    <Description>
      Для коректного отображения рекомендется родителю давать display: flex и flex-irection: column
    </Description>
    <Description>
      Проп permittedFormats содержит массив допустимых расширений для загружаемых файлов
    </Description>
    <Description>
      Проп `ref` это `const ref = useRef()` необходим для передачи рефа вышестоящиму компоненту
    </Description>
    <Description>
      Во избежании проблем всем children необходимо при `move` дать стиль `pointer-events none`
    </Description>
    <Source
      language="jsx"
      code={`
      &__input_move {
        & ^[0]__text, & ^[0]__link {
          pointer-events none
        }
      }
      `}
    />
    <Props of={FileInput} />
    <Source
      language="jsx"
      code={`
        <FileInput
        ref={inputRef}
        permittedFormats={['pdf', 'jpeg']};
        onChange={(file: FileList | null) => {
        action('onChange')(file);
        }}
      >
        <div>Перетащите сюда файлы или</div>
        <label onClick={handleClickLabel}>выберите из списка</label>
      </FileInput>
      />
      `}
    />
  </>
);
