import React, { Component } from 'react';
import './Restaurant.css';
import { connect } from 'react-redux';
import { addRestaurant } from '../../ducks/restaurant';
import 'font-awesome/css/font-awesome.min.css';
// import Carousel from "../Carousel/Carousel";
// import Map from "../Map/Map"
import Menu from '../Menu/Menu';

class Restaurant extends Component {
 
  render() {
    const { id, name, price, rating, url, display_phone, review_count} = this.props.currentRestaurant;
    console.log("whole", this.props.currentRestaurant);

    return (
      <div className="Restaurant">
      <Menu />
        {/* <Carousel /> */}
        <div className="restaurant-description-container">
          <h1>Price range: {price}</h1>
          <h1>Yelp rating based on {review_count} reviews: {rating}</h1>
          <h1>Phone: {display_phone}</h1>
          <a target="_blank" href={url} style={{ textDecoration: "none" }}><div className='yelp-btn'><i className="fa fa-yelp fa-fw" aria-hidden="true"></i>
            Yelp Page!</div></a>
          {/* <div className="add-restaurant-btn" onClick={() => { this.props.addRestaurant(day_id, id) }}>Save</div> //Must pass in DAY_ID for addRestaurantfunction() */}
        </div>
        {/* <Map /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentRestaurant: state.restaurant.currentRestaurant,
    user: state.restaurant.user
  }
}

export default connect(mapStateToProps, { addRestaurant })(Restaurant);
