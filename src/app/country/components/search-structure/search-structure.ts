import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { SearchTable } from '../search-table/search-table';

@Component({
  selector: 'search-structure',
  imports: [SearchTable],
  templateUrl: './search-structure.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchStructure {
  placeHolder = input.required<string>();
  value = output<string>();
  importValue = signal<string>('');

  debounceEffect = effect((onCleanUp) => {
    const value = this.importValue();

    if (!value) {
      return;
    }
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 2000);

    onCleanUp(() => clearTimeout(timeout));
  });
}
