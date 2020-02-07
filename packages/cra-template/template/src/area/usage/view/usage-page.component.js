// @flow
import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { withStyles } from '@material-ui/core/styles';
import type { JssClasses } from '@dealersocket/ds-ui-react/types';
import { UsageTableContainer } from './usage-table/usage-table.container';
import { FileTableContainer } from './file-table/file-table.container';

type Props = {
  classes: JssClasses,
  size: any,
};

function UsagePageComp(props: Props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <SplitterLayout vertical secondaryInitialSize={200}>
        <div className={classes.container}>
          <UsageTableContainer />
        </div>
        <div className={classes.container}>
          <FileTableContainer />
        </div>
      </SplitterLayout>
    </div>
  );
}

const styles = () => ({
  root: {
    height: 'calc(100vh - 44px)',
  },
  container: {
    height: '100%',
    minHeight: '100%',
  },
});

export const UsagePage = withStyles(styles)(UsagePageComp);
