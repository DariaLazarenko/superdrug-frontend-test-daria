import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogueItemComponent } from './catalogue-item.component';
import {
  CatalogueItem,
  CatalogueItemCategory,
} from '../../models/catalogue-item.model';

describe('CatalogueItemComponent', () => {
  let component: CatalogueItemComponent;
  let fixture: ComponentFixture<CatalogueItemComponent>;

  const mockItem: CatalogueItem = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Item not found" when no item is provided', () => {
    component.item = undefined;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.textContent).toContain('Item not found');
  });

  it('should display item details when item is provided', () => {
    component.item = mockItem;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.querySelector('.title').textContent).toContain(
      'Test Product'
    );
    expect(element.querySelector('.category').textContent).toContain('all');
    expect(element.querySelector('.price').textContent).toContain('£99.99');
    expect(element.querySelector('.rating-rate').textContent).toContain(
      '4.5/5'
    );
    expect(element.querySelector('.rating-count').textContent).toContain(
      '(100 reviews)'
    );
  });

  it('should display image when item has image URL', () => {
    component.item = mockItem;
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('img');
    expect(image).toBeTruthy();
    expect(image.src).toContain('test-image.jpg');
    expect(image.alt).toBe('Test Product');
  });

  it('should display "No image" when item has no image', () => {
    component.item = { ...mockItem, image: '' };
    fixture.detectChanges();

    const noImageDiv = fixture.nativeElement.querySelector('.no-image');
    expect(noImageDiv).toBeTruthy();
    expect(noImageDiv.textContent).toContain('No image');
  });

  it('should format price with two decimal places', () => {
    component.item = { ...mockItem, price: 99.9 };
    fixture.detectChanges();

    const price = fixture.nativeElement.querySelector('.price');
    expect(price.textContent).toContain('£99.90');
  });

  it('should have an "Add to Basket" button', () => {
    component.item = mockItem;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Add to Basket');
  });
});
