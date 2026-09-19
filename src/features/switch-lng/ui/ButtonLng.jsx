import { useTranslation } from 'react-i18next';

function ButtonLng({ onClick, isOpen }) {
  const { i18n } = useTranslation();

  return (
    <div
      onClick={onClick}
      style={{
        padding: '5px',
        border: 'white 1px solid',
        cursor: 'pointer',
        color: 'white',
      }}
    >
      {i18n.language} {isOpen ? '▼' : '▲'}
    </div>
  );
}

export default ButtonLng;
