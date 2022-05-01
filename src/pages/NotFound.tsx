import NotFoundImage from '../images/not-found.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        mt: 10,
      }}
    >
      <Helmet>
        <title>Bookabulary | Not Found</title>
      </Helmet>

      <Typography
        align="center"
        color="textPrimary"
        variant="h2"
        sx={{ fontWeight: 'bold' }}
      >
        The page you are looking for isn’t here
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <img
          alt=""
          src={NotFoundImage}
          style={{
            marginTop: 50,
            maxWidth: '100%',
            width: '75%',
          }}
        />
      </Box>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon fontSize="small" />}
        sx={{ my: 5 }}
        variant="contained"
      >
        Go Home
      </Button>
    </Box>
  );
}
