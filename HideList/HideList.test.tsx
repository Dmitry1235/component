import React from 'react';
import { HideList } from './';
import renderer from 'react-test-renderer';
import { MOCK_DATA } from './tests';

describe('HideList snapshots', () => {
  let component: any;

  beforeEach(() => {
    component = <HideList list={MOCK_DATA} />;
  });

  it('Default', () => {
    const tree = renderer.create(component);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
