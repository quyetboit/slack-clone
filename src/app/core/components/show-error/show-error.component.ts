import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-show-error',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.scss']
})
export class ShowErrorComponent {
  @Input() control!: AbstractControl<any>;
  @Input() controlName = '';

  get keyError () {
    const key = (this.control && this.control.errors) ? Object.keys(this.control?.errors)[0] : '';
    return key;
  }
}
