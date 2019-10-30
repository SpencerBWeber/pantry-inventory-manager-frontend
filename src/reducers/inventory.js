import {
  GET_INVENTORY,
  DELETE_ITEM,
  ADD_ITEM,
  CLEAR_ITEMS
} from "../actions/types";

const initialState = {
  inventory: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return {
        ...state,
        inventory: action.payload
      };
    case DELETE_ITEM:
      return {
        ...state,
        inventory: state.inventory.filter(item => item.id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        inventory: [...state.inventory, action.payload]
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        inventory: []
      };
    default:
      return state;
  }
}
