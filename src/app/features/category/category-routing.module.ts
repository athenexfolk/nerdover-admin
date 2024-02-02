import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryMainPageComponent } from './pages/category-main-page/category-main-page.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryMainPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
