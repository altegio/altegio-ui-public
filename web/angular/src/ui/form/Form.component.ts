import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  type ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'

import '~core/ui/form'
import type { AltCoreForm } from '~core/ui/form'
import type {
  FormInvalidEvent,
  FormSubmitEvent,
  IAltCoreFormInvalidDetail,
  IAltCoreFormSubmitDetail,
} from '~core/ui/form/models/types'
import {
  createNgFormProps,
  type IAltNgFormProps,
} from '~ng/ui/form/models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { noErrorFocus } = createNgFormProps()

@Component({
  selector: 'AltForm',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { style: 'display: block;' },
  // A plain <form>: the component does not import FormsModule, so Angular adds no NgForm to it
  template: `
    <alt-core-form
      #coreForm
      [noErrorFocus]="noErrorFocus"
      (form-submit)="handleSubmit($any($event))"
      (form-invalid)="handleInvalid($any($event))"
      (form-reset)="formReset.emit()"
    >
      <form>
        <ng-content />
      </form>
    </alt-core-form>
  `,
})
export class AltForm implements IAltNgFormProps {
  @Input() @DefaultValue(noErrorFocus) noErrorFocus: IAltNgFormProps['noErrorFocus'] = noErrorFocus

  /** Emits `{ formData, submitter }` after a submit with valid fields */
  @Output() formSubmit = new EventEmitter<IAltCoreFormSubmitDetail>()

  /** Emits `{ controls }`, the invalid fields, after a submit or `validate()` that fails */
  @Output() validationError = new EventEmitter<IAltCoreFormInvalidDetail>()

  /** Emits after the form restored its values */
  @Output() formReset = new EventEmitter<void>()

  @ViewChild('coreForm', { static: true }) private coreFormRef!: ElementRef<AltCoreForm>

  /**
   * Validates every field and shows the messages
   * @returns {Promise<boolean>} Whether all fields are valid
   */
  validate() {
    return this.coreFormRef.nativeElement.validate()
  }

  /** Hides the validation messages of every field */
  resetValidation() {
    this.coreFormRef.nativeElement.resetValidation()
  }

  /** Validates and submits the form */
  submit() {
    this.coreFormRef.nativeElement.submit()
  }

  /** Restores the initial values and hides the validation messages */
  reset() {
    this.coreFormRef.nativeElement.reset()
  }

  handleSubmit(event: FormSubmitEvent) {
    this.formSubmit.emit(event.detail)
  }

  handleInvalid(event: FormInvalidEvent) {
    this.validationError.emit(event.detail)
  }
}
