export type ValidationType = {
    required: string;
    min?: {value: number, message: string};
    max?: {value: number, message: string};
}