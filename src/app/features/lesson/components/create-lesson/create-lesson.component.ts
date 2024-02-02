import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonService } from '../../../../core/services/lesson.service';
import { Category } from '../../../../core/models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-lesson',
  standalone: true,
  imports: [CommonModule, OverlayComponent, ReactiveFormsModule],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.scss',
})
export class CreateLessonComponent {
  @Input() availableCategories: Category[] = [];
  @Output() close = new EventEmitter();

  coverFile?: File;
  coverFileSrc?: string;

  form = this.fb.group({
    lessonKey: ['', Validators.required],
    lessonName: ['', Validators.required],
    lessonParentKey: [null, Validators.required],
  });

  requiredKeyInvalidText = 'โปรดระบุคีย์บทเรียน';
  requiredNameInvalidText = 'โปรดระบุชื่อบทเรียน';

  constructor(
    private fb: FormBuilder,
    private ls: LessonService,
    private router: Router
  ) {}

  get lessonKey() {
    return this.form.get('lessonKey')!;
  }

  get lessonName() {
    return this.form.get('lessonName')!;
  }

  get lessonParentKey() {
    return this.form.get('lessonParentKey')!;
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
    if (
      !(
        this.lessonKey.value &&
        this.lessonName.value &&
        this.lessonParentKey.value
      )
    ) {
      return;
    }

    this.ls
      .createLesson({
        key: this.lessonKey.value,
        label: this.lessonName.value,
        parentKey: this.lessonParentKey.value!,
        cover: this.coverFile,
      })
      .subscribe({
        next: (lesson) => {
          this.router.navigate([
            '/lessons',
            'edit',
            lesson.parentKey,
            lesson.key,
          ]);
        },
      });
  }
}
