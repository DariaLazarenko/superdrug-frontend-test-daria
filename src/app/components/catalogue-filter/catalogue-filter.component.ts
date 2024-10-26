import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CatalogueItemCategory } from '../../models/catalogue-item.model';
import { CommonModule } from '@angular/common';

interface CategoryOption {
  value: CatalogueItemCategory;
  label: string;
}

@Component({
  selector: 'app-catalogue-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './catalogue-filter.component.html',
  styleUrl: './catalogue-filter.component.scss',
})
export class CatalogueFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<CatalogueItemCategory>();

  filterForm: FormGroup;
  categoryOptions: CategoryOption[];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      category: [CatalogueItemCategory.All],
    });

    this.categoryOptions = Object.values(CatalogueItemCategory).map(
      (category) => ({
        value: category,
        label: this.formatCategoryLabel(category),
      })
    );
  }

  public ngOnInit() {
    this.filterForm.get('category')?.valueChanges.subscribe((value) => {
      this.filterChange.emit(value);
    });
  }

  private formatCategoryLabel(category: string): string {
    return category
      .split(/(?=[A-Z])|_|\s/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
