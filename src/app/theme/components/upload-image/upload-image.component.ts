import { Component, OnInit, Input } from '@angular/core';
import { LandmarkService } from '../../services/landmark.service';
import { LandmarkModel } from '../../models/Landmark.model';
import { NbDialogService } from '@nebular/theme';
import { DialogImageFullComponent } from '../dialog-image-full/dialog-image-full.component';
import { UploadImageService } from '../../services/upload-image.service';

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  @Input() currentLandmark: LandmarkModel;
  public uploadedImage: ImageSnippet;
  public landmarks: LandmarkModel[];

  constructor(
    private landmarkService: LandmarkService,
    private dialogService: NbDialogService,
    private uploadImageService: UploadImageService
  ) {}

  ngOnInit(): void {
    const landResAttrib = 'results';
    this.landmarkService.getLandmarks().subscribe(
      (landmarks) => {
        this.landmarks = landmarks[landResAttrib];
      },
      (error) => {}
    );
  }

  public processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.uploadedImage = new ImageSnippet(event.target.result, file);

      this.uploadedImage.pending = true;
      const formData = new FormData();
      formData.append('image', this.uploadedImage.file);
      console.log(this.uploadedImage);
      this.currentLandmark['photo_thumb'] = this.uploadedImage.src;
      console.log(this.landmarks);
    });

    reader.readAsDataURL(file);
  }

  public showFullImage() {
    this.uploadImageService.landmark = this.currentLandmark;
    this.dialogService.open(DialogImageFullComponent);
  }
}
