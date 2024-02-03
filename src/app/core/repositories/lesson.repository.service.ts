import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CreateCategory, UpdateCategory } from '../models/category';
import {
  CreateLesson,
  Lesson,
  LessonContent,
  UpdateLesson,
} from '../models/lesson';

@Injectable({
  providedIn: 'root',
})
export class LessonRepositoryService {
  private readonly categoryEndpoint = '/api/lesson/categories';
  private readonly lessonEndpoint = '/api/lesson/lessons';

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<Category[]>(`${this.categoryEndpoint}`);
  }

  getCategoryById(categoryId: string) {
    return this.http.get<Category>(`${this.categoryEndpoint}/${categoryId}`);
  }

  getAllLessonsInCategory(categoryId: string) {
    return this.http.get<Lesson[]>(
      `${this.categoryEndpoint}/${categoryId}/lessons`
    );
  }

  getAllLessons() {
    return this.http.get<Lesson[]>(`${this.lessonEndpoint}`);
  }

  getLessonById(categoryId: string, lessonId: string) {
    return this.http.get<LessonContent>(
      `${this.lessonEndpoint}/${categoryId}/${lessonId}`
    );
  }

  createCategory({ key, label, cover }: CreateCategory) {
    let formData = new FormData();
    formData.append('key', key);
    formData.append('label', label);
    if (cover) {
      formData.append('cover', cover);
    }
    return this.http.post<Category>(`${this.categoryEndpoint}`, formData);
  }

  createLesson({ key, label, parentKey, cover }: CreateLesson) {  
    let formData = new FormData();
    formData.append('key', key);
    formData.append('label', label);
    formData.append('parentKey', parentKey);
    if (cover) {
      formData.append('cover', cover);
    }
    return this.http.post<Lesson>(`${this.lessonEndpoint}`, formData);
  }

  updateCategory(categoryId: string, { cover, label }: UpdateCategory) {
    let formData = new FormData();
    if (label) {
      formData.append('label', label);
    }
    if (cover) {
      formData.append('cover', cover);
    }
    return this.http.patch<Category>(
      `${this.categoryEndpoint}/${categoryId}`,
      formData
    );
  }

  updateLesson(
    categoryId: string,
    lessonId: string,
    { parentKey, cover, label }: UpdateLesson
  ) {
    let formData = new FormData();
    formData.append('parentKey', parentKey);
    if (label) {
      formData.append('label', label);
    }
    if (cover) {
      formData.append('cover', cover);
    }

    console.log(formData);
    
    return this.http.patch<Lesson>(
      `${this.lessonEndpoint}/${categoryId}/${lessonId}`,
      formData
    );
  }

  updateContent(categoryId: string, lessonId: string, updateContent: string) {
    return this.http.patch<LessonContent>(
      `${this.lessonEndpoint}/${categoryId}/${lessonId}`,
      { content: updateContent }
    );
  }

  deleteCategory(categoryId: string) {
    return this.http.delete(`${this.categoryEndpoint}/${categoryId}`);
  }

  deleteLesson(categoryId: string, lessonId: string) {
    return this.http.delete(`${this.lessonEndpoint}/${categoryId}/${lessonId}`);
  }
}
