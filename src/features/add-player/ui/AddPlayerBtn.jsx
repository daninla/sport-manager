import { useTranslation } from 'react-i18next';

import BaseButton from '@/shared/ui/BaseButton/BaseButton.jsx';

function AddPlayerBtn() {
  const { t } = useTranslation('players');

  return <BaseButton text={t('addPlayer')} address="/players/add" />;
}

export default AddPlayerBtn;
