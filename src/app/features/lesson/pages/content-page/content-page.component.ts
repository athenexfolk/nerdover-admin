import { Component } from '@angular/core';
import { LessonContent } from '../../../../core/models/lesson';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../../core/services/lesson.service';
import { map, switchMap } from 'rxjs';
import { MarkdownComponent } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
})
export class ContentPageComponent {
  content!: LessonContent;

  constructor(private route: ActivatedRoute, private ls: LessonService) {}

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
}
