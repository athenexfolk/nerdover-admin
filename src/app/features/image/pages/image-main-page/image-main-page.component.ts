import { Component, OnInit } from '@angular/core';
import { ImageRepositoryService } from '../../../../core/repositories/image.repository.service';
import { Image } from '../../../../core/models/image';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';

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

  constructor(private irs: ImageRepositoryService) {}

  ngOnInit(): void {
    this.irs.getAllImages().subscribe((images) => (this.images = images));
  }

  onFileInput(e: Event) {
    let el = e.target as HTMLInputElement;
    if (el.files && el.files.length && el.files[0]) {
      let file = el.files[0];
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

  copyPath() {
    if (!this.currentFocus) {
      return;
    }
    navigator.clipboard.writeText('/upload/' + this.currentFocus.path);
  }
}
