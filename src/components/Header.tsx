import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none' }}
          >
            Vocabulary
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
