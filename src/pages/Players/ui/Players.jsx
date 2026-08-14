import { useGetPlayersQuery } from '../../../entities/player';

function PlayersPage() {
  const { data: players, isLoading, isError } = useGetPlayersQuery();

  if (isLoading) return 'Loading...';
  if (isError) return <div>Ошибка загрузки</div>;

  return (
    <>
      {players.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </>
  );
}
export default PlayersPage;
