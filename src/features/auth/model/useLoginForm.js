import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useLazyGetUserByEmailQuery } from '../../../entities/user/api/userApi';

function useLoginForm() {
  const { t } = useTranslation('auth');
  const [getUserByEmail] = useLazyGetUserByEmailQuery();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = ({ email, password }) => {
    const signInPromise = (async () => {
      const users = await getUserByEmail(email).unwrap();
      const [user] = users;
      if (!user) {
        throw new Error(t('notFoundEmail'));
      }

      if (user.password !== password) {
        throw new Error(t('invalidPass'));
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/');

      return user;
    })();

    return toast.promise(signInPromise, {
      loading: t('loading'),
      success: t('success'),
      error: (err) =>
        `${t('signInError')}: ${err.message || t('unknownError')}`,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((visible) => !visible);
  };
  return { t, showPassword, handleClickShowPassword, handleSignIn };
}

export default useLoginForm;
