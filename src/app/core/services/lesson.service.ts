import { Injectable } from '@angular/core';
import { LessonRepositoryService } from '../repositories/lesson.repository.service';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Category, CreateCategory, UpdateCategory } from '../models/category';
import { CreateLesson, Lesson, UpdateLesson } from '../models/lesson';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private readonly _categories: BehaviorSubject<Category[]>;
  private readonly _lessons: BehaviorSubject<Lesson[]>;

  get categories$() {
    return this._categories.asObservable();
  }

  get lessons$() {
    return this._lessons.asObservable();
  }

  constructor(private lrs: LessonRepositoryService) {
    this._categories = new BehaviorSubject<Category[]>([]);
    this._lessons = new BehaviorSubject<Lesson[]>([]);
  }

  loadCategories() {
    this.lrs.getAllCategories().subscribe({
      next: (categories) => this._categories.next(categories),
    });
  }

  clearCategories() {
    this._categories.next([]);
  }

  loadLessons() {
    this.lrs.getAllLessons().subscribe({
      next: (lessons) => this._lessons.next(lessons),
    });
  }

  clearLessons() {
    this._lessons.next([]);
  }

  getAllLessonsIn(categoryId: string) {
    return this.lessons$.pipe(
      map((lessons) =>
        lessons.filter((lesson) => lesson.parentKey === categoryId)
      )
    );
  }

  getLesson(categoryId: string, lessonId: string) {
    return this.lrs.getLessonById(categoryId, lessonId);
  }

  createCategory(newCategory: CreateCategory) {
    return this.lrs.createCategory(newCategory).pipe(
      tap({
        next: (createdCategory) =>
          this._categories.next([...this._categories.value, createdCategory]),
      })
    );
  }

  updateCategory(categoryId: string, category: UpdateCategory) {
    return this.lrs.updateCategory(categoryId, category).pipe(
      tap((updatedCategory) => {
        const index = this._categories.value.findIndex(
          (category) => category.key === updatedCategory.key
        );

        if (index !== -1) {
          const updatedCategories = [...this._categories.value];
          updatedCategories[index] = updatedCategory;
          this._categories.next(updatedCategories);
        }
      })
    );
  }

  deleteCategory(categoryId: string) {
    return this.lrs.deleteCategory(categoryId).pipe(
      tap(() => {
        const updatedCategories = this._categories.value.filter(
          (category) => category.key !== categoryId
        );
        this._categories.next(updatedCategories);
      })
    );
  }

  createLesson(newLesson: CreateLesson) {
    return this.lrs.createLesson(newLesson).pipe(
      tap({
        next: (createdLesson) =>
          this._lessons.next([...this._lessons.value, createdLesson]),
      })
    );
  }

  updateLesson(categoryId: string, lessonId: string, lesson: UpdateLesson) {
    return this.lrs.updateLesson(categoryId, lessonId, lesson).pipe(
      tap((updatedLesson) => {
        const index = this._lessons.value.findIndex(
          (lesson) => lesson.key === updatedLesson.key
        );

        if (index !== -1) {
          const updatedLessons = [...this._lessons.value];
          updatedLessons[index] = updatedLesson;
          this._lessons.next(updatedLessons);
        }
      })
    );
  }

  updateContent(categoryId: string, lessonId: string, content: string) {
    return this.lrs.updateContent(categoryId, lessonId, content);
  }

  deleteLesson(categoryId: string, lessonId: string) {
    return this.lrs.deleteLesson(categoryId, lessonId).pipe(
      tap(() => {
        const updatedLessons = this._lessons.value.filter(
          (lesson) => lesson.key !== lessonId
        );
        this._lessons.next(updatedLessons);
      })
    );
  }
}
