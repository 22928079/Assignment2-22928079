import { useState } from 'react';

function Company(props) {
    
    const {contact, company, companies, setCompanies} = props;
    const [company_name, setCompanyName] = useState(company.company_name);
    const [company_address, setCompanyAddress] = useState(company.company_address);
    const [update, setUpdate] = useState(false);

    async function deleteCompany() {
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/companies/' + company.company_id, {
            method: 'DELETE',
        });

        let newCompanies = companies.filter((p) => {
            return p.company_id !== company.company_id;
        });

        setCompanies(newCompanies);
    }

    function allowEdit(){
        setUpdate(!update);
    }

    async function updateCompany(e) {
        e.preventDefault();
        company.company_name = company_name;
        company.company_address = company_address;
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/companies/' + company.company_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company_name,
                company_address
            })
        });

        allowEdit();
    }
    
	return (
		<tr>
            {!update?<>
            <td style={{width:'30%'}}>{ company.company_name }</td>
            <td>{ company.company_address }</td>
            </>:<>
            <td><input type='text' placeholder='Company Name' onChange={(e) => setCompanyName(e.target.value)} value={company_name}/>
            </td>
            <td><input type='text' placeholder='Company Address' onChange={(e) => setCompanyAddress(e.target.value)} value={company_address}/>
            </td>
            </>}
            
            <td style={
                {
                    width: '14px',
                    alignItems:'center'
                }
            }>
                {!update?<button className='button yellow' onClick={allowEdit}>Edit</button>:<button className='button yellow' onClick={updateCompany}>Save</button>}
                <button className="button red" onClick={deleteCompany}>Delete</button></td>
        </tr>
	);
}

export default Company;
