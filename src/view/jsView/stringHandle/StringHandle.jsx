import React from 'react'
import styles from './stringHandle.module.sass'
  
function StringHandle() {
  const BookData = () => {
    const booksData = '被埋葬的記憶,石黑一雄,79折284元,石黑一雄表示：在這本書裡，我想要寫作關於人們如何處理不愉快的回憶。人們記憶和遺忘的方式因身處的環境而不同。什麼時候遺忘會比較好？什麼時候必須回頭看，誠實面對過去？,http://www.books.com.tw/img/001/076/22/0010762208.jpg;銀翼殺手,菲利普‧狄克,79折284元,2021年，數百萬人命喪世界大戰，人類瀕臨滅絕，倖存者遠離地球，留下來的無不渴望擁有一隻生物，而負擔不起的人，廠商提供幾可亂真的仿冒品，有馬，有鳥，有貓，還有羊……他們甚至做出仿生人。,http://www.books.com.tw/img/001/076/22/0010762208.jpg;人生複本,布萊克．克勞奇,79折308元,傑森不過是晚上出去跟朋友喝杯酒，不過才剛跟老婆孩子道別，還答應稍後帶冰淇淋回來享受難得的家庭之夜。但是再次轉開家門，一切都變了，沒有太太、沒有孩子，家具隔間全不是他記得的樣子，甚至連他自己都不是自己……幸好，他手指上隱約留下婚戒痕跡。對，他不是腦子壞、神智混亂，記憶造假。,https://media.taaze.tw/showLargeImage.html?sc=11100810285&width=289&height=386'
    console.log('booksData',booksData)
  
    const booksSplitList = booksData.split(';')
    const booksDetailSplitList = booksSplitList.map((cur) => {
      const arr = cur.split(',')
      return arr
    })

    const data = booksDetailSplitList.map((cur) => {
      const discountData = cur[2].split('折')
      return {
        bookName: cur[0],
        author: cur[1],
        discount: discountData[0],
        price: Math.ceil(Number(discountData[1].split('元')[0]) / (Number(discountData[0] / 100))),
        description: cur[3],
        imgUrl: cur[4],
      }
    })

    console.log(data)

    return (
      <div className={styles.bookList}>
        {data.map((cur, index) => (
          <div key={index} className={styles.book}>
            <img src={cur.imgUrl} alt="" />
            <h3>{cur.author}</h3>
            <h1>{cur.bookName}</h1>
            <h2>{`${cur.price}元(${cur.discount}折)`}</h2>
            <p>{`${cur.description.slice(0, 50)}...`}</p>
          </div>
        ))}
      </div>   
    )
  }

  // 正規表達式  (.*?)： () 選擇範圍  .中間任意字  *重複  ?最小次數
  // `4<H2>你好</H2>5`.match(/<h2>(.*?)<\/h2>/)
  // = ["<h2>你好</h2>", "你好"]
  const HtmlData = () => {
    const htmlData = `
    <ul>
      <li>
        <h3>吳先生</h3>
        <p>我覺得這個耳機不好用
          <span>2017/11/12</span>
        </p>
      </li>
      <li>
        <h3>林先生</h3>
        <p>耳機還是比較喜歡入耳式
          <span>2017/10/15</span>
        </p>
      </li>
    </ul>
  `
    console.log('htmlData',htmlData)
    const dataReplace = htmlData.replace(/\n/g, '') // 取代換行
    const memberMatch = dataReplace.match(/<li>(.*?)<\/li>/g)
    const memberList = memberMatch.map((cur) => {
      return {
        name: cur.match(/<h3>(.*?)<\/h3>/)[1].trim(),
        date: cur.match(/<span>(.*?)<\/span>/)[1].trim(),
        content: cur.match(/<p>(.*?)<\/p>/)[1].split('<span>')[0].trim(),
      }
    })
    console.log('memberList',memberList)

    return (
      <div className={styles.memberList}>
        {memberList.map(cur => (
          <div key={cur} className={styles.member}>
            <div>{`名字：${cur.name}`}</div>
            <div>{`日期：${cur.date}`}</div>
            <div>{`評論：${cur.content}`}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.stringHandle}>
      <div>
        <h1 className={styles.title}>字串 處理成 物件格式</h1>
        <BookData />
        <h1 className={styles.title}>html字串 處理成 物件格式(正規表達式)</h1>
        <HtmlData />
      </div>
    </div> 
  )
}
          
export default StringHandle