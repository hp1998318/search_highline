import React, { useEffect, useRef, useState } from "react";
import "./App.css";
function App() {
  const myRef = useRef<HTMLElement>(null);
  // const [text, setText] = useState<string>("");
  const allTextNode: Array<Node> = [];
  useEffect(() => {
    // 获取所有节点
    const treeWalker = document.createTreeWalker(
      myRef.current as Node,
      NodeFilter.SHOW_TEXT
    );
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
      allTextNode.push(currentNode);
      currentNode = treeWalker.nextNode();
    }
  });
  const textChange = (e: any) => {
    // 清除之前的 highlights
    //@ts-ignore
    CSS.highlights.clear();
    const text = e.target.value.toLocaleLowerCase();
    if (text === "") {
      return;
    }
    // 获取区间
    const ranges = allTextNode
      .map((el) => {
        return {
          el,
          t: el.textContent?.toLocaleLowerCase(),
        };
      })
      .map(({ el, t }) => {
        // 记录每个 alltextnode 中符合的目标项
        const indicet: Array<number> = [];
        let start = 0;
        while (start < t!.length) {
          const index = t!.indexOf(text, start);
          if (index === -1) break;
          indicet.push(index);
          start = index + text.length;
        }
        return indicet.map((i) => {
          const ranges = new Range();
          ranges.setStart(el, i);
          ranges.setEnd(el, i + text.length);
          return ranges;
        });
      });
    //@ts-ignore
    const searchResultsHighlight = new Highlight(...ranges.flat());
    //@ts-ignore
    CSS.highlights.set("search-results", searchResultsHighlight);
  };
  return (
    <>
      <input onChange={textChange} />
      <article ref={myRef}>
        <p>
          阅文旗下囊括 QQ 阅读、<strong>起点中文网</strong>
          、新丽传媒等业界知名品牌，汇聚了强大的创作者阵营、丰富的作品储备，覆盖
          200
          多种内容品类，触达数亿用户，已成功输出《庆余年》《赘婿》《鬼吹灯》《全职高手》《斗罗大陆》《琅琊榜》等大量优秀网文
          IP，改编为动漫、影视、游戏等多业态产品。
        </p>
        <p>
          《盗墓笔记》最初连载于起点中文网，是南派三叔成名代表作。2015年网剧开播首日点击破亿，开启了盗墓文学
          IP
          年。电影于2016年上映，由井柏然、鹿晗、马思纯等主演，累计票房10亿元。
        </p>
        <p>
          庆余年》是阅文集团白金作家猫腻的作品，自2007年在起点中文网连载，持续保持历史类收藏榜前五位。改编剧集成为2019年现象级作品，播出期间登上微博热搜百余次，腾讯视频、爱奇艺双平台总播放量突破160亿次，并荣获第26届白玉兰奖最佳编剧（改编）、最佳男配角两项大奖。
        </p>
        <p>
          《鬼吹灯》是天下霸唱创作的经典悬疑盗墓小说，连载于起点中文网。先后进行过漫画、游戏、电影、网络电视剧的改编，均取得不俗的成绩，是当之无愧的超级IP。
        </p>
      </article>
    </>
  );
}

export default App;
