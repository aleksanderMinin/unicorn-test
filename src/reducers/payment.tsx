const initialState: PaymentState = {
  progress: 0,
  success: false,
}

export default function payment(state = initialState, action: Action) {
  switch (action.type) {
    case 'PAYMENT_PROGRESS_UPDATE': {
      return {
        progress: Number(action.payload) * 100,
        success: false,
      }
    }
    case 'PAYMENT_CONFIRMED': {
      return {
        progress: 0,
        success: true,
      }
    }
    default:
      break;
  }
  return state;
}
