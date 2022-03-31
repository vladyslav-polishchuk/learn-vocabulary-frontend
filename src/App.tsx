import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import Header from './components/Header';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import NotFoundPage from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item sx={{ my: 5 }}>
          <Container sx={{ mt: '48px' }}>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/profile" element={<ProfilePage />}></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </Container>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}
