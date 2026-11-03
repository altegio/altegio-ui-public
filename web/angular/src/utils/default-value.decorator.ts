import { Input } from '@angular/core'

export const DefaultValue = (defaultValue: unknown): PropertyDecorator => {
  const decorator = Input({ transform: (value: unknown) => value === undefined ? defaultValue : value }) as PropertyDecorator

  return (target: object, propertyKey: string | symbol): void => {
    decorator(target, propertyKey)
  }
}
