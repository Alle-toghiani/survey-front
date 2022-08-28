import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-multiple-question-tab',
  templateUrl: './multiple-question-tab.component.html',
  styleUrls: ['./multiple-question-tab.component.scss']
})
export class MultipleQuestionTabComponent implements OnInit {

  @Input() surveyId;
  @Input() submitIsLoading;
  @Input() order;

  @Output() data = new EventEmitter<any>();

  validateForm!: UntypedFormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `${id}`
    };
    const index = this.listOfControl.push(control);
    // console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new UntypedFormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      // console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  submitForm(): void {
    if (this.validateForm.valid && Object.keys(this.validateForm.value).length > 2) {
      const defaultObject = {
        allow_multiple_select: false,
        answer_required: false,
        choices: [],
        description_text: "",
        description_text_active: false,
        image_name: "",
        image_or_video: 1,
        image_path: "",
        image_video_active: false,
        max_selectable_choices: 2,
        min_selectable_choices: 0,
        order: this.order,
        question_number_is_hidden: false,
        randomize: false,
        survey: this.surveyId,
        title: this.validateForm.value.title,
        type: 3,
        vertical_choices: false,
        video_url: ""
      }

      Object.keys(this.validateForm.value).forEach(
        (option,index) => {
          if (!isNaN(+option)){
            const defaultChoice =
              {
                name: this.validateForm.value[option],
                order: index
              };
            defaultObject.choices.push(defaultChoice)
          }
        }
      )
      this.data.emit(defaultObject);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group(
      {
        title: [null, [Validators.required]]
      });
    this.addField();
  }

}
