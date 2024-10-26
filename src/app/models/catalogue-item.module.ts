export interface CatalogueItem {
  id: number;
  category: string;
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
