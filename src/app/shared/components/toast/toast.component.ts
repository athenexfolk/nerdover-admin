import { Component, Input } from '@angular/core';
import { ToastData, ToastTypes } from '../../../core/services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  @Input({ required: true }) toastData!: ToastData;

  get toastType() {
    return ToastTypes;
  }
}
