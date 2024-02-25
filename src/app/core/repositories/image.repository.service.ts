import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root',
})
export class ImageRepositoryService {
  private readonly imageEndpoint = '/api/images';

  constructor(private http: HttpClient) {}

  getAllImages() {
    return this.http.get<Image[]>(`${this.imageEndpoint}`);
  }

  uploadImage(file: File) {
    let formData = new FormData();
    formData.append('file', file);
    return this.http.post<Image>(`${this.imageEndpoint}/upload`, formData);
  }

  deleteImage(path: string) {
    return this.http.delete(`${this.imageEndpoint}/delete/${path}`);
  }
}
