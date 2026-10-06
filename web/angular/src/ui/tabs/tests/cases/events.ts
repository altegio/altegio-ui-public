export enum EEventMethodName {
  HANDLE_CHANGE_VALUE = 'changeActiveTabHandler',
}

interface IEventTestCase {
  event: string
  coreEventName: string
  case: string
  methodName: EEventMethodName
  payload?: { value: number }
}

export const eventUpdateValue: IEventTestCase[] = [{ event: 'valueChange', coreEventName: 'change-active-tab', case: 'при смене активного Tab', methodName: EEventMethodName.HANDLE_CHANGE_VALUE, payload: { value: 0 } }]
