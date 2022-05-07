import { ArrowUpward } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  const handleResize = () => {
    const { scrollTop, clientHeight } = document.documentElement;
    const shouldBeVisible = scrollTop > clientHeight;

    setVisible(shouldBeVisible);
  };
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IconButton
      color="primary"
      onClick={handleClick}
      sx={{
        display: visible ? 'inline' : 'none',
        position: 'fixed',
        top: 'calc(100% - 128px)',
        right: '64px',
        width: '64px',
        height: '64px',
        zIndex: 1,
      }}
    >
      <ArrowUpward sx={{ width: '28px', height: '28px' }} />
    </IconButton>
  );
}
