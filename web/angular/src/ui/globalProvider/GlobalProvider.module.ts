import { ErrorHandler, NgModule } from '@angular/core'
import { SentryErrorHandler } from '~web/angular/src/plugins/sentry'
import { YGlobalProvider } from './GlobalProvider.component'

@NgModule({
  imports: [YGlobalProvider],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
})
export class GlobalProviderModule {}
