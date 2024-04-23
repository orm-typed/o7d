import { LeadingDoubleUnderscoresToUnderscore } from "./LeadingDoubleUnderscoresToUnderscore";
import { LeadingUnderscoreToDoubleUnderscores } from "./LeadingUnderscoreToDoubleUnderscores";
import { Model } from "./Model";
import { WithKey } from "./WithKey";

export type SelectInput<T extends Model> =
  | {
      [K in LeadingUnderscoreToDoubleUnderscores<
        | Extract<
            WithKey<T["primitiveFields"]>[keyof T["primitiveFields"]],
            { key: string; value?: { type: string; defaultSelected: false } }
          >["key"]
        | keyof T["relationFields"]
      >]?: LeadingDoubleUnderscoresToUnderscore<K> extends infer I
        ? I extends keyof T["primitiveFields"]
          ? true
          : I extends keyof T["relationFields"]
          ?
              | true
              | (NonNullable<T["relationFields"][I]> extends Model
                  ? SelectInput<NonNullable<T["relationFields"][I]>>
                  : never)
              | (NonNullable<T["relationFields"][I]> extends Model[]
                  ? SelectInput<NonNullable<T["relationFields"][I]>[number]>
                  : never)
          : never
        : never;
    }
  | true;
