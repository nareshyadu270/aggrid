import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props){
        super(props)

        this.state ={
            email:"abc@123.com", password:"abc123"
        }
    }
  render() {
    return (
      <div className='col-lg-9'>
        <h4 className='m-1 p-2 border-bottom'></h4>

        <div className='form-group form-row'>
            <label className='col-lg-4'>Email:</label>
            <input 
            type='text' 
            className='form-control' 
            value={this.state.email} onChange={(event)=>{
                this.setState({email:event.target.value})
            }}/>
        </div>
        <div className='form-group form-row'>
            <label className='col-lg-4'>Password:</label>
            <input 
            type='text' 
            className='form-control' 
            value={this.state.password}
            onChange={(event)=>{
                this.setState({password:event.target.value})
            }}
            />
        </div>
            <div className='text-right'>
                {this.state.message}
                <button className='btn btn-primary' onClick={this.onLoginClick}>Login</button>
            </div>
      </div>
    )
  }

  onLoginClick =()=>{

    if(this.state.email === 'admin@gmail.com' && 
    this.state.password === 'admin@123'
    ){
        this.setState({message:<span className='text-success'>Successfully Logged in</span>})
    }
    else{
        this.setState({message:<span className='text-danger'>Invalid Values</span>})
    }
  }
}
