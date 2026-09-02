import { BaseButton } from '@/shared/BaseButton';

function EditPlayerBtn({ id }) {
  return <BaseButton text="Edit player" address={`/players/${id}/edit`} />;
}

export default EditPlayerBtn;
