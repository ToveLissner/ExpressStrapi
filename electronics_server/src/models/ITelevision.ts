export interface ITelevision {
  id?: number;
  name: string;
  description: string;
  manufactorer: string;
  price: number;
  screen_size: number;
  image_url: string;
}

export interface IOptionalTelevision extends Partial<ITelevision> {}

export interface ICreateTelevision {
  data: ITelevision;
}

export interface IUpdatedTelevision {
  data: IOptionalTelevision;
}

type Partial<T> = {
  [P in keyof T]?: T[P];
};
