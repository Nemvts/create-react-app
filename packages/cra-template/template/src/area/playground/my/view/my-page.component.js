// @flow
import React from 'react';
import { Button } from '@dealersocket/ds-ui-react/Button';

type Props = {
  setValueAction: (v: number) => void,
  value: number,
};

export function MyPageComponent(props: Props) {
  const { setValueAction, value } = props;
  return (
    <div>
      <h4> Start coding here...</h4>
      <Button onClick={() => setValueAction(value + 1)}>{value}</Button>
    </div>
  );
}
