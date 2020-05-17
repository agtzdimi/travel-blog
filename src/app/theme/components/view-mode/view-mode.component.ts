import { Component, OnInit, Input } from '@angular/core';
import { LandmarkModel } from '../../models/Landmark.model';
import { EditService } from '../../services/edit.service';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.scss'],
})
export class ViewModeComponent implements OnInit {
  @Input() currentLandmark: LandmarkModel;

  constructor(private editService: EditService) {}

  ngOnInit(): void {}

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
