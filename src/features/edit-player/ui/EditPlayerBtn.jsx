import { useTranslation } from 'react-i18next';

import BaseButton from '@/shared/ui/BaseButton/BaseButton.jsx';

function EditPlayerBtn({ id }) {
  const { t } = useTranslation('players');

  return <BaseButton text={t('editPlayer')} address={`/players/${id}/edit`} />;
}

export default EditPlayerBtn;
