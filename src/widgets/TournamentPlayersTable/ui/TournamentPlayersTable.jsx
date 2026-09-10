import { useNavigate, useParams } from 'react-router';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGetTournamentByIdQuery } from '@/entities/tournament';
import { useGetPlayersQuery } from '@/entities/player';

const columns = [
  { id: 'fullName', label: 'Full name', minWidth: 200 },
  {
    id: 'age',
    label: 'Age',
    minWidth: 100,
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'city', label: 'City', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 200 },
  {
    id: 'ukrRate',
    label: 'Ukrainian rate',
    minWidth: 150,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'worldRate',
    label: 'World rate',
    minWidth: 150,
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'club', label: 'Club', minWidth: 200 },
  { id: 'notes', label: 'Notes', minWidth: 200 },
];



function TournamentPlayersTable() {
  const navigate = useNavigate();
  const usersPath = "/players";
  const { id } = useParams()
  const { data: players = [], isLoadingPlayers, isError } = useGetPlayersQuery();
  const { data: tournament, isLoadingTournament, error } = useGetTournamentByIdQuery(id);
  
  if (isLoadingTournament || isLoadingPlayers) return 'Loading...';
  if (isError || error) return <div>Ошибка загрузки</div>;
 ;
  const playerIds = tournament?.players ?? [];
  const playerIdsSet = new Set(playerIds);
  const filteredPlayers = players.filter(({id}) => playerIdsSet.has(Number(id)));
 
  return (
    <Paper sx={{ m:'20px',width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPlayers
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: 'pointer', textDecoration: 'none' }}
                  onClick={() => navigate(`${usersPath}/${row.id}`)}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>  
    )
}

export default TournamentPlayersTable