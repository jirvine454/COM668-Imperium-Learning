import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AuthService as env } from '@auth0/auth0-angular';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	email = '';
	password = '';
	error: any = null;

	constructor(
		private auth: AuthService,
		private router: Router,
		private spinner: NgxSpinnerService,
		public studentService: StudentService,
		public authService: env
	) { }

	ngOnInit(): void { }

	async register() {
		this.spinner.show();

		this.auth.register(this.email, this.password).subscribe(
			(res) => {
				console.log('after regiester: ', res);
				this.spinner.hide();
				this.login();
			},
			(err) => {
				this.spinner.hide();
				this.error = err.error;
			}
		);
		console.log(this.email);

		// Posts email to students collection in MongoDB
		this.studentService.postStudent(this.email).subscribe((response: any) => {
            console.log(response);
        });
	}
	
	async login() {
		this.spinner.show();

		this.auth.login(this.email, this.password).subscribe(
			(res) => {
				console.log(res);
				this.spinner.hide();
				this.router.navigateByUrl('/app/home', { replaceUrl: true });
			},
			(err) => {
				this.spinner.hide();
				this.error = err.error;
			}
		);
	}
}
