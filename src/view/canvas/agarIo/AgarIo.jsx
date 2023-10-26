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
    foodMax: 500,
    playerMax: 50,
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

  const playerMove = (player, delta) => {
    let posDelta = delta

    if (abs(delta.x) > player.getMaxSpeed()) {
      posDelta = {
        ...posDelta,
        x: Math.sign(posDelta.x) * player.getMaxSpeed(),
      }
    }
    if (abs(posDelta.y) > player?.getMaxSpeed()) {
      posDelta = {
        ...posDelta,
        y: Math.sign(posDelta.y) * player.getMaxSpeed(),
      }
    }
    player.speed = posDelta
  }

  const myPlayerMove = () => {
    const myPlayer = globalControl.myPlayers[0]
    let mouseDelta = {
      x: ((mousePos.x - ww/2) * 0.1),
      y: ((mousePos.y - wh/2) * 0.1),
    }
    playerMove(myPlayer, mouseDelta)
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
    const lastTarget = playerData.lastTarget
    const getAwayTarget = playerData.getAwayTarget

    globalControl.players[index].pos = {
      x: pos.x + speed.x,
      y: pos.y + speed.y,
    }

    // 球球移動控制
    myPlayerMove()
    // 玩家移動邊界
    playerMoveCheckBoundary(playerData)
    const player =  globalControl.players[index]
    if (living) {
      // 敵人AI
      if(((time.current + id * 5) % 20) === 0 && id !== globalControl.myPlayers[0].id && type !== 'food') {
        // 球球亂走
        if (Math.random() < 0.9) {
          player.lastTarget = null
          const newSpeed = {
            x: getMap(Math.random(),0,1,-5,5),
            y: getMap(Math.random(),0,1,-5,5),
          }
          player.speed = newSpeed
        }
        // 球球指定目標
        if (Math.random() < 0.3) {
          const targets = globalControl.players.filter((player2) => {
            if (player2.getR() < getR() && player2.living && player2.type !== 'food') {
              return (((Math.pow((pos.x - player2.pos.x), 2) + (Math.pow(pos.y - player2.pos.y, 2)) < (Math.pow(getR() + player2.getR(), 2)) + 100000)))
            }
            return false
          })
          if (targets[0]) player.lastTarget = targets[0]
        }
        // 球球逃離目標
        if (Math.random() < 0.3) {
          const targets = globalControl.players.filter((player2) => {
            if (player2.getR() > getR() && player2.living && player2.type !== 'food') {
              return Math.pow((pos.x - player2.pos.x), 2) + (Math.pow(pos.y - player2.pos.y, 2)) < (Math.pow(getR() + player2.getR(), 2)) + 100000
            }
            return false
          })
          if (targets[0]) player.getAwayTarget = targets[0]
        }
      } else {
        if (player?.lastTarget?.living) {
          let targetDelta = {
            x: lastTarget.pos.x,
            y: lastTarget.pos.y,
          }
          playerMove(player, targetDelta)
        }
        if (player?.getAwayTarget) {
          let targetDelta = {
            x: -getAwayTarget.pos.x,
            y: -getAwayTarget.pos.y,
          }
          playerMove(player, targetDelta)
        }
      }

      globalControl.players.forEach((player2, index2) => {
        if (weight > player2.weight && index !== index2 && id !== player2.id && player2.living) {
          if (((Math.pow((pos.x - player2.pos.x), 2) + (Math.pow(pos.y - player2.pos.y, 2)) < (Math.pow(getR() + player2.getR(), 2) * 0.5)))) {
            // 球球吃掉效果
            TweenMax.to(player, 0.1, {
              weight: player.weight + player2.weight,
            })
            globalControl.players[index2].living = false
          }       
        }
      })
    }

    if(weight < 0) player.living = true

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, getR(), 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()

    if (type !== 'food') {
      ctx.font = '10px Arial'
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.fillText(`${id}, ${getR()}`, pos.x, pos.y)
    }

    if (id === globalControl.myPlayers[0]?.id) {
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, getR(), 0, 2 * Math.PI)
      ctx.stroke()
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
        lastTarget: null,
        getAwayTarget: null,
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

    // 產生新食物 & 新玩家
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

      if (globalControl.playerMax > globalControl.players.filter(cur => cur.type !== 'food').length) {
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
          lastTarget: null,
          getAwayTarget: null,
        }
        globalControl.players.push(newPlayer)
      }
    }, 1000)
  }, [globalControl.players])

  // 繪製鏡頭縮小至左下角
  const drawMap = () => {
    ctx.save()
    const gridWidth = globalControl.width
    const mapScale = 0.05
    ctx.translate((gridWidth * mapScale / 2 + 3), wh - (gridWidth * mapScale / 2 + 3))
    ctx.scale(mapScale, mapScale)
    // 繪製網格背景
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.fillRect(-(gridWidth / 2), -(gridWidth / 2), gridWidth, gridWidth)
    // 繪製玩家所在框
    const mapPlayerPosSize = 800
    const centerPoint = { ...globalControl.myPlayers[0].pos }
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 5
    ctx.strokeRect(centerPoint.x - (mapPlayerPosSize / 2), centerPoint.y - (mapPlayerPosSize / 2), mapPlayerPosSize, mapPlayerPosSize)
    // 繪製地圖上玩家球
    globalControl.players.forEach((cur) => {
      if (cur.living && cur.type !== 'food') {
        ctx.fillStyle = (cur.id === globalControl.myPlayers[0].id) ? '#ff0000' : '#fff'
        ctx.beginPath()
        ctx.arc(cur.pos.x, cur.pos.y, (cur.id === globalControl.myPlayers[0].id) ? 100 : 30, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill()
      }
    })
    ctx.restore()
  }

  const update = () => {
    time.current += 1

    // 產生新食物 & 新玩家
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

      if (globalControl.playerMax > globalControl.players.filter(cur => cur.type !== 'food').length) {
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
          lastTarget: null,
          getAwayTarget: null,
        }
        globalControl.players.push(newPlayer)
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
    setInterval(drawMap, globalControl.FPS)
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