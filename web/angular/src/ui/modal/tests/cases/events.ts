export enum EEventMethodName {
  HANDLE_OPEN = 'handleOpen',
  HANDLE_CLOSE = 'handleClose',
  HANDLE_CLICK_OVERLAY = 'handleClickOverlay',
  HANDLE_CLICK_ACTIVATOR = 'handleClickActivator',
  HANDLE_CLICK_CLOSE_ICON = 'handleClickCloseIcon',
  HANDLE_PRESS_ESCAPE = 'handlePressEscape',
}

interface IEventTestCase {
  event: string
  case: string
  methodName: EEventMethodName
}

export const eventOpenCases: IEventTestCase[] = [{ event: 'open', case: 'при открытии окна', methodName: EEventMethodName.HANDLE_OPEN }]

export const eventCloseCases: IEventTestCase[] = [{ event: 'close', case: 'при закрытии окна', methodName: EEventMethodName.HANDLE_CLOSE }]

export const eventOverlayClickCases: IEventTestCase[] = [{ event: 'click-overlay', case: 'при клике по overlay', methodName: EEventMethodName.HANDLE_CLICK_OVERLAY }]

export const eventActivatorCLickCases: IEventTestCase[] = [{ event: 'click-activator', case: 'при клике по активатору', methodName: EEventMethodName.HANDLE_CLICK_ACTIVATOR }]

export const eventCloseIconCLickCases: IEventTestCase[] = [{ event: 'click-close-icon', case: 'при клике по иконке закрытия', methodName: EEventMethodName.HANDLE_CLICK_CLOSE_ICON }]

export const eventPressEscapeCases: IEventTestCase[] = [{ event: 'press-escape', case: 'при нажатии на esc', methodName: EEventMethodName.HANDLE_PRESS_ESCAPE }]
