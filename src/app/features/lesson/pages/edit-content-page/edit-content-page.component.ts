import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../../../core/services/lesson.service';
import { LessonContent } from '../../../../core/models/lesson';
import { map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import {
  ToastIcon,
  ToastService,
  ToastTypes,
} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-edit-content-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownComponent, OverlayComponent],
  templateUrl: './edit-content-page.component.html',
  styleUrl: './edit-content-page.component.scss',
})
export class EditContentPageComponent implements OnInit {
  content!: LessonContent;
  isConfirmPanelOpen = false;

  constructor(
    private route: ActivatedRoute,
    private ls: LessonService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => {
          const categoryId = params.get('categoryId');
          const lessonId = params.get('lessonId');

          if (!(categoryId && lessonId)) {
            throw new Error(`Invalid categoryId and lessonId`);
          }

          return [categoryId, lessonId];
        }),
        switchMap(([categoryId, lessonId]) =>
          this.ls.getLesson(categoryId, lessonId)
        )
      )
      .subscribe((content) => (this.content = content));
  }

  openPanel() {
    this.isConfirmPanelOpen = true;
  }

  closePanel() {
    this.isConfirmPanelOpen = false;
  }

  update() {
    this.ls
      .updateContent(
        this.content.parentKey,
        this.content.key,
        this.content.content
      )
      .subscribe({
        next: () => {
          this.toastService.push({
            title: 'อัปเดตเนื้อหาสำเร็จ',
            type: ToastTypes.success,
            icon: ToastIcon.done,
          });

          this.router.navigate(
            ['/lessons', 'view', this.content.parentKey, this.content.key],
            { replaceUrl: true }
          );
        },
      });
  }
}
