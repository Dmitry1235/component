import React from 'react';
import { HideList } from '../index';
import { Title, Subtitle, Props, Source } from '@storybook/addon-docs/blocks';

export const HideListDocs = () => (
  <>
    <Title>HideList</Title>
    <Subtitle>Компонент для отображения информации об перемещении почты</Subtitle>
    <Props of={HideList} />
    <Source
      language="jsx"
      code={`
      <HideList list={[]} />
      `}
    />
  </>
);
