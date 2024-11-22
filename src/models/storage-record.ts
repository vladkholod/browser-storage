import { WithVersion } from './with-version';

export type StorageRecord<T> = WithVersion & {
    value: T;
};
