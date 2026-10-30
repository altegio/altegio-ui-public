import { ErrorHandler, NgModule } from '@angular/core'
import { SentryErrorHandler } from '~web/angular/src/plugins/sentry'
import { AltGlobalProvider } from './GlobalProvider.component'

@NgModule({
  imports: [AltGlobalProvider],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
})
export class GlobalProviderModule {}
