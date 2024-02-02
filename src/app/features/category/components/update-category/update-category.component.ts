import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonService } from '../../../../core/services/lesson.service';
import { Category } from '../../../../core/models/category';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, OverlayComponent, ReactiveFormsModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss',
})
export class UpdateCategoryComponent implements OnInit {
  @Input({ required: true }) category!: Category;
  @Output() close = new EventEmitter();

  coverFile?: File;
  coverFileSrc?: string;

  form = this.fb.group({
    categoryName: ['', Validators.required],
  });

  requiredNameInvalidText = 'โปรดระบุชื่อหมวดหมู่';

  constructor(private fb: FormBuilder, private ls: LessonService) {}

  ngOnInit(): void {
    this.categoryName.setValue(this.category.label);
    this.coverFileSrc = this.category.cover
      ? '/upload/' + this.category.cover
      : undefined;
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

  update() {
    if (
      !this.categoryName.value ||
      this.categoryName.value === this.category.label
    ) {
      return;
    }

    this.ls
      .updateCategory(this.category.key, {
        label: this.categoryName.value,
        cover: this.coverFile,
      })
      .subscribe({
        next: (category) => {
          this.closePanel();
        },
      });
  }
}
