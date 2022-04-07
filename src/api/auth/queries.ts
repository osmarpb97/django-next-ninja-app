import { useQuery } from 'react-query';

import api from '@/api/api';

export const getCSRF = async () => {
  const res = await api.get(`/auth/csrf/`);
  return res.data;
};

const getMe = async () => {
  const res = await api.get(`/auth/me/`);
  return res.data;
};

export const isSessionValid = async () => {
  const res = await api.get(`/auth/session/`);
  return res.data;
};

export function useUser() {
  return useQuery('user', getMe);
}

export function useSession() {
  return useQuery('session', isSessionValid);
}
