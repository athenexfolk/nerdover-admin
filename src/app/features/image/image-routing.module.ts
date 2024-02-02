import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageMainPageComponent } from './pages/image-main-page/image-main-page.component';

const routes: Routes = [
  {
    path: '',
    component: ImageMainPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageRoutingModule {}
