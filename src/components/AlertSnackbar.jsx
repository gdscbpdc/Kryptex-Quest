import { Alert, Snackbar } from '@mui/material';

const AlertSnackbar = ({ error, setError, severity = 'error' }) => {
  return (
    <Snackbar
      open={error}
      autoHideDuration={3000}
      onClose={() => setError('')}
      ClickAwayListenerProps={{ onClickAway: () => {} }}
    >
      <Alert severity={severity} variant='filled' sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
