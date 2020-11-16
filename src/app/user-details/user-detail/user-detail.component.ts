import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserDetailService } from 'src/app/shared/user-detail.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})

export class UserDetailComponent implements OnInit {

  constructor(private service: UserDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form != null)
    form.resetForm();
    this.service.formData = {
      UserId: 0,
      UserName: '',
      UserNumber:'',
      JoinDate:'',
      IsDeleted: false
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.UserId == 0){
      this.insertMethod(form);
    }else{
      this.updateMethod(form);
    }
  }

  insertMethod(form:NgForm){
    this.service.postUserDetail().subscribe(
      res => {
        this.resetForm();
        this.toastr.info('Submitted Successfully', 'User Details Register');
        this.service.refreshList();
      },
      err =>{
        console.log(err);
        this.toastr.error('Submitted Failed', 'User Details Register');
      }
    )
  }

  updateMethod(form:NgForm){
    this.service.putUserDetail().subscribe(
      res => {
        this.resetForm();
        this.toastr.info('Updates Successfully', 'User Details Register');
        this.service.refreshList();
      },
      err =>{
        console.log(err);
        this.toastr.error('Updates Failed', 'User Details Register');
      }
    )
  }
}
