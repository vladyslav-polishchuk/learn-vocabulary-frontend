import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Grid } from '@mui/material';
import Header from './components/header/Header';
import HomePage from './pages/Home';
import WordsPage from './pages/Words';
import BooksPage from './pages/Books';
import BookPage from './pages/Book';
import ProfilePage from './pages/Profile';
import NotFoundPage from './pages/NotFound';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ErrorBar from './components/ErrowBar';
import { setUser } from './store/vocabularySlice';
import ScrollTopButton from './components/presentational/ScrollTopButton';
import Footer from './components/Footer';
import Spinner from './components/presentational/Spinner';
import { getCurrentUser } from './api';
import type { RootState } from './store';

export default function App() {
  const { status } = useSelector((state: RootState) => state.vocabulary);
  const dispatch = useDispatch();
  const setCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      dispatch(setUser(user));
    } catch (e) {}
  };

  useEffect(() => {
    setCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useTranslation();

  return (
    <BrowserRouter>
      <Grid
        container
        direction="column"
        sx={{ minHeight: '100vh', backgroundColor: '#f2f3f4' }}
      >
          <Header />

        <Container sx={{ py: 3, mb: 'auto' }} component="main">
            <ScrollTopButton />
            <ErrorBar />
          <Spinner loading={status === 'loading'} />

            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/words" element={<WordsPage />}></Route>
              <Route path="/books" element={<BooksPage />}></Route>
              <Route path="/books/:bookId" element={<BookPage />}></Route>
              <Route path="/profile" element={<ProfilePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </Container>

        <Footer />
      </Grid>
    </BrowserRouter>
  );
}
