import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../../services/catalogue.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, finalize, map } from 'rxjs';
import {
  CatalogueItem,
  CatalogueItemCategory,
} from '../../models/catalogue-item.model';
import { CatalogueItemComponent } from '../catalogue-item/catalogue-item.component';
import { CatalogueFilterComponent } from '../catalogue-filter/catalogue-filter.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, CatalogueItemComponent, CatalogueFilterComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss',
})
export class CatalogueComponent implements OnInit {
  private _catalogueItems$ = new BehaviorSubject<CatalogueItem[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(false);
  private categoryFilter$ = new BehaviorSubject<CatalogueItemCategory>(
    CatalogueItemCategory.All
  );

  public catalogueItems$ = this._catalogueItems$.asObservable();
  public loading$ = this._loading$.asObservable();

  public filteredCatalogueItems$ = combineLatest([
    this._catalogueItems$,
    this.categoryFilter$,
  ]).pipe(
    map(([catalogueItems, filterOption]) =>
      this.filterCatalogueItems(catalogueItems, filterOption)
    )
  );

  constructor(private catalogueService: CatalogueService) {}

  public ngOnInit(): void {
    this.getCataloguesItems();
  }

  public onFilterChange(filterOption: CatalogueItemCategory) {
    this.categoryFilter$.next(filterOption);
  }

  private getCataloguesItems() {
    this._loading$.next(true);
    this.catalogueService
      .getCatalogueItems()
      .pipe(finalize(() => this._loading$.next(false)))
      .subscribe({
        next: (data) => {
          if (!data?.length) return;
          this._catalogueItems$.next(data);
        },
        error: (error) => {
          console.error('Failed to load catalogue items:', error);
        },
      });
  }

  private filterCatalogueItems(
    catalogueItems: CatalogueItem[],
    filterOption: CatalogueItemCategory
  ): CatalogueItem[] {
    if (filterOption === CatalogueItemCategory.All) {
      return catalogueItems;
    }

    return catalogueItems.filter((item) => item.category === filterOption);
  }
}
