import React, { useState } from 'react';
import productImg from './assets/himulti.jpg'; // Add the product image to your assets folder
import logoImg from './assets/wilologo.png'; // Add the Wilo logo to your assets folder

const WiloChatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to Wilo Pump Selection Assistant! What is the type of application? (Pressure Boosting, Fire fighting, Domestic)' }
  ]);
  const [input, setInput] = useState('');
  const [stage, setStage] = useState('application');
  const [userData, setUserData] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [enquirySent, setEnquirySent] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const currentInput = input.trim();
    const newMessages = [...messages, { from: 'user', text: currentInput }];
    let botResponse = '';
    const newUserData = { ...userData };

    switch (stage) {
      case 'application':
        newUserData.application = currentInput;
        botResponse = 'Are you looking for one boosting solution for all rooms?';
        setStage('solution');
        break;
      case 'solution':
        newUserData.solution = currentInput;
        botResponse = 'How many bathrooms do you want to connect?';
        setStage('bathrooms');
        break;
      case 'bathrooms':
        newUserData.bathrooms = currentInput;
        botResponse = 'Generally, premium brands need 2.5 bar pressure while others need 1.5 bar. What is your pressure requirement (in bar)?';
        setStage('pressure');
        break;
      case 'pressure':
        newUserData.pressure = currentInput;
        botResponse = `Thank you! Based on your input, we recommend Wilo-HiMulti 3.`;
        setRecommendation('Wilo-HiMulti 3');
        setStage('done');
        break;
      default:
        botResponse = 'Thanks for your interest. Our team will get back to you soon.';
    }

    setUserData(newUserData);
    setMessages([...newMessages, { from: 'bot', text: botResponse }]);
    setInput('');
  };

  const handleEnquiry = () => {
    setMessages([...messages, { from: 'bot', text: 'Your enquiry has been submitted. Our team will contact you shortly.' }]);
    setEnquirySent(true);
  };

  const handleDetails = () => {
    setMessages([...messages, { from: 'bot', text: 'You can view more details at https://wilo.com/in/en/Products-and-expertise/' }]);
  };

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-header">
        <img src={logoImg} alt="Wilo Logo" className="logo-img" />
        Pump Selection Assistant
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.from}`}>{msg.text}</div>
        ))}
        {recommendation && (
          <div className="recommendation-box">
            <strong>Recommended Product:</strong> {recommendation}<br />
            <img src={productImg} alt="Wilo HiMulti 3" className="product-image" />
            {!enquirySent && (
              <div className="action-buttons">
                <button onClick={handleEnquiry}>Send Enquiry</button>
                <button onClick={handleDetails}>See More Details</button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your answer here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>

      <style>{`
        .chatbot-wrapper {
          border: 2px solid #009640;
          border-radius: 10px;
          width: 100%;
          max-width: 450px;
          margin: auto;
          font-family: 'Segoe UI', sans-serif;
          box-shadow: 0 0 12px rgba(0,0,0,0.15);
        }
        .chatbot-header {
          background-color: #009640;
          color: white;
          padding: 12px;
          font-weight: bold;
          text-align: center;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .logo-img {
          height: 28px;
        }
        .chatbot-messages {
          padding: 10px;
          height: 300px;
          overflow-y: auto;
          background: #f3f3f3;
        }
        .message {
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 6px;
        }
        .message.bot {
          background-color: #e0e0e0;
        }
        .message.user {
          background-color: #009640;
          color: white;
          text-align: right;
        }
        .recommendation-box {
          background: #e6fff1;
          border-left: 5px solid #009640;
          padding: 10px;
          margin-top: 10px;
          border-radius: 5px;
        }
        .product-image {
          width: 100%;
          max-height: 150px;
          object-fit: contain;
          margin-top: 10px;
          border-radius: 5px;
        }
        .action-buttons {
          margin-top: 10px;
          display: flex;
          gap: 10px;
        }
        .action-buttons button {
          padding: 6px 12px;
          border: none;
          background-color: #009640;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        .chatbot-input {
          display: flex;
          border-top: 1px solid #ccc;
        }
        .chatbot-input input {
          flex: 1;
          padding: 10px;
          border: none;
          outline: none;
        }
        .chatbot-input button {
          background-color: #009640;
          color: white;
          border: none;
          padding: 10px 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default WiloChatbot;
