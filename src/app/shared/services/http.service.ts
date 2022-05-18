import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  
   getData(){
    return this.http.get(backendip + backendport + '/data')
  }


  getToken(){
    
    return this.http.get(backendip + backendport + '/oauth')
  }

  getClasses(){
    return this.http.get(backendip + backendport + '/classes')
  }

  getSubClasses(){
    return this.http.get(backendip + backendport + '/subclasses')
  }

  getGroups(){
    return this.http.get(backendip + backendport + '/groups')
  }

  getSubGroups(){
    return this.http.get(backendip + backendport + '/subgroups')
  }

  getTypes(){
    return this.http.get(backendip + backendport + '/types')
  }

  addClass(codeToAdd: string, codeDescription: string): Observable<any>{
    return this.http.post(backendip + backendport + '/addclass', {
      "class": codeToAdd,
      "description":codeDescription 
    })
  }

  addSubClass(codeToAdd: string, codeDescription: string): Observable<any>{
    return this.http.post(backendip + backendport + '/addSubClass', {
      "class": codeToAdd,
      "description":codeDescription 
    })
  }

  addGroup(codeToAdd: string, codeDescription: string): Observable<any>{
    return this.http.post(backendip + backendport + '/addgroup', {
      "class": codeToAdd,
      "description":codeDescription 
    })
  }

  addSubGroup(codeToAdd: string, codeDescription: string): Observable<any>{
    return this.http.post(backendip + backendport + '/addsubgroup', {
      "class": codeToAdd,
      "description":codeDescription 
    })
  }


  addType(codeToAdd: string, codeDescription: string, urn: string, pictureLink: string): Observable<any>{
    return this.http.post(backendip + backendport + '/addtype', {
      "class": codeToAdd,
      "description":codeDescription,
      "urn":urn,
      "picture":pictureLink
    })
  }

  

  updateclasses(codeToUpdate: string, codeDescription: string): Observable<any>{
    return this.http.post(backendip + backendport + '/updateclasses', {
      "class": codeToUpdate,
      "description":codeDescription 
    })
  }
  
  updatesubclasses(codeToUpdate: string, codeDescription: string): Observable<any>{
    return this.http.post(backendip + backendport + '/updatesubclasses', {
      "class": codeToUpdate,
      "description":codeDescription 
    })
  }
  
  updategroups(codeToUpdate: string, codeDescription: string): Observable<any>{
    return this.http.post(backendip + backendport + '/updategroups', {
      "class": codeToUpdate,
      "description":codeDescription 
    })
  }

  updatesubgroups(codeToUpdate: string, codeDescription: string): Observable<any>{
    return this.http.post(backendip + backendport + '/updatesubgroups', {
      "class": codeToUpdate,
      "description":codeDescription 
    })
  }

  getfavs(login: string): Observable<any>{
    return this.http.post(backendip + backendport + '/getfavourites', {
      "login":login
    })
  }



}

export const backendip = 'http://localhost';
//export const backendip = 'http://194.58.103.233';
export const backendport = ':3001';