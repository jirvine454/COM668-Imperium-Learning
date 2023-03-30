import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  student_list: any = [];
  page: number = 1;
  studentForm: any;
  currentStudentID: any;

  constructor(public webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.student_list = this.webService.getStudent(
      this.route.snapshot.params['id']);

    this.studentForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      student_image: ['', Validators.required]
    });
  }

  onEditStudent(student: any) {
    console.log(student);
    this.studentForm = this.formBuilder.group({
      email: [student.email, Validators.required],
      name: [student.name, Validators.required],
      student_image: [student.student_image, Validators.required]
    });

    this.currentStudentID = student._id;
    console.log(this.studentForm.value);
  }

  saveStudent(student: any) {
    this.webService.updateStudent(this.currentStudentID, this.studentForm.value).subscribe((response: any) => {
      this.studentForm.reset();
      this.student_list = this.webService.getStudent(
        this.route.snapshot.params['id']);
      this.openSnackBar(student.student.name + " has been successfully updated!");
    });
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, { duration: 5 * 1000 });
  }

  isInvalid(control: any) {
    return this.studentForm.controls[control].invalid && this.studentForm.controls[control].touched;
  }

  isUntouched() {
    return this.studentForm.controls.name.pristine || this.studentForm.controls.review.pristine;
  }

  isIncomplete() {
    return this.isInvalid('name') ||
      this.isInvalid('email') ||
      this.isInvalid('student_image') ||
      this.isUntouched();
  }
}
