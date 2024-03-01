type SnakeCaseToCamelCase<T extends string> = T extends
  | `${infer F}_${infer R}`
  | `${infer F}-${infer R}`
  ? `${Lowercase<F>}${Capitalize<SnakeCaseToCamelCase<R>>}`
  : Uncapitalize<T>

/** Converts keys of a given type in snake case to camel case */
export type CamelCase<T extends Record<string, unknown>> = {
  [Property in keyof T as SnakeCaseToCamelCase<Property & string>]: T[Property]
}
