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

  /*
  Every time a user clicks on the edit button the edit fields will reset
  Therefore, only one landmark can be edited at a time
  */
  public selectedOption(landmark: LandmarkModel): void {
    this.editService.initializeEditLandmark(landmark);
  }

  public toggleInfoTitle(): void {
    this.editService.toggleInfoTitle();
  }

  public sortBy(field: string): LandmarkModel[] {
    return this.landmarks.sort((a, b) =>
      a[field] > b[field] ? 1 : a[field] === b[field] ? 0 : -1
    );
  }

  public getEditServiceInfo(attribute: string): any {
    return this.editService.getAttribute(attribute);
  }
}
