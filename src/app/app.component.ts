import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import{HttpClient, HttpParams, HttpHeaders}from '@angular/common/http'
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'any'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';
  addUser!: FormGroup;
  addUserRequest = [];
  responseData: any= [];
  id: any;
  
  
  constructor(private http:HttpClient, private formBuilder:FormBuilder) {
    this.responseData = [];
  }
  ngOnInit() {
    this.addUser = this.formBuilder.group({
      name: ['', Validators.required],
      gender:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required]
    });

    this.getSearchResult();
  }

  
  
  onSubmit() {


    console.log(this.addUser.value);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer 77b93a34a5df74f49c9d811cead52f5df1430badfee64af4876f894ad0191c16'
      })
    };
        console.log(httpOptions);
        this.http.post(
          "https://gorest.co.in/public/v2/users", this.addUser.value, httpOptions).subscribe(response=>{
            console.log(response);
          }); 
  }
    getSearchResult(){
    this.http.get('https://gorest.co.in/public/v2/users').subscribe
      (response=>
        {
          //console.log(response.item());
          let resSTR = JSON.stringify(response);
          let resJSON = JSON.parse(resSTR);
          console.log(resJSON.body);
          this.responseData = resJSON;
       } ,
      error =>{
        console.log("error occur ", error)
      });
  }

  deleteData(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer 77b93a34a5df74f49c9d811cead52f5df1430badfee64af4876f894ad0191c16'
      })
    };
    this.http.delete('https://gorest.co.in/public/v2/users/'+id,httpOptions)
        .subscribe
          (response=>
            {
              let resSTR = JSON.stringify(response);
              let resJSON = JSON.parse(resSTR);
              console.log(resJSON);
              
              alert("User Deleted Succesfully")
           } ,
          error =>{
            console.log("error occur ", error)
          }
        )
  }

  viewData(user:any){
    this.responseData=user;
  }

  editData(user:any){
    let userData={
      name: user.name,
      email: user.email,
      gender: user.gender,
      status: user.status
    }
    this.addUser.setValue(userData);
    this.id = user.id;
}

editUser(){
    console.log(this.addUser.value);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer 77b93a34a5df74f49c9d811cead52f5df1430badfee64af4876f894ad0191c16'
      })
    };
        console.log(httpOptions);
        this.http.put(
          "https://gorest.co.in/public/v2/users/"+this.id,this.addUser.value,httpOptions).subscribe(response=>{
            console.log(response);
            
          },
          error =>{
            console.log("error occur ", error)
          }); 
  }
}





// editData(user: any) {
//   let userData = {
//     name: user.name,
//     email: user.email,
//     gender: user.gender,
//     status: user.status,
//   };

//   this.addUser.setValue(userData);
//   this.id = user.id;
// }

// editUser() {
//   console.log(this.addUser.value);

//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Authorization': 'Bearer 77b93a34a5df74f49c9d811cead52f5df1430badfee64af4876f894ad0191c16',
//     }),
//   };

//   console.log(httpOptions);

//   this.http.put(
//     "https://gorest.co.in/public/v2/users/" + this.id,
//     this.addUser.value,
//     httpOptions
//   ).subscribe(
//     (response: any) => {
//       console.log(response);
//       // Handle the response
//     },
//     (error: any) => {
//       console.log("Error occurred: ", error);
//       // Handle the error
//     }
//   );
// }
// }
