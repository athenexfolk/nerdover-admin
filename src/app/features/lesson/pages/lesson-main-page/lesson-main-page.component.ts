import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../../../core/services/lesson.service';
import { Lesson } from '../../../../core/models/lesson';
import { Category } from '../../../../core/models/category';
import { map } from 'rxjs';
import { CreateLessonComponent } from '../../components/create-lesson/create-lesson.component';
import { UpdateLessonComponent } from '../../components/update-lesson/update-lesson.component';
import { DeleteLessonComponent } from '../../components/delete-lesson/delete-lesson.component';
import { LessonInfoComponent } from '../../components/lesson-info/lesson-info.component';

@Component({
  selector: 'app-lesson-main-page',
  standalone: true,
  imports: [
    CommonModule,
    CreateLessonComponent,
    UpdateLessonComponent,
    DeleteLessonComponent,
    LessonInfoComponent,
  ],
  templateUrl: './lesson-main-page.component.html',
  styleUrl: './lesson-main-page.component.scss',
})
export class LessonMainPageComponent implements OnInit {
  categories: Category[] = [];
  lessonsWithCategory: { lesson: Lesson; category?: Category }[] = [];

  isCreatePanelOpen = false;
  isUpdatePanelOpen = false;
  isDeletePanelOpen = false;
  isInfoPanelOpen = false;

  currentFocus?: Lesson;

  constructor(private ls: LessonService) {}

  ngOnInit(): void {
    this.ls.categories$.subscribe(
      (categories) => (this.categories = categories)
    );
    this.ls.lessons$
      .pipe(
        map((lessons) => {
          return lessons.map((lesson) => {
            const category = this.categories.find(
              (category) => category.key === lesson.parentKey
            );
            return { lesson, category };
          });
        })
      )
      .subscribe((lessons) => (this.lessonsWithCategory = lessons));
  }

  openCreatePanel() {
    this.isCreatePanelOpen = true;
    document.body.classList.add('overflow-hidden');
  }

  closeCreatePanel() {
    this.isCreatePanelOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  openUpdatePanel(lesson: Lesson) {
    this.isUpdatePanelOpen = true;
    this.currentFocus = lesson;
    document.body.classList.add('overflow-hidden');
  }

  closeUpdatePanel() {
    this.isUpdatePanelOpen = false;
    this.currentFocus = undefined;
    document.body.classList.remove('overflow-hidden');
  }

  openDeletePanel(lesson: Lesson) {
    this.isDeletePanelOpen = true;
    this.currentFocus = lesson;
    document.body.classList.add('overflow-hidden');
  }

  closeDeletePanel() {
    this.isDeletePanelOpen = false;
    this.currentFocus = undefined;
    document.body.classList.remove('overflow-hidden');
  }

  openInfoPanel(lesson: Lesson) {
    this.isInfoPanelOpen = true;
    this.currentFocus = lesson;
    document.body.classList.add('overflow-hidden');
  }

  closeInfoPanel() {
    this.isInfoPanelOpen = false;
    this.currentFocus = undefined;
    document.body.classList.remove('overflow-hidden');
  }
}
