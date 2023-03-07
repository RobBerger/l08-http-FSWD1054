import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const ContactContext = createContext()

export const ContactProvider = (props) => {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    async function getContacts() {
      await refreshContacts()
    }
    getContacts()
  }, []);

  function refreshContacts() {
    return axios.get("http://localhost:3001/contacts")
      .then(response => {
        setContacts(response.data)
      })
  }

  function getContact(id) {
    return axios.get(`http://localhost:3001/contacts/${id}`)
      .then(response =>
        new Promise((resolve) => resolve(response.data))
      )
  }

  function deleteContact(id) {
    axios.delete(`http://localhost:3001/contacts/${id}`)
      .then(refreshContacts)
  }

  function addContact(contact) {
  }

  function updateContact(contact) {
  }

  return (
    <ContactContext.Provider
      value={{
        contacts,
        getContact,
        deleteContact,
        addContact,
        updateContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}