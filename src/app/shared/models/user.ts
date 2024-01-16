export type User = {
  id: number;
  login: string;
  password: string;
  lastName: string | undefined;
  firstName: string;
  middleName: string;
  team: number;
  playGames: number;
  goalScored: number;
  games: PlayGame[]
}

export type PlayGame = {
  id: number,
  gamesId: number,
  goals: number
}
