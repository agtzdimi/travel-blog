import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditService {
  public editLandmarkTitle = '';
  public editLandmarkShortInfo = '';
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
}
