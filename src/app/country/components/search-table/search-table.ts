import { Component, inject, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'search-table',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './search-table.html',
})
export class SearchTable {
  services = inject(CountryService);
  countries = this.services.countries;
}
