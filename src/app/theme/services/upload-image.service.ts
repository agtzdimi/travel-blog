import { Injectable } from '@angular/core';
import { LandmarkModel } from '../models/Landmark.model';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  public landmark: LandmarkModel;

  constructor() {}
}
