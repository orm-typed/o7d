export type LeadingDoubleUnderscoresToUnderscore<T> = T extends `__${infer I}`
  ? `_${I}`
  : T;
