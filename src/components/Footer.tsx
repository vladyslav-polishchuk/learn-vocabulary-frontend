import { Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <footer>
      <Container sx={{ py: 2 }}>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'text.secondary' }}
        >
          © Copyright 2022 Vladyslav Polishchuk. All rights reserved
        </Typography>
      </Container>
    </footer>
  );
}
