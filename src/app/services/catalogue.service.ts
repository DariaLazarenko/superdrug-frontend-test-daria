import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogueItem } from '../models/catalogue-item.module';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getCatalogueItems(): Observable<CatalogueItem[]> {
    return this.http.get<CatalogueItem[]>(this.apiUrl);
  }
}
