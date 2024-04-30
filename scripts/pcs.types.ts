
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
  country: string;
  date: string;
  name: string;
  lastWinner: string;
  class: string;
}

export type Output = {
  timestamp: string;
  cyclists: Cyclist[];
  races: Race[];
}