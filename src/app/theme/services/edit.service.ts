import { Injectable } from '@angular/core';
import { LandmarkModel } from '../models/Landmark.model';

/*
This Service will contain all the editing information of the administrator
It contains a function to retrieve any class variable
*/
@Injectable({
  providedIn: 'root',
})
export class EditService {
  public editLandmarkTitle = '';
  public editLandmarkShortInfo = '';
  public editDescription = '';
  public editURL = '';
  public editTitleFlag = false;
  public editShortInfoFlag = false;
  public editDescriptionFlag = false;
  public editURLFlag = false;

  constructor() {}

  public getAttribute(attribute: string): any {
    switch (attribute) {
      case 'titleFlag':
        return this.editTitleFlag;
        break;
      case 'shortInfoFlag':
        return this.editShortInfoFlag;
        break;
      case 'landmarkTitle':
        return this.editLandmarkTitle;
        break;
      case 'DescriptionFlag':
        return this.editDescriptionFlag;
        break;
      case 'URLFlag':
        return this.editURLFlag;
        break;
    }
  }

  public initializeEditLandmark(landmark: LandmarkModel): void {
    this.editLandmarkTitle = landmark.title;
    this.editDescription = landmark.description;
    this.editURL = landmark.url;
    this.editLandmarkShortInfo = landmark.short_info;
    this.editTitleFlag = false;
    this.editShortInfoFlag = false;
  }

  public toggleInfoTitle(): void {
    this.editTitleFlag = true;
    this.editShortInfoFlag = true;
  }

  public toggleDescrURL(): void {
    this.editDescriptionFlag = true;
    this.editURLFlag = true;
  }

  public resetToViewMode(): void {
    this.editShortInfoFlag = false;
    this.editTitleFlag = false;
    this.editDescriptionFlag = false;
    this.editURLFlag = false;
  }
}
