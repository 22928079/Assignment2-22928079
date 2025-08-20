import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [phone_number, setPhoneNumber] = useState('');
    const [phone_type, setPhoneType] = useState('Home');

    async function createPhone(e) {
        e.preventDefault();
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_type,
                phone_number
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setPhoneNumber('');
    }

	return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            {/* <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}/> */}
            <select onChange={(e) => setPhoneType(e.target.value)}>
                <option value={'Home'}>Home</option>
                <option value={'Work'}>Work</option>
                <option value={'Mobile'}>Mobile</option>
                <option value={'Other'}>Other</option>
            </select>
            <input type='text' placeholder='Phone Number' onChange={(e) => setPhoneNumber(e.target.value)} value={phone_number}/>
            <button className='button green' type='submit'>Add {contact.name}'s Phone</button>
        </form>
	);
}

export default NewPhone;