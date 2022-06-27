import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { now } from 'moment';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FileService } from 'src/app/shared/services/file.service';
import { backendip, backendport, HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  
  addClassForm: FormGroup;


//71xxxx
classesArr : {num: number, description: string}[];

//712xxx
subclassesArr : {num: number, description: string}[];

//7123xx
groupsArr : {num: number, description: string}[];

//71234x
subgroupsArr : {num: number, description: string}[];

//123456
typesArr : {num: number, description: string, urn?: string, pictureLink?: string}[];

   
   timestart = now();

  typeDesc = true;
  subGroupDesc = true;
  groupDesc = true;
  subClassDesc = true;
  classDesc = true;

  fileToUpload: File | null = null;
  modelToUpload: File | null = null;


  loading = false;
  submitted = false;
  constructor(
    public authService : AuthService, 
    public router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private http: HttpService,
    private fileService: FileService,
    private ac: AppComponent

  ) { }

  formOptions: AbstractControlOptions =  {validators: this.findNotEmpty }

  ngOnInit(

  ): void {

    this.addClassForm = this.formBuilder.group({
      classNum:[''],
      // classDescField:['', this.findNotEmpty('classDescField', [this.subClassDesc, this.groupDesc, this.subGroupDesc, this.typeDesc])],
      classDescField:[''],
      subClass:[''],
      subClassDesc:[''],
      groupNum:[''],
      groupDesc:[''],
      subGroup:[''],
      subGroupDesc:[''],
      type:[''],
      typeDesc:[''],
      img:[''],
      urn:[''],
      model:['']
    }
    // , 
    // this.formOptions
    
    )
    this.getdata();

    
  }

    
  

  

  ngAfterViewInit(){
    // this.ac.getdata()
  }


  get f() { return this.addClassForm.controls; }

  

  onKeyPress(event: any){
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onCodeInput(event: any){
    let code = event.target.value;
    
    let classCode = code.substring(0, 2);
    this.addClassForm.controls['classNum'].setValue(classCode)

    let subclassCode = code.substring(0, 3);
    this.addClassForm.controls['subClass'].setValue(subclassCode)

    let groupcode = code.substring(0, 4);
    this.addClassForm.controls['groupNum'].setValue(groupcode)

    let subgroupcode = code.substring(0, 5);
    this.addClassForm.controls['subGroup'].setValue(subgroupcode)

    code = code.substring(0, 6);
    this.addClassForm.controls['type'].setValue(code)

    if(classCode.length == 2){
      let desc = this.classesArr.find(el => el.num == classCode)
      this.addClassForm.controls['classDescField'].setValue(desc?.description)
    }else{
      this.addClassForm.controls['classDescField'].setValue('')
    }
    if(subclassCode.length == 3){
      let desc = this.subclassesArr.find(el => el.num == subclassCode)
      this.addClassForm.controls['subClassDesc'].setValue(desc?.description)
    }else{
      this.addClassForm.controls['subClassDesc'].setValue('')
    }
    if(groupcode.length == 4){
      let desc = this.groupsArr.find(el => el.num == groupcode)
      this.addClassForm.controls['groupDesc'].setValue(desc?.description)
    }else{
      this.addClassForm.controls['groupDesc'].setValue('')
    }
    if(subgroupcode.length == 5){
      let desc = this.subgroupsArr.find(el => el.num == subgroupcode)
      this.addClassForm.controls['subGroupDesc'].setValue(desc?.description)
    }else{
      this.addClassForm.controls['subGroupDesc'].setValue('')
    }
    if(code.length == 6){
      let findel = this.typesArr.find(el => el.num == code)
      this.addClassForm.controls['typeDesc'].setValue(findel?.description)
      this.addClassForm.controls['urn'].setValue(findel?.urn)
    }else{
      this.addClassForm.controls['typeDesc'].setValue('')
      this.addClassForm.controls['urn'].setValue('')
    }
  }

  limit(element: any){
    console.log(element)
  }

  handleFileInput(event:any) {
    let files = event.target.files
    this.fileToUpload = files.item(0);
  } 
  handleModelInput(event: any){
    let files = event.target.files
    this.modelToUpload = files.item(0);
    console.log(this.modelToUpload)
    /// \d{6}([.]ipt)/gmi
    let regex = /\d{6}([.]ipt)/gmi
    if(this.modelToUpload == null || this.modelToUpload?.name && regex.test(this.modelToUpload.name)){
      console.log('filename is fine')
    }else{

      console.log('bad filename')
      let c = this.addClassForm.controls['model'].setErrors({badname: true})
    }
    
  }

  onSubmit(){
    //check if parents are filled, 
    // find all changes and send them to db, 
    // then reload the data in arrays   
    
    //if empty or null then true
    this.submitted = true;
  
    // reset alerts on submit
    this.alertService.clear();

    if (this.addClassForm.controls['typeDesc'].value == ''||
    this.addClassForm.controls['typeDesc'].value == null){
      this.typeDesc = true;      
    }
    else{
      this.typeDesc = false; 
    }
    if (this.addClassForm.controls['subGroupDesc'].value == ''||
    this.addClassForm.controls['subGroupDesc'].value == null){
      this.subGroupDesc = true;      
    }
    else{
      this.subGroupDesc = false; 
    }
    if (this.addClassForm.controls['groupDesc'].value == '' ||
    this.addClassForm.controls['groupDesc'].value == null){
      this.groupDesc = true;      
    }
    else{
      this.groupDesc = false; 
    }
    if (this.addClassForm.controls['subClassDesc'].value == null ||
     this.addClassForm.controls['subClassDesc'].value == ''){
      this.subClassDesc = true;
    }
    else{
      this.subClassDesc = false; 
    }
    
    if (this.addClassForm.controls['classDescField'].value == null ||
     this.addClassForm.controls['classDescField'].value == ''){
      this.classDesc = true; 
    }
    else{
      this.classDesc = false; 
    }



    //if not valid
    // stop here if form is invalid
    if (this.addClassForm.invalid) {
      return;
    } 

    let filename = this.fileToUpload?.name ;
    // console.log(filename)
    var filelink: string;
    if (filename){
      filelink = backendip + backendport + '/picture/' + filename;
    }
    else filelink = ''

    //descriptions update / set
    if(this.f.classNum.value.length == 2)
    this.http.addClass(this.f.classNum.value, this.f.classDescField.value)
    .subscribe((res)=>{
      // console.log(res.Class_num, res.Class_name)
      if(res.Class_num && res.Class_name != this.f.classDescField.value && this.f.classDescField.value != ''){
        //already exists in db
        this.http.updateclasses(res.Class_num, this.f.classDescField.value).subscribe((res)=>{
          console.log(res)
        })
      }

      if(this.f.subClass.value.length == 3)
      this.http.addSubClass(this.f.subClass.value, this.f.subClassDesc.value).subscribe((res)=>{
        if(res.subclass_id && res.subclass_name != this.f.subClassDesc.value && this.f.subClassDesc.value !=''){
          this.http.updatesubclasses(this.f.subClass.value, this.f.subClassDesc.value).subscribe((res)=>{
            console.log(res)
          })
        }

        if(this.f.groupNum.value.length == 4)
        this.http.addGroup(this.f.groupNum.value, this.f.groupDesc.value).subscribe((res)=>{
          if(res.group_id && res.group_name != this.f.groupDesc.value && this.f.groupDesc.value!=''){
            this.http.updategroups(this.f.groupNum.value, this.f.groupDesc.value).subscribe((res)=>{
              console.log(res)
            })
          }
          
            if(this.f.subGroup.value.length == 5)
            this.http.addSubGroup(this.f.subGroup.value, this.f.subGroupDesc.value)
            .subscribe((res)=>{
              if(res.subroup_id && res.subroup_name != this.f.subGroupDesc.value && this.f.subGroupDesc.value!=''){
                this.http.updatesubgroups(this.f.subGroup.value, this.f.subGroupDesc.value).subscribe((res)=>{
                  console.log(res)
                })
              }
    
              if(this.f.type.value.length == 6)
              this.http.addType(this.f.type.value, this.f.typeDesc.value, this.f.urn.value, filelink).subscribe((res)=>{
                console.log(res)
    
                if(res.type_id && (res.type_name != this.f.typeDesc.value || res.picture != filelink || res.forge_urn != this.f.urn.value) && this.f.typeDesc.value!=''){
                  console.log('update call')
                  this.http.updatetypes(
                    this.f.type.value, 
                    this.f.typeDesc.value,
                    this.f.urn.value,
                    filelink).subscribe((res)=>{
                    console.log(res)
                  })
                }
              },err=>{
                if(err.error.msg.sqlMessage){
                  console.log(err)
                  this.alertService.error(JSON.stringify(err.error.msg.sqlMessage));
                }
                else{
                  console.log(err)
                  this.alertService.error(JSON.stringify(err));
                }
                //addType subscribe error
                // errorsArr.push(err.error.msg)
              })
            },err=>{
              //add sub group subscribe error
              if(err.error.msg.sqlMessage){
                console.log(err)
                this.alertService.error(JSON.stringify(err.error.msg.sqlMessage));
              }
              else{
                console.log(err)
                this.alertService.error(JSON.stringify(err));
              }
            })



        },err=>{
          //add group subscribe error
          if(err.error.msg.sqlMessage){
            console.log(err)
            this.alertService.error(JSON.stringify(err.error.msg.sqlMessage));
          }
          else{
            console.log(err)
            this.alertService.error(JSON.stringify(err));
          }
        })
          

        //subclass end
      },err=>{
        // subscribe error
        if(err.error.msg.sqlMessage){
          console.log(err)
          this.alertService.error(JSON.stringify(err.error.msg.sqlMessage));
        }
        else{
          console.log(err)
          this.alertService.error(JSON.stringify(err));
        }
      })

      //end of addclasses
    },err=>{
      //addclass subscribe error
      if(err.error.msg.sqlMessage){
        console.log(err)
        this.alertService.error(JSON.stringify(err.error.msg.sqlMessage));
      }
      else{
        console.log(err)
        this.alertService.error(JSON.stringify(err));
      }
    })
    //end of descs
  

   
    

    


    //upload file
    if(this.fileToUpload){
      
      this.fileService.postFileImage(this.fileToUpload).subscribe((res)=>{
        console.log(res)
      },err=>{
        console.log(err)
        this.alertService.error(JSON.stringify(err));

      })
    }

    if(this.modelToUpload){
      this.fileService.postFileModel(this.modelToUpload).subscribe((res)=>{
        console.log(res)
      },err=>{
        console.log(err)
        this.alertService.error(JSON.stringify(err));
      })
    
    }

    //update data in memory
    this.getdata()
    

    
  }
  getdata() {
    this.http.getClasses().subscribe((res: any) =>{
      this.classesArr = res;
      //console.log(this.classes);
    });
    
    this.http.getSubClasses().subscribe((res: any) =>{
      this.subclassesArr = res;
      //console.log(this.subclasses);
    });

    this.http.getGroups().subscribe((res: any) =>{
      this.groupsArr = res;
      //console.log(this.groups);
    });

    this.http.getSubGroups().subscribe((res: any) =>{
      this.subgroupsArr = res;
      //console.log(this.subgroups);
    });

    this.http.getTypes().subscribe((res: any) =>{
      this.typesArr = res;
    });
  }

  findNotEmpty(control: AbstractControl): ValidationErrors | null{
    let classVal = control.get('classDescField')?.value
    let subClassVal = control.get('subClassDesc')?.value
    let groupVal = control.get('groupDesc')?.value
    let subGroupVal = control.get('subGroupDesc')?.value
    let typeVal = control.get('typeDesc')?.value

    if(classVal == ''){
      return {classvalempty: true}
    }   
    if(subClassVal == '')
      if(groupVal != '' || subGroupVal !='' || typeVal !='')
        return {subclassvalempty: true}
    if(groupVal == '')
      if(subGroupVal !='' || typeVal !='')
        return {groupvalempty: true}
    
    return null
  }

  typeIsNotEmpty(control: AbstractControl): ValidationErrors | null{
    let typeVal = control.get('typeDesc')?.value;
    //console.log(typeVal)
    if (typeVal == undefined){
      return {typeValEmpty: true}
    }else
    return null
  }
  



}
