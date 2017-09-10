import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const itemStyle = {
  borderBottom: "1px solid grey",
  padding: 5,
};

const imgStyle = {
  maxWidth: "100%",
  height: "auto"
};

const buttonStyles = {
  marginRight: 5
}

const routes = {
  edit: "/products/:id/edit"
}

export default class Item extends React.Component {

  edit = () => {
    window.location = routes.edit.replace(":id",this.props.product.id);
  }

  delete = () => {
    toDelete = confirm("Are you sure you want to delete the following?")
    if( toDelete ){

    } else {

    }
  }

  render() {
    return (
      <div style={itemStyle} >
        <img style={imgStyle} src={this.props.product.picture.url}/>
        <p> {this.props.product.name} </p>
        <p> { this.props.product.price } </p>
        <button onClick={this.edit}
                style={buttonStyles}
                className="btn btn-primary"
                type="button">
          Edit
        </button>
        <button onClick={this.delete}
                style={buttonStyles}
                className="btn btn-danger">
                Delete
        </button>
      </div>
    );
  }
}
