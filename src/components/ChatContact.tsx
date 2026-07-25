// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import './ChatContact.css';

export function ChatContact() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hi there! Glad to connect with you. I'm currently looking for new opportunities." }
  ]);
  const [formData, setFormData] = useState({ 
    email: '', 
    name: '',
    message: '' 
  });
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [emailError, setEmailError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (messages.length > 1 || isTyping) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      setEmailError("Please enter your email address to continue.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    
    setEmailError('');
    if (isTyping) return;

    const finalName = formData.name.trim() || 'Your Name';
    const finalMsg = formData.message.trim() || 'No project details provided.';
    const userMsg = `Hi there, I'm ${finalName}, and I would like to connect with you.\n\n${finalMsg}\n\nLooking forward to your response.`;
    
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMsg }]);
    

    setIsTyping(true);
    setStep(1); 
    
    setTimeout(async () => {
      try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: 'service_i7khfeb', 
            template_id: 'template_nbx6jth', 
            user_id: '3wlMogIR0f-wjEp7l', 
            template_params: {
              from_name: finalName,
              reply_to: formData.email.trim(),
              message: userMsg,
            }
          })
        });

        if (response.ok) {
          setIsTyping(false);
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            sender: 'bot', 
            text: "Message sent successfully! I'll be in touch soon." 
          }]);
        } else {
          const errorText = await response.text();
          console.error("EmailJS Error:", errorText);
          throw new Error(errorText || 'Network response was not ok');
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          sender: 'bot', 
          text: "Oops, something went wrong while sending. Please try calling me directly!" 
        }]);
      }
    }, 1200); 
  };

  return (
    <section className="chat-section" id="contact">
      <div className="chat-container">
        
        <div className="chat-header">
          <p className="chat-overline">Let's Talk</p>
          <h2 className="chat-title">Start a<br/>Conversation</h2>
        </div>

        <div className="chat-interface">
          <div className="chat-messages">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  className={`chat-bubble-wrapper ${msg.sender === 'user' ? 'user' : 'bot'}`}
                >
                  <div className={`chat-bubble ${msg.sender}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="chat-bubble-wrapper bot"
                >
                  <div className="chat-bubble bot typing">
                    <span></span><span></span><span></span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <form className={`chat-draft-area ${step === 1 ? 'hidden' : ''}`} onSubmit={handleSend} noValidate>
            <div className="chat-draft-bubble-container">
              <div className="chat-draft-bubble madlib-container">
                Hi there, I'm 
                <input 
                  type="text" 
                  className="madlib-input" 
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  disabled={isTyping || step === 1}
                  style={{ width: formData.name ? `${formData.name.length}ch` : '135px' }}
                />
                , and I would like to connect with you.
                
                <textarea 
                  className="madlib-textarea" 
                  placeholder="Tell me about your project or role here..."
                  value={formData.message}
                  onChange={e => {
                    setFormData({...formData, message: e.target.value});
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  rows={1}
                  disabled={isTyping || step === 1}
                />
                
                Looking forward to your response.
              </div>
            </div>
            
            <div className="chat-action-bar">
              <input
                type="email"
                className="chat-action-email"
                placeholder="Enter your email to send..."
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  if (emailError) setEmailError('');
                }}
                disabled={isTyping || step === 1}
              />
              <button 
                type="submit" 
                className={`chat-action-send ${formData.email.trim() ? 'active' : ''}`}
                disabled={isTyping || step === 1}
              >
                <span>SEND</span>
                <Send size={18} />
              </button>
            </div>
            {emailError && (
              <div className="chat-error-message">
                {emailError}
              </div>
            )}
          </form>
        </div>

        <div className="chat-alternative">
          <div className="chat-or">
            <span>OR</span>
          </div>
          <div className="chat-phone-wrapper">
            <span className="chat-call-label">Call Me</span>
            <a href="tel:+918086699324" className="chat-phone">+91 8086699324</a>
          </div>
        </div>

      </div>
    </section>
  );
}
