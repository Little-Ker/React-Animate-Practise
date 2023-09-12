import React, {
  useEffect 
} from 'react'
          
const CanvasPractice = () => {
  const canvasAnim = () => {
    const canvas = document.getElementById('myCanvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 130
  
    // 實心正方形
    ctx.fillStyle = 'red'
    ctx.fillRect(10, 10, 50, 50)
  
    // 線框正方形
    ctx.strokeStyle = 'black'
    ctx.strokeRect(10, 70, 50, 50)
  
    // 繪製不規則圖形(線框)
    ctx.beginPath()
    ctx.moveTo(100, 10)
    ctx.lineTo(180, 10)
    ctx.lineTo(180, 50)
    ctx.lineTo(100, 90)
    ctx.closePath()
    ctx.strokeRect(190, 10, 50, 50)
    ctx.stroke()
  
    // 繪製不規則圖形(實心)
    ctx.beginPath()
    ctx.moveTo(270, 10)
    ctx.lineTo(350, 10)
    ctx.lineTo(350, 50)
    ctx.lineTo(270, 90)
    ctx.closePath()
    ctx.fillRect(360, 10, 50, 50)
    ctx.fill()
  
    // 圓形
    // arc(x, y, r半徑, 開始角度, 結束角度)
    // 0 - 360 度 需寫 0 - 2 * Math.PI
    ctx.beginPath()
    ctx.arc(500, 60, 40, 0, 2 * Math.PI)
    ctx.fill()
  
    ctx.beginPath()
    ctx.arc(600, 60, 40, 0, Math.PI)
    ctx.stroke()
  }
  
  useEffect(() => {
    canvasAnim()
  }, [])
      
  return (
    <div>
      <canvas id={'myCanvas'} />
    </div>
  )
}
          
export default CanvasPractice