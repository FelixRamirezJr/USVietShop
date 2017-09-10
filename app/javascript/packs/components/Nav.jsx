import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const urls = {
  newProduct: "/products/new"
}

const listStyle = {
  display: "inline"
};

const buttonStyle = {
  cursor: "hand",
  cursor: "pointer",
  marginRight: 10
}

const navStyle = {
  border: '1px solid black',
  margin: 10,
  borderRadius: 5,
  padding: 5
};

export default class Nav extends React.Component {

  newProduct = () => {
    window.location = urls.newProduct
  }

  render() {
    return(
      <div style={navStyle}>
        <ul style={listStyle}>
          <li style={listStyle}>
            <button style={buttonStyle}
                    className="btn btn-info"
                    onClick={this.newProduct}
            >
                    New
            </button>
          </li>
          <li style={listStyle}>
            <button style={buttonStyle} className="btn btn-warning"> Search </button>
          </li>
        </ul>
      </div>
    )
  }
}
