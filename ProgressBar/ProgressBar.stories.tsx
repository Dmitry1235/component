import React from 'react';
import { ProgressBar } from './ProgressBar';
import { ProgressBarDocs } from './docs/ProgressBar.docs';

import { withKnobs, boolean, select } from '@storybook/addon-knobs';

export default {
  title: 'Base/ProgressBar',
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: ProgressBarDocs,
    },
  },
};

const DEFAULT_OPTIONS = {
  file: 'file',
  non: '',
};

export const example = () => {
  return (
    <ProgressBar
      isEndAnimation={boolean('isEndAnimation', false)}
      theme={select('theme', DEFAULT_OPTIONS, 'file') as 'file'}
    />
  );
};
