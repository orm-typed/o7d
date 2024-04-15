import { ExpandRecursively } from "./ExpandRecursively";
import { Model } from "./Model";
import { PrimitivePropertyBase } from "./PrimitivePropertyBase";
import { PrimitiveTypeMap } from "./PrimitiveType";

export type PrimitiveFull<T extends Model> = ExpandRecursively<{
  [K in keyof T["primitiveFields"]]-?: K extends keyof T["primitiveFields"]
    ? NonNullable<T["primitiveFields"][K]> extends PrimitivePropertyBase
      ?
          | PrimitiveTypeMap[NonNullable<T["primitiveFields"][K]>["type"]]
          | ({} extends Pick<T["primitiveFields"], K> ? null : never)
      : never
    : never;
}>;
