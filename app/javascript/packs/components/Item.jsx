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
  marginRight: 5,
  cursor: 'hand',
  cursor: 'pointer'
}

const routes = {
  edit: "/products/:id/edit",
  show: "/products/:id"
}

export default class Item extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      status: "",
      statusButton: "Sold",
      remaining_quantity: 0,
    };
  }

  componentWillMount() {
    if( this.props.product.sold ) {
      this.setState({ status: "SOLD"  });
    } else {
      this.setState({ status: "Available" });
    }
    this.setState({ sold: this.props.product.sold });
    this.setState({ remaining_quantity: this.props.product.remaining_quantity,
                    quantity: this.props.product.quantity });
  }

  numberWithCommas = (x) => {
    if( x != undefined ){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  calculate_current = ( price, quantity, remaining ) => {
    price = parseFloat( price );
    quantity = parseInt( quantity );
    remaining = parseInt( remaining );
    var calc = price * ( quantity - remaining );
    return calc;
  }

  edit = () => {
    window.location = routes.edit.replace(":id",this.props.product.id);
  }

  show = () => {
    window.location = routes.show.replace(":id",this.props.product.id);
  }

  sellOne = () => {
    if( parseInt( this.state.remaining_quantity ) == 1 ){
      this.sold();
    } else {
      fetch('/api/v1/sell_one?id=' + this.props.product.id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ remaining_quantity: json.product.remaining_quantity,
                        quantity: json.product.quantity });
        // Some user object has been set up somewhere, build that user here
        return "Okay";
      })
      .catch(() => {
        reject('Error problems searching!')
      });
    }
  }

  addOne = () => {
    fetch('/api/v1/add_one?id=' + this.props.product.id)
    .then((response) => response.json())
    .then((json) => {
      this.setState({ remaining_quantity: json.product.remaining_quantity,
                      quantity: json.product.quantity });
      // Some user object has been set up somewhere, build that user here
      return "Okay";
    })
    .catch(() => {
      reject('Error problems searching!')
    });
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

    var special_order = null;
    if ( this.props.product.special_order ) {
      special_order = <p> <strong> <i> Special Order </i> </strong> </p>;
    }

    var currently_earned = null;
    var cc = null;
    if( this.props.product.quantity > 1 ) {
      cc = this.calculate_current( this.props.product.sell_price, this.state.quantity, this.state.remaining_quantity );
      currently_earned = <i> Currently Earned: ${cc} </i>;
    }

    return (
      <div style={itemStyle} >
        <div className="col-sm-5">
          <img style={imgStyle} src={this.props.product.picture.url}/>
        </div>
        <div className="col-sm-12">
          <p> <strong> {this.props.product.name} </strong> </p>
          { description }
          <p> Original Price: $ { this.numberWithCommas( this.props.product.price ) } </p>
          <p> Sell Price: $ { this.numberWithCommas( this.props.product.sell_price) }  </p>
          <p> Dong: { this.numberWithCommas( this.props.product.dong) } đ  </p>
          <p> Condition: {this.props.product.condition} </p>
          <p> Quantity:
            { this.state.remaining_quantity }/{ this.state.quantity }
            { currently_earned }
          </p>
          { special_order }

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
          <button onClick={this.show}
                  style={buttonStyles}
                  className="btn btn-inverse">
          Link
          </button>
          <button onClick={this.addOne}
                  style={buttonStyles}
                  className="btn btn-warning">
           +
          </button>
          <button onClick={this.sellOne}
                  style={buttonStyles}
                  className="btn btn-warning">
           -
          </button>
          { status_button }
        </div>

      </div>
    );
  }
}
