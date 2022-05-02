import { Box, Button } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Helmet>
        <title>Bookabulary | Home</title>
      </Helmet>

      <Button component={Link} to="/words" sx={{ my: 5 }} fullWidth>
        <Trans i18nKey="allwords" />
      </Button>
      <Button component={Link} to="/books" fullWidth>
        <Trans i18nKey="allbooks" />
      </Button>
    </Box>
  );
}
