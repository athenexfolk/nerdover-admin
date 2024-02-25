import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Image } from '../models/image';
import { ImageRepositoryService } from '../repositories/image.repository.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly _images: BehaviorSubject<Image[]>;

  get images$() {
    return this._images.asObservable();
  }

  constructor(private irs: ImageRepositoryService) {
    this._images = new BehaviorSubject<Image[]>([]);
  }

  loadImages() {
    this.irs.getAllImages().subscribe({
      next: (images) => this._images.next(images),
    });
  }

  upload(file: File) {
    return this.irs.uploadImage(file).pipe(
      tap((image) => {
        this._images.next([image, ...this._images.value]);
      })
    );
  }

  delete(path: string) {
    return this.irs.deleteImage(path).pipe(
      tap(() => {
        this._images.next(
          this._images.value.filter((image) => image.path !== path)
        );
      })
    );
  }
}
