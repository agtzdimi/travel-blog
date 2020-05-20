import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

/*
This dialog will be prompt whenever the administrator changes
the Landmark location
*/
@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirmComponent implements OnInit {
  title = 'Update the coordinates of this Landmark?';

  constructor(private dialogRef: NbDialogRef<DialogConfirmComponent>) {}

  ngOnInit(): void {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  submit(): void {
    this.dialogRef.close(true);
  }
}
