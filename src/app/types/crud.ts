export type Rocket = {
  id: string;
  name: string;
  material: string;
  sensors: string[];
};

export type Sensor = {
  id: string;
  function: string;
  name: string;
  value: string;
};

export type Launch = {
  id: string;
  name: string;
  waterVolume: string;
  distance: string;
  weight: string;
  speed: string;
  pressure: string;
  angle: string;
  height: string;
  instantAcceleration: string;
  rocketId: string;
}