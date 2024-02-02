import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LessonService } from '../../../../core/services/lesson.service';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { Lesson } from '../../../../core/models/lesson';
import { Category } from '../../../../core/models/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-lesson',
  standalone: true,
  imports: [CommonModule, OverlayComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './update-lesson.component.html',
  styleUrl: './update-lesson.component.scss',
})
export class UpdateLessonComponent {
  @Input() availableCategories: Category[] = [];
  @Input({ required: true }) lesson!: Lesson;
  @Output() close = new EventEmitter();

  coverFile?: File;
  coverFileSrc?: string;

  form = this.fb.group({
    lessonName: ['', Validators.required],
    lessonParentKey: [null, Validators.required],
  });

  requiredNameInvalidText = 'โปรดระบุชื่อหมวดหมู่';

  constructor(private fb: FormBuilder, private ls: LessonService) {}

  ngOnInit(): void {
    this.lessonName.setValue(this.lesson.label);
    this.lessonParentKey.setValue(this.lesson.parentKey);
    this.coverFileSrc = this.lesson.cover
      ? '/upload/' + this.lesson.cover
      : undefined;
  }

  get lessonName() {
    return this.form.get('lessonName')!;
  }

  get lessonParentKey() {
    return this.form.get('lessonParentKey')! as FormControl<string | null>;
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
    if (!this.lessonName.value || this.lessonName.value === this.lesson.label) {
      return;
    }

    this.ls
      .updateLesson(this.lesson.parentKey, this.lesson.key, {
        label: this.lessonName.value,
        parentKey: this.lessonParentKey.value
          ? this.lessonParentKey.value
          : this.lesson.parentKey,
        cover: this.coverFile,
      })
      .subscribe({
        next: (lesson) => {
          this.closePanel();
        },
      });
  }
}
