'use client'

const technologies = [
  {
    id: 1,
    name: 'Unity Engine',
    description: 'Powerful game engine for cross-platform development',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
        <polyline points="17 2 12 7 7 2"></polyline>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Blender & Maya',
    description: 'Professional 3D modeling and animation tools',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        <path d="M2 2l7.586 7.586"></path>
        <circle cx="11" cy="11" r="2"></circle>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'C# & JavaScript',
    description: 'Core programming languages for game logic',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Cloud Services',
    description: 'Scalable backend infrastructure for multiplayer',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
      </svg>
    ),
  },
  {
    id: 5,
    name: 'FMOD & Wwise',
    description: 'Advanced audio middleware for immersive sound',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      </svg>
    ),
  },
  {
    id: 6,
    name: 'AI & Machine Learning',
    description: 'Smart NPCs and procedural content generation',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
      </svg>
    ),
  },
]

export default function TechnologySection() {
  return (
    <section id="technology" className="content-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Our Technology</h2>
        <p className="section-subtitle animate-on-scroll">
          Cutting-edge tools and technologies powering our game development
        </p>
        <div className="tech-grid">
          {technologies.map((tech) => (
            <div key={tech.id} className="tech-card animate-on-scroll">
              <div className="tech-icon">{tech.icon}</div>
              <h3>{tech.name}</h3>
              <p>{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
