export type Team = {
  _id: string;
  name: string;
  formation: string;
  skill: string;
  manner: string;
  age: string;
  place: string;
  address: string;
  kick_off: string;
  play_time: string;
  positions: string[];
  people: string;
  cost: string;
  quarter: string;
  announcement: string;
  owner: string;
  __v: number;
  updateAt: string;
};

export type User = {
    email: string;
    password: string;
    gender: string;
    name: string;
    birthday: string;
}