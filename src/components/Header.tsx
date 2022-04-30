import { LibraryBooks, AccountCircle } from '@mui/icons-material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Menu,
  IconButton,
  Tooltip,
  MenuItem,
  Button,
} from '@mui/material';
import { logout } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setUser } from '../store/vocabularySlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { user } = useSelector((state: RootState) => state.vocabulary);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    { label: 'Profile', click: () => navigate('/profile') },
    {
      label: 'Logout',
      click: async () => {
        await logout();

        dispatch(setUser(null));
      },
    },
  ];

  const loginOrProfileButton = user ? (
    <>
      <Tooltip title="Open settings">
        <IconButton size="large" onClick={handleOpenUserMenu} color="inherit">
          <AccountCircle />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting.label}
            onClick={() => {
              setting.click();

              handleCloseUserMenu();
            }}
          >
            <Typography textAlign="center">{setting.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  ) : (
    <Button color="inherit" onClick={() => navigate('/login')}>
      Log in
    </Button>
  );

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
            Bookabulary ({process.env.REACT_APP_ENV || 'dev'})
          </Typography>
          <Box sx={{ flexGrow: 0 }}>{loginOrProfileButton}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
