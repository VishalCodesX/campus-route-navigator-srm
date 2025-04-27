
export interface Location {
  x: number;
  y: number;
  name: string;
}

export interface Route {
  path: string[];
  distance: number;
  time: number;
}
