import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogueFilterComponent } from './catalogue-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogueItemCategory } from '../../models/catalogue-item.module';
import { By } from '@angular/platform-browser';

describe('CatalogueFilterComponent', () => {
  let component: CatalogueFilterComponent;
  let fixture: ComponentFixture<CatalogueFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueFilterComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogueFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default category value', () => {
    expect(component.filterForm.get('category')?.value).toBe(
      CatalogueItemCategory.All
    );
  });

  it('should create category options with correct format', () => {
    expect(component.categoryOptions.length).toBe(
      Object.keys(CatalogueItemCategory).length
    );

    const firstOption = component.categoryOptions[0];
    expect(firstOption).toBeDefined();
    expect(firstOption.value).toBeDefined();
    expect(firstOption.label).toBeDefined();
  });

  it('should format category labels correctly', () => {
    const formatMethod = (component as any).formatCategoryLabel;

    expect(formatMethod('test category')).toBe('Test Category');
  });

  it('should emit filterChange event when category changes', () => {
    spyOn(component.filterChange, 'emit');

    const newCategory = CatalogueItemCategory.All;
    component.filterForm.get('category')?.setValue(newCategory);

    expect(component.filterChange.emit).toHaveBeenCalledWith(newCategory);
  });

  it('should render select element with all options', () => {
    const select = fixture.debugElement.query(By.css('select'));
    const options = fixture.debugElement.queryAll(By.css('option'));

    expect(select).toBeTruthy();
    expect(options.length).toBe(component.categoryOptions.length);
  });

  it('should update form control when select value changes', () => {
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    const newValue = Object.values(CatalogueItemCategory)[1];

    select.value = newValue;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.filterForm.get('category')?.value).toBe(newValue);
  });

  it('should have correct initial form structure', () => {
    expect(component.filterForm.contains('category')).toBeTruthy();
    expect(component.filterForm.get('category')?.valid).toBeTruthy();
  });
});
