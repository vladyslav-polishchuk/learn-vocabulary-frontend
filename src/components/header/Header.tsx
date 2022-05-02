import { LibraryBooks } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from '@mui/material';
import UserMenu from './UserMenu';
import LanguageMenu from './LanguageMenu';
import type { RootState } from '../../store';

export default function Header() {
  useTranslation();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.vocabulary);

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar variant="dense" sx={{ height: '56px' }} disableGutters>
          <Typography
            variant="h6"
            color="inherit"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', flexGrow: '1' }}
          >
            <LibraryBooks
              sx={{
                width: '32px',
                height: '32px',
                verticalAlign: 'middle',
                mr: 1,
              }}
            />
            Bookabulary
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <LanguageMenu />

            {user ? (
              <UserMenu />
            ) : (
              <Button color="inherit" onClick={() => navigate('/login')}>
                <Trans i18nKey="login" />
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
