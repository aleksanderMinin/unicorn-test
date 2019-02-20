const initialState: LayoutState = {
  show: false,
}

export default function layout(state = initialState, action: Action) {
  switch (action.type) {
    case 'SHOW_MODAL': {
      return {
        show: action.payload.show,
      }
    }
    default:
    break;
  }
  return state;
}