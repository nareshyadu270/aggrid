import React, { Component } from "react";

export default class CustomersList extends Component {
  state = { 
    appTitle: "Employees", 
    customersCount:5,
    customers:[
      {id:1,name:"naresh",age:26,designation:"teacher",photo:"../assets/1.jpg"},
      {id:2,name:"suresh",age:27,designation:"Doctor",photo:"../assets/1.jpg"},
      {id:3,name:"ganesh",age:null,designation:"software",photo:"../assets/1.jpg"},
      {id:4,name:"mahesh",age:29,designation:"Director",photo:"../assets/1.jpg"},
    ]
  };

  render() {
    return (
      <>
      <div className="container">
      <div>
        <h4 className="border-bottom m-1 p-1">{this.state.appTitle}
        <span className="badge badge-secondary">{this.state.customersCount}</span>
        <button className="" onClick={this.refreshbtn}>Refresh</button>
        </h4>
        
      </div>
      <div>
      <table className="table">
        <thead>
      <tr>
        <td>#</td>
        <td>Name</td>
        <td>Age</td>
        <td>Designation</td>
      </tr>
        </thead>
        <tbody>
         
       {this.getCustomers()}
        </tbody>
      </table>
      </div>
      </div>
      </>
    );
  }

  refreshbtn = ()=>{
    this.setState({
      customersCount:this.state.customersCount+1
    })
  }

  getPhone = (cust) =>{
    if(cust.age){
      return cust.age;
    }else{
      return "No Age"
    }
  }

  getCustomers = ()=>{
    return ( this.state.customers.map((cust)=>{
        return(
          <tr key={cust.id} className="tablecls">
            <td>{cust.id}</td>
            <td><img src={cust.photo}/></td>
            <td>{cust.name}</td>
            <td>{this.getPhone(cust)}</td>
            <td>{cust.designation}</td>
          </tr>
        )
      })
    )
  }
}
