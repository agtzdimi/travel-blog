import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditService {
  public editLandmarkTitle = '';
  public editLandmarkShortInfo = '';
  public editTitleFlag = false;
  public editShortInfoFlag = false;

  constructor() {}
}
