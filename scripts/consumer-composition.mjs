import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export async function writeCompositionFixtures(scratch) {
  const cases = []
  const style = "import '@altegio/ui/assets/css/altegio-ui-with-fonts.css'\n"
  for (const [name, entries] of [
    ['angular-button-text-field', ['angular/button', 'angular/text-field']],
    ['angular-button-icon', ['angular/button', 'angular/icon']],
    ['angular-icon-alone', ['angular/icon']],
    ['angular-barrel-component', ['angular', 'angular/button']],
    ['angular-barrel-identity', ['angular', 'angular/button']],
    ['core-angular', ['core/button', 'angular/button']],
    ['vue-core-angular', ['vue/button', 'core/button', 'angular/button']],
  ]) {
    const entry = `composition-${name}.ts`
    const bare = ['angular-button-text-field', 'angular-button-icon', 'angular-barrel-component', 'core-angular'].includes(name)
    const imports = entries.map((entry, index) => bare ? `import '@altegio/ui/${entry}'` : `import * as entry${index} from '@altegio/ui/${entry}'`).join('\n')
    const checks = name === 'angular-barrel-identity' ? 'entry0.AltButton === entry1.AltButton' : 'true'
    await writeFile(join(scratch, entry), `${style}${imports}\nObject.assign(window, { consumerReady: true, consumerIdentity: ${checks}, consumerEntries: [${bare ? '' : entries.map((_, index) => `entry${index}`).join(',')}] })\n`)
    cases.push({ name, entry })
  }
  await writeFile(join(scratch, 'angular-composition.ts'), `
import { Component, ViewChild, provideZonelessChangeDetection, type AfterViewInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { bootstrapApplication } from '@angular/platform-browser'
import { AltGlobalProvider, I18nPlugin } from '@altegio/ui/angular/global-provider'
import { AltForm } from '@altegio/ui/angular/form'
import { AltTextField } from '@altegio/ui/angular/text-field'
import { AltButton } from '@altegio/ui/angular/button'
import { AltCalendar } from '@altegio/ui/angular/calendar'
import { AltCoreGlobalProvider, I18nPlugin as CoreI18nPlugin } from '@altegio/ui/core/global-provider'
import { AltCoreButton } from '@altegio/ui/core/button'
import { AltCoreTextField } from '@altegio/ui/core/text-field'
import { AltCoreCalendar } from '@altegio/ui/core/calendar'
import { AltCoreForm } from '@altegio/ui/core/form'

const base = new I18nPlugin().getLocale()
const locale = { ...base, messages: { ...base.messages, nextMonth: 'Shared next month' } }
@Component({
  selector: 'app-root',
  imports: [FormsModule, AltGlobalProvider, AltForm, AltTextField, AltButton, AltCalendar],
  template: '<AltGlobalProvider [plugins]="plugins"><AltCalendar /><AltForm (formSubmit)="submitted($event)"><AltTextField name="email" accessibleName="Consumer email" [(ngModel)]="email" [required]="true" /><AltButton label="Submit composed form" type="submit" /></AltForm></AltGlobalProvider>',
})
class App implements AfterViewInit {
  email = 'initial@example.test'
  readonly plugin = new I18nPlugin(locale)
  readonly plugins = [this.plugin]
  @ViewChild(AltGlobalProvider) provider!: AltGlobalProvider
  ngAfterViewInit() {
    // This assignment also checks public declaration identity across the frameworks.
    const provider: AltCoreGlobalProvider = this.provider.litProviderRef.nativeElement
    Object.assign(window, {
      consumerIdentity: I18nPlugin === CoreI18nPlugin &&
        provider instanceof AltCoreGlobalProvider &&
        customElements.get('alt-core-button') === AltCoreButton &&
        customElements.get('alt-core-text-field') === AltCoreTextField &&
        customElements.get('alt-core-form') === AltCoreForm &&
        customElements.get('alt-core-calendar') === AltCoreCalendar,
      consumerChangeLocale: () => this.plugin.setLocale({ ...locale, messages: { ...locale.messages, nextMonth: 'Updated shared month' } }),
    })
  }
  submitted(event: { formData: FormData }) {
    Object.assign(window, { consumerSubmission: Object.fromEntries(event.formData) })
  }
}
bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] }).then(() => {
  Object.assign(window, { consumerReady: true })
}).catch(error => { throw error })
`)
  await writeFile(join(scratch, 'composition-provider-form.ts'), `${style}import './compiled/angular-composition.js'\n`)
  cases.push({ name: 'provider-form', entry: 'composition-provider-form.ts', angularSource: 'angular-composition.ts' })
  return cases
}

export async function verifyComposition(page, testCase) {
  await page.waitForFunction(() => window.consumerReady === true)
  assert.equal(await page.evaluate(() => window.consumerIdentity), true, `${testCase.name}: canonical runtime/type identities`)
  if (testCase.name === 'provider-form') {
    await page.getByRole('button', { name: 'Shared next month', exact: true }).waitFor({ state: 'visible' })
    await page.evaluate(() => window.consumerChangeLocale())
    await page.getByRole('button', { name: 'Updated shared month', exact: true }).waitFor({ state: 'visible' })
    await page.getByRole('textbox', { name: 'Consumer email', exact: true }).fill('composed@example.test')
    await page.getByRole('button', { name: 'Submit composed form', exact: true }).click()
    await page.waitForFunction(() => window.consumerSubmission?.email === 'composed@example.test')
  } else {
    assert.equal(await page.evaluate(() => Boolean(customElements.get('alt-core-button'))), testCase.name !== 'angular-icon-alone', testCase.name)
    if (testCase.name === 'angular-button-text-field') assert.equal(await page.evaluate(() => Boolean(customElements.get('alt-core-text-field'))), true)
    if (['angular-button-icon', 'angular-icon-alone'].includes(testCase.name)) assert.equal(await page.evaluate(() => Boolean(customElements.get('alt-core-icon'))), true)
  }
}
