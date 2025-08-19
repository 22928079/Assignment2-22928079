import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [number, setNumber] = useState('');
    const [category, setCategory] = useState('');

    async function createPhone(e) {
        e.preventDefault();
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category,
                number,
                
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setNumber('');
        setCategory('');
    }

	return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            {/* <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}/> */}
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value={'Home'}>Home</option>
                <option value={'Work'}>Work</option>
                <option value={'Mobile'}>Mobile</option>
                <option value={'Other'}>Other</option>
            </select>
            <input type='text' placeholder='Phone Number' onChange={(e) => setNumber(e.target.value)} value={number}/>
            <button className='button green' type='submit'>Add {contact.name}'s Phone</button>
        </form>
	);
}

export default NewPhone;