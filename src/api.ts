import { serverUrl } from './settings';

interface RequestParams {
  method?: 'GET' | 'POST' | 'DELETE';
  body?: any;
}

const sendRequest = async (
  url: string,
  { method = 'GET', body }: RequestParams = {}
) => {
  const response = await fetch(`${serverUrl}/${url}`, {
    method,
    body,
    credentials: 'include',
  });
  const contentType = response.headers.get('content-type');
  const isContentTypeJson = contentType?.includes('application/json');
  if (isContentTypeJson) {
    return await response.json();
  }

  const responseText = await response.text();
  throw new Error(responseText);
};

export const login = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  return await sendRequest(`login`, {
    method: 'POST',
    body: formData,
  });
};

export const register = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  return await sendRequest(`register`, {
    method: 'POST',
    body: formData,
  });
};

export const logout = async () => {
  return await sendRequest(`logout`, {
    method: 'POST',
  });
};

export const getCurrentUser = async () => {
  return await sendRequest(`user/current`);
};
