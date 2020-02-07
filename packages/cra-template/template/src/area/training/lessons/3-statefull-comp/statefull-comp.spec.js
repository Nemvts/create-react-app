// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { NumberField } from '@dealersocket/ds-ui-react/fields/NumberField';

import { QuizRow } from './quiz-row';

describe('Lesson 3 - QuizRow', () => {
  it('should be a ReactComponent', () => {
    const proto: any = QuizRow.prototype;
    expect(proto.isReactComponent).toEqual({});
  });

  it('should render a container div with a div inside it', () => {
    const wrapper = shallow(<QuizRow />);
    expect(wrapper.find('div').length).toEqual(2);
  });

  it('should have some initial state', () => {
    const wrapper = shallow(<QuizRow />);
    const inputs = wrapper.find(NumberField);
    const spans = wrapper.find('span');
    expect(inputs.at(0).prop('value')).toEqual(0);
    expect(spans.at(0).text()).toEqual('3');
    expect(spans.at(1).text()).toEqual('');
  });

  it('should compute', () => {
    const wrapper = shallow(<QuizRow />);
    wrapper.instance().computeAction();
    wrapper.update();
    const spans = wrapper.find('span');
    expect(spans.at(1).text()).toEqual('3');
  });
});
