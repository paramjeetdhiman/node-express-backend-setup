import React, { useContext, useEffect, useRef } from "react";
import { ContactContext } from "../../context/contact/contactContext";

export const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filtered, filterContacts, clearFilter } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const text = useRef("");

  const handleFilter = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={handleFilter}
      />
    </form>
  );
};
