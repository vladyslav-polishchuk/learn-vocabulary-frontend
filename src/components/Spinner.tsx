import { Box, CircularProgress } from '@mui/material';

interface SpinnerProps {
  loading: boolean;
}

export default function Spinner({ loading }: SpinnerProps) {
  return (
    <Box
      sx={{
        display: loading ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.3)',
        zIndex: 999,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
