import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import styles from './ball.module.sass'
        
const Ball = () => {
  const [canvas, setCanvas] = useState(null)
  const [ctx, setCtx] = useState(null)

  let ww = window.innerWidth - 3
  let wh = window.innerHeight - 3

  window.addEventListener('resize', () => {
    if (!canvas) return 
    ww = window.innerWidth - 3
    wh = window.innerHeight - 3
    canvas.width = ww
    canvas.height = wh
  })

  const pos = {
    x: ww / 2,
    y: wh / 2,
  }

  const speed = {
    x: 5,
    y: 5,
  }

  const a = {
    x: 0,
    y: 0.6,
  }

  const r = 50

  let dragging = false

  const mousePos = {
    x: 0,
    y: 0,
  }

  const getDistance = useCallback((p1, p2) => {
    let temp1 = p1.x - p2.x
    let temp2 = p1.y - p2.y
    let dist = Math.pow(temp1, 2) + Math.pow(temp2, 2)
    return Math.sqrt(dist)
  }, [])

  const onMouseEvent = useCallback(() => {
    if (!canvas) return
    canvas.addEventListener('mousedown', (evt) => {
      mousePos.x = evt.x
      mousePos.y = evt.y
      let dist = getDistance(mousePos, pos)
      if (dist < r ) {
        dragging = true
      }
    })

    canvas.addEventListener('mousemove', (evt) => {
      let nowPos = {
        x: evt.x,
        y: evt.y,
      }

      if (dragging) {
        pos.x = nowPos.x
        pos.y = nowPos.y
      }

      let dist = getDistance(nowPos, pos)
      if (dist < r) {
        canvas.style.cursor = 'move'
      } else {
        canvas.style.cursor = 'initial'
      }
    })

    canvas.addEventListener('mouseup', (evt) => {
      dragging = false
      speed.y = Math.abs(speed.y)
    })
  }, [canvas, pos, mousePos, dragging])

  const paint = useCallback(() => {
    ctx.clearRect(0, 0, ww, wh)

    const checkBoundary = () => {
      if (pos.x + r > ww) speed.x = -Math.abs(speed.x)
      if (pos.x - r < 0) speed.x = Math.abs(speed.x)
      if (pos.y + r > wh) speed.y = -Math.abs(speed.y)
      if (pos.y - r < 0) speed.y = Math.abs(speed.y)
    }

    const update = () => {
      if (dragging) return
      pos.x += speed.x
      pos.y += speed.y

      speed.x += a.x
      speed.y += a.y

      checkBoundary()
    }

    const draw = () => {
      ctx.save()
      ctx.fillStyle = '#fff'
      ctx.translate(pos.x, pos.y)
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const drawV = () => {
      ctx.save()
      ctx.beginPath()
      ctx.translate(pos.x, pos.y)
      ctx.moveTo(0, 0)
      ctx.lineTo(speed.x, speed.y)
      ctx.scale(3, 6)
      ctx.strokeStyle = 'blue'
      ctx.stroke()
      ctx.restore()
    }

    draw()
    drawV()
    update()
  }, [ctx])

  useEffect(() => {
    if (!ctx) return
    canvas.width = ww
    canvas.height = wh

    onMouseEvent()
    setInterval(paint, 1000/30)
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
    <div className={styles.ball}>
      <canvas id='myCanvas' />
    </div>
  )
}
        
export default Ball