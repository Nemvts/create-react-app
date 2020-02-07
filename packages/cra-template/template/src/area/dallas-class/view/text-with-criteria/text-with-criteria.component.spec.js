// @flow
import React from 'react';
import { render } from '@dealersocket/ds-ui-react/test-utils';
import { TextWithCriteria } from './text-with-criteria.component';

describe('text-with-criteria.component', () => {
  it('renders span with content', () => {
    const wrapper = render(<TextWithCriteria text="criteria" criteria="i" />);
    expect(wrapper.baseElement).toContainHTML(
      '<span>cr<b><u>i</u></b>teria</span>'
    );
  });

  it('renders text', () => {
    const wrapper = render(<TextWithCriteria criteria="criteria" text="a" />);
    expect(wrapper.baseElement).toContainHTML('<div>a</div>');
  });

  it('missing criteria', () => {
    const wrapper = render(<TextWithCriteria criteria="" text="criteria" />);
    expect(wrapper.baseElement).toContainHTML('<div>criteria</div>');
  });
});
