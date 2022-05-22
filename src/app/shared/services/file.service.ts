import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendip, backendport } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(public http: HttpClient) { }
  postFileImage(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload);
    return this.http.post(backendip + backendport + '/uploadimage', formData)
  }
  postFileModel(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('model', fileToUpload);
    return this.http.post(backendip + backendport + '/uploadmodel', formData)
  }
}
