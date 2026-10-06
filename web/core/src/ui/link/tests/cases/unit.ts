export const propTextWrapCases = [
  { textWrap: true, shouldHaveClass: true, description: 'Должен добавлять класс _text-wrap при textWrap=true' },
  { textWrap: false, shouldHaveClass: false, description: 'Не должен добавлять класс _text-wrap при textWrap=false' },
  { textWrap: undefined, shouldHaveClass: false, description: 'Не должен добавлять класс _text-wrap при textWrap=undefined' },
]
