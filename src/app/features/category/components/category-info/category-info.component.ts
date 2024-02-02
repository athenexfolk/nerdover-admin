import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { Category } from '../../../../core/models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-info',
  standalone: true,
  imports: [CommonModule, OverlayComponent],
  templateUrl: './category-info.component.html',
  styleUrl: './category-info.component.scss',
})
export class CategoryInfoComponent {
  @Input({ required: true }) category!: Category;
  @Output() close = new EventEmitter();

  closePanel() {
    this.close.emit();
  }
}
