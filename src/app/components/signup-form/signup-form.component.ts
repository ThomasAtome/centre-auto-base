import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  user: User;

  errorMsg: string;

  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router) {
    this.user = new User('','','','');
  }

  ngOnInit(): void {
    this._initForm();
  }

  /**
   * Method for init all the forms
   * @private
   */
  _initForm() {
    this.signUpForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  /**
   * Method called when the user try to signup
   */
  onSubmitSignupForm() {

    this.errorMsg = null;

    this.authService.signUp(this.user)
        .then(()=> {
          this.router.navigate(['dashboard']);
        })
        .catch(errMsg => this.errorMsg = errMsg);

  }

}
