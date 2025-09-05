// import { Link } from 'react-router-dom'
// import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

// function Home() {
//   return (
//     <>
//       <section className='heading'>
//         <h1>What do you need help with?</h1>
//         <p>Please choose from an option below</p>
//       </section>

//       <Link to='/new-ticket' className='btn btn-reverse btn-block'>
//         <FaQuestionCircle /> Create New Ticket
//       </Link>

//       <Link to='/final' className='btn btn-block'>
//         <FaTicketAlt /> View My Tickets
//       </Link>
//     </>
//   )
// }

// export default Home

import { Link } from 'react-router-dom'
import { 
  FaQuestionCircle, 
  FaTicketAlt, 
  FaHeadset, 
  FaBuilding, 
  FaUsers, 
  FaRegSmileBeam 
} from 'react-icons/fa'
import './Home.css'

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Office Management System</h1>
          <p>
            Streamline your office tasks with our integrated modules for tickets, helpdesk,
            grievances, and more — designed for efficiency and simplicity.
          </p>
        </div>
      </header>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/new-ticket" className="btn indigo">
            <FaQuestionCircle /> Create New Ticket
          </Link>
          <Link to="/final" className="btn green">
            <FaTicketAlt /> View My Tickets
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Platform Features</h2>
        <div className="feature-grid">
          <div className="feature-card indigo">
            <FaQuestionCircle className="icon" />
            <h3>Ticket Management</h3>
            <p>Create, track, and resolve tickets with real-time updates.</p>
          </div>
          <div className="feature-card purple">
            <FaHeadset className="icon" />
            <h3>Helpdesk</h3>
            <p>Access support services, FAQs, and live chat assistance.</p>
          </div>
          <div className="feature-card red">
            <FaUsers className="icon" />
            <h3>Grievance Management</h3>
            <p>Raise and track grievances transparently.</p>
          </div>
          <div className="feature-card yellow">
            <FaBuilding className="icon" />
            <h3>Department Services</h3>
            <p>Manage inter-departmental workflows seamlessly.</p>
          </div>
          <div className="feature-card green">
            <FaRegSmileBeam className="icon" />
            <h3>User Dashboard</h3>
            <p>Stay productive with a clean and intuitive dashboard.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Office Management System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
