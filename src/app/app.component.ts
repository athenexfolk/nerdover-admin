import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './layouts/navigation-bar/navigation-bar.component';
import { LessonService } from './core/services/lesson.service';
import { ImageService } from './core/services/image.service';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavigationBarComponent,
    ToastContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'nerdover-admin';

  constructor(private ls: LessonService, private is: ImageService) {}

  ngOnInit(): void {
    this.ls.loadCategories();
    this.ls.loadLessons();
    this.is.loadImages();
  }
}
