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
      products: []
    }
  }
  componentWillMount()
  {
    fetch('/api/v1/products')
    .then((response) => response.json())
    .then((json) => {
      this.setState({ products: json.products });
      console.log(" Products that I received ");
      console.log(this.state.products);
      // Some user object has been set up somewhere, build that user here
      return "Okay";
    })
    .catch(() => {
      reject('Error, could not get the the products')
    });
  }
  render() {
    const listItems = this.state.products.map((product) =>
       // Correct! Key should be specified inside the array.
       <Item key={product.id} product={product} />
     );
    return (
      <div className="col-xs-12">
        <Nav />
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
