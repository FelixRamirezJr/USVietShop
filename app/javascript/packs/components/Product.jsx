import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Item from './Item'
import util from '../Util/util'
import Axios from 'axios'
import Nav from './Nav'

class Product extends React.Component {
  constructor(){
    super();
    this.state = {
      products: [],
      revenue: 0,
      revenueDong: 0
    }
  }

  load_all_products = () => {
    fetch('/api/v1/products')
    .then((response) => response.json())
    .then((json) => {
      this.setState({ products: json.products,
                      revenue: json.revenue,
                      revenueDong: json.revenueDong });
      console.log(" Products that I received ");
      console.log(this.state.products);
      console.log(this.state.revenue);
      console.log(this.state.revenueDong);
      // Some user object has been set up somewhere, build that user here
      return "Okay";
    })
    .catch(() => {
      reject('Error, could not get the the products')
    });
  }


  componentWillMount()
  {
    this.load_all_products();
  }

  reset = () => {
    this.load_all_products();
  }

  search = (query) => {
    fetch('/api/v1/products?search=' + query)
    .then((response) => response.json())
    .then((json) => {
      this.setState({ products: json.products });
      console.log(this.state.products);
      // Some user object has been set up somewhere, build that user here
      return "Okay";
    })
    .catch(() => {
      reject('Error problems searching!')
    });
  }

  render() {
    const listItems = this.state.products.map((product) =>
       // Correct! Key should be specified inside the array.
       <Item key={product.id} product={product} />
     );
    return (
      <div className="col-xs-12">
        <Nav search={this.search}
             reset={this.reset}
             revenue={this.state.revenue}
             revenueDong={this.state.revenueDong} />
        { listItems }
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Product />,
    document.getElementById("root").appendChild(document.createElement('div') ),
  )
})
