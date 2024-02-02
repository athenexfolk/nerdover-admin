import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../../../core/services/lesson.service';
import { Category } from '../../../../core/models/category';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from '../../components/create-category/create-category.component';
import { UpdateCategoryComponent } from '../../components/update-category/update-category.component';
import { DeleteCategoryComponent } from '../../components/delete-category/delete-category.component';
import { CategoryInfoComponent } from '../../components/category-info/category-info.component';

@Component({
  selector: 'app-category-main-page',
  standalone: true,
  imports: [
    CommonModule,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
    CategoryInfoComponent
  ],
  templateUrl: './category-main-page.component.html',
  styleUrl: './category-main-page.component.scss',
})
export class CategoryMainPageComponent implements OnInit {
  categories: Category[] = [];

  isCreatePanelOpen = false;
  isUpdatePanelOpen = false;
  isDeletePanelOpen = false;
  isInfoPanelOpen = false;

  currentFocus?: Category;

  constructor(private ls: LessonService) {}

  ngOnInit(): void {
    this.ls.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  openCreatePanel() {
    this.isCreatePanelOpen = true;
    document.body.classList.add('overflow-hidden');
  }

  closeCreatePanel() {
    this.isCreatePanelOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  openUpdatePanel(category: Category) {
    this.isUpdatePanelOpen = true;
    this.currentFocus = category;
    document.body.classList.add('overflow-hidden');
  }

  closeUpdatePanel() {
    this.isUpdatePanelOpen = false;
    this.currentFocus = undefined;
    document.body.classList.remove('overflow-hidden');
  }

  openDeletePanel(category: Category) {
    this.isDeletePanelOpen = true;
    this.currentFocus = category;
    document.body.classList.add('overflow-hidden');
  }

  closeDeletePanel() {
    this.isDeletePanelOpen = false;
    this.currentFocus = undefined;
    document.body.classList.remove('overflow-hidden');
  }

  openInfoPanel(category: Category) {
    this.isInfoPanelOpen = true;
    this.currentFocus = category;
    document.body.classList.add('overflow-hidden');
  }

  closeInfoPanel() {
    this.isInfoPanelOpen = false;
    this.currentFocus = undefined;
    document.body.classList.remove('overflow-hidden');
  }
}
