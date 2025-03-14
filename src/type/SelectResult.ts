import { LeadingDoubleUnderscoresToUnderscore } from "./LeadingDoubleUnderscoresToUnderscore";
import { Model } from "./Model";
import { Primitive } from "./Primitive";
import { PrimitivePropertyBase } from "./PrimitivePropertyBase";
import { PrimitiveTypeMap } from "./PrimitiveType";
import { SelectInput } from "./SelectInput";

type AttachPrototype<TModel, TResult> = "extraPrototype" extends keyof TModel
  ? TModel["extraPrototype"] & TResult
  : TResult;

type SelectInputInternal<T extends Model> = SelectInput<T> extends infer I
  ? I extends true | { _?: never }
    ? I
    : "_" extends keyof I
    ? I["_"]
    : never
  : never;

type SelectResultInternal<
  TModel extends Model,
  TInput extends SelectInputInternal<TModel>
> = TInput extends true
  ? Primitive<TModel>
  : Primitive<TModel> & {
      [K in LeadingDoubleUnderscoresToUnderscore<
        keyof TInput
      >]: K extends keyof TModel["primitiveFields"]
        ? NonNullable<
            TModel["primitiveFields"][K]
          > extends PrimitivePropertyBase
          ?
              | PrimitiveTypeMap[NonNullable<
                  TModel["primitiveFields"][K]
                >["type"]]
              | ({} extends Pick<TModel["primitiveFields"], K> ? null : never)
          : never
        : K extends keyof TModel["relationFields"]
        ? NonNullable<TModel["relationFields"][K]> extends Model
          ? LeadingDoubleUnderscoresToUnderscore<TInput>[K] extends SelectInput<
              NonNullable<TModel["relationFields"][K]>
            >
            ?
                | SelectResult<
                    NonNullable<TModel["relationFields"][K]>,
                    LeadingDoubleUnderscoresToUnderscore<TInput>[K]
                  >
                | ({} extends Pick<TModel["relationFields"], K> ? null : never)
            : never
          : TModel["relationFields"][K] extends Model[]
          ? LeadingDoubleUnderscoresToUnderscore<TInput>[K] extends SelectInput<
              TModel["relationFields"][K][number]
            >
            ?
                | SelectResult<
                    TModel["relationFields"][K][number],
                    LeadingDoubleUnderscoresToUnderscore<TInput>[K]
                  >[]
                | ({} extends Pick<TModel["relationFields"], K> ? null : never)
            : never
          : never
        : never;
    };

export type SelectResult<
  TModel extends Model,
  TInput extends SelectInput<TModel>
> = TInput extends infer I
  ? I extends true | (object & { _?: never })
    ? I extends SelectInputInternal<TModel>
      ? AttachPrototype<TModel, SelectResultInternal<TModel, I>>
      : never
    : "_" extends keyof I
    ? I["_"] extends SelectInputInternal<TModel>
      ? AttachPrototype<TModel, SelectResultInternal<TModel, I["_"]>>
      : never
    : never
  : never;
