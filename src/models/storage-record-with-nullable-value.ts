import { WithVersion } from './with-version';

export type StorageRecordWithNullableValue<T> = WithVersion & {
    value: T | null;
};
