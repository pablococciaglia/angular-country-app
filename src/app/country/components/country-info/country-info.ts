import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CountryExtended } from '../../interfaces/country-extended';

@Component({
  selector: 'country-info',
  imports: [DecimalPipe],
  templateUrl: './country-info.html',
})
export class CountryInfo {
  country = input.required<CountryExtended>();
  languages = computed(() => {
    return Object.values(this.country().languages);
  });
  timezone = computed(() => this.country().timezones);
}
