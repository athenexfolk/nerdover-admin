import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { Lesson } from '../../../../core/models/lesson';
import { LessonService } from '../../../../core/services/lesson.service';
import {
  ToastIcon,
  ToastService,
  ToastTypes,
} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-delete-lesson',
  standalone: true,
  imports: [OverlayComponent],
  templateUrl: './delete-lesson.component.html',
  styleUrl: './delete-lesson.component.scss',
})
export class DeleteLessonComponent {
  @Input({ required: true }) lesson!: Lesson;
  @Output() close = new EventEmitter();

  constructor(private ls: LessonService, private toastService: ToastService) {}

  closePanel() {
    this.close.emit();
  }

  delete() {
    this.ls.deleteLesson(this.lesson.parentKey, this.lesson.key).subscribe({
      next: () => {
        this.toastService.push({
          title: 'ลบบทเรียนสำเร็จ',
          type: ToastTypes.success,
          icon: ToastIcon.done,
        });
        this.closePanel();
      },
    });
  }
}
