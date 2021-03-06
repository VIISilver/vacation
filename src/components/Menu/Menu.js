import React, { Component } from "react";
import { Link } from "react-router-dom";
import { showGroup, showNoti, groupShow, getCurrentUserID, updateEventsList } from '../../ducks/frontEnd';
import { connect } from 'react-redux';
import './Menu.css';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import GroupIcon from 'material-ui/svg-icons/social/group';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { getAllTrips, getAllGroup, getAllNoti } from '../../ducks/frontEndABs.js';
import ActionCancel from 'material-ui/svg-icons/navigation/cancel';
import axios from 'axios';
import Badge from 'material-ui/Badge';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGroup: [],
      currentNoti: [],
      stateTrip: []
    }
    this.handleGroupToggle = this.handleGroupToggle.bind(this);
    this.handleNotiToggle = this.handleNotiToggle.bind(this);
    this.handleGetNoti = this.handleGetNoti.bind(this);
    this.handleGetGroup = this.handleGetGroup.bind(this);
    this.handleGroup = this.handleGroup.bind(this);
    this.handleGroupDelete = this.handleGroupDelete.bind(this);
    this.handleNoti = this.handleNoti.bind(this);
    this.handleNotiDelete = this.handleNotiDelete.bind(this);
    this.handleGroupDeleteAccess = this.handleGroupDeleteAccess.bind(this);
  }

  componentDidMount() {
    // this.handleGetNoti()
    // this.handleGetGroup()
    this.props.getCurrentUserID();
    // if (this.props.currentDay) {
    //   console.log("Day Id", this.props.currentDay.day_id)
    //   this.props.updateEventsList(this.props.currentDay.day_id);
    // }
  }

  componentDidUpdate() {

    if (this.state.currentGroup) {
      
      this.handleGetGroup();
    }
    if (this.state.currentNoti) {

      this.handleGetNoti();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("next props", nextProps.currentTrip)
    console.log("UPDATED", this.state.stateTrip)
    console.log("old props", this.props.currentTrip)
    if (this.state.stateTrip) {
      this.setState({
        stateTrip: nextProps.currentTrip
      })
    }
  }

  handleNotiToggle() {
    if (this.props.groupOpen) {
      this.handleGroupToggle();
      this.props.showNoti(!this.props.notiOpen);
    } else {
      this.props.showNoti(!this.props.notiOpen);
    }
  }

  handleGetNoti() {
    axios.get(`/api/notify/${this.props.user_id}`).then(resp => {
      this.setState({
        currentNoti: resp.data
      })
    })
  }

  handleGroupToggle() {
    if (this.props.notiOpen) {
      this.handleNotiToggle();
      this.props.groupShow(!this.props.groupOpen);
    } else {
      this.props.groupShow(!this.props.groupOpen);
    }
  }

  handleGetGroup() {
    if (this.state.stateTrip) {
      axios.get(`/api/trip/group/${this.state.stateTrip.trip_id}`).then(resp => {
        this.setState({
          currentGroup: resp.data
        })
      })
    }
  }

  handleGroup() {
    return this.state.currentGroup.map((e, i, arr) => {
      return (
        <div key={i}>
          <p>{e.user_name}</p>
          {this.handleGroupDeleteAccess(e)}
        </div>
      )
    })
  }

  handleGroupDeleteAccess(e) {
    if (this.props.currentTrip) {
      if (this.props.user_id === this.props.currentTrip.user_id || e.user_id === this.props.user_id) {
        return (<IconButton tooltip="top-center" touch={true} tooltipPosition="top-center" onClick={() => { this.handleGroupDelete(e) }}>
          <ActionCancel />
        </IconButton>)
      }
    }
  }

  handleGroupDelete(e) {
    axios.delete(`/api/group/${e.user_id}/${this.props.currentTrip.trip_id}`).then(resp => {
      this.handleGetGroup();
    })
  }

  handleNoti() {
    return this.state.currentNoti.map((e, i, arr) => {
      return (
        <div key={i}>
          <p>{e.notification_text}</p>
          <IconButton tooltip="top-center" touch={true} tooltipPosition="top-center" onClick={() => { this.handleNotiDelete(e) }}>
            <ActionCancel />
          </IconButton>
        </div>
      )
    })
  }

  handleNotiDelete(e) {
    axios.delete(`/api/notify/${e.notification_id}`).then(resp => {
      this.handleGetNoti();
    })
  }

  render() {
    console.log("render noti", this.state.currentNoti)
    const { gIcon } = this.props;
    return (
      <nav className='menu'>
        <Link to='/dashboard' className='logo-font' onClick={() => { this.props.getAllTrips }}>
          <h2 >
            Trippin'
              </h2>
        </Link>

        {
          gIcon ? this.state.currentGroup.length == 0 ? <GroupIcon
            className='group-icon'
            color='white'
            onClick={() => { this.handleGroupToggle(), this.handleGetGroup() }}
          /> :
            <Badge
              badgeContent={this.state.currentGroup.length}
              primary={true}
            >
              <GroupIcon
                className='group-icon'
                color='white'
                onClick={() => { this.handleGroupToggle(), this.handleGetGroup() }}
              />
            </Badge> : null
        }
        {this.props.notificationsList.length != 0 ? <Badge
          badgeContent={this.props.notificationsList.length}
          primary={true}
        >
          <NotificationsIcon
            className='noti-icon'
            color='white'
            onClick={() => { this.handleNotiToggle(), this.handleGetNoti() }}
          />
        </Badge> : <NotificationsIcon
            className='noti-icon'
            color='white'
            onClick={() => { this.handleNotiToggle(), this.handleGetNoti() }}
          />}

        <a href={process.env.REACT_APP_LOGOUT} className='logout'>
          <RaisedButton
            label='Logout'
            labelColor='white'
            primary={true}
            style={{ margin: '5px' }}
          />
        </a>
        <Drawer width={250} openSecondary={true} open={this.props.notiOpen} >
          <AppBar title="Notifications"

            iconElementLeft={<IconButton><NavigationClose
              onClick={() => { this.handleNotiToggle() }}
            />
            </IconButton>}
          />
          {this.handleNoti()}
        </Drawer>
        <Drawer width={250} openSecondary={false} open={this.props.groupOpen} >
          <AppBar title="Group"

            iconElementRight={<IconButton><NavigationClose
              onClick={() => { this.handleGroupToggle() }}
            />
            </IconButton>}
            iconElementLeft={<IconButton></IconButton>}
          />
          {this.handleGroup()}
        </Drawer>
      </nav >
    );
  }
};

function mapStateToProps(state) {
  return {
    groupOpen: state.frontEnd.groupOpen,
    notiOpen: state.frontEnd.notiOpen,
    gIcon: state.frontEnd.gIcon,
    currentDay: state.frontEnd.currentDay,
    currentTrip: state.frontEnd.currentTrip,
    user_id: state.frontEnd.user_id,
    eventsList: state.frontEnd.eventsList,
    savedRestaurants: state.restaurant.savedRestaurants,
    currentRestaurant: state.restaurant.currentRestaurant,
    notificationsList: state.frontEnd.notificationsList
  }
}

export default connect(mapStateToProps, { showGroup, showNoti, groupShow, getAllTrips, getAllGroup, getAllNoti, getCurrentUserID, updateEventsList })(Menu);
