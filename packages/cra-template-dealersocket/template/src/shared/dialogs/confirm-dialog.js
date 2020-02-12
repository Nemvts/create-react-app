// @flow
import React from 'react';
import { Button } from '@dealersocket/ds-ui-react/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { reduxDialog } from '@dealersocket/react-common';

export const CONFIRM_DIALOG = 'CONFIRM_DIALOG';

type ConfirmDialogProps = {
  isOpen: boolean,
  message: string,
  noAction: () => void,
  noLabel: string,
  onRequestClose: (event: any) => void,
  yesAction: () => void,
  yesLabel: string,
};

const ConfirmDialogComponent = (props: ConfirmDialogProps) => {
  const {
    isOpen,
    message,
    noLabel,
    yesLabel,
    noAction,
    yesAction,
    onRequestClose,
  } = props;

  const onNoClick = () => {
    // console.log('onNoClick');
    if (noAction) {
      noAction();
    }
    onRequestClose();
  };

  const onYesClick = () => {
    // console.log('onYesClick');
    yesAction();
    onRequestClose();
  };

  return (
    <Dialog open={isOpen} onClose={onRequestClose}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onNoClick}>
          {noLabel}
        </Button>
        ,
        <Button color="danger" onClick={onYesClick}>
          {yesLabel}
        </Button>
        ,
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialogComponent.defaultProps = {
  message: 'Confirm',
  noLabel: 'No',
  yesLabel: 'Yes',
  noAction: null,
};

export const ConfirmDialog = reduxDialog({
  name: CONFIRM_DIALOG,
})(ConfirmDialogComponent);
