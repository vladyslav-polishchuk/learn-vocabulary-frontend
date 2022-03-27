import { LibraryBooks } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none' }}
          >
            <LibraryBooks
              sx={{
                width: '32px',
                height: '32px',
                verticalAlign: 'middle',
                mr: 1,
              }}
            />
            Vocabulary
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
