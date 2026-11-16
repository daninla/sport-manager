import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {defaultValues} from './defaultValues';

import { useUpdateUserMutation } from '../../../entities/user/api/userApi';

function useAccountForm() {
  const { t } = useTranslation('account');
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();

  const [initialValues, setInitialValues] = useState(defaultValues);
  const [photoPreview, setPhotoPreview] = useState('');

  useEffect(() => {
    const getUser = () => {
      const currentUser = localStorage.getItem('currentUser');

      if (!currentUser) {
        navigate('/', { replace: true });
        return;
      }

      const parsedUser = JSON.parse(currentUser);
      setInitialValues({
        ...defaultValues,
        ...parsedUser,
      });
    };

    getUser();
  }, [navigate]);

  const handleSubmit = (values, { resetForm }) => {
    const updatePromise = (async () => {
      const updatedUser = await updateUser(values).unwrap();
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      resetForm({ values: { ...defaultValues, ...updatedUser } });
      return updatedUser;
    })();

    return toast.promise(updatePromise, {
      loading: t('loading'),
      success: t('success'),
      error: (err) => `${t('error')}: ${err.message}`,
    });
  };

  const handlePhotoChange = (event, setFieldValue) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFieldValue('photo', file.name);
    setPhotoPreview(URL.createObjectURL(file));
  };

  {
    /* For server */
  }
  // const handleModalFile = (event) => {
  //   const file = event.target.files?.[0];

  //   if (!file) {
  //     return;
  //   }

  //   const fileReader = new FileReader();

  //   fileReader.onload = () => {
  //     setFieldValue('photo', fileReader.result);
  //   };

  //   fileReader.readAsDataURL(file);
  // };

  return { t, initialValues, photoPreview, handleSubmit, handlePhotoChange };
}

export default useAccountForm;
