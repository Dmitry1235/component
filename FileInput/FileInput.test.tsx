import React from 'react';
import { FileInput } from './FileInput';
import renderer from 'react-test-renderer';

describe('FileInput:: Snapshots', () => {
  it('Default', () => {
    const component = renderer.create(<FileInput onChange={() => {}}>Загрузите файл</FileInput>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
