import {
  slotBeforeTestCases as coreSlotBeforeTestCases,
  slotLabelTestCases as coreSlotLabelTestCases,
  slotAnnotationTestCases as coreSlotAnnotationTestCases,
  slotMainTestCases as coreSlotMainTestCases,
  slotContentTestCases as coreSlotContentTestCases,
  slotAfterTestCases as coreSlotAfterTestCases,
} from '~core/ui/collapseItem/tests/cases/slots'

export const slotBeforeTestCases = coreSlotBeforeTestCases.map((testCase) => ({
  ...testCase,
  content: testCase.content || undefined,
}))

export const slotLabelTestCases = coreSlotLabelTestCases.map((testCase) => ({
  ...testCase,
  content: testCase.content || undefined,
}))

export const slotAnnotationTestCases = coreSlotAnnotationTestCases.map((testCase) => ({
  ...testCase,
  content: testCase.content || undefined,
}))

export const slotMainTestCases = coreSlotMainTestCases.map((testCase) => ({
  ...testCase,
  content: testCase.content || undefined,
}))

export const slotContentTestCases = coreSlotContentTestCases.map((testCase) => ({
  ...testCase,
  content: testCase.content || undefined,
}))

export const slotAfterTestCases = coreSlotAfterTestCases.map((testCase) => ({
  ...testCase,
  content: testCase.content || undefined,
}))
