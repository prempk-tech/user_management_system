import React from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
class Dashboard extends React.Component{
  constructor() {
    super()
    this.state = {
       userdetails: [],
       userEditModelisopen : false
    }
  }



  handleModal = () => {
    this.setState({userEditModelisopen: true})
  }

  handleCloseModel = () => {
    this.setState({userEditModelisopen: false})
  }

  componentDidMount() {
    sessionStorage.clear()
    axios({
      method: 'GET',
      url: 'http://localhost:3006/api/users/getusers',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      this.setState({ userdetails: response.data.data.userData })
      console.log(response.data.data.userData);
    }).catch(err => console.log(err))
  }
    render(){
      const{userdetails,userEditModelisopen } = this.state;
      console.log(userdetails)
        return(
               <div>   
           <table className="table table-hover">
           
  <thead>
  
    <tr>
      <th scope="col">userid</th>
      <th scope="col">Firstname</th>
      <th scope="col">Lastname</th>
      <th scope="col">EmailAddress</th>
      <th scope="col">user_timestamp</th>
      <th scope="col">Update</th>
      <th scope="col">Delete user</th>
    </tr>
  </thead>
  {userdetails.map((item,dup) => {
  return <tbody>
    <tr class="bg-primary">
      <th scope="row" key={dup}>{item.user_id}</th>
      <td>{item.Firstname}</td>
      <td>{item.Lastname}</td>
      <td>{item.EmailAddress}</td>
      <td>{item.user_timestamp}</td>
      <td><Button variant="contained" color="success" onClick={() => this.handleModal()}>
      Edit
      </Button></td>
      <td><Button variant="contained" color="error">
      Delete
      </Button></td>
    </tr>
  </tbody>
   })}
</table>
        <Modal
        isOpen={userEditModelisopen}
        style={customStyles}
        >
        <Button onClick={this.handleCloseModel}>close</Button>
        </Modal>
        </div>
        )
    }
}
export default Dashboard;