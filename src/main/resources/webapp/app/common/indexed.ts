import {IMap} from './map';

/**
 * Container for an array, and a lookup of the array index by key
 */
export class Indexed<T> {
    private _array:T[] = []
    private _indices:IMap<number> = {};

    /**
     * Creates an index where the input is an array of entries
     * @param input the array input
     * @param factory function to create the entries of type T
     * @param keyValue function to get the key to index by
     */
    indexArray(input:any, factory:(entry:any)=>T, keyValue:(t:T)=>string) {
        let i = 0;
        for (let entry of input) {
            let value:T = factory(entry);
            let key:string = keyValue(value);
            this._array.push(value);
            this._indices[key] = i++;
        }
    }

    /**
     * Creates an index where the input is a map of entries
     * @param input the array input
     * @param factory function to create the entries of type T
     * @param keyValue function to get the key to index by
     */
    indexMap(input:any, factory:(key:string, entry:any)=>T) {
        let i = 0;
        for (let key in input) {
            let value:T = factory(key, input[key]);
            this._array.push(value);
            this._indices[key] = i++;
        }
    }

    forKey(key:string) : T {
        let index:number = this._indices[key];
        if (isNaN(index)) {
            return null;
        }
        return this._array[index];
    }

    forIndex(index:number) : T {
        return this._array[index];
    }

    get array():T[] {
        return this._array;
    }

    get indices():IMap<number> {
        return this._indices;
    }
}