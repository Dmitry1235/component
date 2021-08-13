import React from 'react';
import { ProgressBar } from './ProgressBar';
import renderer from 'react-test-renderer';

describe('ProgressBar:: Snapshots', () => {
  it('Default', () => {
    const component = renderer.create(<ProgressBar isEndAnimation={false} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('ProgressBar:: Render DOM', () => {});
