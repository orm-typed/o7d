import { PrimitivePropertyBase } from "./type/PrimitivePropertyBase";
import { PrimitiveTypeMap } from "./type/PrimitiveType";
import { WithKey } from "./type/utils";

type InferPrimitivePropertyBase<
  T extends Partial<Record<keyof T, PrimitivePropertyBase>>
> = {
  [K in Extract<
    WithKey<T>[keyof T],
    { key: string; value?: { defaultSelected: true } }
  >["key"]]-?:
    | PrimitiveTypeMap[NonNullable<T[K]>["type"]]
    | ({} extends Pick<T, K> ? null : never);
};

export function FakeBase<
  T extends Partial<Record<keyof T, PrimitivePropertyBase>>
>() {
  return class Base {} as new () => InferPrimitivePropertyBase<T>;
}
