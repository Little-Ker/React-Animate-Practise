import React, {
  useCallback, useEffect, useMemo, useState 
} from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import short from '../../../assets/music/short.mp3'
import long from '../../../assets/music/long.mp3'
import styles from './morseCode.module.sass'
  
function MorseCode() {
  const shortAudio = new Audio(short)
  const longAudio = new Audio(long)

  const [isPlaying, setIsPlaying] = useState(false)

  const morseCodeList = useMemo(() => {
    const morseCode = 'A;.-|B;-...|C;-.-.|D;-..|E;.|F;..-.|G;--.|H;....|I;..|J;.---|K;-.-|L;.-..|M;--|N;-.|O;---|P;.--.|Q;--.-|R;.-.|S;...|T;-|U;..-|V;...-|W;.--|X;-..-|Y;-.--|Z;--..|/;-..-.|1;.----|2;..---|3;...--|4;....-|5;.....|6;-....|7;--...|8;---..|9;----.|0;-----'
    return morseCode.split('|').map((cur) => {
      const codeSpilt = cur.split(';')
      return codeSpilt
    })
  }, [])

  useEffect(() => {
    console.log('morseCodeList',morseCodeList)
  }, [morseCodeList])
 
  const [inputEng, setInputEng] = useState('')
  const [inputMorse, setInputMorse] = useState('')

  const changeBgColorAnim = useCallback((id) => {
    let tl = gsap.timeline()
    tl.to(id,{
      background: '#6b6853',
      color: '#fafafa',
      duration: 0.2,
    }).to(id,{
      background: '#fafafa',
      color: '#6b6853',
      duration: 0.2,
      onComplete: () => {
        tl.kill()
        tl = null
      },
    })
  }, [])

  const onTranslateMorse = useCallback(() => {
    const translate = inputEng.toUpperCase().replace(/\s*/g, '').split('').map((cur) => {
      const findCode =  morseCodeList.find(letter => (cur === letter[0]))
      if (findCode) return findCode[1]
      return cur
    }).join(' ')
    setInputMorse(translate)
    changeBgColorAnim('#inputMorse')
  }, [inputEng, morseCodeList])

  const onTranslateEng = useCallback(() => {
    const translate = inputMorse.split(' ').map((cur) => {
      const findCode =  morseCodeList.find((letter) => {
        return cur === letter[1]
      })
      if (findCode) return findCode[0]
      return cur
    }).join('')
    setInputEng(translate)
    changeBgColorAnim('#inputEng')
  }, [inputMorse, morseCodeList])

  const onPlayAudioFn = useCallback((textAry, nowIndex) => {
    if (isPlaying) return
    setIsPlaying(true)

    const text = textAry[nowIndex]
    let time = 500

    switch (text) {
    case '-':
      longAudio.play()
      break
    case '.':
      shortAudio.play()
      time = 300
      break
    default:
      time = 1000
      break
    }

    if (textAry.length > nowIndex) {
      setTimeout(() => {
        onPlayAudioFn(textAry, nowIndex + 1)
      }, time)
      return
    }
    setIsPlaying(false)
  }, [isPlaying])

  return (
    <div className={styles.morseCode}>
      <div className={clsx(styles.bgText, styles.topText)}>{'MORSE'}</div>
      <div className={clsx(styles.bgText, styles.bottomText)}>{'CODE'}</div>
      <div className={styles.paper}>
        <h3 className={styles.title}>{'摩斯密碼翻譯器'}</h3>
        <p className={styles.inputTitle}>{'English:'}</p>
        <textarea
          id={'inputEng'} cols="30" rows="5"
          placeholder={'輸入英文數字'}
          value={inputEng}
          onChange={e => setInputEng(e.target.value)}
        ></textarea>
        <div className={styles.label}>↑↓</div>
        <p className={styles.inputTitle}>{'Morse:'}</p>
        <textarea
          id={'inputMorse'} cols="30" rows="5"
          placeholder={'輸入密碼'}
          value={inputMorse}
          onChange={e => setInputMorse(e.target.value)}
        ></textarea>
        <div className={styles.buttonList}>
          <button onClick={onTranslateMorse} className={styles.mainColor}>{'翻譯成密碼'}</button>
          <button onClick={onTranslateEng} className={styles.subColor}>{'翻譯回英文'}</button>
          <button onClick={() => onPlayAudioFn(inputMorse, 0)} disabled={isPlaying} className={clsx(styles.whiteColor, isPlaying && styles.disableBtn)}>{'播放'}</button>
        </div>
      </div>
      <div className={clsx(styles.paper, styles.rightPaper)}>
        <h3>{'翻譯清單'}</h3>
        <hr></hr>
        <ul className={styles.list}>
          {morseCodeList.map(cur => (
            <li key={cur[0]}>{`${cur[0]} ${cur[1]}`}</li>
          ))}
        </ul>
      </div>
    </div> 
  )
}
          
export default MorseCode