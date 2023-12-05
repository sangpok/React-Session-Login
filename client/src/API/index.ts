import { UserAuth } from '@Types/index';

const API_URI = 'http://localhost:3001' as const;

const handleResponse = async <T>(res: Response) => {
  if (res.ok) {
    const contentType = res.headers.get('content-type');
    const isJsonType = contentType && contentType.includes('application/json');

    if (isJsonType) {
      return res.json() as Promise<T>;
    }

    return null;
  }

  throw await (res.json() as Promise<T>);
};

const Fetcher = {
  GET: <T>(endpoint: string) =>
    fetch(`${API_URI}${endpoint}`, {
      credentials: 'include',
    }).then(handleResponse<T>),
  POST: <T>(endpoint: string, formdata: object) =>
    fetch(`${API_URI}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata),
      credentials: 'include',
    }).then(handleResponse<T>),
  PATCH: <T>(endpoint: string, formdata: object) =>
    fetch(`${API_URI}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata),
      credentials: 'include',
    }).then(handleResponse<T>),
  DELETE: <T>(endpoint: string) =>
    fetch(`${API_URI}${endpoint}`, { method: 'DELETE', credentials: 'include' }).then(
      handleResponse<T>
    ),
};

export const confirmEmail = (email: string) => Fetcher.POST('/member/check/email', { email });

export const confirmNickname = (nickname: string) =>
  Fetcher.POST('/member/check/nickname', { nickname });

export const createAccount = ({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}) => Fetcher.POST<UserAuth>('/member/signup', { email, password, nickname });

export const login = ({ email, password }: { email: string; password: string }) =>
  Fetcher.POST('/auth/login', { email, password });

export const getAuthStatus = () => Fetcher.GET<UserAuth>('/auth/status');

export const getUser = () => Fetcher.GET<UserAuth>('/auth/status');

export const logout = () => Fetcher.POST('/auth/logout', {});
