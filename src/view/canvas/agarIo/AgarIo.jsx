import React, {
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react'
import {
  TweenMax
} from 'gsap/all'
import styles from './agarIo.module.sass'
        
const AgarIo = () => {
  const [canvas, setCanvas] = useState(null)
  const [ctx, setCtx] = useState(null)
  const time = useRef(0)

  let ww = window.innerWidth - 3
  let wh = window.innerHeight - 3

  const mousePos = {
    x: ww / 2,
    y: wh / 2,
  }

  const globalControl = {
    scale: 1,
    width: 4000,
    height: 4000,
    foodMax: 200,
    playerMax: 50,
    collideFactor: 0, // 0: 合併  1: 分開
    FPS: 30,

    players: [],
    myPlayers: [],
  }

  // let ww = globalControl.width
  // let wh = globalControl.height

  const getMap = useCallback((value, min, max, newMin, newMax) => {
    const l1 = max - min
    const l2 = newMax - newMin
    const  ratio = l2 / l1
    return (value - min) * ratio + newMin
  }, [])

  const abs = useCallback((value) => {
    return Math.abs(value)
  }, [])

  const onMouseEvent = useCallback(() => {
    if (!canvas) return
    canvas.addEventListener('mousemove', (evt) => {
      mousePos.x = evt.x
      mousePos.y = evt.y
    })
  }, [canvas, mousePos])

  window.addEventListener('resize', () => {
    if (!canvas) return 
    canvas.width = ww
    canvas.height = wh
  })

  const myPlayerMove = () => {
    const myPlayer = globalControl.myPlayers[0]
    let mouseDelta = {
      x: ((mousePos.x - ww/2) * 0.1),
      y: ((mousePos.y - wh/2) * 0.1),
    }

    if (abs(mouseDelta.x) > myPlayer.getMaxSpeed()) {
      mouseDelta = {
        ...mouseDelta,
        x: Math.sign(mouseDelta.x) * myPlayer.getMaxSpeed(),
      }
    }
    if (abs(mouseDelta.y) > myPlayer?.getMaxSpeed()) {
      mouseDelta = {
        ...mouseDelta,
        y: Math.sign(mouseDelta.y) * myPlayer.getMaxSpeed(),
      }
    }
    myPlayer.speed = mouseDelta
  }

  const playerMoveCheckBoundary = (playerData) => {
    // 球球邊界偵測
    if (playerData.pos.x - playerData.getR() < -globalControl.width / 2) {
      playerData.pos.x = -globalControl.width / 2 + playerData.getR()
    }
    if (playerData.pos.x + playerData.getR() > globalControl.width / 2) {
      playerData.pos.x = globalControl.width / 2 - playerData.getR()
    }
    if (playerData.pos.y - playerData.getR() < -globalControl.height / 2) {
      playerData.pos.y = -globalControl.height / 2 + playerData.getR()
    }
    if (playerData.pos.y + playerData.getR() > globalControl.height / 2) {
      playerData.pos.y = globalControl.height / 2 - playerData.getR()
    }
  }

  const drawPlayer = ((playerData, index) => {
    const id = playerData.id
    const color = playerData.color
    let pos = playerData.pos
    let speed = playerData.speed
    const getR = playerData.getR
    const type = playerData.type
    const weight = playerData.weight
    const living = playerData.living

    globalControl.players[index].pos = {
      x: pos.x + speed.x,
      y: pos.y + speed.y,
    }

    // globalControl.players[index].speed = {
    //   x: speed.x * 0.98,
    //   y: speed.y * 0.98,
    // }
  
    // 球球移動控制
    myPlayerMove()
    // 玩家移動邊界
    playerMoveCheckBoundary(playerData)

    if (living) {
      globalControl.players.forEach((player2, index2) => {
        if (weight > player2.weight && index !== index2 && id !== player2.id && player2.living) {
          if (((Math.pow((pos.x - player2.pos.x), 2) + (Math.pow(pos.y - player2.pos.y, 2)) < (Math.pow(getR() + player2.getR(), 2) * 0.5)))) {
            // 球球吃掉效果
            TweenMax.to(globalControl.players[index], 0.1, {
              weight: globalControl.players[index].weight + player2.weight,
            })
            globalControl.players[index2].living = false
          }       
        }
      })
    }

    if(weight < 0) globalControl.players[index].living = true

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, getR(), 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()

    if (type !== 'food') {
      ctx.font = '10px Arial'
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.fillText(`${id}:(${pos.x}, ${pos.y}), ${getR()}`, pos.x, pos.y)
      // ctx.fillText(id, pos.x, pos.y)
    }
  })

  const paint = useCallback(() => {
    ctx.clearRect(0, 0, ww, wh)

    // 繪製鏡頭置中
    const centerPoint = globalControl.myPlayers[0].pos
    ctx.save()
    ctx.translate(ww/2, wh/2)
    ctx.scale(globalControl.scale, globalControl.scale)
    ctx.translate(-centerPoint.x, -centerPoint.y)

    // 繪製網格背景
    const gridWidth = 250
    const gCount = globalControl.width / gridWidth
    for(let i = -(gCount / 2); i <= (gCount / 2); i++) {
      ctx.moveTo(i * gridWidth, -(globalControl.height / 2))
      ctx.lineTo(i * gridWidth, globalControl.height / 2)
      ctx.moveTo(-(globalControl.width / 2), i * gridWidth)
      ctx.lineTo(globalControl.width / 2, i * gridWidth)
    }
    ctx.strokeStyle='rgba(255,255,255,0.4)'
    ctx.stroke()

    globalControl.players = globalControl.players.filter(cur => cur.living)
    // globalControl.myPlayers = globalControl.myPlayers.filter(cur => cur.living)

    // 繪製玩家球
    globalControl.players.forEach((cur, index) => {
      if (cur.living) drawPlayer(cur, index)
    })
    ctx.restore()
  }, [ctx, globalControl.players, time.current])

  const init = useCallback(() => {
    for(let i = 0; i < globalControl.playerMax; i++) {
      const newPlayer = {
        id: parseInt(Math.random() * 10000),
        pos: {
          x: getMap(Math.random(), 0, 1, -globalControl.width / 2, globalControl.width / 2),
          y: getMap(Math.random(), 0, 1, -globalControl.height / 2, globalControl.height / 2),
        },
        speed: {
          x: getMap(Math.random(),0,1,-5,5),
          y: getMap(Math.random(),0,1,-5,5),
        },
        weight: Math.random() * 1000 + 20,
        living: true,
        color: `hsl(${Math.random() * 360}, 60%, 50%)`,
        getR: () => Math.sqrt(newPlayer.weight),
        getMaxSpeed: () => 30 / (1 + Math.log(newPlayer.getR())),
      }
      globalControl.players.push(newPlayer)
    }
    globalControl.myPlayers.push(globalControl.players[0])

    for(let i = 0; i < globalControl.foodMax; i++) {
      const newFood = {
        id: parseInt(Math.random() * 10000),
        pos: {
          x: getMap(Math.random(), 0, 1, -globalControl.width / 2, globalControl.width / 2),
          y: getMap(Math.random(), 0, 1, -globalControl.height / 2, globalControl.height / 2),
        },
        speed: {
          x: 0,
          y: 0,
        },
        weight: 20,
        living: true,
        color: `hsl(${Math.random() * 360}, 60%, 50%)`,
        getR: () => Math.sqrt(newFood.weight),
        getMaxSpeed: () => 30 / (1 + Math.log(newFood.getR())),
        type: 'food',
      }
      globalControl.players.push(newFood)
    }

    // 鏡頭根據球半徑反比縮放
    setInterval(() => {
      let scale = 1/Math.log(Math.sqrt(globalControl.myPlayers[0].getR())/4+2)
      TweenMax.to(globalControl,2,{scale: scale})
    }, 2000)
  }, [globalControl.players])

  const update = () => {
    // 產生新食物
    setInterval(() => {
      if (globalControl.foodMax > globalControl.players.filter(cur => cur.type === 'food').length) {
        const newFood = {
          id: parseInt(Math.random() * 10000),
          pos: {
            x: getMap(Math.random(), 0, 1, -globalControl.width / 2, globalControl.width / 2),
            y: getMap(Math.random(), 0, 1, -globalControl.height / 2, globalControl.height / 2),
          },
          speed: {
            x: 0,
            y: 0,
          },
          weight: 20,
          living: true,
          color: `hsl(${Math.random() * 360}, 60%, 50%)`,
          getR: () => Math.sqrt(newFood.weight),
          getMaxSpeed: () => 30 / (1 + Math.log(newFood.getR())),
          type: 'food',
        }
        globalControl.players.push(newFood)
      }
    }, 1000)
  }

  useEffect(() => {
    if (!ctx) return
    canvas.width = ww
    canvas.height = wh

    init()
    onMouseEvent()
    setInterval(update, globalControl.FPS)
    setInterval(paint, globalControl.FPS)
  }, [ctx, ww, wh, globalControl.FPS])

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
    <div className={styles.agarIo}>
      <canvas id='myCanvas' />
    </div>
  )
}
        
export default AgarIo