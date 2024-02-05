import { Component, EventEmitter, Output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonService } from '../../../../core/services/lesson.service';
import {
  ToastTypes,
  ToastIcon,
  ToastService,
} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, OverlayComponent, ReactiveFormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
})
export class CreateCategoryComponent {
  @Output() close = new EventEmitter();

  coverFile?: File;
  coverFileSrc?: string;

  form = this.fb.group({
    categoryKey: ['', Validators.required],
    categoryName: ['', Validators.required],
  });

  requiredKeyInvalidText = 'โปรดระบุคีย์หมวดหมู่';
  requiredNameInvalidText = 'โปรดระบุชื่อหมวดหมู่';

  constructor(
    private fb: FormBuilder,
    private ls: LessonService,
    private toastService: ToastService
  ) {}

  get categoryKey() {
    return this.form.get('categoryKey')!;
  }

  get categoryName() {
    return this.form.get('categoryName')!;
  }

  onFileInput(e: Event) {
    let el = e.target as HTMLInputElement;
    if (el.files && el.files.length && el.files[0]) {
      let file = el.files[0];
      this.coverFile = file;
      this.coverFileSrc = URL.createObjectURL(file);
    }
  }

  clearCoverFile() {
    this.coverFile = undefined;
    this.coverFileSrc = undefined;
  }

  closePanel() {
    this.close.emit();
  }

  create() {
    if (!(this.categoryKey.value && this.categoryName.value)) {
      return;
    }

    this.ls
      .createCategory({
        key: this.categoryKey.value,
        label: this.categoryName.value,
        cover: this.coverFile,
      })
      .subscribe({
        next: (category) => {
          this.toastService.push({
            title: 'สร้างหมวดหมู่สำเร็จ',
            type: ToastTypes.success,
            icon: ToastIcon.done,
          });
          this.closePanel();
        },
      });
  }
}
