export type Game = {
  id: number;
  teamOne: string;
  teamTwo: string,
  matchScore: string,
  date: string,
  goals?: number
}
export type Games = Game[];
