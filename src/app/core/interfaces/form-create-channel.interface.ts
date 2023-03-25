import { FormControl } from "@angular/forms";

export interface FormCreateChannel {
  name: FormControl<string>,
  description: FormControl<string>,
}
