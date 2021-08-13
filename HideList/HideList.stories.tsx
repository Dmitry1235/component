import React from 'react';
import { HideList } from '.';
import { HideListDocs } from './docs/HideList.docs';
import { withKnobs, object } from '@storybook/addon-knobs';
import { MOCK_DATA } from './tests';

export default {
  title: 'Base/HideList',
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: HideListDocs,
    },
  },
};

export const example = () => {
  return <HideList list={object('list', MOCK_DATA)} />;
};
