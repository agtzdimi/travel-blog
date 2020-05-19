import { Component, OnInit, Input } from '@angular/core';
import { LandmarkService } from '../../services/landmark.service';
import { LandmarkModel } from '../../models/Landmark.model';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DialogImageFullComponent } from '../dialog-image-full/dialog-image-full.component';
import { UploadImageService } from '../../services/upload-image.service';
import { LoginService } from '../../services/login.service';

// Snippet class to store an Image file
class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}

/*
This component renders the image showed beside the short_info
In case no image is yet uploaded it contains the means to upload an image
as an administrator user
*/
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

  // Function to upload the file into the database and print the outcome in a Nebular toastr
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
                console.log(error);
              }
            );
          },
          (error) => {
            this.showToast('top-right', 'warning', error['error']['message']);
          }
        );
      this.currentLandmark['photo_thumb'] = this.uploadedImage.src;
    });

    reader.readAsDataURL(file);
  }

  // Open Nebular Dialog for full image
  public showFullImage() {
    this.uploadImageService.landmark = this.currentLandmark;
    this.dialogService.open(DialogImageFullComponent);
  }

  public showToast(position, status, title): void {
    if (status === 'warning') {
      this.toastrService.show(status, `${title}:`, {
        position,
        status,
        destroyByClick: true,
        duration: 0,
      });
    } else {
      this.toastrService.show(status, `Image upload status for ${title}:`, {
        position: position,
        status: status,
        destroyByClick: true,
        duration: 0,
      });
    }
  }
}
