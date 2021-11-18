import React, { useState } from 'react';

const AddClientForm = props => {

    const initialFormState = { name: '', email: ''};
    const [client, setClient] = useState(initialFormState);

    const handleInputChange = event => {
        const {name, value} = event.target;

        setClient({ ...client, [name]: value });
    }

    const submitForm = event => {
        event.preventDefault();

        if (!client.name || !client.email) return;

        props.addClient(client);
        setClient(initialFormState);
    };

    return (
        <div className="row">

            <form className="col s12"
                onSubmit={submitForm}>
                <div className="row">
                    <table id="customers">
                    <thead>
                        <tr>
                            <td align="center">Name</td>
                            <td><input type="text" 
                                id="name" 
                                name="name" 
                                value={client.name}
                                onChange={handleInputChange} 
                                required />
                            </td>
                        </tr>
                        <tr>
                            <td align="center">E-mail</td>
                            <td><input 
                                type="text" 
                                name="email" 
                                value={client.email}
                                onChange={handleInputChange} 
                                required />
                            </td>
                        </tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr>
                            <td colSpan="2" align="center"><button className="waves-effect waves-light btn">add</button></td>
                        </tr>
                    </thead>
                    </table>
                </div>
                
                <div className="row">
                    <div className="input-field col s12">

                        
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddClientForm;
