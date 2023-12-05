import { useLogin, useLogout } from '@Hooks/index';
import { LoginData } from '@Types/index';

import * as API from '@API/index';

const useAuth = () => {
  const { mutate: mutateLogin } = useLogin();
  const { mutate: mutateLogout } = useLogout();

  const checkSession = async () => {
    try {
      await API.getAuthStatus();
      return true;
    } catch (error) {
      return false;
    }
  };

  const signIn = (
    loginData: LoginData,
    callbakcs?: { onError?: (error: Error) => void; onSuccess?: () => void }
  ) => {
    mutateLogin(loginData, {
      onError: (error) => {
        callbakcs?.onError && callbakcs?.onError(error);
      },
      onSuccess: () => callbakcs?.onSuccess && callbakcs?.onSuccess(),
    });
  };

  const signOut = (callbakcs?: { onError?: (error: Error) => void; onSuccess?: () => void }) => {
    mutateLogout(undefined, {
      onError: (error) => {
        callbakcs?.onError && callbakcs?.onError(error);
      },
      onSuccess: () => callbakcs?.onSuccess && callbakcs?.onSuccess(),
    });
  };

  return { signIn, signOut, checkSession };
};

export default useAuth;
