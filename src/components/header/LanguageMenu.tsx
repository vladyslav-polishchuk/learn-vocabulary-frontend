import UkraineIcon from '../../images/ukraine.svg';
import UsaIcon from '../../images/usa.svg';
import RussiaIcon from '../../images/russia.svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography, Menu, IconButton, MenuItem } from '@mui/material';
import { updateUser } from '../../api';
import { setUser } from '../../store/vocabularySlice';
import type { RootState } from '../../store';

export default function LanguageMenu() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { user } = useSelector((state: RootState) => state.vocabulary);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const changeLanguage = async (newLang: string) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);

    if (user) {
      const updatedUser = await updateUser({
        ...user,
        language: newLang,
      });

      dispatch(setUser(updatedUser));
    }
  };
  const languageMenuOptions = [
    {
      language: 'ua',
      label: 'Українська',
      icon: UkraineIcon,
      click: () => changeLanguage('ua'),
    },
    {
      language: 'ru',
      label: 'Русский',
      icon: RussiaIcon,
      click: () => changeLanguage('ru'),
    },
    {
      language: 'en',
      label: 'English',
      icon: UsaIcon,
      click: () => changeLanguage('en'),
    },
  ];

  const currentLanguageIcon = languageMenuOptions.find(
    (option) => option.language === i18n.language
  )?.icon;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
        }}
      >
        <img
          alt=""
          src={currentLanguageIcon}
          style={{
            maxWidth: '100%',
            width: '70%',
          }}
        />
      </IconButton>

      <Menu
        sx={{ mt: '45px' }}
        id="language-appbar"
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
        {languageMenuOptions.map((setting) => (
          <MenuItem
            key={setting.label}
            onClick={() => {
              setting.click();

              handleClose();
            }}
          >
            <img
              alt=""
              src={setting.icon}
              style={{
                marginRight: '8px',
                maxWidth: '32px',
                width: '32px',
              }}
            />
            <Typography textAlign="center">{setting.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
