import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ShowToastrService {
  constructor(private toastrService: NbToastrService) {}

  public showToast(position, status, title: string): void {
    this.toastrService.show(status, title, {
      position: position,
      status: status,
      destroyByClick: true,
      duration: 0,
    });
  }
}
