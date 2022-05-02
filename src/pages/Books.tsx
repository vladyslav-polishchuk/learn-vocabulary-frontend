import { UploadFile } from '@mui/icons-material';
import {
  Box,
  Typography,
  Input,
  Grid,
  Button,
  Toolbar,
  Tooltip,
  TextField,
  Card,
  CardHeader,
  CardActionArea,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectFile, getBooks } from '../store/vocabularySlice';
import Spinner from '../components/pure/Spinner';
import Pagination from '../components/pure/Pagination';
import type { RootState } from '../store';
import { Trans } from 'react-i18next';

export default function BooksPage() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleFiles = async (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    if (!input || !input.files) return;

    const file = input.files[0];
    dispatch(selectFile(file));
  };
  const { books, user, status } = useSelector(
    (state: RootState) => state.vocabulary
  );
  const filteredBooks = books.filter((book) => {
    return book.name.toLowerCase().includes(search);
  });
  const numberOfPages = Math.ceil(filteredBooks.length / pageSize);
  const x = (page - 1) * pageSize;
  const bookNodes = filteredBooks.slice(x, x + pageSize).map((book) => (
    <Grid item key={book.hash} xs={4}>
      <Card>
        <CardActionArea onClick={() => navigate(`/books/${book.hash}`)}>
          <CardHeader title={<Typography> {book.name}</Typography>} />
        </CardActionArea>
      </Card>
    </Grid>
  ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Helmet>
        <title>Bookabulary | Books</title>
      </Helmet>

      <Spinner loading={status === 'loading'} />

      <Grid item xs={12}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold' }}>
          <Trans i18nKey="books-title" />
        </Typography>
      </Grid>

      <Box position="sticky">
        <Toolbar variant="dense" disableGutters sx={{ my: 2 }}>
          <Box sx={{ flexGrow: '1', mx: 1 }}>
            <Tooltip title={user ? '' : 'You have to login to upload books'}>
              <label htmlFor="contained-button-file">
                <Input
                  id="contained-button-file"
                  type="file"
                  sx={{ display: 'none' }}
                  onChange={handleFiles}
                  disabled={!user}
                  inputProps={{ accept: '.pdf,.txt' }}
                />
                <Button
                  variant="contained"
                  component="span"
                  disabled={!user}
                  size="large"
                  sx={{ lineHeight: 1 }}
                >
                  <UploadFile sx={{ mr: 1 }} />
                  <Trans i18nKey="pick-file" />
                </Button>
              </label>
            </Tooltip>

            <TextField
              sx={{ mx: 1 }}
              variant="outlined"
              size="small"
              label={<Trans i18nKey="search" />}
              value={search}
              onChange={(e) => {
                setSearch(e?.target?.value);
                setPage(1);
              }}
            ></TextField>
          </Box>

          <Pagination
            page={page}
            numberOfPages={numberOfPages}
            defaultPageSize={pageSize}
            setPage={(newPage) => setPage(newPage)}
            setPageSize={(newSize) => {
              setPageSize(newSize);
              setPage(1);
            }}
          />
        </Toolbar>
      </Box>

      <Grid container spacing={2}>
        {bookNodes}
      </Grid>
    </Box>
  );
}
