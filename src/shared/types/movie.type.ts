import { MovieFormatsEnum } from '../constants';

export interface IMovie{
    title: string;
    year: number;
    format: MovieFormatsEnum;
    actors: string[];
}
