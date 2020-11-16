import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/shared/user-detail.model';
import { ToastrService } from 'ngx-toastr';
import { UserDetailService } from 'src/app/shared/user-detail.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { emitWarning } from 'process';

@Component({
  selector: 'app-user-detail-list',
  templateUrl: './user-detail-list.component.html',
  styles: [
  ]
})
export class UserDetailListComponent implements OnInit {

  constructor(private service: UserDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(ud:UserDetail){
    if(ud != null){
      this.service.formData = Object.assign({},ud);
    }else{
      this.service.formData = new UserDetail;
    }
  }

  deletedUserById(UserId){
    if(confirm('Are you sure to delete?'))
    this.service.deletedUserDetail(UserId).subscribe(
      res => {
        this.toastr.warning('Delete Successfully', 'User Details Register');
        this.service.refreshList();
        if(this.service.formData != null){
          this.populateForm(new UserDetail);
        }
      },
      err =>{
        console.log(err);
        this.toastr.error('Delete Failed', 'User Details Register');
      }
    )
  }
}
