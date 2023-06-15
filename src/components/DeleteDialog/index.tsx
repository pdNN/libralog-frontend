import { FC, ReactNode, useCallback, useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";

interface IDeleteDialog {
  deleteFnc: (row_id: any) => void;
  row_id: any;
  children: ReactNode;
}

const DeleteDialog: FC<IDeleteDialog> = (props) => {
  const { deleteFnc, row_id, children } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    deleteFnc(row_id);
    handleClose();
  }, [deleteFnc, handleClose, row_id]);

  return (
    <>
      <IconButton onClick={handleClickOpen}>{children}</IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {`Você confirma a exclusão do #${row_id}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
