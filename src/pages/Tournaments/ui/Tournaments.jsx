import Typography from '@mui/material/Typography';
import { Box, LinearProgress } from '@mui/material';
import tournamentsList from '../config/tournamentsList';
import matches from '../config/matches';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import Button from '@mui/material/Button';
import tennisIcon from "../../../widgets/Header/iconAssets/icons/ping-pong.png"
import { useNavigate } from 'react-router';

function TournamentsPage() {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant='h3' sx={{
        mt: "10px",
        ml: "10px"
      }}>
        There are {tournamentsList.length} tournaments going on now
      </Typography>
      <Box sx={{
        mt: "30px",
        display: "flex",
        justifyContent: "center",
      }}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => navigate('/tournaments/add')} >Add new Tournament</Button>
      </Box>

      <Box sx={{
        display: {
          xs: "flex",
          md: "grid"
        },
        flexDirection: {
          xs: "column"
        },
        gridTemplateColumns: "300px 300px",
        gridTemplateRows: "400px 400px",
        gap: "100px",
        mt: "50px",
        justifyContent: "center",
        alignItems:"center"
      }}>
        {tournamentsList.map((tournament) => (
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            backgroundColor: "black",
            pt: "15px",
            px: "20px",
            width: {
              xs: "300px"
            },
            height: {
              xs: "400px"
            }
          }}>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60px",
              height: "25px",
              backgroundColor: "red",
              borderRadius: "5px"
            }}>
              <Box sx={{
                height: "8px",
                width: "8px",
                borderRadius: "50%",
                backgroundColor: "white"
              }}>
              </Box>
              <Box sx={{
                pl: "5px",
                color: "white"
              }}>
                LIVE
              </Box>
            </Box>

            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <Box
                component="img"
                src={tennisIcon}
                sx={{
                  width: "20px",
                  height: "20px"
                }}
              >
              </Box>
              <Box>
                <Typography type="h5" sx={{
                  color: "white"
                }}>
                  "{tournament.name}"
                </Typography>
              </Box>
            </Box>

            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}>
              <Typography type="h5" sx={{
                color: "white"
              }}>
                "{tournament.bracketFormat}"
              </Typography>
              <Box sx={{
                height: "4px",
                width: "4px",
                borderRadius: "50%",
                backgroundColor: "white"
              }}>
              </Box>
              <Typography type="h5" sx={{
                color: "white"
              }}>
                "{tournament.matchFormat}"
              </Typography>
            </Box>

            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              {matches.get(tournament).slice(-2).map((match, index) => (
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100px",
                  width: "90%",
                  border: "0.5px solid #4b4e52",
                  borderRadius: index === 0
                    ? "5px 5px 0px 0px"
                    : "0px 0px 5px 5px"
                }}>
                  <Box sx={{
                    margin: "5px",
                    alignSelf: "flex-start"
                  }}>
                    <Typography type="h5" sx={{
                      color: "white"
                    }}>
                      Match {index}
                    </Typography>
                  </Box>

                  <Box sx={{
                    display: "flex",
                    width: "70%",
                    height: "30px",
                    justifyContent: "space-between"
                  }}>
                    <Typography type="body1" sx={{
                      color: "white"
                    }}>
                      {match.player1}
                    </Typography>
                    <Typography type="body1" sx={{
                      color: "white"
                    }}>
                      vs
                    </Typography>
                    <Typography type="body1" sx={{
                      color: "white"
                    }}>
                      {match.player2}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography type="body1" sx={{
                      color: "white"
                    }}>
                      {match.score}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box>
              <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}>
                <PeopleIcon sx={{
                  color: "white"
                }}>
                </PeopleIcon>
                <Typography type="body1" sx={{
                  color: "white"
                }}>
                  {tournament.currentParticipants} / {tournament.maxParticipants}
                </Typography>
              </Box>

              <LinearProgress
                value={(tournament.currentParticipants / tournament.maxParticipants) * 100}
                variant='determinate'
                sx={{
                  backgroundColor: "#08214a",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#14b582"
                  }
                }}
              >
              </LinearProgress>
            </Box>

            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }} >
              <Button variant="contained" sx={{
                backgroundColor: "green",
                height: "20px"
              }}>
                More Details
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default TournamentsPage;
