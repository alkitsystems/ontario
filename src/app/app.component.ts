import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";
import * as _ from 'lodash'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ontario';

  submitted = false;

  feedbackFormControlNames = ['name', 'email', 'postalCode'];

  feedbackForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
    postalCode: ['', [Validators.required, Validators.pattern('^[ABCEGHJ-NPRSTVXYabceghj-nprstvxy]\\d[ABCEGHJ-NPRSTV-Zabceghj-nprstv-z][ -]?\\d[ABCEGHJ-NPRSTV-Zabceghj-nprstv-z]\\d$')]],  // [A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d <--- not used, as this simplified pattern allows some restricted values!
  });

  feedbackFormErrors: { formControlName: string; errorType: string; errorMessage: string }[] = [
    {
      formControlName: 'name',
      errorType: 'required',
      errorMessage: 'The name field must not be empty.'
    },
    {
      formControlName: 'email',
      errorType: 'required',
      errorMessage: 'The email address field must not be empty.'
    },
    {
      formControlName: 'email',
      errorType: 'pattern',
      errorMessage: 'Your email address must be a valid email address.'
    },
    {
      formControlName: 'postalCode',
      errorType: 'required',
      errorMessage: 'The postal code field must not be empty.'
    },
    {
      formControlName: 'postalCode',
      errorType: 'pattern',
      errorMessage: 'Your postal code must be a valid postal code.'
    }
  ];

  TRANSLATION = 'ROOT.'

  getFeedbackFormControlByName(controlName: string): FormControl<any> {
    return this.feedbackForm.get(controlName) as FormControl;
  }

  getErrorsByControlName(ontrolName: string): ValidationErrors | null {
    return this.getFeedbackFormControlByName(ontrolName).errors;
  }

  getErrorMessage(formControlName: string, errorType: string): string {
    if (!formControlName || !errorType) {
      return ''
    }

    const obj = _.find(this.feedbackFormErrors, { 'formControlName': formControlName, 'errorType': errorType });
    return !_.isEmpty(obj)? obj.errorMessage: '';
  }

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
  }

  @HostListener('window:currentLanguageChanged', ['$event']) eventHandler(event: { detail: any; }) {
    // console.log(event.detail.currentLanguage);
    this.translate.use(event.detail.currentLanguage);
  }

  ngOnInit(): void {

  }

  get f() { return this.feedbackForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.feedbackForm.invalid) {
        setTimeout(() => {
          this.submitted = false;
        }, 10000);      
        return;
    }
    
    console.log(this.feedbackForm.value);
    setTimeout(() => {
      this.onReset();
    }, 10000);  
  }

  onReset() {
    this.submitted = false;
    this.feedbackForm.reset();
  }

}
