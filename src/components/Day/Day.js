import React, { Component } from "react";
import { connect } from 'react-redux'
import './Day.css';
import { showGroup } from '../../ducks/frontEnd';
/* Components*/
import Menu from '../Menu/Menu.js';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      eventName: 'New Event',
      dayName: '',
      dayDate: '',
      value: 1
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEventType = this.handleEventType.bind(this);
  }

  componentDidMount() {
    this.props.showGroup(true);
  }

  handleChange = (event, index, value) => this.setState({ value });

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  updateEventName(value) {
    this.setState({ eventName: value });
  };

  handleEventType() {
    // if (this.state.value === 1) {
    //   return (

    //   )
    // }
  }

  render() {
    const { eventName } = this.state;

    const actions = (
      <div className='new-event-actions'>
        <RaisedButton
          label="Ok"
          primary={true}
          onClick={this.handleClose}
          className='new-event-ok'
        />
        <RaisedButton
          label='Cancel'
          secondary={true}
          onClick={this.handleClose}
          className='new-event-cancel'
        />
      </div>
    );
    return (
      <main>
        <Menu />
        <section className='day'>
          <h1>Day</h1>
          <br />
          <RaisedButton label="Add event" primary={true} onClick={this.handleOpen} />
          <Dialog
            title={eventName}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={1} label="Flight" primaryText="Flight" />
              <MenuItem value={2} label="Car Rentals" primaryText="Car Rentals" />
              <MenuItem value={3} label="Lodging" primaryText="Lodging" />
              <MenuItem value={4} label="Restaraunts" primaryText="Restaraunts" />
              <MenuItem value={5} label="Activites" primaryText="Activities" />
            </DropDownMenu>
            <TextField
              id="text-field-default-event"
              defaultValue={eventName}
              onChange={(e) => this.updateEventName(e.target.value)}
            />
            Select a date.
            <DatePicker hintText="This event starts on..." />
            {this.handleEventType()}
          </Dialog>
        </section>
      </main>
    )
  }
}
function mapStateToProps(state) {
  return {
    gIcon: state.gIcon
  }
}

// function mapStateToProps(state){
//   return {
//
//   }
// };

export default connect(null, { showGroup })(Day);
