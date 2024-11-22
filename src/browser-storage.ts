import { UnderlyingType } from './utils';
import { StorageRecord, StorageRecordWithNullableValue } from './models';

export class BrowserStorage {
    public get<Value>(key: string, version?: number): StorageRecord<Value> | undefined {
        const json = localStorage.getItem(key);

        if (json === null) {
            return undefined;
        }

        const record: StorageRecord<Value> = JSON.parse(json);
        if (version === undefined) {
            return record;
        }

        if (record?.version !== version) {
            return undefined;
        }

        return record;
    }

    public getOrDefault<Value>(key: string, defaultValue: UnderlyingType<Value>, version?: number): StorageRecord<UnderlyingType<Value>>;
    public getOrDefault<Value>(key: string, defaultValue: null, version?: number): StorageRecordWithNullableValue<UnderlyingType<Value>>;
    public getOrDefault<Value>(key: string, defaultValue: UnderlyingType<Value> | null, version?: number): StorageRecord<UnderlyingType<Value>> | StorageRecordWithNullableValue<UnderlyingType<Value>>  {
        const record = this.get<UnderlyingType<Value>>(key, version);

        if (record === undefined) {
            return {
                value: defaultValue,
                version: undefined,
            };
        }

        return record;
    }

    public set<Value>(key: string, value: Value, version?: number): void {
        const record: StorageRecord<Value> = {
            value: value,
            version: version,
        };

        const json = JSON.stringify(record);

        localStorage.setItem(key, json);
    }

    public remove(key: string): void { 
        localStorage.removeItem(key);
    }
}
