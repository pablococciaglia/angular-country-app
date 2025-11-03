import { Region } from './restCountry.interface';

export interface CountryExtended {
  cca2: string;
  flag: string;
  flagSVG: string;
  name: string;
  capital: string;
  population: number;
  languages: { [key: string]: string };
  timezones: string[];
  region: Region;
}
