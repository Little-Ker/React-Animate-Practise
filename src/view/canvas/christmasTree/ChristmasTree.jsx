import React, {
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react'
import {
  TweenMax 
} from 'gsap/all'
import styles from './christmasTree.module.sass'
        
const ChristmasTree = () => {
  const [canvas, setCanvas] = useState(null)
  const [ctx, setCtx] = useState(null)
  const time = useRef(0)

  let ww = window.innerWidth - 3
  let wh = window.innerHeight - 3

  const control = {
    trees: [],
    treeCount: 6,
    gifts: [],
    giftCount: 30,
    FPS: 30,
  }

  window.addEventListener('resize', () => {
    if (!canvas) return 
    ww = window.innerWidth - 3
    wh = window.innerHeight - 3
    canvas.width = ww
    canvas.height = wh
  })

  const drawTree = useCallback((treeData) => {
    const color = treeData.color
    const width = treeData.width || 0
    const height = treeData.height || 0

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0 - width / 2, 0)
    ctx.lineTo(0, 0 - height)
    ctx.lineTo(0 + width / 2, 0)
    ctx.closePath()
    ctx.fill()
  }, [ctx])

  const drawGift = useCallback((giftData) => {
    const color = giftData.color
    const fallPosX = giftData.fallPosX
    const fallPosY = giftData.fallPosY
    const width = giftData.width
    const opacity = giftData.opacity

    ctx.globalAlpha = opacity
    ctx.fillStyle = color

    ctx.save()
    ctx.translate(0, 0 - width)
    ctx.fillRect(fallPosX, fallPosY, width, width)
    ctx.restore()
  }, [ctx])

  const init = useCallback(() => {
    for(let i = 1; i < control.treeCount; i++) {
      const tree = {
        color: `hsl(${i* 10+60}, 80%, 50%)`,
        width: (control.treeCount-i) * 70 + 5,
        height: (control.treeCount-i) * 30 + 10,
        angle: Math.PI / 20,
      }
      control.trees.push(tree)
    }

    for(let i = 1; i < control.giftCount; i++) {
      let width = Math.random()*80+20
      const gift = {
        color: `hsl(${i*10},80%,50%)`,
        fallPosX: ww*Math.random(),
        fallPosY: (Math.random()*100 + 50),
        width: width,
        opacity: 0,
      }
      control.gifts.push(gift)
    }

    // 禮物掉落動畫
    TweenMax.staggerTo(control.gifts, 2,
      {
        fallPosY: wh,
        opacity: 1,
        ease: 'Bounce.easeOut',
      }, 0.3) 
  }, [control.treeCount, control.trees, control.gifts])

  const paint = useCallback(() => {
    ctx.clearRect(0, 0, ww, wh)
  
    ctx.save()
    control.gifts.forEach((cur) => {
      drawGift(cur)
    })
    ctx.restore()

    ctx.save()
    ctx.translate(ww/2, wh - 50)
    control.trees.forEach((cur) => {
      ctx.rotate(cur.angle)
      drawTree(cur)
      ctx.translate(0, 0 - (cur.height / 1.5))
    })
    ctx.restore()
  }, [ctx, control.trees, time.current])

  const onClickFn = useCallback(() => {
    time.current += 1
    TweenMax.staggerTo(control.trees, 2,
      {
        angle: (Math.PI / 20) * ((time.current % 2 === 0) ? 1 : -1),
        ease: 'Elastic.easeOut',
      }) 
  }, [control.trees])

  useEffect(() => {
    if (!ctx) return
    canvas.width = ww
    canvas.height = wh

    init()
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
    <div className={styles.christmasTree}>
      <button className={styles.btn} onClick={onClickFn}>{'Button'}</button>
      <canvas id='myCanvas' />
    </div>
  )
}
        
export default ChristmasTree