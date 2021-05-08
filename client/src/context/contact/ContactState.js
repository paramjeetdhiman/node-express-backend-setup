import React, { useReducer } from "react";
import uuid from "uuid";
import { ContactContext } from "./contactContext";
import { ContactReducer } from "./ contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

export const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: "609528a8c15bbfbd595c1e8d",
        name: "Cipher Mate",
        email: "cmate@gmail.com",
        phone: "987-654-3210",
        type: "professional",
      },
      {
        id: "609528cfc15bbfbd595c1e8e",
        name: "Ted Johnson",
        email: "tjohnson@gmail.com",
        phone: "222-111-9999",
        type: "personal",
      },
      {
        id: "609528fsdfd595c1e8d",
        name: "Marcus Logon",
        email: "gjoe@gmail.com",
        phone: "666-777-3333",
        type: "professional",
      },
    ],
    current: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //// actions here....

  ///ADD CONTACT

  const addContact = (contact) => {
    ///generate a random id
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  /// DELETE CONTACT
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  /// SET CURRENT CONTACT
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  /// CLEAR CURRENT CONTACT
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  /// UDPATE CONTACT
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  /// FILTER CONTACT

  /// CLEAR FILTER

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};
