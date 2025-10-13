'use client'

import Image from 'next/image'

export default function StudioSection() {
  return (
    <section id="studio" className="content-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Our Studio</h2>
        <div className="studio-content animate-on-scroll">
          <div className="studio-text">
            <p>
              We are a passionate team of game developers, artists, and
              storytellers dedicated to creating immersive gaming experiences.
              Founded with a vision to push the boundaries of interactive
              entertainment, our studio combines creativity with cutting-edge
              technology.
            </p>
            <p>
              Every game we create is a labor of love, crafted with attention to
              detail and a commitment to delivering unforgettable moments to
              players around the world.
            </p>
            <div className="studio-stats">
              <div className="stat-item">
                <h3>2025</h3>
                <p>Founded</p>
              </div>
              <div className="stat-item">
                <h3>2</h3>
                <p>Team Members</p>
              </div>
              <div className="stat-item">
                <h3>1</h3>
                <p>Games in Development</p>
              </div>
            </div>
          </div>
          <div className="studio-image">
            <div className="image-placeholder">
              <Image
                src="/img/studio.png"
                alt="Studio"
                width={500}
                height={400}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
