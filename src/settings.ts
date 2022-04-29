export const serverUrl =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://bookabulary-backend.azurewebsites.net'
    : process.env.REACT_APP_ENV === 'staging'
    ? 'https://bookabulary-backend.azurewebsites.net'
    : 'https://bookabulary-backend.azurewebsites.net';
// : 'http://localhost:8080';
