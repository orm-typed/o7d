import { Model } from "./Model";
import { WithKey } from "./WithKey";

export type SelectInput<T extends Model> =
  | {
      [K in
        | Extract<
            WithKey<T["primitiveFields"]>[keyof T["primitiveFields"]],
            { key: string; value?: { type: string; defaultSelected: false } }
          >["key"]
        | keyof T["relationFields"]]?: K extends keyof T["primitiveFields"]
        ? true
        : K extends keyof T["relationFields"]
        ?
            | true
            | (NonNullable<T["relationFields"][K]> extends Model
                ? SelectInput<NonNullable<T["relationFields"][K]>>
                : never)
            | (NonNullable<T["relationFields"][K]> extends Model[]
                ? SelectInput<NonNullable<T["relationFields"][K]>[number]>
                : never)
        : never;
    }
  | true;
