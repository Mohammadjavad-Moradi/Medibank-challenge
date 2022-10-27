import React from 'react';

import { ErrorMessageStyles } from './ErrorMessage.styles';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <ErrorMessageStyles>{message}</ErrorMessageStyles>
);

export default ErrorMessage;
