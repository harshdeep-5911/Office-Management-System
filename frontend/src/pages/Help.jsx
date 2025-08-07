import { useState } from 'react';
import './Help.css';

const SUPPORT_EMAIL = process.env.REACT_APP_SUPPORT_EMAIL || 'support@example.com';
const SUPPORT_PHONE = process.env.REACT_APP_SUPPORT_PHONE || '(123) 456-7890';

function Help() {
  const [activeTab, setActiveTab] = useState('faq');

  return (
    <div>
      <h1>Help Center</h1>

      <div className="help-buttons">
        <button
          className={activeTab === 'faq' ? 'active' : ''}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
        <button
          className={activeTab === 'contact' ? 'active' : ''}
          onClick={() => setActiveTab('contact')}
        >
          Contact Us
        </button>
      </div>

      <div className="help-content">
        {activeTab === 'faq' && (
          <div>
            <h2>Frequently Asked Questions</h2>
            <ul>
              <li>Q: How do I create a new ticket?</li>
              <li>A: Go to the "New Ticket" page and fill out the form.</li>
              <li>Q: How can I contact support?</li>
              <li>A: Use the "Contact Us" tab to send us a message.</li>
            </ul>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h2>Contact Us</h2>
            <p>
              If you need assistance, please email us at{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or call us at{' '}
              <a href={`tel:${SUPPORT_PHONE}`}>{SUPPORT_PHONE}</a>.
            </p>

            {/* Optional: form logic can be added here later */}
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Message submitted!');
              e.target.reset();
            }}>
              <div>
                <label htmlFor="name">Your Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div>
                <label htmlFor="message">Your Message:</label>
                <textarea id="message" name="message" required></textarea>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Help;
