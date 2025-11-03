import { Component, inject } from '@angular/core';
import { SearchStructure } from '../../components/search-structure/search-structure';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'by-country',
  imports: [SearchStructure],
  templateUrl: './by-country-page.html',
})
export class ByCountry {
  countryService = inject(CountryService);
  onSearch(query: string) {
    this.countryService.searchByCountry(query);
  }
}
