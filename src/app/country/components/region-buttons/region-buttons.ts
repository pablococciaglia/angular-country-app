import { Component, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { Region } from '../../interfaces/restCountry.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { isValidRegion } from '../../helpers/isValidRegion';

@Component({
  selector: 'region-buttons',
  imports: [],
  templateUrl: './region-buttons.html',
})
export class RegionButtons implements OnInit {
  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);
  countryService = inject(CountryService);

  queryParamRegion = linkedSignal<Region | null>(
    () => this.activatedRoute.snapshot.queryParamMap.get('query') as Region | null
  );
  ngOnInit() {
    if (this.queryParamRegion() && isValidRegion(this.queryParamRegion()!)) {
      this.countryService.searchByRegion(this.queryParamRegion()!);
    }
  }
  public regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.SouthAmerica,
    Region.NorthAmerica,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
    Region.Antarctic,
  ];

  getSelectedRegion(region: Region) {
    this.router.navigate(['/country/by-region'], {
      queryParams: { query: region },
      queryParamsHandling: 'merge',
    });
    this.queryParamRegion.set(region);
    this.countryService.searchByRegion(region);
  }
}
