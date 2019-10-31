import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";
import { GET_INVENTORY, DELETE_ITEM, ADD_ITEM } from "./types";

// GET ITEMS
export const getInventory = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/inventory/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_INVENTORY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE ITEMS
export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/inventory/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteItem: "Item Deleted" }));
      dispatch({
        type: DELETE_ITEM,
        payload: id
      });
    })
    .catch(err => {
      console.log("delete items error", err);
    });
};

// ADD ITEM
export const addItem = item => (dispatch, getState) => {
  axios
    .post("http://localhost:8000/api/inventory/", item, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addItem: "Item added" }));
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
