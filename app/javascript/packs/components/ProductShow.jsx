import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Item from './Item'
import util from '../Util/util'
import Axios from 'axios'
import Nav from './Nav'

const myImg = require('./Rolling.gif');

const imgStyle = {
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto'
}
const center = {
  textAlign: 'center',
  width: '100%'
}


class ProductShow extends React.Component {
  constructor(){
    super();
    this.state = {
      products: [],
      id: null
    }
  }

  componentWillMount() {
    this.getId();
  }

  getId = () => {
    var c = window.location.href.split("/").pop();
    this.load_product(c);
  }

  delete = () => {

  }

  load_product = (id) => {
    fetch('/api/v1/product?id=' + id)
    .then((response) => response.json())
    .then((json) => {
      this.setState({ products: [json.product] });
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
       <Item key={product.id} product={product} delete={this.delete} show={false} />
     );
    return (
      <div className="col-xs-12">
        { this.state.products.length ? listItems : <div style={center}> <img style={imgStyle} src={myImg} /> </div> }
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ProductShow />,
    document.getElementById("root").appendChild(document.createElement('div') ),
  )
})
