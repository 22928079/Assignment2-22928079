import { useState, useEffect } from 'react';  // import useEffect
import PhoneList from './PhoneList.js';

function Contact(props) {
    const {contact, contacts, setContacts} = props;
    const [expanded, setExpanded] = useState(false);
    const [update, setUpdate] = useState(false);
    const [phones, setPhones] = useState([]);
    const [name, setName] = useState(contact.name);
    const [address, setAddress] = useState(contact.address);

    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/phones')
            .then(response => response.json())
            .then(data => setPhones(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch('http://localhost/api/contacts/' + contact.id, {
            method: 'DELETE',
        });

        let newContacts = contacts.filter((c) => {
            return c.id !== contact.id;
        });

        setContacts(newContacts);
    }

    function allowEdit(){
        setUpdate(!update);
    }

    async function doUpdate(e) {
        e.preventDefault();
        contact.name = name;
        contact.address = address;
        const response = await fetch('http://localhost/api/contacts/' + contact.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                address
            })
        });
        allowEdit();
    }

    return (
        <div key={contact.id} className='contact' >
            
            <div className='title' onClick={(e) => setExpanded(!expanded)}>
                <h3>Contact Summary:</h3>
                {!update?
                <>
                <p><strong>Name:</strong>{contact.name}</p>
                <p><strong>Address:</strong>{contact.address}</p>
                <p><i>Click the contact to <strong>expand or collapse</strong> {contact.name}'s phone list</i></p>
                </>
                :
                <>
                <p><strong>Name:</strong>
                <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}/>
                </p>
                <p><strong>Address:</strong>
                <input type='text' placeholder='Address' onChange={(e) => setAddress(e.target.value)} value={address}/>
                </p>
                <p><i>Click the contact to <strong>expand or collapse</strong> {contact.name}'s phone list</i></p>
                </>
                }
            </div>
            <div className="contact-button">
            {!update?<button className='button yellow' onClick={allowEdit}>Edit Contact</button>:<button className='button yellow' onClick={doUpdate}>Save Contact</button>}
            <button className='button red' onClick={doDelete}>Delete Contact</button>
            </div>

            <div style={expandStyle}>
                <hr />
                <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
            </div>
        </div>
    );
}

export default Contact;
