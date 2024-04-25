// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, activeStarItem} = props
  const {id, name, date, isStarred} = eachAppointment
  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onActiveStar = () => {
    activeStarItem(id)
  }
  return (
    <li className="list-card">
      <div className="list-card2">
        <p className="name-heading">{name}</p>
        <button type="button" data-testid="star" className="star-image2">
          <img
            src={starImgUrl}
            alt="star"
            className="star1"
            onClick={onActiveStar}
          />
        </button>
      </div>
      <p className="date-heading">{date}</p>
    </li>
  )
}
export default AppointmentItem
