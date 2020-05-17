import { Injectable } from '@angular/core';
import { LandmarkModel } from '../models/Landmark.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  public landmark: LandmarkModel;
  private headers = {
    headers: new HttpHeaders({
      'X-Parse-Application-Id': 'NqqPKd9Mzzdk0Es6P7NdzXOXNb4tsqdq6Q8p0cZi',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public uploadImage(
    landmark: LandmarkModel,
    formData: FormData
  ): Observable<any> {
    const uri = `http://localhost:5000/parse/landmarks/${landmark.objectId}/uploadImage`;
    return this.httpClient.post<any>(uri, formData, this.headers);
  }
}
