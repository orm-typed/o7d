import { Model } from "./Model";
import { PrimitivePropertyBase } from "./PrimitivePropertyBase";

export type ModelDefinition<T extends Model> = {
  realName?: string;
  primitiveFields: {
    [K in Extract<keyof T["primitiveFields"], string>]-?: {
      type: NonNullable<T["primitiveFields"][K]> extends PrimitivePropertyBase
        ? NonNullable<T["primitiveFields"][K]>["type"]
        : Record<`Error: incorrect primitive field: ${K}`, never>;
      realName?: string;
    } & (NonNullable<T["primitiveFields"][K]> extends PrimitivePropertyBase
      ? NonNullable<T["primitiveFields"][K]>["defaultSelected"] extends true
        ? { defaultSelected: true }
        : { defaultSelected?: false }
      : Record<`Error: incorrect primitive field: ${K}`, never>) &
      ({} extends Pick<T["primitiveFields"], K>
        ? { nullable: true }
        : { nullable?: false });
  };
} & ([keyof T["relationFields"]] extends [never]
  ? { relationFields?: {} }
  : {
      relationFields: {
        [K in Extract<
          keyof T["relationFields"],
          string
        >]-?: T["relationFields"][K] extends Model
          ? {
              type:
                | "1:1 - this reference"
                | "n:1 - this reference"
                | "1:1 - other references";
              model: ModelDefinition<T["relationFields"][K]>;
              thisFields: (keyof T["primitiveFields"])[];
              othersFields: (keyof T["relationFields"][K]["primitiveFields"])[];
            }
          : NonNullable<T["relationFields"][K]> extends Model
          ? {
              type: "1:1 - this reference";
              model: ModelDefinition<NonNullable<T["relationFields"][K]>>;
              thisFields: (keyof T["primitiveFields"])[];
              othersFields: (keyof NonNullable<
                T["relationFields"][K]
              >["primitiveFields"])[];
            }
          : T["relationFields"][K] extends Model[]
          ? {
              type: "1:n - other references";
              model: ModelDefinition<T["relationFields"][K][number]>;
              thisFields: (keyof T["primitiveFields"])[];
              othersFields: (keyof T["relationFields"][K][number]["primitiveFields"])[];
            }
          : Record<`Error: incorrect relation field: ${K}`, never>;
      };
    }) &
  ("extraPrototype" extends keyof T
    ? { prototype: new () => T["extraPrototype"] }
    : { prototype?: never });
