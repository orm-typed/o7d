import { ExpandRecursively } from "./ExpandRecursively";
import { Model } from "./Model";
import { PrimitivePropertyBase } from "./PrimitivePropertyBase";
import { PrimitiveTypeMap } from "./PrimitiveType";
import { WithKey } from "./utils";

export type Primitive<T extends Model> = ExpandRecursively<{
  [K in Extract<
    WithKey<T["primitiveFields"]>[keyof T["primitiveFields"]],
    { key: string; value?: { defaultSelected: true } }
  >["key"]]-?: K extends keyof T["primitiveFields"]
    ? NonNullable<T["primitiveFields"][K]> extends PrimitivePropertyBase
      ?
          | PrimitiveTypeMap[NonNullable<T["primitiveFields"][K]>["type"]]
          | ({} extends Pick<T["primitiveFields"], K> ? null : never)
      : never
    : never;
}>;
