import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import Header from './components/Header';
import HomePage from './pages/Home';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item sx={{ my: 5 }}>
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Container>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}
