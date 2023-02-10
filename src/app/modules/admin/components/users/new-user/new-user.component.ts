import { Account, Credit } from '../../../../shared/models/user';
import { UserService } from '../../../../shared/services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  public firstUserForm: FormGroup;
  public secondUserForm: FormGroup;
  public thirdUserForm: FormGroup;
  estadoFormulario: string = '';

  constructor(
    private fb: FormBuilder,
    private account: Account,
    private UserService: UserService,
    private dialogRef: MatDialogRef<NewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private credit: Credit
  ) {
    this.estadoFormulario = 'Agregar nuevo';

    this.firstUserForm = fb.group({
      type: ['', Validators.required],
      nickName: ['', Validators.required],
      email: ['', Validators.required],
      //openDate: [''],
      //status: 'Created',
      password: ['', Validators.required],
      //verifyPassword: ['', Validators.required]
    });

    this.secondUserForm = fb.group({
      names: ['', Validators.required],
      surNames: ['', Validators.required],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.thirdUserForm = fb.group({

    });

    if ( data != null ){
      this.updateForm(data);
      this.estadoFormulario = "Actualizar";
    }
  }

  ngOnInit(): void {}

  onSave() {

    /* if (this.firstUserForm.valid && this.secondUserForm.valid == null) {

      this.account.type = this.firstUserForm.value.type;
      this.account.nickName = this.firstUserForm.value.nickName;
      this.account.email = this.firstUserForm.value.email;
      //this.account.opendate = this.firstUserForm.value.openDate;
      //this.account.status = this.firstUserForm.value.status;
      this.account.password = this.firstUserForm.value.password;

      this.account.names = this.secondUserForm.value.names;
      this.account.surNames = this.secondUserForm.value.surNames;
      this.account.documentType = this.secondUserForm.value.documentType;
      this.account.documentNumber = this.secondUserForm.value.documentNumber;
      this.account.address = this.secondUserForm.value.address;
      this.account.phone = this.secondUserForm.value.phone;

      this.editAccount(this.account, this.account.id)

      } else {

        let account = new Account();
        account.type = this.firstUserForm.value.type;
        account.nickName = this.firstUserForm.value.nickName;
        account.email = this.firstUserForm.value.email;
        //account.opendate = this.firstUserForm.value.openDate;
        //account.status = this.firstUserForm.value.status;
        account.password = this.firstUserForm.value.password;

        account.names = this.secondUserForm.value.names;
        account.surNames = this.secondUserForm.value.surNames;
        account.documentType = this.secondUserForm.value.documentType;
        account.documentNumber = this.secondUserForm.value.documentNumber;
        account.address = this.secondUserForm.value.address;
        account.phone = this.secondUserForm.value.phone;

        this.saveAccount(account)

      } */
    let data = {

      type: this.firstUserForm.get('type')?.value,
      nickName: this.firstUserForm.get('nickName')?.value,
      email: this.firstUserForm.get('email')?.value,
      password: this.firstUserForm.get('password')?.value,

      names: this.secondUserForm.get('names')?.value,
      surNames: this.secondUserForm.get('surNames')?.value,
      documentType: this.secondUserForm.get('documentType')?.value,
      documentNumber: this.secondUserForm.get('documentNumber')?.value,
      address: this.secondUserForm.get('address')?.value,
      phone: this.secondUserForm.get('phone')?.value,

    };

     if (this.data != null) {
      //update the data
      this.UserService.updateAccount(data, this.data.id).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        }
      ), console.log(this.data)
    } else {
      //Crear new Customeer
      this.UserService.saveUser(data).subscribe( (data: any)=> {
        console.log(data)
        this.dialogRef.close(1)
      },  (error: any) => {
        this.dialogRef.close(2)
      }), console.log(data);
    }
  }

  onCancel() {
    this.dialogRef.close(5);
  }

  updateForm(data: any) {
    this.firstUserForm = this.fb.group({
      type: [data.type, Validators.required],
      nickName: [data.nickName, Validators.required],
      email: [data.email, Validators.required],
      password: [data.password, Validators.required],
    });

    this.secondUserForm = this.fb.group({
      names: [data.names, Validators.required],
      surNames: [data.surNames, Validators.required],
      documentType: [data.documentType, Validators.required],
      documentNumber: [data.documentNumber, Validators.required],
      address: [data.address, Validators.required],
      phone: [data.phone, Validators.required],
    });
  }

  isLinear = false;
}


