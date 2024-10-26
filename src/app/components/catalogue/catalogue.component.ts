import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../../services/catalogue.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, finalize } from 'rxjs';
import { CatalogueItem } from '../../models/catalogue-item.module';
import { CatalogueItemComponent } from '../catalogue-item/catalogue-item.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, CatalogueItemComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss',
})
export class CatalogueComponent implements OnInit {
  private _catalogueItems$ = new BehaviorSubject<CatalogueItem[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(false);

  public catalogueItems$ = this._catalogueItems$.asObservable();
  public loading$ = this._loading$.asObservable();

  constructor(private catalogueService: CatalogueService) {}

  ngOnInit(): void {
    this.getCataloguesItems();
  }

  private getCataloguesItems() {
    this._loading$.next(true);
    this.catalogueService
      .getCatalogueItems()
      .pipe(finalize(() => this._loading$.next(false)))
      .subscribe((data) => {
        console.log('_catalogueItems', data);
        this._catalogueItems$.next(data);
      });
  }
}
