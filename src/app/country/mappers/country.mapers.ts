import { CountryExtended } from '../interfaces/country-extended';
import { Country } from '../interfaces/country.interface';
import { CapitalResponse } from '../interfaces/restCapital.interface';
import { CountryResopnse } from '../interfaces/restCountry.interface';

export const mapCountryResponseToCountry = (res: CapitalResponse | CountryResopnse): Country => ({
  cca2: res.cca2,
  flag: res.flag,
  flagSVG: res.flags.svg,
  name: res.name.common,
  capital: res.capital?.join(', ') || 'N/A',
  population: res.population,
});

export const mapCountriesResponseToCountries = (
  res: (CapitalResponse | CountryResopnse)[]
): Country[] => res.map(mapCountryResponseToCountry);

export const mapCountryResponseToCountryExtended = (
  res: CapitalResponse | CountryResopnse
): CountryExtended => ({
  cca2: res.cca2,
  flag: res.flag,
  flagSVG: res.flags.svg,
  name: res.name.common,
  capital: res.capital?.join(', ') || 'N/A',
  population: res.population,
  languages: res.languages,
  timezones: res.timezones,
  region: res.region,
});

export const mapCountriesResponseToCountriesExtended = (
  res: (CapitalResponse | CountryResopnse)[]
): CountryExtended[] => res.map(mapCountryResponseToCountryExtended);
