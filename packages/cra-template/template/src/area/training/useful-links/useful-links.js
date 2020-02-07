// @flow
import React from 'react';
import type { Element } from 'react';

type UsefulLinksProps = {
  children?: Element<*>[],
};

export function UsefulLinks(props: UsefulLinksProps) {
  return (
    <div
      style={{
        marginTop: 20,
        padding: 10,
        border: '1px solid lightgrey',
      }}
    >
      <b>Useful Links</b>
      <br />
      {props.children}
    </div>
  );
}
