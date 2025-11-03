import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CountryResopnse, Region } from '../interfaces/restCountry.interface';
import { CapitalResponse } from '../interfaces/restCapital.interface';
import { Country } from '../interfaces/country.interface';
import { catchError, map, tap, throwError } from 'rxjs';
import {
  mapCountriesResponseToCountries,
  mapCountriesResponseToCountriesExtended,
} from '../mappers/country.mapers';

const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  isLoading = signal(false);
  hasError = signal<string | null>(null);
  countries = signal<Country[]>([]);
  country = signal<Country>(null!);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string) {
    if (this.queryCacheCapital.has(query)) {
      this.countries.set(this.queryCacheCapital.get(query)!);
      return;
    }
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.hasError.set(null);
    const toLowerCaseQuery = query.toLocaleLowerCase();
    this.http
      .get<CapitalResponse[]>(`${API_URL}/capital/${toLowerCaseQuery}`)
      .pipe(
        map(mapCountriesResponseToCountries),
        tap((countries) => {
          this.queryCacheCapital.set(query, countries);
        }),
        catchError((err) => {
          console.log('error: ', err);
          return throwError(() => new Error(`No results found with this text ${query}`));
        })
      )
      .subscribe({
        next: (countries) => {
          this.countries.set(countries);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.hasError.set(err);
          this.countries.set([]);
          this.isLoading.set(false);
        },
      });
  }

  searchByCountry(query: string) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.hasError.set(null);
    const toLowerCaseQuery = query.toLocaleLowerCase();
    this.http
      .get<CountryResopnse[]>(`${API_URL}/name/${toLowerCaseQuery}`)
      .pipe(
        map(mapCountriesResponseToCountries),
        catchError((err) => {
          console.log('error: ', err);
          return throwError(() => new Error(`No results found with this text ${query}`));
        })
      )
      .subscribe({
        next: (countries) => {
          this.countries.set(countries);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.hasError.set(err);
          this.countries.set([]);
          this.isLoading.set(false);
        },
      });
  }

  searchByAlphaCode(code: string) {
    return this.http.get<CountryResopnse[]>(`${API_URL}/alpha/${code}`).pipe(
      map(mapCountriesResponseToCountriesExtended),
      map((countries) => countries.at(0)),
      catchError((err) => {
        console.log('error: ', err);
        return throwError(() => new Error(`No results found with this text ${code}`));
      })
    );
  }

  searchByRegion(query: Region) {
    if (this.queryCacheRegion.has(query)) {
      this.countries.set(this.queryCacheRegion.get(query)!);
      return;
    }
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.hasError.set(null);
    const toLowerCaseQuery = query.toLocaleLowerCase();
    this.http
      .get<CapitalResponse[]>(`${API_URL}/region/${toLowerCaseQuery}`)
      .pipe(
        map(mapCountriesResponseToCountries),
        tap((countries) => {
          this.queryCacheRegion.set(query, countries);
        }),
        catchError((err) => {
          console.log('error: ', err);
          return throwError(() => new Error(`No results found with this text ${query}`));
        })
      )
      .subscribe({
        next: (countries) => {
          this.countries.set(countries);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.hasError.set(err);
          this.countries.set([]);
          this.isLoading.set(false);
        },
      });
  }
}
