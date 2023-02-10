import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private account: Account
  ) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close(3);
  }

  delete() {
    if (this.data != null) {

        this.userService.deleteAccount(this.data.id).subscribe(
          (data: any) => {
            console.log(this.data.id)
            this.dialogRef.close(1);
          },
          (error: any) => {
            this.dialogRef.close(2);
          }
        );
    } else {
      this.dialogRef.close(2);
    }
  }
}
