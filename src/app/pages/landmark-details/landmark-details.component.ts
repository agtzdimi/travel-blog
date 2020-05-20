import { Component, OnInit } from '@angular/core';
import { LandmarkModel } from 'src/app/theme/models/Landmark.model';
import { LandmarkService } from 'src/app/theme/services/landmark.service';
import { LoginService } from 'src/app/theme/services/login.service';
import { EditService } from 'src/app/theme/services/edit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landmark-details',
  templateUrl: './landmark-details.component.html',
  styleUrls: ['./landmark-details.component.scss'],
  providers: [LandmarkService],
})
export class LandmarkDetailsComponent implements OnInit {
  public landmarks: LandmarkModel[];
  public writeAccess = false;
  public editLandmarkShortInfo: string;
  public popOverOptions = { animation: { type: 'zoom' } };
  public showingLandmark: LandmarkModel;

  constructor(
    private landmarkService: LandmarkService,
    private loginService: LoginService,
    private editService: EditService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.writeAccess = this.loginService.getUserWriteAccess();
    this.getLandmark();
  }

  public getLandmark(): void {
    const landResAttrib = 'results';
    this.landmarkService.getLandmarks().subscribe(
      (landmarks) => {
        this.landmarks = landmarks[landResAttrib];
        this.showingLandmark = this.landmarks.filter((landmark) => {
          return (
            landmark['title'] === this.route.snapshot.queryParams['landmark']
          );
        })[0];
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

  public toggleDescrURL(): void {
    this.editService.toggleDescrURL();
  }

  public getEditServiceInfo(attribute: string): any {
    return this.editService.getAttribute(attribute);
  }
}
