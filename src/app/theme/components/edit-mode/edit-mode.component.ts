import { Component, OnInit, Input } from '@angular/core';
import { EditService } from '../../services/edit.service';
import { LandmarkModel } from '../../models/Landmark.model';
import { LandmarkService } from '../../services/landmark.service';
import { NbToastrService } from '@nebular/theme';

/*
This sub-component contains the editable components of the home and details pages
*/
@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss'],
})
export class EditModeComponent implements OnInit {
  tempTitle = '';
  tempShortInfo = '';
  tempDescription = '';
  tempURL = '';
  landmarks: LandmarkModel[];
  @Input() currentLandmark: LandmarkModel;
  @Input() mode: string;

  constructor(
    private editService: EditService,
    private landmarkService: LandmarkService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    const landResAttrib = 'results';
    this.landmarkService.getLandmarks().subscribe(
      (landmarks) => {
        this.landmarks = landmarks[landResAttrib];
        this.tempTitle = this.currentLandmark.title;
        this.tempShortInfo = this.currentLandmark.short_info;
        this.tempURL = this.currentLandmark.url;
        this.tempDescription = this.currentLandmark.description;
      },
      (error) => {}
    );
  }

  public getEditServiceInfo(attribute: string): any {
    return this.editService.getAttribute(attribute);
  }

  // Functions to show or not the respective editable components
  public showTitle(): boolean {
    return (
      this.getEditServiceInfo('titleFlag') &&
      this.currentLandmark.title === this.getEditServiceInfo('landmarkTitle') &&
      this.mode === 'title'
    );
  }
  public showShortInfo(): boolean {
    return (
      this.getEditServiceInfo('shortInfoFlag') &&
      this.currentLandmark.title === this.getEditServiceInfo('landmarkTitle') &&
      this.mode === 'title'
    );
  }
  public showDescription(): boolean {
    return (
      this.getEditServiceInfo('DescriptionFlag') && this.mode === 'description'
    );
  }
  public showURL(): boolean {
    return this.getEditServiceInfo('URLFlag') && this.mode === 'description';
  }

  public resetToViewMode(): void {
    this.editService.editShortInfoFlag = false;
    this.editService.editTitleFlag = false;
    this.editService.editDescriptionFlag = false;
    this.editService.editURLFlag = false;
  }

  /* This function checks if the sumbit and cancel button should be shown
   Two cases are considered as we don't want the ng-template of theses buttons
   to be rendered twice in home view page
  */
  public changesOccur(landmark: LandmarkModel): boolean {
    if (
      landmark.title === this.getEditServiceInfo('landmarkTitle') &&
      this.mode === 'title'
    ) {
      if (
        this.getEditServiceInfo('shortInfoFlag') ||
        this.getEditServiceInfo('titleFlag')
      ) {
        return true;
      } else {
        return false;
      }
    } else if (
      landmark.title === this.getEditServiceInfo('landmarkTitle') &&
      this.mode === 'description'
    ) {
      if (
        this.getEditServiceInfo('DescriptionFlag') ||
        this.getEditServiceInfo('URLFlag')
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  /*
  Function to update the information in the Database and print the result with a Nebular toastr
  */
  public updateInfo(landmark: LandmarkModel): void {
    landmark.description = this.tempDescription;
    landmark.short_info = this.tempShortInfo;
    landmark.url = this.tempURL;
    landmark.title = this.tempTitle;
    this.resetToViewMode();
    this.landmarkService.updateLandmark(landmark).subscribe(
      (result) => {
        this.showToast(
          'top-right',
          'success',
          this.currentLandmark.title,
          'successful'
        );
      },
      (error) => {
        this.showToast(
          'top-right',
          'warning',
          this.currentLandmark.title,
          'successful'
        );
      }
    );
  }

  public showToast(position, status, title, updateOutcome: string): void {
    let toastrStatus = 'success';
    this.toastrService.show(
      toastrStatus,
      `Field update for ${title} was ${updateOutcome}`,
      {
        position: position,
        status: status,
        destroyByClick: true,
        duration: 0,
      }
    );
  }
}
