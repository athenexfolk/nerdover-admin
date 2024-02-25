import { Component, OnInit } from '@angular/core';
import { Image } from '../../../../core/models/image';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { ImageService } from '../../../../core/services/image.service';
import {
  ToastIcon,
  ToastService,
  ToastTypes,
} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-image-main-page',
  standalone: true,
  imports: [CommonModule, OverlayComponent],
  templateUrl: './image-main-page.component.html',
  styleUrl: './image-main-page.component.scss',
})
export class ImageMainPageComponent implements OnInit {
  images: Image[] = [];

  isImagePanelOpen = false;
  currentFocus?: Image;

  isDeletePanelOpen = false;

  constructor(private is: ImageService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.is.images$.subscribe((images) => (this.images = images));
  }

  onFileInput(e: Event) {
    let el = e.target as HTMLInputElement;
    if (el.files && el.files.length && el.files[0]) {
      let file = el.files[0];
      this.is.upload(file).subscribe({
        next: () => {
          this.toastService.push({
            title: 'อัปโหลดรูปสำเร็จ',
            type: ToastTypes.success,
            icon: ToastIcon.done,
          });
        },
      });
    }
  }

  openImagePanel(image: Image) {
    this.currentFocus = image;
    this.isImagePanelOpen = true;
  }

  closeImagePanel() {
    this.currentFocus = undefined;
    this.isImagePanelOpen = false;
  }

  openDeletePanel(image: Image) {
    this.currentFocus = image;
    this.isDeletePanelOpen = true;
  }

  closeDeletePanel() {
    if (!this.isImagePanelOpen) {
      this.currentFocus = undefined;
    }
    this.isDeletePanelOpen = false;
  }

  copyPath() {
    if (!this.currentFocus) {
      return;
    }
    navigator.clipboard.writeText('/upload/' + this.currentFocus.path);
  }

  deleteImage() {
    if (!this.currentFocus) {
      return;
    }

    this.is.delete(this.currentFocus.path).subscribe({
      next: () => {
        this.closeImagePanel();
        this.toastService.push({
          title: 'ลบรูปสำเร็จ',
          type: ToastTypes.success,
          icon: ToastIcon.done,
        });
      },
    });
  }
}
