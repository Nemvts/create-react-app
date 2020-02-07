// @flow
import React from 'react';
import { shallow } from 'enzyme';

import { MyFuncComponent } from './func-comp';

describe('Lesson 1 - MyFuncComponent', () => {
  it('should return a function', () => {
    const actual = typeof MyFuncComponent;
    const expected = 'function';
    expect(actual).toEqual(expected);
  });

  it('should not be a ReactComponent', () => {
    const proto: any = MyFuncComponent.prototype;
    expect(proto.isReactComponent).toBeUndefined();
  });

  it('should render a container div with a div inside it', () => {
    const wrapper = shallow(<MyFuncComponent studentName="Kenny" />);
    expect(wrapper.find('div').length).toEqual(2);
  });

  it('should render the studentName', () => {
    const wrapper = shallow(<MyFuncComponent studentName="Kenny" />);
    expect(wrapper.text()).toContain('Kenny');
  });
});
