// @flow
import React from 'react';
import componentQueries from 'react-component-queries';

function SomeComponent(props: any) {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

const query = (size, ownProps) => {
  const { width } = size;
  const { smallWidth = 300, largeWidth = 1024 } = ownProps;

  return {
    isSmall: width < smallWidth,
    isLarge: width > largeWidth,
  };
};

export const DemoComponentQueries = componentQueries(query)((props: any) => {
  // Prevent some properties to be passed down
  const {
    smallWidth, // eslint-disable-line no-unused-vars
    largeWidth, // eslint-disable-line no-unused-vars
    ...others
  } = props;
  return <SomeComponent {...others} />;
});
