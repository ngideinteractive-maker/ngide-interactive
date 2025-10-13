'use client'

import { useState, FormEvent } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add your form submission logic here
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <section id="contact" className="content-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Let&apos;s Create Together</h2>
        <p className="section-subtitle animate-on-scroll">
          Got a game idea or want to collaborate? We&apos;d love to hear from you!
        </p>
        <form className="contact-form animate-on-scroll" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Your Name</label>
          </div>
          <div className="input-group">
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Your Email</label>
          </div>
          <div className="input-group">
            <select
              id="role"
              required
              value={formData.role}
              onChange={handleChange}
            >
              <option value="" disabled></option>
              <option value="game-developer">Game Developer</option>
              <option value="game-designer">Game Designer</option>
              <option value="3d-artist">3D Artist</option>
              <option value="2d-artist">2D Artist</option>
              <option value="animator">Animator</option>
              <option value="sound-designer">Sound Designer</option>
              <option value="writer">Writer/Narrative Designer</option>
              <option value="producer">Producer/Project Manager</option>
              <option value="investor">Investor/Publisher</option>
              <option value="gamer">Gamer/Enthusiast</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="role">Your Role</label>
          </div>
          <div className="input-group">
            <textarea
              id="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="message">Tell us about your project</label>
          </div>
          <button type="submit" className="cta-button">
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
  )
}
