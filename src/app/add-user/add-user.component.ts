import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  {
  addUser!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.addUser = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      fullname: ['', Validators.required],
      gender:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Status: ['', Validators.required]
    });
  }
  // ngOnInit() {
  //   this.addUser = this.formBuilder.group({
  //     firstname: ['', Validators.required],
  //     lastname: ['', Validators.required],
  //     fullname: ['', Validators.required],
  //     gender:['',Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     Status: ['', Validators.required]
  //   });
  // }
  onSubmit() {
    if (this.addUser.invalid) {
      return;
    }

    // Process the registration logic here
    console.log(this.addUser.value);
  }
}






