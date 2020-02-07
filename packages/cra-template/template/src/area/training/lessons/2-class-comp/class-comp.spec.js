// @flow
import React from 'react';
import { shallow } from 'enzyme';

import { MyClassComponent } from './class-comp';

describe('Lesson 2 - MyClassComponent', () => {
  it('should be a ReactComponent', () => {
    const proto: any = MyClassComponent.prototype;
    expect(proto.isReactComponent).toEqual({});
  });

  it('should render a container div with a div inside it', () => {
    const wrapper = shallow(<MyClassComponent studentName="Kenny" />);
    expect(wrapper.find('div').length).toEqual(2);
  });

  it('should render the studentName', () => {
    const wrapper = shallow(<MyClassComponent studentName="Kenny" />);
    expect(wrapper.text()).toContain('Kenny');
  });
});
