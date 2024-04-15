import { ExpandRecursively } from "../../src/type/ExpandRecursively";
import { Model } from "../../src/type/Model";
import { PrimitivePropertyBase } from "../../src/type/PrimitivePropertyBase";
import { PrimitiveTypeMap } from "../../src/type/PrimitiveType";

export type PrimitiveFull<T extends Model> = ExpandRecursively<{
  [K in keyof T["primitiveFields"]]-?: K extends keyof T["primitiveFields"]
    ? NonNullable<T["primitiveFields"][K]> extends PrimitivePropertyBase
      ?
          | PrimitiveTypeMap[NonNullable<T["primitiveFields"][K]>["type"]]
          | ({} extends Pick<T["primitiveFields"], K> ? null : never)
      : never
    : never;
}>;
