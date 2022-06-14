import SnackbarCell from '../../components/snack-bar/snack-bar';

interface HandleProps {
  response: object;
  message: string;
}

export default function ({ response, message }: HandleProps) {
  SnackbarCell(message);
  return Promise.reject({ response, message });
}
