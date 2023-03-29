import { FormControl } from "@angular/forms";

export interface FormCreateChannel {
  name: FormControl<string>,
  isPublic: FormControl<boolean>,
}
