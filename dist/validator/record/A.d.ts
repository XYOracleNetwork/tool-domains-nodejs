import { RecordValidator } from './base';
export declare class RecordValidatorA extends RecordValidator {
    constructor(name: string);
    validate(timeout: number): Promise<number>;
}
