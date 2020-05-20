import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LandmarkModel } from '../models/Landmark.model';
import { Observable } from 'rxjs';

/*
This service contains the API functions that will receive the landmarks from the parse-server
and also update them when the admin sumbits a change on the data
*/
@Injectable()
export class LandmarkService {
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': 'NqqPKd9Mzzdk0Es6P7NdzXOXNb4tsqdq6Q8p0cZi',
    }),
  };

  constructor(private httpClient: HttpClient, protected router: Router) {}

  public getLandmarks(): Observable<LandmarkModel[]> {
    const uri = 'http://localhost:5000/parse/landmarks';

    return this.httpClient.get<LandmarkModel[]>(uri, this.headers);
  }

  public updateLandmark(landmark: LandmarkModel): Observable<object> {
    const landmarkParam = {
      title: landmark.title,
      description: landmark.description,
      url: landmark.url,
      short_info: landmark.short_info,
      location: JSON.stringify(
        landmark.location[0] + ',' + landmark.location[1]
      ),
    };
    const uri = `http://localhost:5000/parse/landmarks/${landmark.objectId}`;

    return this.httpClient.put<LandmarkModel[]>(uri, landmarkParam, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'NqqPKd9Mzzdk0Es6P7NdzXOXNb4tsqdq6Q8p0cZi',
      }),
      params: landmarkParam,
    });
  }
}
