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


class Product extends React.Component {
  constructor(){
    super();
    this.state = {
      products: [],
      revenue: 0,
      revenueDong: 0,
      total: 0,
      totalDong: 0
    }
  }

  load_all_products = () => {
    fetch('/api/v1/products')
    .then((response) => response.json())
    .then((json) => {
      this.setState({ products: json.products,
                      revenue: json.revenue,
                      revenueDong: json.revenueDong,
                      total: json.total,
                      totalDong: json.totalDong });
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

  delete = (product) =>{
    var array = this.state.products;
    var index = array.indexOf(product);
    array.splice(index, 1);
    this.setState({products: array });
  }

  search = (query) => {
    fetch('/api/v1/products?search=' + query)
    .then((response) => response.json())
    .then((json) => {
      this.setState({ products: json.products,
                      revenue: json.revenue,
                      revenueDong: json.revenueDong,
                      total: json.total,
                      totalDong: json.totalDong });
      // Some user object has been set up somewhere, build that user here
      return "Okay";
    })
    .catch(() => {
      reject('Error problems searching!')
    });
  }

  loadSold = () => {
    fetch('/api/v1/get_sold')
    .then((response) => response.json())
    .then((json) => {
      this.setState({ products: json.products,
                      revenue: json.revenue,
                      revenueDong: json.revenueDong,
                      total: json.total,
                      totalDong: json.totalDong });
      // Some user object has been set up somewhere, build that user here
      return "Okay";
    })
    .catch(() => {
      reject('Error problems with getting sold products!')
    });
  }

  render() {
    const listItems = this.state.products.map((product) =>
       // Correct! Key should be specified inside the array.
       <Item key={product.id} product={product} delete={this.delete} show={true} />
     );
    return (
      <div className="col-xs-12">
        <Nav search={this.search}
             reset={this.reset}
             revenue={this.state.revenue}
             revenueDong={this.state.revenueDong}
             total={ this.state.total }
             totalDong={ this.state.totalDong }
             loadSold={this.loadSold} />
        { this.state.products.length ? listItems : <div style={center}> <img style={imgStyle} src={myImg} /> </div> }
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
