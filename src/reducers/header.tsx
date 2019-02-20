interface HeaderAction extends Action {
  payload: Header,
}

export default function header(state = {}, action: HeaderAction) {
  if (action.type === 'SET_HEADER') {
    return {
      ...state,
      title: action.payload.title,
      breadcrumbs: action.payload.breadcrumbs,
     };
  }

  return state;
}