interface HandleProps {
  response: object;
  message: string;
}

export default function ({ response, message }: HandleProps) {
  return Promise.reject({ response, message });
}
