import * as BSON from 'bson';
import React from 'react';
import { identity } from '../../../common/identity';
import { unzip } from '../../layout/unzip';
import { IInputRef } from '../../hooks/useInputRef';

export type DbPrimitive = BSON.ObjectId | BSON.UUID | string | number | boolean | Date | ArrayBuffer | null | undefined;

export type DbList<T extends DbPrimitive> = T[];

export type DbSet<T extends DbPrimitive> = T[] & {
    add(item: T): void;
    delete(item: T): void;
    has(item: T): boolean;
    clear(): void;
    forEach(func: (x: T) => void): void;
    size: number;    
}

export type DbDictionary<T extends DbPrimitive> = Record<string, T> & {
    put(partial: Record<string, T>): void;
    remove(properties: string[]): void;
}

export type DbEmbeddedObject<T extends DbDataType> = Record<string, T> 

export type DbObject<T extends DbDataType> = Realm.Object & Record<string, T> & { _id: BSON.ObjectId };

export type DbDataType = DbPrimitive | DbList<DbPrimitive> | DbSet<DbPrimitive> | DbDictionary<DbPrimitive> | DbEmbeddedObject<any> | DbObject<any>;

export type DbOutputType = string | readonly string[] | boolean | number;


