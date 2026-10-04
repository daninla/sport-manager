import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { useCreateClubMutation } from '@/entities/club/api/clubApi';

function useFormAdd({ t }) {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState('');
  const [addClub] = useCreateClubMutation();

  const handlePhotoChange = (event, setFieldValue) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFieldValue('logo', file.name);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (values) => {
    const addPromise = (async () => {
      const newClub = await addClub({
        ...values,
      }).unwrap();
      navigate('/clubs');
      return newClub;
    })();
    return toast.promise(addPromise, {
      loading: t('addLoading'),
      success: t('addSuccess'),
      error: (err) => `${t('error')}: ${err?.data?.message || err?.message}`,
    });
  };
  return {fileInputRef, photoPreview, setPhotoPreview, handlePhotoChange, handleSubmit}
}

export default useFormAdd;
