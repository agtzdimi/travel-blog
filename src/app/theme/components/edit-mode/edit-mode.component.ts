import { Component, OnInit, Input } from '@angular/core';
import { EditService } from '../../services/edit.service';
import { LandmarkModel } from '../../models/Landmark.model';
import { LandmarkService } from '../../services/landmark.service';

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
    private landmarkService: LandmarkService
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
}
