import { Routes } from '@angular/router';
import { DashboardMainPageComponent } from './features/dashboard/pages/dashboard-main-page/dashboard-main-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardMainPageComponent,
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./features/category/category-routing.module').then(
        (m) => m.CategoryRoutingModule
      ),
  },
  {
    path: 'lessons',
    loadChildren: () =>
      import('./features/lesson/lesson-routing.module').then(
        (m) => m.LessonRoutingModule
      ),
  },
];
