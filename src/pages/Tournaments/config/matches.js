import tournamentsList from './tournamentsList';

const matchesList = [
    { player1: "Player 1", player2: "Player 2", score: "3-2" },
    { player1: "Player 3", player2: "Player 4", score: "1-0" },
    { player1: "Player 5", player2: "Player 6", score: "2-2" },
    { player1: "Player 7", player2: "Player 8", score: "0-3" },
    { player1: "Player 9", player2: "Player 10", score: "3-1" },
    { player1: "Player 11", player2: "Player 12", score: "2-0" },
    { player1: "Player 13", player2: "Player 14", score: "1-3" },
    { player1: "Player 15", player2: "Player 16", score: "3-0" },
    { player1: "Player 17", player2: "Player 18", score: "0-2" },
    { player1: "Player 19", player2: "Player 20", score: "2-1" }
]

const matches = new Map();
tournamentsList.forEach((tournament,index) => {
    matches.set(tournament, matchesList.slice(index , index + 2));
});

export default matches;
