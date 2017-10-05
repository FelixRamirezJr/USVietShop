import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Item from './Item'
import util from '../Util/util'
import Axios from 'axios'
import Nav from './Nav'

class Dong extends React.Component {
  constructor(){
    super();
    this.state = {
      value: "",
      usd: ""
    }
  }



  handleChange = (event) => {
    var calc = parseFloat( ( event.target.value / 23500  ) ).toFixed(2);
    if (event.target.value.length == 0){
      calc = "";
    }
    this.setState({value: event.target.value, usd: calc});
  }

  render() {
    return (
      <div className="col-xs-12" style={{padding: 5}}>
        <span> VND to USD  $1 = 23,500đ  </span>
        <input value={this.state.value}
               onChange={this.handleChange}
               placeholder="Enter VND here (500000)"
               className="form-control"  />
        <span> USD: ${this.state.usd} </span>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var dom = document.createElement('div');
  dom.className = "card-block";
  ReactDOM.render(
    <Dong />,
    document.getElementById("root").appendChild( dom ),
  )
})
