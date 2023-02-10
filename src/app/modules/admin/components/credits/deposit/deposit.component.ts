import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { CreditComponent } from '../credit/credit.component';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {

  public depositForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private dialogRef: MatDialogRef<DepositComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){

    this.depositForm = fb.group({

        deposit: ['', Validators.required]
    })
  }

  onSave(){

    let data ={
      deposit: this.depositForm.get('deposit')?.value
    }
    this.saveDeposit(data);
  }

  saveDeposit(data: any){
    this.service.deposit(this.data.id, data).subscribe((data:any)=>{
      console.log(data);
      this.dialogRef.close(3);
    },(error)=>{
      console.log(error);
      this.dialogRef.close(4);
    })
  }

  onCancel() {
    this.dialogRef.close(5);
  }
}
