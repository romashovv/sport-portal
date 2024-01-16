export type Game = {
  id: number;
  teamOne: number;
  teamTwo: number,
  matchScore?: string,
  date: string,
  goals?: number
}

export type Games = Game[];
