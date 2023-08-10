import { IChoice } from "./choice";

export interface IQuestion {
    question: string;
    choices: IChoice[];
}