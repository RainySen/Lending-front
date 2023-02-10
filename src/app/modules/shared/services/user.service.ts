import { Account } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * get all
   */
  getAccount(){
    const endpoint= `${base_url}/account`
    return this.http.get(endpoint);
  }

  /**
   * save the Account
   */
   saveUser(body: any) {
    const endpoint = `${base_url}/account`;
    console.log(endpoint, body);
    return this.http.post(endpoint, body);
  }

  /**
   * update
   */
  updateAccount(body: any, id: any){
    const endpoint = `${base_url}/account/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * delete Account
   */
  deleteAccount(id: any){
    const endpoint = `${base_url}/account/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * get by ID Account
   */
  getAccountById(id: any){
    const endpoint = `${base_url}/account/${id}`;
    return this.http.get(endpoint);
  }

  createCredit(id:string, body: any){
    const endpoint = `${base_url}/account/${id}/credit`;
    return this.http.put(endpoint, body);
  };

  deposit(id:string, body: any){
    const endpoint = `${base_url}/credit/${id}`;
    console.log(endpoint);
    return this.http.put(endpoint, body);
  }

}
