import '@angular/compiler'
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
import { TestBed } from '@angular/core/testing'
import 'zone.js'
import 'zone.js/testing'

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
)

export { TestBed }
