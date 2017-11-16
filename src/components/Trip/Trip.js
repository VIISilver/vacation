import React, { Component } from "react";
import {connect} from 'react-redux'
import './Trip.css';
import {showGroup} from '../../ducks/reducer';
/* Components*/
import Menu from '../Menu/Menu.js';
<<<<<<< HEAD
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class Trip extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      dayName: 'New Day'
=======
import { showGroup } from '../../ducks/reducer';
import { connect } from 'react-redux';

class Trip extends Component {
    componentDidMount() {
        this.props.showGroup(true);
    }
    render() {
        return (
            <div>
                <Menu />
                <h1>Current Trip</h1>
            </div>
        )
>>>>>>> master
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){
    this.props.showGroup(true);
  }

  handleOpen(){
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
  };

  updateDayName(value){
    this.setState({dayName: value});
  };

  render() {
    const {dayName} = this.state;
    const actions = (
      <div className='new-day-actions'>
        <RaisedButton
          label="Ok"
          primary={true}
          onClick={this.handleClose}
          className='new-day-ok'
        />
        <RaisedButton
          label='Cancel'
          secondary={true}
          onClick={this.handleClose}
          className='new-day-cancel'
        />
      </div>
    );

    return (
      <main>
        <Menu/>
        <section className='trip'>
          <h1>Current Trip</h1>
          <RaisedButton label="Add day" primary={true} onClick={this.handleOpen} />
          <Dialog
            title={dayName}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >

            <TextField
              id="text-field-default"
              defaultValue={dayName}
              onChange={(e)=>this.updateDayName(e.target.value)}
            />
            Select a date.
            <DatePicker hintText="New adventure begins..." />
          </Dialog>
        </section>
      </main>
    )
  }
}

<<<<<<< HEAD
// function mapStateToProps(state){
//   return {
//
//   }
// };

export default connect(null, {showGroup})(Trip);
=======
function mapStateToProps(state) {
    return {
        gIcon: state.gIcon
    }
}

export default connect(mapStateToProps, { showGroup })(Trip);
>>>>>>> master
