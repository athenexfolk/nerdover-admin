import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonMainPageComponent } from './pages/lesson-main-page/lesson-main-page.component';
import { EditContentPageComponent } from './pages/edit-content-page/edit-content-page.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';

const routes: Routes = [
  {
    path: '',
    component: LessonMainPageComponent,
  },
  {
    path: 'edit/:categoryId/:lessonId',
    component: EditContentPageComponent,
  },
  {
    path: 'view/:categoryId/:lessonId',
    component: ContentPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonRoutingModule {}
