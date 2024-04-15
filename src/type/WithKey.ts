export type WithKey<T extends {}> = {
  [K in keyof T]: {
    key: K;
    value: T[K];
  };
};
