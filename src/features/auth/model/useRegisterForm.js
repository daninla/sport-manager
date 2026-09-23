import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import {
  useCreateUserMutation,
  useLazyGetUserByEmailQuery,
} from '../../../entities/user/api/userApi';

function useRegisterForm() {
  const { t } = useTranslation('auth');
  const [createUser] = useCreateUserMutation();
  const [getUserByEmail] = useLazyGetUserByEmailQuery();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = ({ fullName, email, password }) => {
    const signUpPromise = (async () => {
      const users = await getUserByEmail(email).unwrap();
      if (users.length > 0) {
        throw new Error(t('busyEmail'));
      }

      const newUser = await createUser({
        fullName,
        photo: 'Unknown.png',
        age: 0,
        sex: '',
        email,
        password,
        city: '',
        status: '',
        ukrRate: 0,
        worldRate: 0,
        club: '',
        notes: '',
        role: 'player',
      }).unwrap();

      localStorage.setItem('currentUser', JSON.stringify(newUser));
      navigate('/account');

      return newUser;
    })();

    return toast.promise(signUpPromise, {
      loading: t('loading'),
      success: t('success'),
      error: (err) =>
        `${t('signUpError')}: ${err.message || t('unknownError')}`,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((visible) => !visible);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((visible) => !visible);
  };
  return {
    t,
    showPassword,
    handleClickShowPassword,
    showConfirmPassword,
    handleClickShowConfirmPassword,
    handleSignUp,
  };
}

export default useRegisterForm;
