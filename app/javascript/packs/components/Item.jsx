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

  constructor(props){
    super(props);
    this.state = {
      status: "",
      statusButton: "Sold"
    };
  }

  componentWillMount() {
    if( this.props.product.sold ) {
      this.setState({ status: "SOLD"  });
    } else {
      this.setState({ status: "Available" });
    }
    this.setState({ sold: this.props.product.sold });
  }

  numberWithCommas = (x) => {
    if( x != undefined ){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  edit = () => {
    window.location = routes.edit.replace(":id",this.props.product.id);
  }

  delete = () => {
    var toDelete = confirm("Are you sure you want to delete the following?");
    if( toDelete )
    {
      fetch('/api/v1/delete?id=' + this.props.product.id)
      .then((response) => response.json())
      .then((json) => {
        this.props.delete( this.props.product );
        // Some user object has been set up somewhere, build that user here
        return "Okay";
      })
      .catch(() => {
        reject('Error problems searching!')
      });
    }

  }

  sold = () => {
    var cc = confirm("Are you sure you want to mark this item SOLD?")
    if( cc ) {
      fetch('/api/v1/sold?id=' + this.props.product.id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ sold: true });
        // Some user object has been set up somewhere, build that user here
        return "Okay";
      })
      .catch(() => {
        reject('Error problems searching!')
      });
    }
  }

  render() {
    var status_button;
    // Set sold status
    if ( this.state.sold ) {
      status_button = <strong> No Longer Available </strong>;
    } else {
      status_button =  <button onClick={this.sold}
                        style={buttonStyles}
                        className="btn btn-success">
                        Sold
                      </button>;
    }

    var description = null;
    if ( this.props.product.description ) {
      description = <p> <i> {this.props.product.description} </i> </p>;
    }

    return (
      <div style={itemStyle} >
        <img style={imgStyle} src={this.props.product.picture.url}/>
        <p> <strong> {this.props.product.name} </strong> </p>
        { description }
        <p> Original Price: $ { this.numberWithCommas( this.props.product.price ) } </p>
        <p> Sell Price: $ { this.numberWithCommas( this.props.product.sell_price) }  </p>
        <p> Dong: d { this.numberWithCommas( this.props.product.dong) }  </p>
        <p> Condition: {this.props.product.condition} </p>
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
        { status_button }
      </div>
    );
  }
}
