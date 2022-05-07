import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import Page from '../components/presentational/Page';

export default function Home() {
  return (
    <Page title="Home">
      <Button component={Link} to="/words" sx={{ my: 5 }} fullWidth>
        <Trans i18nKey="allwords" />
      </Button>
      <Button component={Link} to="/books" fullWidth>
        <Trans i18nKey="allbooks" />
      </Button>
    </Page>
  );
}
