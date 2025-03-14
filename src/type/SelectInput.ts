import { LeadingUnderscoreToDoubleUnderscores } from "./LeadingUnderscoreToDoubleUnderscores";
import { Model } from "./Model";
import { MaybeArray, UnwrapArray, WithKey } from "./utils";

type SelectInputInternal<T extends Model> =
  | {
      [K in
        | Extract<
            WithKey<T["primitiveFields"]>[keyof T["primitiveFields"]],
            { key: string; value?: { type: string; defaultSelected: false } }
          >["key"]
        | keyof T["relationFields"] as LeadingUnderscoreToDoubleUnderscores<K>]?: K extends keyof T["primitiveFields"]
        ? true
        : K extends keyof T["relationFields"]
        ?
            | true
            | (UnwrapArray<NonNullable<T["relationFields"][K]>> extends Model
                ? SelectInput<UnwrapArray<NonNullable<T["relationFields"][K]>>>
                : never)
        : never;
    }
  | true;

export type SelectInput<T extends Model> =
  | ({
      _?: never;
    } & SelectInputInternal<T>)
  | {
      _: SelectInputInternal<T>;
      orderBy?: OrderByInput<T>;
    };

export type OrderByInput<T extends Model> = MaybeArray<{
  [K in keyof T["primitiveFields"]]: "asc" | "desc";
}>;
