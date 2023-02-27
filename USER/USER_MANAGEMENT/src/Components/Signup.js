import React from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/signup.css';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          Firstname: "",
          Lastname: "",
          email: "",
          password: "",
        };
    }
    handleSubmit = (e) => {
      this.props.history.push(`/dashboard?userdetails=${e._id}`)
        e.preventDefault();
        const{Firstname,Lastname,email,password} = this.state;
        console.log(Firstname,Lastname,email,password);
        fetch('http://localhost:3006/api/register/Registeruser',{
          method: 'POST',
          crossDomain: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': "*",
            // 'authorization': localStorage.getItem('token')
          },
          body: JSON.stringify({
            Firstname,
            Lastname,
            email,
            password,
          }),

        }).then((res) => res.json())
        .then((data) => {
          console.log(data, "Register successfully")
        })
    }

render(){
    return(
        <div>
          <section className="vh-100 bg-image">
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form onSubmit={this.handleSubmit}>

                <div className="form-outline mb-4">
                  <input type="text" id="form3Example1cg" className="form-control form-control-lg" onChange={(e) => this.setState({Firstname: e.target.value})} />
                  <label className="form-label" for="form3Example1cg">FisrtName</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3cg" className="form-control form-control-lg" onChange={(e) => this.setState({Lastname: e.target.value})} />
                  <label className="form-label" for="form3Example3cg">LastName</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="text" id="form3Example4cg" className="form-control form-control-lg" onChange={(e) => this.setState({email: e.target.value})} />
                  <label className="form-label" for="form3Example4cg">Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cdg" className="form-control form-control-lg" onChange={(e) => this.setState({password: e.target.value})} />
                  <label className="form-label" for="form3Example4cdg">password</label>
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label className="form-check-label" for="form2Example3g">
                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                  </label>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="button"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={this.handleSubmit}>Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                    className="fw-bold text-body"><u>Login here</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </div>
    )
}
}

export default withRouter(Signup);