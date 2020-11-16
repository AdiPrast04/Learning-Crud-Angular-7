import { Injectable } from '@angular/core';
import { UserDetail } from './user-detail.model';
import { HttpClient } from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  formData: UserDetail;
  readonly rootUrl = 'http://localhost:60911/api/';
  list: UserDetail[];

  constructor(private http:HttpClient) { }

  postUserDetail(){
  return this.http.post(this.rootUrl+'/UserDetails', this.formData);
  }

  putUserDetail(){
    return this.http.put(this.rootUrl+'/UserDetails/'+this.formData.UserId, this.formData);
  }

  deletedUserDetail(UserId){
    return this.http.delete(this.rootUrl+'/UserDetails/'+UserId);
  }

  refreshList(){
    this.http.get(this.rootUrl+'/UserDetails')
    .toPromise()
    .then(res => this.list = res as UserDetail[])
  }
}
