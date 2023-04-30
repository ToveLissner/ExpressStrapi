export interface IAudio {
  id?: number;
  name: string;
  description: string;
  manufactorer: string;
  price: number;
  effect: number;
  image_url: string;
}

export interface IOptionalAudio extends Partial<IAudio> {}

export interface ICreateAudio {
  data: IAudio;
}

export interface IUpdatedAudio {
  data: IOptionalAudio;
}

type Partial<T> = {
  [P in keyof T]?: T[P];
};
