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
      totalDong: 0,
      totalPaidForProducts: 0,
      sold: "false",
      finishedRequest: false,
      special_order: "false",
      selectedPackage: "",
      packages: [],
      first_load: true,
      final: null
    }
  }

  getUrlParam = (str) => {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    return searchParams.get(str);
  }

  buildParams = () => {
    var str =  ('sold=' + this.state.sold
                        + "&special_order=" + this.state.special_order
                        + "&package=" + this.state.selectedPackage );
    return str
  }

  load_all_products = () => {
    this.setState({finishedRequest: false});
    fetch('/api/v1/products?' + this.buildParams())
    .then((response) => response.json())
    .then((json) => {
      this.setState({ products: json.products,
                      revenue: json.revenue,
                      revenueDong: json.revenueDong,
                      total: json.total,
                      totalDong: json.totalDong,
                      shippingTotal: json.shippingTotal,
                      shippingTotalDong: json.shippingTotalDong,
                      totalPaidForProducts: json.totalPaidForProducts,
                      final: json.final,
                      finishedRequest: true });
      if (this.state.first_load){
       this.setState({ packages: json.packages,
                       selectedPackage: json.packages[0],
                       first_load: false });
     }
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

  resort = (sort) => {
    this.setState({ sold: sort },
                  () => {
                    this.load_all_products();
                  });
  }

  changePackage = (pack) => {
    this.setState({ selectedPackage: pack },
                  () => {
                    this.load_all_products();
                  });
  }

  setSpecialOrderFilter = (special) => {
    this.setState({ special_order: special },
                  () => {
                    this.load_all_products();
                  });
  }

  setFinal = (package_name, amount) => {
    fetch('/api/v1/set_final?money_received=' + amount + "&package_name=" + this.state.selectedPackage)
    .then((response) => response.json())
    .then((json) => {
      // Some user object has been set up somewhere, build that user here
      return "Okay";
    })
    .catch(() => {
      reject('Error problems searching!')
    });
  }

  delete = (product) =>{
    var array = this.state.products;
    var index = array.indexOf(product);
    array.splice(index, 1);
    this.setState({products: array });
  }

  search = (query) => {
    this.setState({finishedRequest: false});
    fetch('/api/v1/products?search=' + query + "&" + this.buildParams())
    .then((response) => response.json())
    .then((json) => {
      this.setState({ products: json.products,
                      revenue: json.revenue,
                      revenueDong: json.revenueDong,
                      total: json.total,
                      totalDong: json.totalDong,
                      shippingTotal: json.shippingTotal,
                      shippingTotalDong: json.shippingTotalDong,
                      totalPaidForProducts: json.totalPaidForProducts,
                      final: json.final,
                      finishedRequest: true });
        if (this.state.first_load){
         this.setState({ packages: json.packages,
                         selectedPackage: json.packages[0],
                         first_load: false });
       }
      // Some user object has been set up somewhere, build that user here
      return "Okay";
    })
    .catch(() => {
      reject('Error problems searching!')
    });
  }

  render() {

    const loading = <div style={center}> <img style={imgStyle} src={myImg} /> </div>;

    let listItems = this.state.products.map((product) =>
       // Correct! Key should be specified inside the array.
       <Item key={product.id} product={product} delete={this.delete} show={true} />
     );

     if (this.state.products.length == 0) {
       listItems = null;
       listItems = <p style={{marginLeft: 15}}> No results found </p>;
     }

    return (
      <div className="col-xs-12">
        <Nav search={this.search}
             reset={this.reset}
             resort={this.resort}
             revenue={this.state.revenue}
             revenueDong={this.state.revenueDong}
             total={ this.state.total }
             totalDong={ this.state.totalDong }
             shippingTotal={ this.state.shippingTotal }
             shippingTotalDong={ this.state.shippingTotalDong }
             totalPaidForProducts={ this.state.totalPaidForProducts }
             packages={ this.state.packages }
             changePackage={ this.changePackage }
             selectedPackage={ this.state.selectedPackage }
             loadSold={this.loadSold}
             final={this.state.final}
             setFinal={this.setFinal}
             setSpecialOrderFilter={ this.setSpecialOrderFilter } />
        { this.state.finishedRequest ? listItems : loading }
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
