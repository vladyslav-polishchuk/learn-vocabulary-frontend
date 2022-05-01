import { Box, Button } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Helmet>
        <title>Bookabulary | Home</title>
      </Helmet>

      <Button component={Link} to="/words" sx={{ my: 5 }} fullWidth>
        See all words
      </Button>
      <Button component={Link} to="/books" fullWidth>
        See all books
      </Button>
    </Box>
  );
}
