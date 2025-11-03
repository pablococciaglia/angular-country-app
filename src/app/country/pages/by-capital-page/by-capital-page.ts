import { Component, inject } from '@angular/core';
import { SearchStructure } from '../../components/search-structure/search-structure';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'by-capital-page',
  imports: [SearchStructure],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  countryService = inject(CountryService);
  hasError = this.countryService.hasError;
  isLoading = this.countryService.isLoading;

  onSearch(query: string) {
    this.countryService.searchByCapital(query);
  }
}
