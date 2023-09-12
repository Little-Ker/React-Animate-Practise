import React, {
  useCallback,
  useEffect, useRef, useState 
} from 'react'
          
const CanvasCastle = () => {
  const [canvas, setCanvas] = useState(null)
  const [ctx, setCtx] = useState(null)
  const time = useRef(0)
  const mousePos = useRef({
    x: 0,
    y: 0,
  })

  const initCanvas = useCallback(() => {
    const myCanvas2 = document.getElementById('myCanvas2')
    setCanvas(myCanvas2)
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    setCtx(ctx)
    canvas.width = 400
    canvas.height = 400
  }, [canvas])

  useEffect(() => {
    initCanvas()
  }, [canvas])

  const paint = useCallback(() => {
    if (!ctx) return
    time.current += 1

    // 畫面完全清除
    ctx.clearRect(0, 0, 400, 400)
    
    // 畫面有留殘影
    // ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
    // ctx.fillRect(0, 0, 400, 400)

    // x.y座標
    ctx.strokeStyle = '#eee'
    ctx.beginPath()
    for (let i = 0; i < 10; i++) {
      const pos = i * 50
      // x軸
      ctx.moveTo(pos, 0)
      ctx.lineTo(pos, 400)
      ctx.fillText(pos, pos ,10)
      // y軸
      ctx.moveTo(0, pos)
      ctx.lineTo(400, pos)
      ctx.fillText(pos, 0 ,pos)
    }
    ctx.stroke()
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2

    // 路
    ctx.beginPath()
    ctx.moveTo(25, 350)
    ctx.lineTo(375, 350)
    ctx.stroke()

    // 黃色矩形
    ctx.fillStyle = 'yellow'
    ctx.fillRect(50, 300, 50, 50)
    ctx.fillRect(250, 250, 50, 100)
    ctx.strokeRect(50, 300, 50, 50)
    ctx.strokeRect(250, 250, 50, 100)
    
    // 橘色矩形
    ctx.fillStyle = 'orange'
    ctx.fillRect(100, 250, 50, 100)
    ctx.fillRect(200, 250, 50, 100)
    ctx.strokeRect(100, 250, 50, 100)
    ctx.strokeRect(200, 250, 50, 100)
    
    // 白色拱門
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(100, 200)
    ctx.lineTo(250, 200)
    ctx.lineTo(250, 250)
    ctx.lineTo(200, 250)
    ctx.arc(175, 250, 25, 0, 1 * Math.PI, true)
    ctx.lineTo(100, 250)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // 紅色屋頂
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(100, 200)
    ctx.lineTo(175, 150)
    ctx.lineTo(250, 200)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.fillRect(300, 300, 50, 50)
    ctx.strokeRect(300, 300, 50, 50)

    let flagPosY = (time.current % 5)
    let flagColor = `hsl(${mousePos.current.x % 360}, 50%, 50%)`
    // 旗子
    ctx.fillStyle = flagColor
    ctx.beginPath()
    ctx.moveTo(175, 150)
    ctx.lineTo(175, 80)
    ctx.lineTo(200, 90 - flagPosY)
    ctx.lineTo(175, 100)
    ctx.fill()
    ctx.stroke()

    let carPosX = ((time.current % 400) - 40)
    // 車車
    ctx.fillStyle = 'white'
    ctx.fillRect(carPosX, 325, 40, 25)
    ctx.strokeRect(carPosX, 325, 40, 25)

    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc((carPosX + 10), 350, 5, 0, 2 * Math.PI)
    ctx.arc((carPosX + 30), 350, 5, 0, 2 * Math.PI)
    ctx.fill()

    // 滑鼠
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(mousePos.current.x, mousePos.current.y, 5, 0, 2 * Math.PI)
    ctx.fill()
  }, [ctx, time.current, mousePos.current])

  useEffect(() => {
    if (!canvas) return
    canvas.addEventListener('mousemove', (evt) => {
      mousePos.current.x = evt.offsetX
      mousePos.current.y = evt.offsetY
    })
  }, [canvas])

  useEffect(() => {
    if (!ctx) return
    setInterval(paint, 30)
  }, [ctx])
      
  return (
    <div>
      <canvas id='myCanvas2' />
    </div>
  )
}
          
export default CanvasCastle