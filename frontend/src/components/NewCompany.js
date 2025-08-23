import { useState } from 'react';

function NewCompany(props) {
    const {contact, companies, setCompanies} = props;
    const [company_name, setCompanyName] = useState('');
    const [company_address, setCompanyAddress] = useState('');

    async function createCompany(e) {
        e.preventDefault();
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company_name,
                company_address
            })
        });

        const data = await response.json();

        if (data.company_id) {
            setCompanies([...companies, data]);
        }

        setCompanyName('');
        setCompanyAddress('');
    }

	return (
        <form onSubmit={createCompany} onClick={(e) => e.stopPropagation()} className='new-company'>
            <input type='text' placeholder='Company Name' onChange={(e) => setCompanyName(e.target.value)} value={company_name}/>
            <input type='text' placeholder='Company Address' onChange={(e) => setCompanyAddress(e.target.value)} value={company_address}/>
            <button className='button green' type='submit'>Add {contact.name}'s Company</button>
        </form>
	);
}

export default NewCompany;