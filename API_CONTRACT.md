# Frontend API Contract

The frontend targets the Express API at `http://localhost:5000/api` by default.

IDs are opaque strings at the HTTP boundary. The backend may store integer IDs
in PostgreSQL, but it should serialize them consistently as strings. The client
must not parse IDs to resolve relationships.

## Read Responses

Player fields in a group or match may use this summary shape:

```json
{
  "id": "player-1",
  "fullName": "Ivan Petrenko"
}
```

`GET /groups?tournamentId={id}` returns groups with player objects:

```json
[
  {
    "id": "group-1",
    "tournamentId": "tournament-1",
    "name": "Group A",
    "capacity": 2,
    "players": [
      { "id": "player-1", "fullName": "Ivan Petrenko" },
      { "id": "player-2", "fullName": "Oleksandr Kovalenko" }
    ]
  }
]
```

`GET /tournaments/{id}` returns the tournament with `players` as full player
records. `currentParticipants` is calculated by the server.

`GET /matches?tournamentId={id}` and `GET /matches/{id}` return matches with
`player1` and `player2` as player objects or `null`. Match state includes
`score`, `currentSet`, `historySets`, `status`, `duration`, and `canUndo`.

`GET /playoffMatches?tournamentId={id}` returns playoff matches with expanded
`player1`, `player2`, and `winner` objects, plus a server-calculated `canEdit`
flag. The list is already scoped to the selected tournament.

## Group Commands

Manual creation sends player IDs; the response is the expanded group shape above:

```http
POST /groups
```

```json
{
  "tournamentId": "tournament-1",
  "name": "Group A",
  "capacity": 2,
  "playerIds": ["player-1", "player-2"]
}
```

Random creation is one backend operation; the client does not choose or shuffle
players:

```http
POST /groups/random
```

```json
{
  "tournamentId": "tournament-1",
  "name": "Group B",
  "capacity": 4
}
```

Both return the created group with expanded `players`.

`GET /groups/available-players?tournamentId={id}&groupId={optionalId}` returns
the player objects eligible for manual assignment. The server applies
assignment rules and includes the edited group's current players when needed.

`PATCH /groups/{id}` accepts optional `name`, `capacity`, and `playerIds` fields.
If `playerIds` is present, it replaces the assignment. The response is the
updated group with expanded `players`.

`DELETE /groups/{id}` returns `204 No Content`.

## Tournament Commands

`POST /tournaments` accepts tournament form fields and `playerIds`. It does not
accept `currentParticipants`; the server derives that value and returns a
tournament with full `players`.

## Match Commands

`POST /matches/{id}/start` starts a match. `POST /matches/{id}/finish` finishes
it and calculates duration. Both return the updated match with expanded
participants.

`POST /matches/{id}/points` records a point and applies set/game rules on the
server:

```json
{ "player": "player1" }
```

`POST /matches/{id}/undo` reverts the last valid match action. Point and undo
commands return the complete updated match state, including `canUndo`.

## Playoff Result Command

The client sends only the score. The server validates it, determines the
winner, advances that player, updates affected matches transactionally, and
returns the changed playoff matches with expanded player objects:

```http
POST /playoffMatches/{id}/result
```

```json
{
  "score": { "player1": 2, "player2": 1 }
}
```

The response contains the changed match records:

```json
{
  "matches": [
    {
      "id": "match-1",
      "player1": { "id": "player-1", "fullName": "Ivan Petrenko" },
      "player2": { "id": "player-2", "fullName": "Oleksandr Kovalenko" },
      "winner": { "id": "player-1", "fullName": "Ivan Petrenko" },
      "canEdit": false,
      "status": "Finished",
      "score": { "player1": 2, "player2": 1 }
    }
  ]
}
```

The frontend invalidates and refetches the tournament's playoff matches after
success.

## Errors

Validation and business-rule errors use a consistent JSON envelope:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [{ "path": "capacity", "message": "Capacity must be positive" }]
  }
}
```

The backend remains authoritative for participant eligibility, capacity,
assignment uniqueness, score rules, match status transitions, and playoff
progression.

## Implementation Status

The Express server currently implements group routes only. Other documented
workflows require their corresponding Express endpoints.
