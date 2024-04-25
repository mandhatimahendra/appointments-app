// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    nameInput: '',
    dateInput: '',
    isFiltered: false,
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  activeStarItem = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  onFilterAppointment = () => {
    const {isFiltered} = this.state
    this.setState({isFiltered: !isFiltered})
  }

  activeFilteredAppointments = () => {
    const {appointmentsList, isFiltered} = this.state
    if (isFiltered) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  addAppointment = event => {
    event.preventDefault()

    const {nameInput, dateInput} = this.state

    const formatedDate = dateInput
      ? format(new Date(dateInput), 'dd MM yyyy, EE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      name: nameInput,
      date: formatedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      nameInput: '',
      dateInput: '',
    }))
  }

  render() {
    const {nameInput, dateInput, isFiltered} = this.state
    const filteredList = this.activeFilteredAppointments()
    const classNameFilter = isFiltered ? 'active-filter' : 'starred'
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="appointment-container">
            <form onSubmit={this.addAppointment}>
              <div className="form-container">
                <div className="content-appointment">
                  <h1 className="heading">Add Appointment</h1>
                  <label className="label-title" htmlFor="title">
                    TITLE
                  </label>
                  <br />
                  <input
                    id="title"
                    className="input-el"
                    type="text"
                    value={nameInput}
                    onChange={this.onChangeNameInput}
                  />
                  <br />
                  <label className="label-title" htmlFor="date">
                    DATE
                  </label>
                  <br />
                  <input
                    id="date"
                    className="input-el"
                    type="date"
                    value={dateInput}
                    onChange={this.onChangeDateInput}
                  />
                  <br />
                  <button type="submit" className="button">
                    Add
                  </button>
                </div>
                <div className="image-appointment-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                    alt="appointments"
                    className="image-appointment"
                  />
                </div>
              </div>
              <hr className="horizontal" />
              <div className="appointments">
                <h1 className="appoint">Appointments</h1>
                <button
                  type="button"
                  className={classNameFilter}
                  onClick={this.onFilterAppointment}
                >
                  Starred
                </button>
              </div>
              <ul className="unordered-list">
                {filteredList.map(eachAppointment => (
                  <AppointmentItem
                    eachAppointment={eachAppointment}
                    key={eachAppointment.id}
                    activeStarItem={this.activeStarItem}
                  />
                ))}
              </ul>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
