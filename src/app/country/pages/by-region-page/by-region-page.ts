import { Component } from '@angular/core';
import { SearchTable } from '../../components/search-table/search-table';
import { RegionButtons } from '../../components/region-buttons/region-buttons';

@Component({
  selector: 'by-region',
  imports: [SearchTable, RegionButtons],
  templateUrl: './by-region-page.html',
})
export class ByRegion {}
