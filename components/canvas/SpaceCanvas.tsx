'use client'

import { useEffect, useRef } from 'react'

export default function SpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let particlesArray: Particle[] = []
    const mouse = { x: null as number | null, y: null as number | null, radius: 150 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x
      mouse.y = e.y
    }

    const handleMouseOut = () => {
      mouse.x = null
      mouse.y = null
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('resize', handleResize)

    class Particle {
      x: number
      y: number
      directionX: number
      directionY: number
      size: number
      color: string
      canvas: HTMLCanvasElement

      constructor(
        x: number,
        y: number,
        directionX: number,
        directionY: number,
        size: number,
        color: string,
        canvas: HTMLCanvasElement
      ) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.color = color
        this.canvas = canvas
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = 'rgba(240, 240, 240, 0.8)'
        ctx.fill()
      }

      update() {
        if (this.x > this.canvas!.width || this.x < 0) {
          this.directionX = -this.directionX
        }
        if (this.y > this.canvas!.height || this.y < 0) {
          this.directionY = -this.directionY
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const maxDistance = mouse.radius
            const force = (maxDistance - distance) / maxDistance
            const directionX = forceDirectionX * force * 3
            const directionY = forceDirectionY * force * 3

            this.x -= directionX
            this.y -= directionY
          } else {
            this.x += this.directionX
            this.y += this.directionY
          }
        } else {
          this.x += this.directionX
          this.y += this.directionY
        }

        this.draw()
      }
    }

    function init() {
      particlesArray = []
      const numberOfParticles = (canvas!.width * canvas!.height) / 9000
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 0.5
        const x = Math.random() * (canvas!.width - size * 2) + size * 2
        const y = Math.random() * (canvas!.height - size * 2) + size * 2
        const directionX = Math.random() * 0.4 - 0.2
        const directionY = Math.random() * 0.4 - 0.2
        const color = 'white'
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color, canvas!))
      }
    }

    function connect() {
      let opacityValue = 1
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const distance =
            (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) +
            (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y)
          if (distance < ((canvas!.width / 7) * canvas!.height) / 7) {
            opacityValue = 1 - distance / 20000
            ctx!.strokeStyle = `rgba(240, 240, 240, ${opacityValue})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx!.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx!.stroke()
          }
        }
      }
    }

    function animate() {
      requestAnimationFrame(animate)
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
      }
      connect()
    }

    init()
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} id="spaceCanvas" />
}
