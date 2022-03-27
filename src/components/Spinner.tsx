import { Backdrop, CircularProgress } from '@mui/material';

interface SpinnerProps {
  loading: boolean;
}

export default function Spinner({ loading }: SpinnerProps) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={loading}>
      <CircularProgress />
    </Backdrop>
  );
}
