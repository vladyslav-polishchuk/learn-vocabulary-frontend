import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert, Slide, IconButton } from '@mui/material';
import type { RootState } from '../store';
import { setError } from '../store/vocabularySlice';

export default function ErrorBar() {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.vocabulary);
  const handleClose = (event: any, reason?: string) => {
    if (reason !== 'clickaway') {
      dispatch(setError(null));
    }
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      sx={{ mt: '48px' }}
      open={error !== null}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={10000}
      onClose={handleClose}
      TransitionComponent={Slide}
    >
      <Alert
        severity="error"
        variant="filled"
        elevation={5}
        sx={{ width: '100%' }}
        action={action}
      >
        {error}
      </Alert>
    </Snackbar>
  );
}
