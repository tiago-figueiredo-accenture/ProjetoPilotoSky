import React, { useState, useEffect } from 'react';

const UpdateClientForm = props => {

    const [client, setClient] = useState(props.currentClient);

    const handleInputChange = event => {
        const { name, value } = event.target

        setClient({ ...client, [name]: value })
    };

    useEffect(() => {
        setClient(props.currentClient);
    }, [props]);

    return (
        
        <div>teste</div>
        
        
    );
};

export default UpdateClientForm;
