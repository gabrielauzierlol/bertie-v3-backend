type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S

/** Converts keys of a given type in camel case to snake case */
export type SnakeCase<T> = {
  [K in keyof T as CamelToSnakeCase<string & K>]: T[K]
}
