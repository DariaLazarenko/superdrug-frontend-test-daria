export interface CatalogueItem {
  id: number;
  category: CatalogueItemCategory;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: CatalogueItemRating;
}

export interface CatalogueItemRating {
  rate: number;
  count: number;
}

export enum CatalogueItemCategory {
  All = 'all',
  MenClothing = "men's clothing",
  WomenClothing = "women's clothing",
  Jewelery = 'jewelery',
  Electronics = 'electronics',
}
