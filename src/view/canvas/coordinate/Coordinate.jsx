import React, {
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react'
import styles from './coordinate.module.sass'
        
const Coordinate = () => {
  const [canvas, setCanvas] = useState(null)
  const [ctx, setCtx] = useState(null)
  const time = useRef(0)

  const blockWidth = 200

  const PI = Math.PI
  const PI2 = Math.PI * 2

  const color = {
    red: '#f74456',
    white: '#fff',
    yellow: '#f1da56',
    blue: '#036faf',
  }

  const drawBlock = useCallback((posX, posY, bgColor, draw, time) => {
    ctx.save()
    ctx.translate(posX * blockWidth, posY * blockWidth)
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, blockWidth, blockWidth)
    ctx.translate(100, 100) // 將座標移動到矩形正中間
    draw()
    ctx.restore()
  }, [ctx])

  const paint = useCallback(() => {
    time.current += 1
    let fastTime = time.current
    let sTime = parseInt(time.current / 10)
    ctx.clearRect(0, 0, 600, 600)

    ctx.fillCircle = (x, y, r) => {
      ctx.beginPath()
      ctx.arc(x, y, r, 0, PI2)
      ctx.closePath()
      ctx.fill()
    }

    // 左上
    drawBlock(0, 0, color.blue, () => {
      ctx.strokeStyle = color.white
      ctx.lineWidth = 15
      ctx.beginPath()
      ctx.arc(0, 0, 30 / (sTime % 5 + 1), 0, PI2)
      ctx.stroke()
      for (let i = 0; i < 8; i++) {
        if (((i + sTime) % 4) !== 0) {
          ctx.fillStyle = ((sTime % 8) === i) ? color.red : color.white
          ctx.fillRect(60, -4, 20, 10)
        }
        ctx.rotate(PI2 / 8)
      }
      ctx.closePath()
    })

    // 中上
    drawBlock(1, 0, color.red, () => {
      ctx.scale(0.8, 0.8)
      ctx.translate(-60, -130)
      ctx.fillStyle = color.white
      for (let i = 0; i < 3; i++) {
        ctx.save()
        for (let j = 0; j < 3; j++) {
          ctx.translate(0, 65)
          ctx.beginPath()
          ctx.arc(0, 0, 20, 0, PI2)
          ctx.fillStyle = ((((i + j) * 2 + sTime) % 5 ) === i) ? color.yellow : '#fff'
          ctx.fill()
        }
        ctx.restore()
        ctx.translate(60, 0)
      }
      ctx.restore()
    })

    // 右上
    drawBlock(2, 0, color.yellow, () => {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.fillStyle = color.white
        ctx.moveTo(0, 0)
        ctx.lineTo(80, 20)
        ctx.lineTo(80, 80)
        ctx.closePath()
        ctx.fill()
        if (sTime%4 === i) {
          ctx.beginPath()
          ctx.fillStyle = color.red
          ctx.arc(60, 35, 5, 0,PI2)
          ctx.closePath()
          ctx.fill()
        }
        ctx.rotate(PI / 2)
      }
    })
    
    // 中左
    drawBlock(0, 1, color.yellow, () => {
      ctx.translate(-60, -80)
      ctx.beginPath()
      ctx.fillStyle = color.white
      ctx.fillRect(0, 0, 60, 60)
      ctx.closePath()
      ctx.fill()

      ctx.translate(30, 30)
      ctx.rotate(-PI / 4)
      ctx.beginPath()
      ctx.fillStyle = color.red
      ctx.moveTo(0, 0)
      ctx.lineTo(40, 0)
      ctx.arc(40, 40, 40, -PI / 2, PI / 2)
      ctx.lineTo(0, 80)
      ctx.closePath()
      ctx.fill()

      ctx.translate(-100 + (10 * Math.sin(fastTime / 10)), 60)
      ctx.fillStyle = color.blue
      ctx.fillRect(0, 0, 100, 40)

      ctx.translate(100 + (10 * Math.cos(fastTime / 10)), 40)
      ctx.fillStyle = color.white
      ctx.fillRect(0, 0, 40, 20)
    })

    // 中中
    drawBlock(1, 1, color.white, () => {
      const angle1 = (fastTime % 100) / 100 * PI2
      const angle2 = (fastTime % 50) / 50 * PI2
      ctx.beginPath()
      ctx.fillStyle = color.red
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, 80,  angle1, angle2)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = color.white
      ctx.fillCircle(0, 0, 40)

      ctx.translate(60, 60)
      ctx.fillStyle = color.yellow
      ctx.fillCircle(0, 0, 30)
    })

    // 中右
    drawBlock(2, 1, color.blue, () => {
      ctx.fillStyle = color.white
      ctx.fillCircle(0, 0, 80)

      ctx.rotate(fastTime / 10)
      ctx.fillStyle = color.yellow
      ctx.fillCircle(40, 0, 50)

      ctx.rotate(fastTime / 10)
      ctx.fillStyle = color.red
      ctx.fillCircle(-30, 0, 20)
    })

    //下左
    drawBlock(0, 2, color.red, () => {
      for(let i = 0; i < 8; i++) {
        ctx.rotate(PI2 / 8)

        ctx.fillStyle = color.blue
        ctx.fillCircle(15 + (sTime % 5 * 3), 0, (2 + (sTime % 5)))

        ctx.fillStyle = color.white
        let r = 16
        if (((sTime + i) % 4 < 2) ) r = 10
        ctx.fillCircle(60, 0, r)
      }
    })

    //下中
    drawBlock(1, 2, color.blue, () => {
      ctx.translate(-80, -100)
      ctx.fillStyle = color.yellow
      ctx.fillRect(0, time.current % 200, 40, time.current % 200)

      ctx.translate(40, 40)
      ctx.fillStyle = color.red
      ctx.fillRect(0, 0, 120, 80)

      ctx.translate(0, 40)
      ctx.fillStyle = color.white
      ctx.fillCircle(0, 0, 5 + (sTime % 6))

      ctx.translate(60, 0)
      ctx.fillStyle = color.white
      ctx.fillCircle(0, 0, 5 + (sTime % 3))

      ctx.translate(0, 40)
      ctx.fillStyle = color.white
      ctx.fillRect(0, 0, 60, 80)
    })

    //下右
    drawBlock(2, 2, color.yellow, () => {
      ctx.fillStyle = color.white
      ctx.beginPath()
      ctx.moveTo(-100, -100)
      ctx.lineTo(-100, 100)
      ctx.lineTo(0, -100)
      ctx.closePath()
      ctx.fill()

      ctx.rotate(PI)
      ctx.save()
      ctx.translate((time.current % 100),0)
      ctx.fillStyle = color.red
      ctx.beginPath()
      ctx.moveTo(-100, -100)
      ctx.lineTo(-100, 100)
      ctx.lineTo(0, -100)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
     
      ctx.fillStyle = color.white
      ctx.beginPath()
      ctx.moveTo(-100, -100)
      ctx.lineTo(-100, 100)
      ctx.lineTo(0, -100)
      ctx.closePath()
      ctx.fill()
    })
  }, [ctx, time.current])

  useEffect(() => {
    if (!ctx) return
    canvas.width = blockWidth * 3
    canvas.height = blockWidth * 3
    setInterval(paint, 30)
  }, [ctx])

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
    <div className={styles.coordinate}>
      <canvas id='myCanvas' />
    </div>
  )
}
        
export default Coordinate