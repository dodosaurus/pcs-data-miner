
export type CyclistRaceResult = {
  modifier: string;
  type: string;
  raceName: string;
  years: string;
}

export type Cyclist = {
  ranking: string;
  name: string;
  team: string;
  country?: string;
  birthdate?: string;
  height?: number;
  weight?: number;
  points: string;
  topRaceResults?: CyclistRaceResult[];
}

export type Race = {
  date: string;
  name: string;
  currentWinner: string;
  class: string;
}

export type Output = {
  timestamp: string;
  cyclists: Cyclist[];
  races: Race[];
}