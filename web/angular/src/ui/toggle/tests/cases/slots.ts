import {
  slotAnnotationTestCases as coreSlotAnnotationTestCases,
} from '~core/ui/toggle/tests/cases/slots'

export const slotAnnotationTestCases = coreSlotAnnotationTestCases.map((testCase) => ({
  ...testCase,
  content: testCase.content || undefined,
}))
