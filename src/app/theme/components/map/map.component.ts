import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LoginService } from '../../services/login.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LandmarkModel } from '../../models/Landmark.model';
import { LandmarkService } from '../../services/landmark.service';

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit, OnChanges {
  @Input() coordinates: number[];
  @Input() currentLandmark: LandmarkModel;

  public color = '#3887be';
  public lngLat: mapboxgl.LngLat;
  public writeAccess: boolean;

  constructor(
    private loginService: LoginService,
    private dialogService: NbDialogService,
    private landmarkService: LandmarkService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
      'pk.eyJ1IjoiYWd0emRpbWkiLCJhIjoiY2pyaXc2OWN6MDV0cTQ0cXd1NHA0cHI1OSJ9.NQIQGDjleOWNi7bpSu_AGw'
    );
    this.writeAccess = this.loginService.getUserWriteAccess();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.lngLat = new mapboxgl.LngLat(this.coordinates[0], this.coordinates[1]);
  }

  onDragEnd(marker: mapboxgl.Marker): void {
    this.coordinates = marker.getLngLat().toArray();
    this.dialogService
      .open(DialogConfirmComponent)
      .onClose.subscribe((value) => {
        if (value) {
          this.updateCoordinates();
        }
      });
  }

  /*
  Function to update the coordinates in the Database and print the result with a Nebular toastr
  */
  public updateCoordinates(): void {
    this.currentLandmark.location = this.coordinates;
    this.landmarkService.updateLandmark(this.currentLandmark).subscribe(
      (result) => {
        this.showToast(
          'top-right',
          'success',
          this.currentLandmark.title,
          'successful'
        );
      },
      (error) => {
        this.showToast(
          'top-right',
          'warning',
          this.currentLandmark.title,
          'unsuccessful'
        );
      }
    );
  }

  public showToast(position, status, title, updateOutcome: string): void {
    let toastrStatus = 'success';
    this.toastrService.show(
      toastrStatus,
      `Field update for ${title} was ${updateOutcome}`,
      {
        position: position,
        status: status,
        destroyByClick: true,
        duration: 0,
      }
    );
  }
}
