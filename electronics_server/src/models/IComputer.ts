export interface IComputer {
  id?: number;
  name: string;
  description: string;
  manufactorer: string;
  price: number;
  processor: string;
  image_url: string;
}

export interface IOptionalComputer extends Partial<IComputer> {}

export interface ICreateComputer {
  data: IComputer;
}

export interface IUpdatedComputer {
  data: IOptionalComputer;
}

type Partial<T> = {
  [P in keyof T]?: T[P];
};
