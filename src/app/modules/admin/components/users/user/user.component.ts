import { DepositComponent } from './../../credits/deposit/deposit.component';
import { Account, Credit} from './../../../../shared/models/user';
import { NewUserComponent } from './../new-user/new-user.component';
import { UserService } from './../../../../shared/services/user.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CreditComponent } from '../../credits/credit/credit.component';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  this.getUsers();
  }

  displayedColumns: string[] = ['id', 'names', 'surNames', 'actions'];
  dataSource = new MatTableDataSource<Account>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getAccount(){
    this.userService.getAccount().subscribe(
      (data:any) => {
        console.log("respuesta usuarios", data);
        this.processUsersResponse(data);
      }, (error: any) => {
        console.log("error ", error);
      }
    )
  }

  processUsersResponse(resp: any){
    const dataUser: Account[] = [];

    let listUser = resp;

    listUser.forEach((element: Account) => {
      dataUser.push(element);
    });

    this.dataSource = new MatTableDataSource<Account>(dataUser);
    this.dataSource.paginator = this.paginator
  }

  getUsers(){
    this.userService.getAccount().subscribe(
      (data:any) => {
        console.log("respuesta usuarios", data);
        this.processUsersResponse(data);
      }, (error: any) => {
        console.log("error ", error);
      }
    )
  }

  openUserDialog() {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any)=> {
      if(result == 1){
      this.openSnackBar("Usuario agregada", "Exitosa")
      this.getAccount();
    }else if(result == 2) {
      this.openSnackBar("Se produjo un error", "Error")
    }
    })
  }

  edit(id: string, type: string, nickName: string, email: string, password: string,
    names: string, surNames: string, documentType: string, documentNumber: string, address: string, phone: string) {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '450px',
      data: {id: id, type: type, nickName: nickName, email: email, password: password,
        names: names, surNames: surNames, documentType: documentType, documentNumber: documentNumber, address: address, phone: phone }
    });

    dialogRef.afterClosed().subscribe((result:any)=> {
      if(result == 1){
        this.openSnackBar("Usuario Actializado", "Exitosa")
        this.getAccount();
      } else if(result == 2) {
        this.openSnackBar("Se produjo un error al actualizar", "Error")
      }
    });
  }

  delete(id: string){
    console.log(id)
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {id:id},
    });

    dialogRef.afterClosed().subscribe((result:any)=> {
      if(result == 1){
        this.openSnackBar("Usuario Eliminado", "Exitosa")
        this.getAccount();
      } else if(result == 2) {
        this.openSnackBar("Se produjo un error al borrar", "Error")
      } else if(result == 3) {
        this.openSnackBar("Creado correctamente", "Exitosa")
      }else if(result == 4) {
        this.openSnackBar("Hubo un error al crear", "Error")
      }
    });
  }

  credit(body: Account){
    if(body.credit != null){
      const dialogRef = this.dialog.open(DepositComponent,{
        data:{id: body.credit.id},
        width: "450px",
      })
    }else{
      const dialogRef = this.dialog.open(CreditComponent, {
        data:{id: body.id},
        width: '450px'
      });
    }
  }

  buscar( termino: string){

    if( termino.length === 0){
      return this.getAccount();
    }

    this.userService.getAccountById(termino).subscribe(
      (resp: any) => {
        this.processUsersResponse(resp);
      }
    )
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })

  }

}
