import React from 'react';
import { ProgressBar } from '../index';
import { Title, Props, Subtitle, Source, Description } from '@storybook/addon-docs/blocks';

export const ProgressBarDocs = () => (
  <>
    <Title>ProgressBar</Title>
    <Subtitle>Компонент служит для отрисовки прогресса</Subtitle>
    <Description>Проп theme служит для выбора темы заполнения ProgressBar</Description>
    <Description>theme: file делает заполнение до 90% за 1 сек</Description>
    <Description>
      Проп isEndAnimation необходим для завершение анимации он служит для заполнения до 100%
    </Description>
    <Props of={ProgressBar} />
    <Source
      language="jsx"
      code={`
      <ProgressBar theme='file' isEndAnimation={false} />;
      `}
    />
  </>
);
