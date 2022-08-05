import { ADD_EXPENSE, DELETE_EXPENSE,
  EDIT_EXPENSE, GET_CURRENCIES } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.currencies };

  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense].sort((a, b) => a.id - b.id),
      editor: false,
      idToEdit: 0,
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };

  case EDIT_EXPENSE:
    return { ...state, editor: true, idToEdit: action.id };

    // case UPDATE_EXPENSE:
    //   return {
    //     ...state,
    //     editor: false,
    //     idToEdit: 0,
    //     expenses: [...action.expenses],
    //   };

  default:
    return state;
  }
};

export default walletReducer;
