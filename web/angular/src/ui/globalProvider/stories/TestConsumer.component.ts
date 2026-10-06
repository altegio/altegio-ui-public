import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '~core/ui/globalProvider/stories/TestConsumer.core'

@Component({
  selector: 'TestConsumer',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: '<y-core-test-consumer></y-core-test-consumer>',
})
export class TestConsumer {}
