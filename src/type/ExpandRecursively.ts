import { PrimitiveType, PrimitiveTypeMap } from "./PrimitiveType";

export type ExpandRecursively<T> = T extends PrimitiveTypeMap[PrimitiveType]
  ? T
  : T extends (infer I)[]
  ? ExpandRecursively<I>[]
  : T extends infer I
  ? {
      [K in keyof I]: ExpandRecursively<I[K]>;
    }
  : never;
