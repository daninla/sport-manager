import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { useUpdateClubMutation } from '@/entities/club';
import { defaultValues } from '@/entities/club/model/defaultValues';
import {
  useGetUsersByClubQuery,
  useGetUserWithoutClubQuery,
  useUpdateUserMutation,
} from '@/entities/user';

function useFormEdit({ id, t, club }) {
  const fileInputRef = useRef(null);

  const [initialValues] = useState(() => ({ ...defaultValues, ...club }));

  const [photoPreview, setPhotoPreview] = useState('');

  const [searchTermPlayer, setSearchTermPlayer] = useState('');
  const [searchTermMember, setSearchTermMember] = useState('');

  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);

  const [updateUser] = useUpdateUserMutation();
  const [updateClub] = useUpdateClubMutation();

  {
    /* Players */
  }
  const {
    data: usersWithoutClub = [],
    isLoadingPlayers,
    errorPlayers,
  } = useGetUserWithoutClubQuery();

  const filteredPlayers = usersWithoutClub.filter((player) =>
    player.fullName
      ?.toLowerCase()
      .includes(searchTermPlayer.trim().toLowerCase()),
  );

  const handleTogglePlayer = (playerId) => {
    setSelectedPlayerIds((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId],
    );
  };

  {
    /* Members club */
  }
  const {
    data: clubMembers = [],
    isLoadingMembers,
    errorMembers,
  } = useGetUsersByClubQuery(club?.title, { skip: !club?.title });

  const filteredMembers = clubMembers.filter((member) =>
    member.fullName
      ?.toLowerCase()
      .includes(searchTermMember.trim().toLowerCase()),
  );

  const handleToggleMember = (memberId) => {
    setSelectedMemberIds((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId],
    );
  };

  const handlePhotoChange = (event, setFieldValue) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFieldValue('logo', file.name);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (values, { resetForm }) => {
    const selectedPlayers = usersWithoutClub.filter((player) =>
      selectedPlayerIds.includes(player.id),
    );

    const selectedMembers = clubMembers.filter((member) =>
      selectedMemberIds.includes(member.id),
    );

    const updatePromise = (async () => {
      if (selectedPlayers.length > 0) {
        await Promise.all(
          selectedPlayers.map((player) =>
            updateUser({ ...player, club: values.title }).unwrap(),
          ),
        );
      }

      if (selectedMembers.length > 0) {
        await Promise.all(
          selectedMembers.map((member) =>
            updateUser({ ...member, club: 'None' }).unwrap(),
          ),
        );
      }
      const updatedClub = await updateClub({
        id,
        ...values,
        amountMembers:
          Number(values.amountMembers || 0) +
          selectedPlayers.length -
          selectedMembers.length,
      }).unwrap();

      resetForm({ values: { ...defaultValues, ...updatedClub } });
      setSelectedPlayerIds([]);
      setSelectedMemberIds([]);

      return updatedClub;
    })();

    return toast.promise(updatePromise, {
      loading: t('editLoading'),
      success: t('editSuccess'),
      error: (err) =>
        `${t('editError')}: ${err?.data?.message || err?.message}`,
    });
  };

  return {
    fileInputRef,
    initialValues,
    photoPreview,
    searchTermPlayer,
    setSearchTermPlayer,
    searchTermMember,
    setSearchTermMember,
    selectedPlayerIds,
    selectedMemberIds,
    isLoadingPlayers,
    errorPlayers,
    filteredPlayers,
    isLoadingMembers,
    errorMembers,
    filteredMembers,
    handleTogglePlayer,
    handleToggleMember,
    handlePhotoChange,
    handleSubmit,
  };
}

export default useFormEdit;
