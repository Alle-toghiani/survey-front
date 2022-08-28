import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-welcome-tab',
  templateUrl: './welcome-tab.component.html',
  styleUrls: ['./welcome-tab.component.scss']
})
export class WelcomeTabComponent implements OnInit {

  @Input() surveyId;
  @Input() submitIsLoading;
  @Input() set onReset(data){
    if (data === true) {
      this.form.reset();
    }
  };

  @Output() data = new EventEmitter<any>();

  form = new FormGroup({
    title: new FormControl(null),
    description: new FormControl(null),
    enterText: new FormControl('شروع', [Validators.required]),
  })

  submitForm(): void {
    const defaultObject = {
      description: "",
      description_text: "",
      description_text_active: true,
      enter_active: true,
      enter_text: "شروع",
      image_name: "",
      image_or_video: 1,
      image_path: "",
      image_video_active: false,
      order: 0,
      survey: this.surveyId,
      title: "",
      title_active: true,
      type: 1,
      video_url: ""
    }
    if (this.form.value.title){
      defaultObject.title_active = true;
      defaultObject.title = this.form.value.title;
    }
    if (this.form.value.description){
      defaultObject.description_text_active = true;
      defaultObject.description_text = this.form.value.description;
    }
    if (this.form.value.enterText){
      defaultObject.enter_active = true;
      defaultObject.enter_text = this.form.value.enterText;
    }
    this.data.emit(defaultObject);
  }

  constructor() {}

  ngOnInit(): void {
  }
}
