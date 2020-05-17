import { Component, OnInit } from '@angular/core';
import { LandmarkModel } from 'src/app/theme/models/Landmark.model';
import { LandmarkService } from 'src/app/theme/services/landmark.service';
import { LoginService } from 'src/app/theme/services/login.service';
import { EditService } from 'src/app/theme/services/edit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LandmarkService],
})
export class HomeComponent implements OnInit {
  public landmarks: LandmarkModel[];
  public writeAccess = false;
  public editLandmarkShortInfo: string;
  public popOverOptions = { animation: { type: 'zoom' } };

  constructor(
    private landmarkService: LandmarkService,
    private loginService: LoginService,
    private editService: EditService
  ) {}

  ngOnInit(): void {
    this.writeAccess = this.loginService.getUserWriteAccess();
    this.getLandmarks();
  }

  public getLandmarks(): void {
    const landResAttrib = 'results';
    this.landmarkService.getLandmarks().subscribe(
      (landmarks) => {
        this.landmarks = landmarks[landResAttrib];
      },
      (error) => {}
    );
  }

  public selectOption(landmark: LandmarkModel): void {
    this.editService.editLandmarkTitle = landmark['title'];
    this.editService.editTitleFlag = false;
    this.editService.editShortInfoFlag = false;
  }

  public editTitle(): void {
    this.editService.editTitleFlag = true;
  }

  public editShortInfo(): void {
    this.editService.editShortInfoFlag = true;
  }

  public sortBy(field): LandmarkModel[] {
    return this.landmarks.sort((a, b) =>
      a[field] > b[field] ? 1 : a[field] === b[field] ? 0 : -1
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

  public resetToViewMode(): void {
    this.editService.editShortInfoFlag = false;
    this.editService.editTitleFlag = false;
  }

  public changesOccur(landmark: LandmarkModel): boolean {
    return (
      (this.getEditServiceInfo('shortInfoFlag') ||
        this.getEditServiceInfo('titleFlag')) &&
      landmark.title === this.getEditServiceInfo('landmarkTitle')
    );
  }
}
