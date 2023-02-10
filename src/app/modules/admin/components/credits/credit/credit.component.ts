import { UserService } from './../../../../shared/services/user.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent {

  public creditForm: FormGroup;


  constructor( private _fb: FormBuilder,
    private service: UserService,
    private dialogRef: MatDialogRef<CreditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.creditForm = _fb.group({
      valueDisbursed: ['', Validators.required],
      paymentDeadline: ['', Validators.required],
      interestValuation: ['', Validators.required]
    })
  }

  onSave(){
    let data = {
      valueDisbursed: this.creditForm.get('valueDisbursed')?.value,
      paymentDeadline: this.creditForm.get('paymentDeadline')?.value,
      interestValuation: this.creditForm.get('interestValuation')?.value

    }
    this.saveCredit(data);
  }

  saveCredit(data: any) {
    this.service.createCredit(this.data.id, data).subscribe((data: any) =>{
      console.log(data);
      this.dialogRef.close(3);

    }, (error)=>{
      console.log(error);
      this.dialogRef.close(4);
    })
  }

  onCancel() {
    this.dialogRef.close(5);
  }

}