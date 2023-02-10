import { Injectable } from "@angular/core";

@Injectable({  providedIn: 'root' })
export class Account {
  id: string;
  type: string = "";
  //subtype: string;
  //permission: string;
  nickName: string = "";
  email: string = "";
  //opendate = Date;
  //status: string;
  password: string = "";
  names: string = "";
  surNames: string = "";
  documentType: string = "";
  documentNumber: string = "";
  address: string = "";
  phone: string = "";
  credit = Credit;
}


@Injectable({  providedIn: 'root' })
export class Credit {
  static id: string = "";
  //dateLoan =  Date;
  valueDisbursed: number = 0;
  paymentDeadline = Date
  interestValuation: number = 0;
  interestValue: number = 0;
  deposit: number = 0;
  remainingDebt: number = 0;
}

/**
 * export enum documentType {
 *  CC = "CC", // Cedula de ciudadania
 *  CE = "CE", // Cedula de Extranjeria
 *  PEP = "PEP", // Permiso especial de Permanencia
 *  PAP = "PAP", // Pasaporte
 *  NIT = "NIT", // Número de Identificación Tributaria
 * }
*/
