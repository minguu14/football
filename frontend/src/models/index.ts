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
  member: string;
  recruited_member: MercenaryLists[];
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
};

export type MercenaryLists = {
  _id: string;
  real_name: string;
  contact: string;
  positions: string[];
  player: string | null;
  mercenary_teamId: string;
  isAccepted: boolean;
};
