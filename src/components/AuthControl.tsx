import { Google } from '@mui/icons-material';
import { Button, Divider, Typography, Container, Stack } from '@mui/material';
import type { ReactElement } from 'react';

interface AuthControlProps {
  title: string;
  subtitle: string;
  children: ReactElement[];
}

export default function AuthControl({
  title,
  subtitle,
  children,
}: AuthControlProps) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        minHeight: '80vh',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{subtitle}</Typography>
      </Stack>

      <Button fullWidth size="large" variant="outlined">
        <Google />
      </Button>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>

      {children}
    </Container>
  );
}
