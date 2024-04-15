type Comparison<T1, T2> = [T1] extends [T2]
  ? [T2] extends [T1]
    ? "same"
    : "different"
  : "different";

export function TypeIs<T1, T2>(comparison: Comparison<T1, T2>): void {
  void comparison;
}
