import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import styles from './particles.module.sass'
        
const Particles = () => {
  const [canvas, setCanvas] = useState(null)
  const [ctx, setCtx] = useState(null)

  let ww = window.innerWidth - 3
  let wh = window.innerHeight - 3

  const mousePos = {
    x: ww / 2,
    y: wh / 2,
  }

  const particlesControl = {
    particles: [],
    count: 3,
    sizeZoom: 0.95,
    FPS: 30,
    a: 0.9,
  }

  const onMouseEvent = useCallback(() => {
    if (!canvas) return
    canvas.addEventListener('mousemove', (evt) => {
      mousePos.x = evt.x
      mousePos.y = evt.y
    })
  }, [canvas, mousePos])

  window.addEventListener('resize', () => {
    if (!canvas) return 
    ww = window.innerWidth - 3
    wh = window.innerHeight - 3
    canvas.width = ww
    canvas.height = wh
  })

  const drawCircle = useCallback((x, y, color, size) => {
    ctx.fillStyle= color
    ctx.beginPath()
    ctx.arc(x, y, size, 0, 2 * Math.PI)
    ctx.fill()
  }, [ctx])

  const paint = useCallback(() => {
    ctx.clearRect(0, 0, ww, wh)

    for(let i = 0; i < particlesControl.count; i++) {
      const newParticle = {
        x: mousePos.x || 0,
        y: mousePos.y || 0,
        speedX: Math.floor(Math.random() * 10) - 5,
        speedY: 5,
        color: `rgba(255,${parseInt(Math.random()*255)},${parseInt(Math.random()*150)},1)`,
        size: Math.random() * 60,
      }
      particlesControl.particles.push(newParticle)
    }
    
    particlesControl.particles = particlesControl.particles.map((cur, i) => {
      return (particlesControl.particles.length === (i + 1)) ? cur :
        {
          ...cur,
          x: cur.x + cur.speedX + particlesControl.a,
          y: cur.y + cur.speedY + particlesControl.a,
          size: cur.size * particlesControl.sizeZoom,
        }
    })
    particlesControl.particles = particlesControl.particles.filter((cur) => {
      return cur.size > 0.09
    })

    particlesControl.particles.forEach((cur) => {
      drawCircle(cur.x, cur.y, cur.color, cur.size)
    })
  }, [ctx])

  useEffect(() => {
    if (!ctx) return
    canvas.width = ww
    canvas.height = wh

    onMouseEvent()
    setInterval(paint, particlesControl.FPS)
  }, [ctx, ww, wh])

  const initCanvas = useCallback(() => {
    const myCanvas = document.getElementById('myCanvas')
    setCanvas(myCanvas)
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    setCtx(ctx)
  }, [canvas])

  useEffect(() => {
    initCanvas()
  }, [canvas])

  return (
    <div className={styles.particles}>
      <canvas id='myCanvas' />
    </div>
  )
}
        
export default Particles