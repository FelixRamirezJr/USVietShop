import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Item extends React.Component {

  render() {
    return (
      <div>
        <img src={this.props.product.picture.url}/>
        <p> {this.props.product.name} </p>
        <p> { this.props.product.price } </p>
      </div>
    );
  }
}
