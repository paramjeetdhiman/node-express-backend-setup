import { useReducer } from "react";
import uuid from "uuid";
import { AlertContext } from "./alertContex";
import { AlertReducer } from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

export const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  ///actions here...

  //setAlert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}>
      {props.children}
    </AlertContext.Provider>
  ); 
};
