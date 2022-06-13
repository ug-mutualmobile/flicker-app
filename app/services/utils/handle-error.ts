import SnackbarCell from '../../components/snack-bar';

interface HandleProps {
  response: object;
  message: string;
}

export default function ({ response, message }: HandleProps) {
  SnackbarCell(message);
  Promise.reject({ response, message });
}
