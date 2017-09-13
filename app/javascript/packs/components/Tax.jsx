import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Item from './Item'
import util from '../Util/util'
import Axios from 'axios'
import Nav from './Nav'

class Tax extends React.Component {
  constructor(){
    super();
    this.state = {
      value: "",
      tax: ""
    }
  }



  handleChange = (event) => {
    var calc = parseFloat( ( event.target.value * 0.0875  ) );
    calc = parseFloat( parseFloat( event.target.value ) + parseFloat( calc ) ).toFixed(2);
    if (event.target.value.length == 0){
      calc = "";
    }
    this.setState({value: event.target.value, tax: calc});
  }

  render() {
    return (
      <div className="col-xs-12" style={{padding: 5}}>
        <span> California Tax Calculator (Máy tính Thuế California): </span>
        <input value={this.state.value}
               onChange={this.handleChange}
               className="form-control"  />
        <span> With Tax: ${this.state.tax} </span>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var dom = document.createElement('div');
  dom.className = "card-block";
  ReactDOM.render(
    <Tax />,
    document.getElementById("root").appendChild( dom ),
  )
})
