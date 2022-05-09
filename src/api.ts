import { serverUrl } from './settings';

interface RequestParams {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: any;
}

const sendRequest = async (
  url: string,
  { method = 'GET', body, headers }: RequestParams = {}
) => {
  const response = await fetch(`${serverUrl}/${url}`, {
    method,
    body,
    credentials: 'include',
    headers,
  });
  if (response.ok) {
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

export const register = async (
  email: string,
  password: string,
  language: string
) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('language', language);

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

export const updateUser = async (user: Partial<User>) => {
  return await sendRequest(`user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });
};

export const markAsLearned = async (words: string[]) => {
  return await sendRequest(`word/learned`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ words }),
  });
};

export const removeFromLearned = async (words: string[]) => {
  return await sendRequest(`word/learned`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ words }),
  });
};
