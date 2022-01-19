# Test MPG

👋 Bienvenue sur mon test node.js pour MPG

## Get started

```bash
npm i && npm start
```

## 2. Endpoint de récupération des utilisateurs d'une ligue

Objectif: Pour un leagueId, récupérer les noms des utilisateurs présents dans la ligue

### Endpoint:

`GET localhost:3001/league/mpg_league_1/users`

### File:

`./src/league/league.routes.ts`

## 3. Endpoint de création de league

Objectif: Ajouter un document de type league à la base

### Endpoint:

`POST localhost:3001/league`

### File:

`./src/league/league.routes.ts`

## 4. Endpoint de modification de la team

Objectif: Pour un teamId, modifier le nom de la team

### Endpoint:

`PATCH localhost:3001/team/mpg_team_1_1`

### File:

`./src/team/team.routes.ts`
