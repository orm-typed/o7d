export type UnwrapArray<T> = T extends (infer I)[] ? I : T;

export type WrapArray<Target, Original> = Original extends any[]
  ? Target[]
  : Target;

export type MaybeArray<T> = T | T[];

export type WrapNullable<Target, Original> =
  Original extends NonNullable<Original> ? Target : Target | null;

export type WithKey<T extends {}> = {
  [K in keyof T]: {
    key: K;
    value: T[K];
  };
};
