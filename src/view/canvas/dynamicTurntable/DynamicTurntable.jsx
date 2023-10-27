import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import styles from './dynamicTurntable.module.sass'

import bg from 'assets/images/bg.jpg'
        
const DynamicTurntable = () => {
  const [canvas, setCanvas] = useState(null)
  const [ctx, setCtx] = useState(null)

  const [imgList, setImgList] = useState(null)

  const globalControl = {
    angle: 0,
    angleSpeed: 0.01,
    isDragging: false,
    mousePos: {
      x: 0,
      y: 0,
    },
    mouseDownPos: null,
    FPS: 30,
  }

  const onMouseEvent = useCallback(() => {
    if (!canvas) return
    canvas.addEventListener('mousedown', (evt) => {
      globalControl.isDragging = true
      globalControl.mousePos = {
        x: evt.x,
        y: evt.y,
      }
      globalControl.mouseDownPos = {
        x: evt.x,
        y: evt.y,
      }
    })
    canvas.addEventListener('mouseup', (evt) => {
      globalControl.isDragging = false
      globalControl.mousePos = {
        x: evt.x,
        y: evt.y,
      }
    })
    canvas.addEventListener('mousemove', (evt) => {
      globalControl.mousePos = {
        x: evt.x,
        y: evt.y,
      }
    })
  }, [canvas, globalControl.mousePos])

  let ww = window.innerWidth - 3
  let wh = window.innerHeight - 3

  window.addEventListener('resize', () => {
    if (!canvas) return 
    canvas.width = ww
    canvas.height = wh
  })

  const color = {
    black: '#000',
    bgWhite: '#eee',
    blue: '#036faf',
    gold: '#d3b889',
  }

  const drawCircle = useCallback((posX, posY, r, fillColor, strokeColor) => {
    ctx.beginPath()
    ctx.arc(posX, posY, r, 0, 2 * Math.PI)
    ctx.closePath()
    if (fillColor) {
      ctx.fillStyle = fillColor
      ctx.fill()
      return 
    }
    ctx.strokeStyle = strokeColor
    ctx.stroke()
  }, [ctx])

  const update = useCallback(() => {

  }, [])

  const paint = useCallback(() => {
    ctx.clearRect(0, 0, ww, wh)

    if (globalControl.isDragging) {
      const delta = {
        x: globalControl.mouseDownPos.x - globalControl.mousePos.x,
        y: globalControl.mouseDownPos.y -globalControl. mousePos.y,
      }
      const deltaAngle = Math.atan2(delta.x, delta.y)
      globalControl.angle = globalControl.angle + deltaAngle
      globalControl.angleSpeed = deltaAngle
    }

    ctx.save()
    ctx.translate(ww / 2, wh / 2)
    // 唱片底色與陰影
    ctx.shadowBlur = 100
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    drawCircle(0, 0, (ww / 3), color.black)
    ctx.shadowBlur = 0
    drawCircle(0, 0, (ww / 7), color.blue)

    // 選轉效果
    ctx.rotate(globalControl.angle)
    globalControl.angle += globalControl.angleSpeed
    globalControl.angleSpeed *= 0.98
    if (globalControl.angleSpeed <= 0.01 && globalControl.angleSpeed >= -0.01) {
      globalControl.angleSpeed = 0.01 * Math.sign(globalControl.angleSpeed)
    }

    // 中間底圖
    ctx.globalCompositeOperation = 'color-burn'
    ctx.drawImage(imgList, -(ww / 3) / 2, -(ww / 3) / 2)
    ctx.globalCompositeOperation = 'source-over'

    // 唱片裝飾
    ctx.lineWidth = 10
    drawCircle(0, 0, (ww / 8), null, color.gold)
    drawCircle(0, 0, (ww / 25), color.black)
    drawCircle(0, 0, (ww / 50), color.bgWhite)
    ctx.lineWidth = 1
    for(let i = 0; i < 40; i++) {
      drawCircle(0, 0, (ww / 3) * i / 40, null, `rgba(255, 255, 255, ${i % 5 / 20})`)
    }

    // 速度線
    for(let i = 0; i < 10; i++) {
      ctx.beginPath()
      const startAngle = i * Math.PI / 10
      const endAngle = startAngle + globalControl.angleSpeed + Math.PI / 4
      const opacity = i * Math.abs(globalControl.angleSpeed) / 10 + 0.1
      ctx.arc(0, 0, i * (ww / 30), startAngle, endAngle)
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.stroke()
    }
    ctx.restore()
  }, [ctx, globalControl])

  useEffect(() => {
    if (!ctx) return
    canvas.width = ww
    canvas.height = wh

    onMouseEvent()
    setInterval(update, 30)
    setInterval(paint, 30)
  }, [ctx, ww, wh])

  const initCanvas = useCallback(() => {
    const myCanvas = document.getElementById('myCanvas')
    setCanvas(myCanvas)
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    setCtx(ctx)

    const imageObj1 = new Image()
    imageObj1.src = bg
    setImgList(imageObj1)
  }, [canvas])

  useEffect(() => {
    initCanvas()
  }, [canvas])

  return (
    <div className={styles.dynamicTurntable}>
      <canvas id='myCanvas' />
    </div>
  )
}
        
export default DynamicTurntable