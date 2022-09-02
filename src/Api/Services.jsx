import axios from "axios";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { AgGridReact } from "ag-grid-react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Form from "react-bootstrap/Form";
import "./../index.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FaTrashAlt, FaEdit, FaGripVertical } from "react-icons/fa";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import PopupCellRenderer from "./../";

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workviewData: [],
      newUserData: {
        fullName: "",
        username: "",
        email: "",
        phone: "",
        website: "",
      },
      openModal: false,
      columnDefs: [
        { field: "slNo", headerName: "SlNo", filter: true },
        { field: "fullName", headerName: "Full Name" },
        { field: "username", headerName: "Username", tooltipField: "name" },
        { field: "email", headerName: "Email", filter: true },
        {
          field: "phone",
          headerName: "Phone",
          filter: true,
          cellEditorParams: {
            cellEditor: "agRichSelectCellEditor",
            values: ["a", "b", "c"],
          },
        },
        {
          field: "slNo",
          headerName: "Actions",
          // cellRendererFramework: (params) => (
          //   <div>
          //     <button variant="outlined" color="primary" onClick={()=>this.handleUpadte(params.data)}>
          //       Update
          //     </button>
          //     <button
          //       variant="outlined"
          //       color="secondary"
          //       onClick={() => this.handleDelete(params.value)}
          //     >
          //       Delete
          //     </button>
          //   </div>
          // ),
        },
        {
          field: "slNo",
          headerName: "Actions",
          cellRendererFramework: (params) => this.actionFunction(params),
          // (
          //   <div>
          //     <button variant="outlined" color="primary" onClick={()=>this.handlewindow(params.data)}>
          //       window
          //     </button>
          //     {
          //       console.log(params)
          //       // params.data.isPopup &&
          //       // <div>
          //       //   Naresh
          //       // </div>
          //     }
          //   </div>
          // ),
        },
      ],
    };
  }

  componentDidMount() {
    this.getworkVieData();
  }
  onClickButton = (e) => {
    console.log("Open");

    this.setState({ openModal: true });
  };
  handleDelete = (id) => {
    console.log(id)
    const confirm = window.confirm("Are you sure, you want to delete this row");
    if (confirm) {
      axios
        .delete("http://localhost:3000/users" + `/${id}`)
        .then((data) => {
          if (data.status === 200 && data.data.length > 0) {
            this.setState({
              workviewData: data.data,
            });
          } else {
            this.setState({
              workviewData: [],
            });
          }
        })
        .then((data) => {
          this.getworkVieData(data);
        });
    }
  };
  handleUpadte = (oldData) => {
    console.log(oldData);
    this.setState({ newUserData: oldData });
    this.onClickButton();
  };
  actionFunction = (params) => (
    //       <div>
    //         {

    //           params.data.isPopup &&
    //           <div id="popup1" class="overlay">
    // 	<div class="popup">
    // 		<h2>Here i am</h2>
    // 		<a class="close" href="#">&times;</a>
    // 		<div class="content">
    // 			Thank to pop me out of that button, but now i'm done so you can close this window.
    // 		</div>
    // 	</div>
    // </div>
    //         }
    //         <button to="#popup1" variant="outlined" color="primary" onClick={()=>this.handlewindow(params.data)}>
    //           window{params.data.slNo}
    //         </button>

    //       </div>
    <div>
      <Popup
        trigger={
          <a>
            {" "}
            <FaGripVertical />{" "}
          </a>
        }
        position="left center"
      >
        <div>
          {" "}
          <button
            variant="outlined"
            color="secondary"
            onClick={() => this.handleDelete(params.data.id)}
          >
            <FaTrashAlt />
          </button>
          <button
            variant="outlined"
            color="primary"
            onClick={() => this.handleUpadte(params.data)}
          >
            <FaEdit />
          </button>
        </div>
      </Popup>
    </div>
  );
  // handlewindow = (params) => {
  //   console.log(params);
  //   const value = [...this.state.workviewData];
  //   const id = value.findIndex((item) => item.slNo === params.slNo);
  //   value.splice(id, 1);
  //   const obj = {
  //     ...params,
  //     isPopup: true,
  //   };
  //   this.setState({ workviewData: [obj, ...value] });
  // };
  onCloseModal = () => {
    this.setState({ openModal: false });
    this.setState({ newUserData: "" });
  };
  getworkVieData = () => {
    axios
      .get("http://localhost:3000/users")
      .then((data) => {
        if (data.status === 200 && data.data.length > 0) {
          const weData = data.data.map((item, index) => ({
            ...item,
            slNo: index + 1,
          }));
          this.setState({
            workviewData: weData,
          });
        } else {
          this.setState({
            workviewData: [],
          });
        }
      })
      .catch((err) => {
        this.setState({
          workviewData: [],
        });
      });
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.newUserData);
    const userObject = {
      // name: this.state.newUserData.name,
      // username: this.state.newUserData.username,
      // email: this.state.newUserData.email,
      // phone: this.state.newUserData.phone,
      // website: this.state.newUserData.website,
      ...this.state.newUserData,
      adminUser: true,
    };
    console.log(userObject);
    axios
      .post("http://localhost:3000/users", userObject)
      .then((data) => {
        if (data.status === 200 && data.data.length > 0) {
          this.setState({
            workviewData: data.data,
          });
        } else {
          this.setState({
            workviewData: [],
          });
        }
      })
      .then((data) => {
        this.onCloseModal();
        this.getworkVieData(data);
      });
  };

  // workviewMian(){
  //     var promise = new Promise((resolve,reject)=>{
  //         let name = "Sreedhar"
  //         if(name==="naresh"){
  //             resolve("Promise resove Successfully")
  //         }
  //         else{
  //             reject(Error("Promise Rejected"))
  //         }

  //     })
  //     promise.then((data)=>{
  //         console.log(data)
  //     }).catch((err)=>{
  //         console.log(err)
  //     })
  // }

  handlechnage = (e) => {
    console.log(e.target);
    console.log(e.target.name);
    console.log(e.target.value);
    const names = e.target.name;
    const values = e.target.value;
    // const value = {...this.state}
    // value.newUserData.name = e.target.value;
    // this.setState({value})
    // ===========================

    // this.setState({newUserData:{...this.state.newUserData,name:e.target.value}})
    this.setState({
      newUserData: { ...this.state.newUserData, [names]: values },
    });
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <button onClick={this.onClickButton}>Add User</button>

        <Modal open={this.state.openModal} onClose={this.onCloseModal}>
          <h2 className="mb-5">{this.id ? "Update User" : "Create User"}</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group form-row">
              <label className="col-lg-4">Full Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={this.state.newUserData.fullName}
                  onChange={(event) => this.handlechnage(event)}
                />
              </div>
            </div>
            <div className="form-group form-row">
              <label className="col-lg-4">User Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.newUserData.username}
                  onChange={(event) => this.handlechnage(event)}
                />
              </div>
            </div>
            <div className="form-group form-row">
              <label className="col-lg-4">Email</label>
              <div className="col-lg-8">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={this.state.newUserData.email}
                  onChange={(event) => this.handlechnage(event)}
                />
              </div>
            </div>
            <div className="form-group form-row">
              <label className="col-lg-4">Phone</label>
              <div className="col-lg-8">
                <input
                  type="phone"
                  className="form-control"
                  name="phone"
                  value={this.state.newUserData.phone}
                  onChange={(event) => this.handlechnage(event)}
                />
              </div>
            </div>

            <div className="border-top pt-2">
              <button className="btn btn-success" type="submit">
                AddUser
              </button>
            </div>
          </form>
        </Modal>
        <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
          <AgGridReact
            rowData={this.state.workviewData}
            columnDefs={this.state.columnDefs}
            enableBrowserTooltips={true}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}

export default Services;
