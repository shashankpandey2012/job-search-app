import React from 'react';
import { Modal, Fade, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalHOC = (props) => {
  const {
    isOpen,
    onClose,
    titleContent,
    children,
    disablePortal,
  } = props;
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      disablePortal={disablePortal}
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">{ titleContent }</h2>
          <div className="modal-body">{children}</div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalHOC;
