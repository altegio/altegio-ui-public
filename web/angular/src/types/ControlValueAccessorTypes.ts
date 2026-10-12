export type TYNgControlValueTypes<T> = {
  ngModel: T
  ngModelChange: (value: T) => void
}
