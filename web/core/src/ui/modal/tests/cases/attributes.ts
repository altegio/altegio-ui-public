interface IAttrTestCase {
  attr: string
  expected: string
}

export const attributeAriaCases: IAttrTestCase[] = [
  { attr: 'role', expected: 'dialog' },
  { attr: 'aria-modal', expected: 'true' },
  { attr: 'aria-label', expected: 'Dialog' },
]
