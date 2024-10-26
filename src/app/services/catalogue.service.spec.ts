import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CatalogueService } from './catalogue.service';
import {
  CatalogueItem,
  CatalogueItemCategory,
} from '../models/catalogue-item.model';

describe('CatalogueService', () => {
  let service: CatalogueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatalogueService],
    });

    service = TestBed.inject(CatalogueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCatalogueItems', () => {
    it('should return an Observable<CatalogueItem[]>', () => {
      const mockItems: CatalogueItem[] = [
        {
          id: 1,
          title: 'Test Product',
          price: 99.99,
          description: 'Test Description',
          category: CatalogueItemCategory.All,
          image: 'test-image.jpg',
          rating: {
            rate: 4.5,
            count: 100,
          },
        },
      ];

      service.getCatalogueItems().subscribe((items) => {
        expect(items).toEqual(mockItems);
        expect(items.length).toBe(1);
        expect(items[0].id).toBe(1);
      });

      const req = httpMock.expectOne('https://fakestoreapi.com/products');
      expect(req.request.method).toBe('GET');
      req.flush(mockItems);
    });

    it('should handle errors', () => {
      const errorMessage = 'Mock 404 error';

      service.getCatalogueItems().subscribe({
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        },
      });

      const req = httpMock.expectOne('https://fakestoreapi.com/products');
      req.flush(errorMessage, {
        status: 404,
        statusText: 'Not Found',
      });
    });
  });
});
