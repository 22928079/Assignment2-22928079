import { useState } from 'react';

function Phone(props) {
    const {contact, phone, phones, setPhones} = props;

    const [phone_number, setPhoneNumber] = useState(phone.phone_number);
    const [phone_type, setPhoneType] = useState(phone.phone_type);
    const [update, setUpdate] = useState(false);

    async function deletePhone() {
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones/' + phone.id, {
            method: 'DELETE',
        });

        let newPhones = phones.filter((p) => {
            return p.id !== phone.id;
        });

        setPhones(newPhones);
    }

    function allowEdit(){
        setUpdate(!update);
    }

    async function updatePhone(e) {
        e.preventDefault();
        phone.phone_type = phone_type;
        phone.phone_number = phone_number;
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones/' + phone.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_type,
                phone_number
            })
        });

        allowEdit();
    }
    
	return (
		<tr>
            {!update?<>
            <td style={{width:'30%'}}>{ phone.phone_type }</td>
            <td>{ phone.phone_number }</td>
            </>:<>
            <td><select onChange={(e) => setPhoneType(e.target.value)}>
                <option value={'Home'}>Home</option>
                <option value={'Work'}>Work</option>
                <option value={'Mobile'}>Mobile</option>
                <option value={'Other'}>Other</option>
            </select></td>
            <td><input type='text' placeholder='Phone Number' onChange={(e) => setPhoneNumber(e.target.value)} value={phone_number}/></td>
            </>}
            
            <td style={
                {
                    width: '14px',
                    alignItems:'center'
                }
            }>
                {!update?<button className='button yellow' onClick={allowEdit}>Edit</button>:<button className='button yellow' onClick={updatePhone}>Save</button>}
                <button className="button red" onClick={deletePhone}>Delete</button></td>
        </tr>
	);
}

export default Phone;
