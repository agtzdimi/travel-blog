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
  landmarks: LandmarkModel[];
  @Input() currentLandmark: LandmarkModel;

  constructor(
    private editService: EditService,
    private landmarkService: LandmarkService
  ) {}

  ngOnInit(): void {
    const landResAttrib = 'results';
    this.landmarkService.getLandmarks().subscribe(
      (landmarks) => {
        this.landmarks = landmarks[landResAttrib];
        this.tempTitle = this.currentLandmark['title'];
        this.tempShortInfo = this.currentLandmark['short_info'];
      },
      (error) => {}
    );
  }

  public getEditServiceInfo(attribute: string): any {
    switch (attribute) {
      case 'titleFlag':
        return this.editService.editTitleFlag;
        break;
      case 'shortInfoFlag':
        return this.editService.editShortInfoFlag;
      case 'landmarkTitle':
        return this.editService.editLandmarkTitle;
    }
  }
}
