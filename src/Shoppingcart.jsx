import React, { Component } from 'react';
import Product from './Product';

class Shoppingcart extends Component {
    constructor(props){
        super(props)
        this.state  ={
            products:[
                {id:1, productName:"Redmi1",price:5600,quantity:0},
                {id:2, productName:"Redmi2",price:7600,quantity:0},
                {id:3, productName:"Redmi3",price:6600,quantity:0},
                {id:4, productName:"Redmi4",price:8600,quantity:0},
                {id:5, productName:"Redmi5",price:9600,quantity:0},
                {id:6, productName:"Redmi6",price:4600,quantity:0},
            ]
        }
        console.log("constructor")
    }
    
    render() {
        console.log("render")
        return (
            <div className='container-fluid'>
            <div className='row'>
                {this.state.products.map((prod)=>{
                    return <Product 
                    key={prod.id} 
                    product={prod} onIncrement={this.handleIncrement}
                    onDecrement ={this.handleDecrement}
                    onDelete = {this.handleDelete}
                    
                    >

                    <button className='btn btn-primary'>Buy now</button>
                    </Product>
                })}
            </div>
            </div>
        );
    }
componentDidMount(){
    console.log("componentDidmount")
}
    handleIncrement = (product, maxValue)=>{
        let allProducts = [...this.state.products]
        let index = allProducts.indexOf(product);
        if(allProducts[index].quantity < maxValue){
            allProducts[index].quantity++;
        }
      

        this.setState({products:allProducts});
    }
    handleDecrement = (product, minValue)=>{
        let allProducts = [...this.state.products]
        let index = allProducts.indexOf(product);

        if(allProducts[index].quantity > minValue){
            allProducts[index].quantity--;
        }
        

        this.setState({products:allProducts});
    }

    handleDelete =(product) =>{
        let allProducts = [...this.state.products]
        let index = allProducts.indexOf(product);
        if(window.confirm("Are you Sure?")){
            allProducts.splice(index,1);
            this.setState({products:allProducts});
        }
       
    }
}

export default Shoppingcart;