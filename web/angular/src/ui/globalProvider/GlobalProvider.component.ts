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
  type IYNgGlobalProviderProps,
} from './models/types'
import {
  type GlobalProviderReadyEvent,
} from '~core/ui/globalProvider/models/types'
import { YCoreGlobalProvider } from '~core/ui/globalProvider'
import { DefaultValue } from '~ng/utils/default-value.decorator'
import { GlobalContextService } from './classes/GlobalContext.service'
import { defineCustomElement } from '~web/shared/utils/components'
import { YCoreGlobalProviderTagName } from '~web/shared/constants'

const { plugins } = createNgGlobalProviderProps()

defineCustomElement(YCoreGlobalProviderTagName, YCoreGlobalProvider)

@Component({
  selector: 'YGlobalProvider',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <y-core-global-provider
      #litProvider
      (ready)="handleReady($event)"
      [plugins]="plugins"
    >
      <ng-content />
    </y-core-global-provider>
  `,
})

export class YGlobalProvider implements IYNgGlobalProviderProps {
  @Input() @DefaultValue(plugins) plugins: IYNgGlobalProviderProps['plugins'] = plugins
  @Output() ready = new EventEmitter<GlobalProviderReadyEvent>()

  @ViewChild('litProvider', { static: true }) litProviderRef!: ElementRef<YCoreGlobalProvider>
  private readonly globalContextService = inject(GlobalContextService)

  handleReady(event: unknown) {
    this.ready.emit(event as GlobalProviderReadyEvent)
    this.globalContextService.setContext(this.litProviderRef.nativeElement.globalContext)
  }
}
