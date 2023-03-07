import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { useParams, useNavigate, Link } from "react-router-dom";
import { ContactContext } from './ContactContext'
import { useContext, useState, useEffect } from 'react'

function Contact(props) {

  let params = useParams()
  let navigate = useNavigate()

  let { getContact, deleteContact } = useContext(ContactContext)
  let [ contact, setContact ] = useState()

  useEffect(() => {
    async function fetch() {
      await getContact(params.contactId)
        .then((contact) => setContact(contact))
    }
    fetch()
  }, [params.contactId]);

  function handleDeleteContact(id) {
    deleteContact(id)
    navigate('/contacts')
  }

  function loading() {
    return <div className="w-25 text-center"><Spinner animation="border" /></div>
  }

  function contactCard() {
    let { id, name, email, phone, avatar } = contact
    return (
      <Card className="align-self-start w-25">
        <Card.Img variant="top" src={require(`../node_modules/fake-avatars/avatars/png/${avatar}`).default} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
          <Card.Text>
            <strong>Phone:</strong> <span>{phone}</span>
          </Card.Text>
          <Link to={`/contacts/${id}/edit`} className="btn btn-primary mx-3">Edit</Link>
          <Button variant="danger" onClick={handleDeleteContact.bind(this, id)}>Delete</Button>
        </Card.Body>
      </Card>
    )
  }
  if (contact === undefined) return loading()
  return contact.id !== parseInt(params.contactId) ?  loading() : contactCard()
}

export default Contact