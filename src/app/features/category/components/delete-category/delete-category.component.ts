import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { LessonService } from '../../../../core/services/lesson.service';
import { Category } from '../../../../core/models/category';
import {
  ToastIcon,
  ToastService,
  ToastTypes,
} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [OverlayComponent],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.scss',
})
export class DeleteCategoryComponent {
  @Input({ required: true }) category!: Category;
  @Output() close = new EventEmitter();

  constructor(private ls: LessonService, private toastService: ToastService) {}

  closePanel() {
    this.close.emit();
  }

  delete() {
    this.ls.deleteCategory(this.category.key).subscribe({
      next: (category) => {
        this.toastService.push({
          title: 'ลบหมวดหมู่สำเร็จ',
          type: ToastTypes.success,
          icon: ToastIcon.done,
        });
        this.closePanel();
      },
    });
  }
}
