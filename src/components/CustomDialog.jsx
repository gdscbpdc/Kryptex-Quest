import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

const CustomDialog = ({ open, title, content, onClick, actionTitle }) => {
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClick} variant='contained'>
          {actionTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
