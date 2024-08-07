export type Team = {
  _id: string;
  teamName: string;
  formation: string;
  skillLevel: string;
  manner: string;
  ageGroup: string;
  field: string;
  address: string;
  matchStartTime: string;
  totalMatchTime: string;
  recruitingPositions: string[];
  recruitingNumber: string;
  recruitedMembers: MercenaryLists[];
  cost: string;
  minimumQuarter: string;
  comment: string;
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
  user_id: string;
  isAccepted: boolean;
};
