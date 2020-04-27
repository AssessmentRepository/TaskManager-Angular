import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:4444/";

    constructor(private http: Http) { }
    posttaskdata(data){
      return this.http.post(UserService.BaseUrl+'taskData',data,httpOptions).pipe(map((response: Response) => response.json()));
   
    }
    updateposttaskdata(id,data){
      return this.http.put(UserService.BaseUrl+'taskData'+'/'+id,data,httpOptions).pipe(map((response: Response) => response.json()));
   
    }
    gettaskdata() {
        return this.http.get(UserService.BaseUrl+'taskData',httpOptions).pipe(map((response: Response) => response.json()));
    }

}