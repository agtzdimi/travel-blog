import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../../services/upload-image.service';
import { LandmarkModel } from '../../models/Landmark.model';

/*
This component is utilizes the Nebular dialog component and opens a dialog box
where it renders the full image of the landmark
*/
@Component({
  selector: 'app-dialog-image-full',
  templateUrl: './dialog-image-full.component.html',
  styleUrls: ['./dialog-image-full.component.scss'],
})
export class DialogImageFullComponent implements OnInit {
  landmark: LandmarkModel;

  constructor(private uploadImageService: UploadImageService) {}

  ngOnInit(): void {
    this.landmark = this.uploadImageService.landmark;
  }
}
