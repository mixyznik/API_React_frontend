import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {name: {}, number: {}, name1: {}, users: {} };
 this.onFormSubmit=this.onFormSubmit.bind(this)
 this.handleChange = this.handleChange.bind(this);
 this.handleChange1 = this.handleChange1.bind(this);
 this.handleSerach = this.handleSerach.bind(this);
 this.onFormSubmit1=this.onFormSubmit1.bind(this);
 this.handleDelete=this.handleDelete.bind(this);
  }

handleChange(event) {
    this.setState({name: event.target.value});
     // console.log(this.state.name, "oooo");
  }

handleChange1(event) {
    this.setState({number: event.target.value});
     // console.log(this.state.name, "oooo");
  }


onFormSubmit(e) {
       e.preventDefault();
       let name=e.target.elements.firstname.value;
       console.log(name);
       let number=e.target.elements.number.value;
       console.log(number);
       console.log(this.state.name, "oooo");
       console.log(this.state.number, "oooo");

  axios.post('http://localhost:3000/add/', {
  name: name,
    number: number
  })
  .then(function (response) {
    console.log(response,"nema");
  })
  .catch(function (error) {
    console.log(error);
  });

}

handleSerach(event) {
  this.setState({name1: event.target.value});
   // console.log(this.state.name, "oooo");
}

onFormSubmit1(e) {
      e.preventDefault();
      var self = this;
  axios.get(`http://localhost:3000/getnumber/${this.state.name1}`)
  .then(function (response) {
  console.log(response);
  self.setState({users: response.data});
  console.log(this.state.users);
})
  .catch(function (error) {
    console.log(error);
  });

}

handleDelete(e) {
  e.preventDefault();
  let id=e.target.elements.id.value;
  axios.delete(`http://localhost:3000/${id}`)
  .then(function (response) {
  console.log(response);
  console.log(this.state.users);
})
  .catch(function (error) {
    console.log(error);
  });

}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

          <div>
          <p>Add new contact</p>
          <form onSubmit={this.onFormSubmit}>
        <input type="text" placeholder="Enter Name" name="firstname" onChange={this.handleChange} />
        <input type="number" placeholder="Enter Number" name="number" onChange={this.handleChange1}/>
        <button id="ton">Confirm</button>
      </form>
      </div>
      <div>
      <p>search contact</p>
      <form onSubmit={this.onFormSubmit1}>
    <input type="text" placeholder="Enter Name" name="firstname" onChange={this.handleSerach} />
    <button id="ton">Confirm</button>
  </form>
    <p>delete contact</p>
  <form onSubmit={this.handleDelete}>
    <input type="number" placeholder="Enter Number" name="id" />
    <button id="ton">Delete</button>
      </form>
  </div>

      <div><pre>{JSON.stringify(this.state.users, null, 2)} </pre></div>
       
      </div>
    );
  }
}

export default App;
