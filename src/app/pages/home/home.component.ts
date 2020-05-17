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
      (error) => {
        console.log(error);
      }
    );
  }

  public selectOption(landmark: LandmarkModel): void {
    this.editService.editLandmarkTitle = landmark.title;
    this.editService.editDescription = landmark.description;
    this.editService.editURL = landmark.url;
    this.editService.editLandmarkShortInfo = landmark.short_info;
    this.editService.editTitleFlag = false;
    this.editService.editShortInfoFlag = false;
  }

  public toggleInfoTitle(): void {
    this.editService.editTitleFlag = true;
    this.editService.editShortInfoFlag = true;
  }

  public sortBy(field): LandmarkModel[] {
    return this.landmarks.sort((a, b) =>
      a[field] > b[field] ? 1 : a[field] === b[field] ? 0 : -1
    );
  }

  public getEditServiceInfo(attribute: string): any {
    return this.editService.getAttribute(attribute);
  }
}
