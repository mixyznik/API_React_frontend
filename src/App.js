import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {name: {}, number: {}, name1: {}, users: {}, users1: {} };
 this.onFormSubmit=this.onFormSubmit.bind(this)
 this.handleChange = this.handleChange.bind(this);
 this.handleChange1 = this.handleChange1.bind(this);
 this.handleSerach = this.handleSerach.bind(this);
 this.onFormSubmit1=this.onFormSubmit1.bind(this);
 this.handleDelete=this.handleDelete.bind(this);
 // this.refresh=this.refresh.bind(this);
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
  let self=this;

  axios.post('http://localhost:3000/add/', {
  name: name,
    number: number
  })
  .then(function (response) {
    console.log(response);
    self.componentDidMount();
  })
  .catch(function (error) {
    console.log(error);
  });
e.target.elements.firstname.value="";
e.target.elements.number.value="";
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
  // console.log(response);
  self.setState({users1: response.data});
  console.log(self.state.users1);
})
  .catch(function (error) {
    console.log(error);
  });
e.target.elements.firstname.value="";

}

handleDelete(e) {
  e.preventDefault();
  let id=e.target.elements.id.value;
  let self=this;
  axios.delete(`http://localhost:3000/${id}`)
  .then(function (response) {
  console.log(response);
    self.componentDidMount();
  // console.log(this.state.users);
})
  .catch(function (error) {
    console.log(error);
  });
e.target.elements.id.value="";
// self.setState({users1: {}})
}

componentDidMount() {
  var self = this;
  axios.get(`http://localhost:3000/`)
  .then(function (response) {
  // console.log(response);
  self.setState({users: response.data});
  console.log(self.state.users1);
})
  .catch(function (error) {
    console.log(error);
  });
  // this.refresh();

}

// refresh() {
//   var self = this;
//   axios.get(`http://localhost:3000/`)
//   .then(function (response) {
//   // console.log(response);
//   self.setState({users: response.data});
//   console.log(self.state.users);
// })
//   .catch(function (error) {
//     console.log(error);
//   });
// }

  render() {

    let del = [];

          console.log(this.state.users, "gfjkgkdg")
          let a=this.state.users;
          console.log(a.rows, "gfjkgkdg")
          if(!a.rows){

          }
          else{
           for(let i = 0; i < a.rows.length; i++){
                             const data = this.state.users.rows[i];
                            const row = <Book key={data.id} id={data.id} name={data.name}

                            number={data.number} />

              del.push(row);
            }
}
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

          <div>
          <p>Add new contact</p>
          <form onSubmit={this.onFormSubmit}>
        <input type="text" placeholder="Enter Name" pattern="^[a-zA-Z ]*$" name="firstname" onChange={this.handleChange} />
        <input type="text" placeholder="Enter Number" pattern="^[0-9-+s()]*$" name="number" onChange={this.handleChange1}/>
        <button id="ton">Confirm</button>
      </form>
      </div>
      <div>
      <p>search contact</p>
      <form onSubmit={this.onFormSubmit1}>
    <input type="text" placeholder="Enter Name" pattern="^[a-zA-Z ]*$" name="firstname" onChange={this.handleSerach} />
    <button id="ton">Confirm</button>
  </form>
    <p>delete contact</p>
  <form onSubmit={this.handleDelete}>
    <input type="number" placeholder="Enter Number" name="id" />
    <button id="ton">Delete</button>
      </form>
  </div>
      <div className="tabela">
          <div><pre>{JSON.stringify(this.state.users1, null, 2)} </pre></div>
  <table className="completed">
                                   <thead>
                                       <tr>
                                           <th >id</th>
                                           <th >name</th>
                                          <th >number</th>

                                         </tr>
                                         </thead>
                                         <tbody>
                                             {del}
                                         </tbody>
                                       </table>
                              </div>
      {/* <div><pre>{JSON.stringify(this.state.users, null, 2)} </pre></div> */}


      </div>
    );
  }
}
export default App;


class Book extends React.Component {

  render() {

       return(  <tr>
                <td id="posleft">{this.props.id}</td>
                <td id="posleft">{this.props.name}</td>
                <td id="posleft">{this.props.number}</td>


       </tr>)



}
}
