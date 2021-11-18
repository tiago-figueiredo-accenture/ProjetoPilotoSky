import React, { Component } from 'react'
import AddClientForm from './AddClientForm';
import UpdateClientForm from './UpdateClientForm';
import Axios from 'axios';

export default class Home extends Component {

  constructor() {
      super();
      this.state = {
        clients: []
      }
  }
  
  componentDidMount() {
    this.refreshTable();
  }

  refreshTable() {
    var th = this;
    this.serverRequest = Axios.get("clients")
    .then(function(event) { 
        th.setState({
            clients: event.data
        });
    })
  }

  addClient = client => {
    Axios.post("clients", client)
        .then(res => {
            this.refreshTable();
        });
  };

  updateClient = client => {
    Axios.put("clients/"+client.id)
    .then(res => {
      this.refreshTable();
    });
  };

  deleteClient = client => {
    Axios.delete("clients/"+client.id)
        .then(res => {
          this.refreshTable();
        });
  };

  render(){
    return(
        <div className="App">
          <header className="App-header">

            <div>
              <AddClientForm addClient={this.addClient} />
            </div>
            <div className="App-intro">
              <h2>Lista de Clientes</h2>
              <table id="customers" border="1">
                <thead>
                  <tr>
                    <td align="center">Id</td>               
                    <td align="center">Name</td>
                    <td align="center">E-mail</td>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.clients.map (client => (

                      <tr key={client.id}>
                          <td>{client.id}</td>
                          <td>{client.name}</td>
                          <td>{client.email}</td>
                          <td><button type="button" onClick={() => this.updateClient(client.id)}>update</button></td>
                          <td><button onClick={() => this.deleteClient(client)}>delete</button></td> 
                      </tr>
                      ))
                  }          
                </tbody>
              </table>
            </div>
            <div>
              <UpdateClientForm currentClient={this.client} updateClient={this.updateClient} />
            </div>
        </header>
      </div>
    )
  }
}