import { Model } from "../../src/type/Model";
import { SelectInput } from "../../src/type/SelectInput";
import { SelectResult } from "../../src/type/SelectResult";

export function Fake<TModel extends Model>() {
  return function GetResult<TInput extends SelectInput<TModel>>(
    input: TInput
  ): SelectResult<TModel, TInput> {
    throw new Error("Not implemented");
  };
}
