export type UnderlyingType<T> = T extends boolean
    ? boolean
    : T extends number
    ? number
    : T extends string
    ? string
    : T extends undefined
    ? never
    : T;
