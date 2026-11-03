export const propTextWrapCases = [
  { textWrap: true, shouldHaveClass: true, description: 'Should add the _text-wrap class when textWrap=true' },
  { textWrap: false, shouldHaveClass: false, description: 'Should not add the _text-wrap class when textWrap=false' },
  { textWrap: undefined, shouldHaveClass: false, description: 'Should not add the _text-wrap class when textWrap=undefined' },
]
