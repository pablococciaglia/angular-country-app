import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { ErrorAndGoBack } from '../../../shared/components/error-and-go-back/error-and-go-back';
import { CountryInfo } from '../../components/country-info/country-info';

@Component({
  selector: 'country-page',
  imports: [ErrorAndGoBack, CountryInfo],
  templateUrl: './country-page.html',
})
export default class CountryPage {
  countryService = inject(CountryService);
  countryCode: string = inject(ActivatedRoute).snapshot.params['code'];

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => this.countryService.searchByAlphaCode(params.code),
  });
}
