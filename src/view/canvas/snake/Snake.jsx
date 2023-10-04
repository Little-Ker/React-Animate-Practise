import React, {
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react'
import styles from './snake.module.sass'
        
const Snake = () => {
  const [canvas, setCanvas] = useState(null)
  const [ctx, setCtx] = useState(null)

  const timeInterval = useRef(null)
  const score = useRef(0)
  const time = useRef(0)

  const [start, setStart] = useState(false)

  const gameControl = {
    gridSize: 15,
    gridMargin: 2,
    gridCount: 30,
    snakeSetting: {
      maxLength: 5,
      body: [],
      dir: 'Right',
      keyDownDir: null,
      pos: {
        x: 0, 
        y: 0,
      },
    },
    food: [],
    FPS: 100,
  }

  const {gridSize, gridMargin, gridCount, snakeSetting, FPS, food} = gameControl

  let ww = gridSize * gridCount + gridMargin * (gridCount - 1)
  let wh = gridSize * gridCount + gridMargin * (gridCount - 1)

  const drawBlock = useCallback((x, y, color) => {
    ctx.fillStyle= color
    let pos = {
      x: x * gridSize + x * gridMargin,
      y: y * gridSize + y * gridMargin,
    }
    ctx.fillRect(pos.x,pos.y,gridSize,gridSize) 
  }, [ctx])

  const drawEffect = useCallback((x, y, color) => {
    ctx.strokeStyle= color
    let pos = {
      x: x * gridSize + x * gridMargin,
      y: y * gridSize + y * gridMargin,
    }

    const size = (10 + (time.current % 6) * 10)
    ctx.save()
    ctx.translate((pos.x - ((size - gridSize) / 2)), (pos.y - ((size - gridSize) / 2)))
    ctx.strokeRect(0,0,size,size)
    ctx.restore()
  }, [ctx, gridSize])

  const onKeydownEvent = useCallback(() => {
    document.addEventListener('keydown', (evt) => {
      snakeSetting.keyDownDir = evt.key.replace('Arrow','')
      if ((snakeSetting.dir === 'Right' && snakeSetting.keyDownDir === 'Left') ||
      (snakeSetting.dir === 'Left' && snakeSetting.keyDownDir === 'Right') ||
      (snakeSetting.dir === 'Up' && snakeSetting.keyDownDir === 'Down') ||
      (snakeSetting.dir === 'Down' && snakeSetting.keyDownDir === 'Up')) {
        return
      }
      snakeSetting.dir = snakeSetting.keyDownDir
    })
  }, [snakeSetting])

  const drawBg = useCallback(() => {
    if (!ctx) return
    for(let x = 0; x < gridCount; x++) {
      for(let y = 0; y < gridCount; y++) {
        drawBlock(x, y, 'rgba(255,255,255,0.3)')
      }
    }
  }, [gridCount, ctx])

  const getRandomPos = useCallback(() => {
    const randomPosX = Math.floor(Math.random() * gridCount)
    const randomPosY = Math.floor(Math.random() * gridCount)
    snakeSetting.body.forEach((bodyPos) => {
      if (bodyPos.x === randomPosX && bodyPos.y === randomPosY) {
        getRandomPos()
      }
    })
    return {
      x: randomPosX,
      y: randomPosY,
    }
  }, [snakeSetting])

  const createFood = useCallback(() => {
    if (food.length !== 0) {
      const snakePos = snakeSetting.pos
      const foodPos = food[0]
      drawBlock(foodPos.x, foodPos.y, 'red')
      drawEffect(foodPos.x, foodPos.y, 'red')

      if (snakePos.x === foodPos.x && snakePos.y === foodPos.y) {
        snakeSetting.maxLength += 1
        food.shift()
        score.current += 1
      }
      return
    }

    food.push(getRandomPos())
  }, [food, snakeSetting])

  const createSnake = useCallback((snakeSetting) => {
    if (snakeSetting.dir === 'Right') snakeSetting.pos.x += 1
    if (snakeSetting.dir === 'Left') snakeSetting.pos.x -= 1
    if (snakeSetting.dir === 'Up') snakeSetting.pos.y -= 1
    if (snakeSetting.dir === 'Down') snakeSetting.pos.y += 1

    snakeSetting.body.push({...snakeSetting.pos})
    if (snakeSetting.body.length > snakeSetting.maxLength) {
      snakeSetting.body.shift()
    }

    snakeSetting.body.forEach((pos) => {
      drawBlock(pos.x, pos.y, '#fff')
    })
  }, [ctx])

  // 碰撞判定
  const checkBoundary = useCallback((snakeSet) => {
    // 撞到四周圍牆壁
    if ((snakeSet.pos.x + 1) > gridCount) return true
    if (snakeSet.pos.x < 0) return true
    if (snakeSet.pos.y < 0) return true
    if ((snakeSet.pos.y + 1) > gridCount) return true

    // 撞到自己身體
    const findEatBody = snakeSetting.body.find((bodyPos, i) => {
      return snakeSetting.body.length !== (i + 1) && bodyPos.x === snakeSetting.pos.x && bodyPos.y === snakeSetting.pos.y
    })
    if (findEatBody) return true

    return false
  }, [snakeSetting])

  const paint = useCallback(() => {
    if (checkBoundary(gameControl.snakeSetting)) {
      setStart(false)
      clearInterval(timeInterval.current)
      return 
    }
    time.current += 1
    ctx.clearRect(0, 0, ww, wh)
    drawBg()
    createFood()
    createSnake(gameControl.snakeSetting)
  }, [ctx, gameControl, start, gridCount, snakeSetting, food])

  useEffect(() => {
    if (!ctx) return
    canvas.width = ww
    canvas.height = wh
    drawBg()

    if (start) {
      onKeydownEvent()
      timeInterval.current = setInterval(paint, FPS)
    }
  }, [ctx, ww, wh, start])

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

  const onClickStart = useCallback(() => {
    score.current = 0
    setStart(true)
  }, [])

  const onClickDir = useCallback((dir) => {
    if (!start) return
    snakeSetting.keyDownDir = dir
    if ((snakeSetting.dir === 'Right' && snakeSetting.keyDownDir === 'Left') ||
      (snakeSetting.dir === 'Left' && snakeSetting.keyDownDir === 'Right') ||
      (snakeSetting.dir === 'Up' && snakeSetting.keyDownDir === 'Down') ||
      (snakeSetting.dir === 'Down' && snakeSetting.keyDownDir === 'Up')) {
      return
    }
    snakeSetting.dir = snakeSetting.keyDownDir
  }, [snakeSetting])

  return (
    <div className={styles.snake}>
      <canvas id='myCanvas' />
      {(!start) && (
        <div className={styles.panel}>
          <p className={styles.title}>{`SCORE: ${score.current}`}</p>
          <button className={styles.button} onClick={onClickStart}>START</button>
        </div>
      )}
      {/* 控制方向按鈕 */}
      <div className={styles.arrBtnGroup}>
        <button className={styles.arrButton} onClick={() => onClickDir('Up')}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </button>
        <div>
          <button className={styles.arrButton} onClick={() => onClickDir('Left')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </button>
          <button className={styles.arrButton} onClick={() => onClickDir('Down')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </button>
          <button className={styles.arrButton} onClick={() => onClickDir('Right')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
        
export default Snake