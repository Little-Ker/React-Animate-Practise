import React, {
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react'
import styles from './scienceWeb.module.sass'
        
const ScienceWeb = () => {
  const [canvas, setCanvas] = useState(null)
  const [ctx, setCtx] = useState(null)
  const time = useRef(0)
  const mousePos = useRef({
    x: 0,
    y: 0,
  })

  let ww = window.innerWidth - 3
  let wh = window.innerHeight - 3

  let degToPi = Math.PI / 180

  const control = {
    circles: [],
    FPS: 30,
  }

  window.addEventListener('resize', () => {
    if (!canvas) return 
    ww = window.innerWidth - 3
    wh = window.innerHeight - 3
    canvas.width = ww
    canvas.height = wh
  })

  const onMouseEvent = useCallback(() => {
    if (!canvas) return
    canvas.addEventListener('mousemove', (evt) => {
      mousePos.current.x = evt.x
      mousePos.current.y = evt.y
    })
  }, [canvas, mousePos])

  const drawCircle = useCallback((circleData) => {
    const color = circleData.color || 'rgba(255, 255, 255, 0.8)'
    const size = circleData.size || 1
    const anglePen = circleData.anglePen || (() => 0)
    const lineTo = circleData.lineTo || (() => true)
    const getWidth = circleData.getWidth || (() => true)
    const vertical = circleData.vertical || false
    const getVerticalWidth = circleData.getVerticalWidth || (() => true)

    for(let i = 1; i <= 360; i++){
      let angle1 = i + anglePen()
      let angle2 = (i - 1) + anglePen()
      let use_r = size
      
      let x1 = use_r * Math.cos(angle1 * degToPi)
      let y1 = use_r * Math.sin(angle1 * degToPi)
      let x2 = use_r * Math.cos(angle2 * degToPi)
      let y2 = use_r * Math.sin(angle2 * degToPi)
      
      if (lineTo(i)) {
        ctx.beginPath()
        ctx.moveTo(x1,y1)
        ctx.lineTo(x2,y2)
        ctx.strokeStyle=color
        ctx.lineWidth = getWidth(i)
        ctx.stroke()
      }

      if (vertical) {
        const vWidth = getVerticalWidth(i)
        let x3 = (use_r + vWidth) * Math.cos(angle1 * degToPi)
        let y3 = (use_r + vWidth) * Math.sin(angle1 * degToPi)

        ctx.beginPath()
        ctx.moveTo(x1,y1)
        ctx.lineTo(x3,y3)
        ctx.strokeStyle=color
        ctx.stroke()
      }
    }
  }, [ctx])

  const init = useCallback(() => {
    const circle = {
      size: 150,
    }
    control.circles.push(circle)

    const circle2 = {
      size: 220,
      lineTo: i => (i % 2 === 0),
    }
    control.circles.push(circle2)

    const circle3 = {
      size: 80,
      lineTo: i => !(i % 180 < 30),
    }
    control.circles.push(circle3)

    const circle4 = {
      size: 320,
    }
    control.circles.push(circle4)

    const circle5 = {
      size: 190,
      getWidth: i => ((i % 150 < 50) ? 5: 1),
      anglePen: () => -(time.current / 10),
    }
    control.circles.push(circle5)
    
    const circle6 = {
      size: 300,
      lineTo: i => false,
      vertical: true,
      getVerticalWidth: (i) => {
        if (i % 10 === 0) return 10
        if (i % 5 === 0) return 5
        return 2
      },
      anglePen: () => (time.current / 10),
    }
    control.circles.push(circle6)

    const circle7 = {
      size: 280,
      lineTo: i => (i % 50 === 0),
      getWidth: i => (10),
      anglePen: () => -(time.current / 20),
    }
    control.circles.push(circle7)
  }, [control.circles])

  const paint = useCallback(() => {
    ctx.clearRect(0, 0, ww, wh)
    ctx.save()
    ctx.translate(ww/2, wh/2)
    control.circles.forEach((cur, index) => {
      ctx.save()
      let movePanX = (mousePos.current.x - (ww / 2)) * (2 / cur.size)
      let movePanY = (mousePos.current.y - (wh / 2)) * (2 / cur.size)
      ctx.translate(movePanX,movePanY)
      drawCircle(cur)
      ctx.restore()
    })

    // 繪製指針
    ctx.fillStyle='white'
    ctx.fillRect(0, -20, 120, 20)
    ctx.fillStyle='black'
    ctx.fillText(Date.now(), 5, -5)

    const h = new Date().getHours()
    const m = new Date().getMinutes()
    const s = new Date().getSeconds()

    const angleHour = (degToPi * (360 / 12)) * h - Math.PI / 2
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(50*Math.cos(angleHour), 50*Math.sin(angleHour))
    ctx.lineWidth = 5
    ctx.strokeStyle = 'red'
    ctx.stroke()

    const angleMinute = (degToPi * (360 / 60)) * m - Math.PI / 2
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(100*Math.cos(angleMinute),100*Math.sin(angleMinute))
    ctx.lineWidth = 2
    ctx.strokeStyle = 'white'
    ctx.stroke()

    const angleSecond = (degToPi * (360 / 60)) * s - Math.PI / 2
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(140*Math.cos(angleSecond), 140*Math.sin(angleSecond))
    ctx.lineWidth = 1
    ctx.strokeStyle = 'white'
    ctx.stroke()

    ctx.restore()
    time.current += 1
  }, [ctx, control.circles])

  useEffect(() => {
    if (!ctx) return
    canvas.width = ww
    canvas.height = wh

    init()
    onMouseEvent()
    setInterval(paint, control.FPS)
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
    <div className={styles.scienceWeb}>
      <canvas id='myCanvas' />
    </div>
  )
}
        
export default ScienceWeb