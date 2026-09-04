import BaseButton from '@/shared/ui/BaseButton/BaseButton.jsx';

function EditPlayerBtn({ id }) {
  return <BaseButton text="Edit player" address={`/players/${id}/edit`} />;
}

export default EditPlayerBtn;
