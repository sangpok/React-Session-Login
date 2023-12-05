import { useMutation, useQuery } from '@tanstack/react-query';

import * as API from '@API/index';

export const useConfirmEmail = () => {
  return useMutation({
    mutationKey: ['checkEmail'],
    mutationFn: API.confirmEmail,
  });
};

export const useConfirmNickname = () => {
  return useMutation({
    mutationKey: ['confirmNickname'],
    mutationFn: API.confirmNickname,
  });
};

export const useCreateAccount = () => {
  return useMutation({
    mutationKey: ['createAccount'],
    mutationFn: API.createAccount,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: API.login,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: API.logout,
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: API.getUser,
  });
};

export const useGetAuthStatus = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: API.getAuthStatus,
    enabled: false,
  });
};
