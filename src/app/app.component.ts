import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from './Password_Match/password.match.validator';
import { DataService } from './data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular Reactive Form Validation';
  registerForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private dataService: DataService) {}

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        address: this.fb.array([]),
        email: ['', [Validators.required, Validators.email]],
        mobileNumber: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: passwordMatch('password', 'confirmPassword'),
      }
    );

    this.getJsonData();
  }

  address() {
    return this.registerForm.get('address') as FormArray;
  }

  newAddress(): FormGroup {
    return this.fb.group({
      address: ['', Validators.required],
    });
  }

  addAddress() {
    this.address().push(this.newAddress());
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      alert('Form Invalid');
    } else {
      console.log(JSON.stringify(this.registerForm.value));
      this.registerForm.reset();
      this.registerForm.removeValidators;
    }
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  getJsonData() {
    this.dataService.getData().subscribe((data) => {
      console.log('getdata ', data);
    });
  }
}
