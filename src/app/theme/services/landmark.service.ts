import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LandmarkModel } from '../models/Landmark.model';
import { Observable } from 'rxjs';

@Injectable()
export class LandmarkService {
  constructor(private httpClient: HttpClient, protected router: Router) {}

  public getLandmarks(): Observable<LandmarkModel[]> {
    const uri = 'http://localhost:5000/parse/classes/Landmarks';

    return this.httpClient.get<LandmarkModel[]>(uri, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'NqqPKd9Mzzdk0Es6P7NdzXOXNb4tsqdq6Q8p0cZi',
      }),
    });
  }
}
