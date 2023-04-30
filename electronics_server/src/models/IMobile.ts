export interface IMobile {
  id?: number;
  name: string;
  description: string;
  manufactorer: string;
  price: number;
  screen_type: string;
  image_url: string;
}

export interface IOptionalMobile extends Partial<IMobile> {}

export interface ICreateMobile {
  data: IMobile;
}

export interface IUpdatedMobile {
  data: IOptionalMobile;
}

type Partial<T> = {
  [P in keyof T]?: T[P];
};
