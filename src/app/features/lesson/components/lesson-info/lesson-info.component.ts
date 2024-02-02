import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../../../core/models/lesson';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson-info',
  standalone: true,
  imports: [CommonModule, OverlayComponent, RouterLink],
  templateUrl: './lesson-info.component.html',
  styleUrl: './lesson-info.component.scss'
})
export class LessonInfoComponent {
  @Input({ required: true }) lesson!: Lesson;
  @Output() close = new EventEmitter();

  closePanel() {
    this.close.emit();
  }
}
