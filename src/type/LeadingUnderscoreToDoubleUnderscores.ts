export type LeadingUnderscoreToDoubleUnderscores<T> = T extends `_${infer I}`
  ? `__${I}`
  : T;
