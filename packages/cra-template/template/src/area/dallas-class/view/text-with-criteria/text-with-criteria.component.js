// @flow
import React from 'react';

type Props = {
  // Note: criteria must be already lowercase
  criteria: string,
  text: string,
};

export const TextWithCriteria = ({ text, criteria }: Props) => {
  if (text && criteria) {
    const start = text.toLowerCase().indexOf(criteria);
    if (start !== -1) {
      const end = start + criteria.length;
      return (
        <span>
          {text.substring(0, start)}
          <b>
            <u>{text.substring(start, end)}</u>
          </b>
          {text.substring(end)}
        </span>
      );
    }
  }
  return text;
};
