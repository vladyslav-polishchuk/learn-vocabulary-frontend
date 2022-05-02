import { AccountCircle, Settings, Person } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Trans } from 'react-i18next';
import {
  Typography,
  Menu,
  IconButton,
  Tooltip,
  MenuItem,
  Box,
  Divider,
  Button,
} from '@mui/material';
import { logout } from '../../api';
import { setUser } from '../../store/vocabularySlice';
import type { RootState } from '../../store';

export default function Header() {
  const { user } = useSelector((state: RootState) => state.vocabulary);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  if (!user) return null;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton size="large" onClick={handleOpen} color="inherit">
          <AccountCircle />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '45px' }}
        id="profile-appbar"
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
        onClose={handleClose}
      >
        <Box sx={{ mb: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user.email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={() => {
            navigate('/profile');

            handleClose();
          }}
        >
          <Person sx={{ mx: 1 }} />
          <Typography textAlign="center">
            <Trans i18nKey="profile" />
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate('/profile');

            handleClose();
          }}
        >
          <Settings sx={{ mx: 1 }} />
          <Typography textAlign="center">
            <Trans i18nKey="settings" />
          </Typography>
        </MenuItem>

        <Box sx={{ p: 2, pt: 1.5, pb: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={async () => {
              await logout();

              dispatch(setUser(null));
            }}
          >
            <Trans i18nKey="logout" />
          </Button>
        </Box>
      </Menu>
    </>
  );
}
