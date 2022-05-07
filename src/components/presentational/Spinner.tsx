import { Backdrop, CircularProgress } from '@mui/material';

interface SpinnerProps {
  loading: boolean;
}

export default function Spinner({ loading }: SpinnerProps) {
  return (
    <Backdrop
      sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', zIndex: 999 }}
      open={loading}
    >
      <CircularProgress />
    </Backdrop>
  );
}
