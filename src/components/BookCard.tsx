import {
  Card,
  CardHeader,
  CardActions,
  Stack,
  Tooltip,
  CardActionArea,
} from '@mui/material';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import { serverUrl } from '../settings';
import type { RootState } from '../store';

interface BookCardProps {
  book: Book;
  onBookSelect: () => any;
}

export default function BookCard({ book, onBookSelect }: BookCardProps) {
  const { user } = useSelector((state: RootState) => state.vocabulary);

  const title = (
    <Stack direction="row" spacing={1}>
      {book.name}
    </Stack>
  );
  const downloadUrl = `${serverUrl}/book?id=${book.hash}&download=true`;

  return (
    <Card>
      <CardActionArea onClick={onBookSelect}>
        <CardHeader title={title} />
        {user && (
          <CardActions disableSpacing>
            <Tooltip title="Share with others">
              <IconButton sx={{ ml: 'auto' }} component="span">
                <ShareIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Download">
              <IconButton
                component="a"
                href={downloadUrl}
                download
                onClick={(e: any) => e.stopPropagation()}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        )}
      </CardActionArea>
    </Card>
  );
}
