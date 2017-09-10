import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Item from './item'
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
    return (
      <Nav />
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Product />,
    document.getElementById("root").appendChild(document.createElement('div') ),
  )
})
