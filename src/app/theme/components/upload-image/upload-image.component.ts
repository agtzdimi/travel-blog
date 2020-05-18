import { Component, OnInit, Input } from '@angular/core';
import { LandmarkService } from '../../services/landmark.service';
import { LandmarkModel } from '../../models/Landmark.model';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DialogImageFullComponent } from '../dialog-image-full/dialog-image-full.component';
import { UploadImageService } from '../../services/upload-image.service';
import { LoginService } from '../../services/login.service';

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
  public writeAccess: boolean;

  constructor(
    private landmarkService: LandmarkService,
    private dialogService: NbDialogService,
    private uploadImageService: UploadImageService,
    private loginService: LoginService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.writeAccess = this.loginService.getUserWriteAccess();
  }

  public processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.uploadedImage = new ImageSnippet(event.target.result, file);

      this.uploadedImage.pending = true;
      const formData = new FormData();
      formData.append(
        'image',
        this.uploadedImage.file,
        this.uploadedImage.file.name
      );
      this.uploadImageService
        .uploadImage(this.currentLandmark, formData)
        .subscribe(
          (uploadData) => {
            const landResAttrib = 'results';
            this.landmarkService.getLandmarks().subscribe(
              (landmarks) => {
                this.landmarks = landmarks[landResAttrib];
                this.currentLandmark = this.landmarks.filter((landmark) => {
                  return this.currentLandmark.objectId === landmark.objectId;
                })[0];

                this.showToast(
                  'top-right',
                  'success',
                  this.currentLandmark.title
                );
              },
              (error) => {
                this.showToast(
                  'top-right',
                  'error',
                  this.currentLandmark.title
                );
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
      this.currentLandmark['photo_thumb'] = this.uploadedImage.src;
    });

    reader.readAsDataURL(file);
  }

  public showFullImage() {
    this.uploadImageService.landmark = this.currentLandmark;
    this.dialogService.open(DialogImageFullComponent);
  }

  public showToast(position, status, title): void {
    let toastrStatus = 'success';
    if (status === 'error') {
      toastrStatus = 'danger';
    }
    this.toastrService.show(toastrStatus, `Image upload status for ${title}:`, {
      position,
      status,
    });
  }
}
