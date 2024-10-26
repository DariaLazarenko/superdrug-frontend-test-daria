import { Component, Input } from '@angular/core';
import { CatalogueItem } from '../../models/catalogue-item.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogue-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogue-item.component.html',
  styleUrl: './catalogue-item.component.scss',
})
export class CatalogueItemComponent {
  @Input() item: CatalogueItem | undefined;
}
