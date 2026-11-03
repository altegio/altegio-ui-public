import type { ElementRef } from '@angular/core'
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Output,
  EventEmitter,
  Input,
  inject,
  ViewChild,
} from '@angular/core'

import '~core/ui/globalProvider'
import {
  createNgGlobalProviderProps,
  type IAltNgGlobalProviderProps,
} from './models/types'
import {
  type GlobalProviderReadyEvent,
} from '~core/ui/globalProvider/models/types'
import { AltCoreGlobalProvider } from '~core/ui/globalProvider'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { GlobalContextService } from './classes/GlobalContext.service'
import { defineCustomElement } from '~web/shared/utils/components'
import { AltCoreGlobalProviderTagName } from '~web/shared/constants'

const { plugins } = createNgGlobalProviderProps()

defineCustomElement(AltCoreGlobalProviderTagName, AltCoreGlobalProvider)

@Component({
  selector: 'AltGlobalProvider',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <alt-core-global-provider
      #litProvider
      (ready)="handleReady($event)"
      [plugins]="plugins"
    >
      <ng-content />
    </alt-core-global-provider>
  `,
})

export class AltGlobalProvider implements IAltNgGlobalProviderProps {
  @Input() @DefaultValue(plugins) plugins: IAltNgGlobalProviderProps['plugins'] = plugins
  @Output() ready = new EventEmitter<GlobalProviderReadyEvent>()

  @ViewChild('litProvider', { static: true }) litProviderRef!: ElementRef<AltCoreGlobalProvider>
  private readonly globalContextService = inject(GlobalContextService)

  handleReady(event: unknown) {
    this.ready.emit(event as GlobalProviderReadyEvent)
    this.globalContextService.setContext(this.litProviderRef.nativeElement.globalContext)
  }
}
