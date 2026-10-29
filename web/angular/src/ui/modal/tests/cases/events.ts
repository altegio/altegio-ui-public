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

export const eventOpenCases: IEventTestCase[] = [{ event: 'open', case: 'when the modal opens', methodName: EEventMethodName.HANDLE_OPEN }]

export const eventCloseCases: IEventTestCase[] = [{ event: 'close', case: 'when the modal closes', methodName: EEventMethodName.HANDLE_CLOSE }]

export const eventOverlayClickCases: IEventTestCase[] = [{ event: 'click-overlay', case: 'on overlay click', methodName: EEventMethodName.HANDLE_CLICK_OVERLAY }]

export const eventActivatorCLickCases: IEventTestCase[] = [{ event: 'click-activator', case: 'on activator click', methodName: EEventMethodName.HANDLE_CLICK_ACTIVATOR }]

export const eventCloseIconCLickCases: IEventTestCase[] = [{ event: 'click-close-icon', case: 'on close icon click', methodName: EEventMethodName.HANDLE_CLICK_CLOSE_ICON }]

export const eventPressEscapeCases: IEventTestCase[] = [{ event: 'press-escape', case: 'on Esc press', methodName: EEventMethodName.HANDLE_PRESS_ESCAPE }]
