import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogueComponent } from './catalogue.component';
import { CatalogueService } from '../../services/catalogue.service';
import { of } from 'rxjs';
import {
  CatalogueItem,
  CatalogueItemCategory,
} from '../../models/catalogue-item.model';

describe('CatalogueComponent', () => {
  let component: CatalogueComponent;
  let fixture: ComponentFixture<CatalogueComponent>;
  let catalogueService: jasmine.SpyObj<CatalogueService>;

  const mockCatalogueItems: CatalogueItem[] = [
    {
      id: 1,
      category: CatalogueItemCategory.MenClothing,
      title: 'Test Item 1',
      description: 'Description 1',
      image: 'image1.jpg',
      price: 29.99,
      rating: { rate: 4.5, count: 100 },
    },
    {
      id: 2,
      category: CatalogueItemCategory.Electronics,
      title: 'Test Item 2',
      description: 'Description 2',
      image: 'image2.jpg',
      price: 199.99,
      rating: { rate: 4.0, count: 50 },
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CatalogueService', ['getCatalogueItems']);
    spy.getCatalogueItems.and.returnValue(of(mockCatalogueItems));

    await TestBed.configureTestingModule({
      imports: [CatalogueComponent],
      providers: [{ provide: CatalogueService, useValue: spy }],
    }).compileComponents();

    catalogueService = TestBed.inject(
      CatalogueService
    ) as jasmine.SpyObj<CatalogueService>;
    fixture = TestBed.createComponent(CatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load catalogue items on init', (done) => {
    component.catalogueItems$.subscribe((items) => {
      expect(items).toEqual(mockCatalogueItems);
      expect(catalogueService.getCatalogueItems).toHaveBeenCalled();
      done();
    });
  });

  it('should set loading state while fetching data', (done) => {
    let loadingStates: boolean[] = [];
    component.loading$.subscribe((state) => {
      loadingStates.push(state);
      if (loadingStates.length === 3) {
        expect(loadingStates).toEqual([false, true, false]); // [initial emit, emit before data fetching, emit after data fetching]
        done();
      }
    });
    component.ngOnInit();
  });

  it('should filter items by category when filter changes', (done) => {
    component.onFilterChange(CatalogueItemCategory.MenClothing);

    component.filteredCatalogueItems$.subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].category).toBe(CatalogueItemCategory.MenClothing);
      done();
    });
  });

  it('should show all items when filter is set to All', (done) => {
    component.onFilterChange(CatalogueItemCategory.All);

    component.filteredCatalogueItems$.subscribe((items) => {
      expect(items.length).toBe(mockCatalogueItems.length);
      done();
    });
  });

  it('should handle empty data from service', (done) => {
    catalogueService.getCatalogueItems.and.returnValue(of([]));

    fixture = TestBed.createComponent(CatalogueComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
    component.catalogueItems$.subscribe((items) => {
      expect(items).toEqual([]);
      done();
    });
  });

  it('should return empty array when filtering by non-existent category', (done) => {
    component.onFilterChange(CatalogueItemCategory.Jewelery);

    component.filteredCatalogueItems$.subscribe((items) => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should properly combine latest filter with catalogue items', (done) => {
    component.onFilterChange(CatalogueItemCategory.MenClothing);

    const newItems: CatalogueItem[] = [
      {
        id: 3,
        category: CatalogueItemCategory.MenClothing,
        title: 'New Item',
        description: 'New Description',
        image: 'new-image.jpg',
        price: 39.99,
        rating: { rate: 4.2, count: 75 },
      },
    ];

    catalogueService.getCatalogueItems.and.returnValue(of(newItems));
    component.ngOnInit();

    component.filteredCatalogueItems$.subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].id).toBe(3);
      expect(items[0].category).toBe(CatalogueItemCategory.MenClothing);
      done();
    });
  });
});
