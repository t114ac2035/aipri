 
import { useState, useEffect } from "react";
import logoImg from "./assets/logo.png";
import bgImg from "./assets/bg.jpg";       // 改回小寫 .jpg
import idolsImg from "./assets/idols.png"; // 改回小寫 .png
import gradientImg from "./assets/gradient.png";
import btnGameplay from "./assets/btn-gameplay.png";
import btnCards from "./assets/btn-cards.png";
import btnIdols from "./assets/btn-idols.png";
import ytPng from "./assets/yt.png";       // 改回小寫 .png
import sectionBgImg from "./assets/section-bg.png"; // 請確認你的粉色菱形底圖檔名，若是 png 請改為 .png
import infoImg from "./assets/info.jpg";
import footBgImg from "./assets/foot.png";
import igBtnImg from "./assets/ig.png";
import sytBtnImg from "./assets/syt.png";
import fbBtnImg from "./assets/fb.png";
import topBarImg from "./assets/top.png";
import game1 from "./assets/1.png";
import game2 from "./assets/2.png";
import game3 from "./assets/3.png";
import game4 from "./assets/4.png";
import game5 from "./assets/5.png";
import game6 from "./assets/6.png";
import navGameplayImg from "./assets/goods (4).png";
import navCardsImg from "./assets/card.png";
import navIdolsImg from "./assets/idol.png";
import navGoodsImg from "./assets/gameplay.png";
import hamburgerImg from "./assets/hamburger.png";
import cardBookB from "./assets/cardbookb.jpg";
import cardBookP from "./assets/cardbookp.jpg";
import ringB from "./assets/ringb.png";
import ringP from "./assets/ringp.jpg";

/* ================= 資料 ================= */

const GOODS = [
  { name: "秘密的偶像公主手環 粉色", price: 450,
    desc: "和ひまり同款的公主手環。香氛貼紙盒裡面放的是摩擦後會散發玫瑰香的香味貼紙。附上的 QR 碼（存檔代碼）可以用在卡片遊戲機台「秘密的偶像公主」遊戲中進行資料存檔，而且還能提高觸發人氣螢光幻彩變身的機率！" },
  { name: "秘密的偶像公主手環 藍色", price: 450,
    desc: "和みつき同款的公主手環。香氛貼紙盒裡面放的是摩擦後會散發茉莉香的香味貼紙。附上的 QR 碼（存檔代碼）可以用在卡片遊戲機台「秘密的偶像公主」遊戲中進行資料存檔，而且還能提高觸發人氣螢光幻彩變身的機率！" },
  { name: "秘密的偶像公主卡冊 粉色", price: 350,
    desc: "可以收納《秘密的偶像公主》卡牌的收藏冊（共 48 個卡槽）。封面採用可愛的全新繪製圖案設計。" },
  { name: "秘密的偶像公主卡冊 藍色", price: 350,
    desc: "收錄 48 格卡片收納空間，採用ひまり與みつき限定封面設計，可愛又實用！" },
];

const NAV = [
  { id: "home", label: "首頁" },
  { id: "idols", label: "登場偶像" },
  { id: "gameplay", label: "遊戲玩法" },
  { id: "cards", label: "卡片圖鑑" },
  { id: "goods", label: "周邊商品" },
];

/* ================= 樣式工具 ================= */
const GRADIENT = "bg-gradient-to-r from-[#A0C4FF] via-[#D0BFFF] to-[#FFB5E8]";
const BORDER = "#E88DF0";
const tri = (c) => ({
  backgroundImage: [60, 120, 0].map((d) => `linear-gradient(${d}deg, ${c} 1px, transparent 1px)`).join(","),
  backgroundSize: "48px 83px",
});
const dots = { backgroundImage: "radial-gradient(rgba(255,255,255,.8) 2px, transparent 2px)", backgroundSize: "18px 18px" };

/* ================= 共用元件 ================= */
const Pill = ({ children, className = "" }) => (
  <span
    className={`inline-block rounded-full border-2 bg-white px-6 py-1.5 font-bold ${className}`}
    style={{ borderColor: BORDER }}
  >
    <span className="bg-gradient-to-r from-[#7FC8FF] to-[#F08BF0] bg-clip-text text-transparent">{children}</span>
  </span>
);

const Star = () => (
  <div className="py-5 text-center text-4xl text-transparent" aria-hidden="true">
    <span className="bg-gradient-to-br from-[#7FE0FF] to-[#F08BF0] bg-clip-text">★</span>
  </div>
);

const Slot = ({ label = "", className = "" }) => (
  <div className={`flex items-center justify-center bg-[#D9D9D9] text-xs text-gray-500 ${className}`}>{label}</div>
);

const SectionBar = () => (
  <div className={`relative h-14 ${GRADIENT}`} style={tri("rgba(255,255,255,.35)")}>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
  </div>
);

const PageLayout = ({ title, children }) => (
  <div className="min-h-[80vh]">
    <SectionBar />
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-4">
      {title && <div className="mb-8 text-center"><Pill className="text-lg">{title}</Pill></div>}
      {children}
    </div>
  </div>
);

/* ==================== 懸浮漢堡選單 ==================== */
function HamburgerMenu({ open, setOpen, goTo, activePage }) {
  return (
    <>
      {/* 懸浮漢堡按鈕：z-[70] 確保永遠在選單面板上方，點擊可自由開關 */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "關閉選單" : "開啟選單"}
        aria-expanded={open}
        className="fixed top-4 right-4 z-[70] transition transform hover:scale-110 active:scale-95 focus:outline-none"
      >
        <img src={hamburgerImg} alt="選單" className="h-11 w-11 drop-shadow-md" />
      </button>

      {/* 展開後的選單面板 (高度 266px，背景 top.png) */}
      {open && (
        <div 
          className="fixed inset-x-0 top-0 z-[60] bg-black/40 backdrop-blur-sm transition-all"
          onClick={() => setOpen(false)} // 點擊半透明背景也能收回
        >
          <div 
            className="relative w-full h-[266px] bg-cover bg-center flex items-center justify-between px-6 md:px-12 shadow-2xl"
            style={{ backgroundImage: `url(${topBarImg})` }}
            onClick={(e) => e.stopPropagation()} // 點擊面板內部不觸發關閉
          >
            {/* 左側 Logo */}
            <div className="flex items-center">
              <img 
                src={logoImg} 
                alt="秘密的偶像公主" 
                className="h-28 md:h-36 w-auto cursor-pointer object-contain transition hover:scale-105"
                onClick={() => { goTo("home"); setOpen(false); }}
              />
            </div>

            {/* 中間 4 個選單按鈕 */}
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => { goTo("gameplay"); setOpen(false); }}
                className="transition hover:scale-105 focus:outline-none"
              >
                <img src={navGameplayImg} alt="遊戲玩法" className="h-10 md:h-12 w-auto" />
              </button>

              <button 
                onClick={() => { goTo("cards"); setOpen(false); }}
                className="transition hover:scale-105 focus:outline-none"
              >
                <img src={navCardsImg} alt="卡片圖鑑" className="h-10 md:h-12 w-auto" />
              </button>

              <button 
                onClick={() => { goTo("idols"); setOpen(false); }}
                className="transition hover:scale-105 focus:outline-none"
              >
                <img src={navIdolsImg} alt="登場偶像" className="h-10 md:h-12 w-auto" />
              </button>

              <button 
                onClick={() => { goTo("goods"); setOpen(false); }}
                className="transition hover:scale-105 focus:outline-none"
              >
                <img src={navGoodsImg} alt="周邊商品" className="h-10 md:h-12 w-auto" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= 各分頁組件 ================= */
function HomePage({ goTo }) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* 頂部 Hero Banner 主區塊 (679px 高度對齊 Figma) */}
      <div 
        className="relative h-[500px] w-full overflow-hidden bg-cover bg-center md:h-[679px]"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* 【圖層 1 (z-10)】：角色圖 (往右推) */}
        <div className="absolute top-0 right-[-12%] bottom-0 z-10 flex h-full w-full justify-end pointer-events-none md:right-[-5%] md:w-[70%]">
          <img 
            src={idolsImg} 
            alt="角色" 
            className="h-full w-auto max-w-none object-cover object-right" 
          />
        </div>

        {/* 【圖層 2 (z-20)】：Figma 切下來的漸層圖 */}
        <div className="absolute top-0 left-0 bottom-0 z-20 h-full pointer-events-none md:w-[60%]">
          <img 
            src={gradientImg} 
            alt="漸層" 
            className="h-full w-full object-cover object-left" 
          />
        </div>

        {/* 【圖層 3 (z-30)】：Logo 與 3 個切圖按鈕 */}
        <div className="relative z-30 mx-auto flex h-full w-full max-w-6xl items-center px-6 md:px-12">
          <div className="flex flex-col items-start gap-6">
            <img src={logoImg} alt="秘密的偶像公主" className="w-56 drop-shadow-lg md:w-80" />
            
            <div className="flex items-center gap-3">
              <button onClick={() => goTo("gameplay")} className="transition hover:scale-105">
                <img src={btnGameplay} alt="遊戲玩法" className="h-10 md:h-12" />
              </button>
              <button onClick={() => goTo("cards")} className="transition hover:scale-105">
                <img src={btnCards} alt="卡片圖鑑" className="h-10 md:h-12" />
              </button>
              <button onClick={() => goTo("idols")} className="transition hover:scale-105">
                <img src={btnIdols} alt="登場偶像" className="h-10 md:h-12" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 官方動畫與最新資訊區塊 */}
      <div 
        className="pb-14 bg-cover bg-center"
        style={{ backgroundImage: `url(${sectionBgImg})` }}
      >
        <Star />
        <div className="mb-6 text-center"><Pill>官方動畫</Pill></div>
        <div className="mx-auto max-w-xl px-4">
          <div className="rounded-2xl border-4 border-[#D98BE0] bg-[#D98BE0] p-1 shadow-lg transition hover:scale-[1.02]">
            <a 
              href="https://youtube.com/playlist?list=PLo_HY74ov2N090KvychSD9MzDY_MIzml7&si=oYuz_yBFT6_pCJvR"
              target="_blank" 
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl"
            >
              <img 
                src={ytPng} 
                alt="官方動畫" 
                className="aspect-video w-full object-cover" 
              />
            </a>
          </div>
        </div>

<Star />
        <div className="mb-6 text-center"><Pill>最新資訊</Pill></div>
        <div className="mx-auto max-w-xl px-4">
          <div className="overflow-hidden rounded-2xl shadow-lg transition hover:scale-[1.01]">
            <img 
              src={infoImg} 
              alt="最新資訊" 
              className="w-full h-auto object-cover rounded-2xl" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const idolImages = import.meta.glob("./assets/角色介紹/*.png", { eager: true });

function getIdolImage(filename) {
  const path = `./assets/角色介紹/${filename}`;
  return idolImages[path]?.default || "";
}

// 1. 10 位偶像完整資料庫
// 1. 10 位偶像資料庫：加上圖檔所需的全名 (detailImgName)
const IDOLS = [
  { id: "himari", name: "青空 ひまり", detailImgName: "個人資料 青空 ひまり.png" },
  { id: "mitsuki", name: "星川 みつき", detailImgName: "個人資料 星川 みつき.png" },
  { id: "tsumugi", name: "鈴風 つむぎ", detailImgName: "個人資料 鈴風 つむぎ.png" },
  { id: "chi", name: "真実夜 ティ", detailImgName: "個人資料 真実夜 チィ.png" },
  { id: "sakura", name: "一條寺 サクラ", detailImgName: "個人資料 一條寺 サクラ.png" },
  { id: "tamaki", name: "二階堂 タマキ", detailImgName: "個人資料 二階堂 タマキ.png" },
  { id: "airi", name: "三葉 アイリ", detailImgName: "個人資料 三葉 アイリ.png" },
  { id: "rinrin", name: "四之宮 リンリン", detailImgName: "個人資料 四之宮 リンリン.png" },
  { id: "shizuku", name: "藤宮 しずく", detailImgName: "個人資料 藤宮 しずく.png" },
  { id: "akira", name: "桜井 あきら", detailImgName: "個人資料 桜井 あきら.png" },
].map((idol) => ({
  ...idol,
  profileImg: getIdolImage(`${idol.id} profile.png`),
  detailImg: getIdolImage(idol.detailImgName)
}));

/* ================= 單一角色個人資料 Modal (直接展示 1198x762 圖片) ================= */
function SingleProfileModal({ idolId, onClose }) {
  const idol = IDOLS.find((i) => i.id === idolId);
  if (!idol) return null;

  const closeBtnImg = getIdolImage("close.png");

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`個人資料 ${idol.name}`}
    >
      {/* 圖片容器：固定最大尺寸 1198px，隨螢幕自適應縮放 */}
      <div
        className="relative w-full max-w-[1198px] flex items-center justify-center rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 右上角關閉叉叉按鈕 */}
        <button
          onClick={onClose}
          aria-label="關閉個人資料"
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 transition transform hover:scale-110 active:scale-95 focus:outline-none"
        >
          {closeBtnImg ? (
            <img src={closeBtnImg} alt="關閉" className="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg" />
          ) : (
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white shadow-lg text-2xl font-black text-[#F08BF0]">
              ✕
            </div>
          )}
        </button>

        {/* 角色詳細資料大圖 */}
        <img
          src={idol.detailImg}
          alt={`個人資料 ${idol.name}`}
          className="w-full h-auto max-h-[90vh] object-contain rounded-[32px] drop-shadow-2xl"
        />
      </div>
    </div>
  );
}

/* ================= 登場偶像頁面 ================= */
/* ================= 登場偶像頁面 ================= */
function IdolsPage({ setProfileId }) {
  return (
    <div className="min-h-screen bg-white">
      {/* 頂部漸層條 */}
      <div 
        className="w-full h-16 md:h-20 overflow-hidden pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)"
        }}
      >
        <img src={topBarImg} alt="Header Background" className="w-full h-auto block object-cover object-top" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-24 pt-2">
        {/* 頁面標題 */}
        <div className="mb-10 text-center">
          <Pill className="text-xl">登場偶像</Pill>
        </div>

        {/* 角色網格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {IDOLS.map((idol) => (
            <div 
              key={idol.id} 
              className="flex flex-col items-center cursor-pointer group transition transform hover:-translate-y-1"
              onClick={() => setProfileId && setProfileId(idol.id)} // 這裡改用 setProfileId
            >
              {/* 卡片容器 */}
              <div 
                className="w-44 md:w-52 p-3 pb-4 rounded-2xl border-2 border-[#F492FF] border-b-4 border-b-[#EF7CE7] bg-white transition flex flex-col items-center"
                style={{
                  boxShadow: "0 4px 10px rgba(239, 124, 231, 0.25)"
                }}
              >
                {/* 1. 上半部頭像區 */}
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-3">
                  <img 
                    src={idol.profileImg} 
                    alt={idol.name} 
                    className="w-full h-full object-cover transition transform group-hover:scale-105" 
                  />
                </div>

                {/* 2. 下半部名字 */}
                <p 
                  className="text-base md:text-lg font-bold tracking-wide text-center"
                  style={{ color: "#EF7CE7" }}
                >
                  {idol.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// 修正圖片順序：機台投幣圖 (6.PNG) 放在第 1 張
const GAMEPLAY_STEPS = [
  { img: game6, text: "投入30元即可隨機獲得1張閃亮偶像公主卡牌並開始遊玩！" },
  { img: game1, text: "放上想使用的卡牌，畫面會出現卡牌對應的偶像公主" },
  { img: game2, text: "選擇玩法！\n第一次玩建議用1張卡牌遊玩喔！" },
  { img: game3, text: "將手放在卡牌上\n接下來就跟著畫面指示移動卡牌吧！\n當左上角人氣計量表滿的時候…" },
  { img: game4, text: "人氣螢光幻彩變身！\n繼續用人氣螢光幻彩變身後的華麗效果進行舞台表演！" },
  { img: game5, text: "遊戲結束後，就是令人緊張的評審時間…！\n你也成功過關了嗎？" },
];

function GameplayPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 頂部漸層條：用 CSS 遮罩實現底部羽化漸隱 */}
      <div 
        className="w-full h-16 md:h-20 overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)"
        }}
      >
        <img 
          src={topBarImg} 
          alt="Header Background" 
          className="w-full h-auto block object-cover object-top" 
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-20 pt-2">
        {/* 標題 Pill */}
        <div className="mb-8 text-center">
          <Pill className="text-xl">遊戲玩法</Pill>
        </div>

        {/* 6 個玩法步驟列表 */}
        <div className="flex flex-col items-center gap-4">
          {GAMEPLAY_STEPS.map((step, idx) => (
            <div key={idx} className="flex w-full flex-col items-center text-center">
              {/* 玩法圖片 (無邊框無陰影) */}
              <div className="w-full max-w-2xl overflow-hidden">
                <img 
                  src={step.img} 
                  alt={`遊戲玩法步驟 ${idx + 1}`} 
                  className="w-full h-auto object-cover" 
                />
              </div>

              {/* 圖片下方文字 */}
              <p 
                className="mt-4 px-4 text-base md:text-lg font-bold leading-relaxed whitespace-pre-line"
                style={{ color: "#3D3670" }}
              >
                {step.text}
              </p>

              {/* 步驟之間的下箭頭：漸層色 #F492FF -> #75E1FF */}
              {idx < GAMEPLAY_STEPS.length - 1 && (
                <div 
                  className="my-5 text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-b from-[#F492FF] to-[#75E1FF]"
                >
                  ▼
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 動態載入愛埔里卡一彈資料夾內的所有圖片
const cardImages = import.meta.glob("./assets/愛埔里卡一彈/*.png", { eager: true });

function getCardImage(filename) {
  const path = `./assets/愛埔里卡一彈/${filename}`;
  return cardImages[path]?.default || "";
}

// 59 張卡片的完整文字資料
const CARD_DATA = [
  // 四星 (1 ~ 19)
  { id: 1, rarity: 4, character: "陽葵", name: "Poppin' Heart人氣螢光幻彩" },
  { id: 2, rarity: 4, character: "美月", name: "Miracle Moon人氣螢光幻彩" },
  { id: 3, rarity: 4, character: "櫻", name: "Scarlet Butterfly人氣螢光幻彩" },
  { id: 4, rarity: 4, character: "陽葵", name: "俏皮可愛兔寶寶" },
  { id: 5, rarity: 4, character: "美月", name: "俏皮可愛兔寶寶藍" },
  { id: 6, rarity: 4, character: "陽葵", name: "甜甜圈甜點師" },
  { id: 7, rarity: 4, character: "美月", name: "甜甜圈甜點師" },
  { id: 8, rarity: 4, character: "美月", name: "Q彈果凍蘇打" },
  { id: 9, rarity: 4, character: "陽葵", name: "Q彈果凍蘇打" },
  { id: 10, rarity: 4, character: "櫻", name: "奢華莓果塔" },
  { id: 11, rarity: 4, character: "櫻", name: "奢華莓果塔" },
  { id: 12, rarity: 4, character: "陽葵", name: "迎賓櫻桃" },
  { id: 13, rarity: 4, character: "美月", name: "迎賓櫻桃藍" },
  { id: 14, rarity: 4, character: "美月", name: "閃耀水母藍" },
  { id: 15, rarity: 4, character: "陽葵", name: "閃耀水母粉紅" },
  { id: 16, rarity: 4, character: "櫻", name: "蝴蝶魔術" },
  { id: 17, rarity: 4, character: "櫻", name: "蝴蝶魔術緋紅" },
  { id: 18, rarity: 4, character: "陽葵", name: "生日快樂！陽葵" },
  { id: 19, rarity: 4, character: "美月", name: "生日快樂！美月" },

  // 三星 (20 ~ 39)
  { id: 20, rarity: 3, character: "陽葵", name: "偶像公主空間Poppin' Heart" },
  { id: 21, rarity: 3, character: "陽葵", name: "偶像公主空間Poppin' Heart綠" },
  { id: 22, rarity: 3, character: "美月", name: "偶像公主空間Miracle Moon" },
  { id: 23, rarity: 3, character: "美月", name: "偶像公主空間Miracle Moon橙" },
  { id: 24, rarity: 3, character: "櫻", name: "偶像公主空間Scarlet Butterfly" },
  { id: 25, rarity: 3, character: "櫻", name: "偶像公主空間Scarlet Butterfly" },
  { id: 26, rarity: 3, character: "陽葵", name: "花朵薄紗" },
  { id: 27, rarity: 3, character: "美月", name: "花朵薄紗" },
  { id: 28, rarity: 3, character: "美月", name: "花朵薄紗薄荷" },
  { id: 29, rarity: 3, character: "陽葵", name: "花朵薄紗薄荷" },
  { id: 30, rarity: 3, character: "櫻", name: "華麗寶石" },
  { id: 31, rarity: 3, character: "櫻", name: "華麗寶石" },
  { id: 32, rarity: 3, character: "美月", name: "蜜蜂" },
  { id: 33, rarity: 3, character: "陽葵", name: "蜜蜂" },
  { id: 34, rarity: 3, character: "美月", name: "星星音符" },
  { id: 35, rarity: 3, character: "陽葵", name: "星星音符" },
  { id: 36, rarity: 3, character: "陽葵", name: "心形音符" },
  { id: 37, rarity: 3, character: "美月", name: "心形音符" },
  { id: 38, rarity: 3, character: "陽葵", name: "星星派對" },
  { id: 39, rarity: 3, character: "美月", name: "星星派對草莓巧克力" },

  // 二星 (40 ~ 59)
  { id: 40, rarity: 2, character: "陽葵", name: "樂園學園1年級制服" },
  { id: 41, rarity: 2, character: "美月", name: "樂園學園1年級制服" },
  { id: 42, rarity: 2, character: "櫻", name: "樂園學園2年級制服" },
  { id: 43, rarity: 2, character: "陽葵", name: "可愛偶像粉紅" },
  { id: 44, rarity: 2, character: "陽葵", name: "可愛偶像粉紅" },
  { id: 45, rarity: 2, character: "美月", name: "可愛偶像藍" },
  { id: 46, rarity: 2, character: "美月", name: "可愛偶像藍" },
  { id: 47, rarity: 2, character: "陽葵", name: "酷炫偶像粉紅" },
  { id: 48, rarity: 2, character: "陽葵", name: "酷炫偶像粉紅" },
  { id: 49, rarity: 2, character: "美月", name: "酷炫偶像藍" },
  { id: 50, rarity: 2, character: "美月", name: "酷炫偶像藍" },
  { id: 51, rarity: 2, character: "櫻", name: "酷炫偶像紅" },
  { id: 52, rarity: 2, character: "陽葵", name: "快樂啦啦隊粉紅" },
  { id: 53, rarity: 2, character: "陽葵", name: "快樂啦啦隊粉紅" },
  { id: 54, rarity: 2, character: "美月", name: "快樂啦啦隊藍" },
  { id: 55, rarity: 2, character: "美月", name: "快樂啦啦隊藍" },
  { id: 56, rarity: 2, character: "陽葵", name: "輕便水手服粉紅" },
  { id: 57, rarity: 2, character: "陽葵", name: "輕便水手服粉紅" },
  { id: 58, rarity: 2, character: "美月", name: "輕便水手服藍" },
  { id: 59, rarity: 2, character: "美月", name: "輕便水手服藍" },
];

function CardsPage() {
  const fourStarCards = CARD_DATA.filter((c) => c.rarity === 4);
  const threeStarCards = CARD_DATA.filter((c) => c.rarity === 3);
  const twoStarCards = CARD_DATA.filter((c) => c.rarity === 2);

  const renderCardGrid = (cards) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
      {cards.map((card) => {
        const frontImg = getCardImage(`${card.id}f.png`);
        const backImg = getCardImage(`${card.id}b.png`);

        return (
          <div key={card.id} className="flex flex-col items-center">
            {/* 3D 翻轉卡片容器 */}
            <div className="group w-[233px] h-[340px] [perspective:1000px] cursor-pointer">
              <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* 正面卡片 */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-xl overflow-hidden shadow-md">
                  <img src={frontImg} alt={`${card.name} 正面`} className="w-full h-full object-cover" />
                </div>
                {/* 背面卡片 */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden shadow-md">
                  <img src={backImg} alt={`${card.name} 背面`} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* 卡片名稱文字 (#EF7CE7) */}
            <div className="mt-3 text-center" style={{ color: "#EF7CE7" }}>
              <p className="text-sm md:text-base font-bold">{card.character}</p>
              <p className="text-xs md:text-sm font-semibold">{card.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* 頂部漸層條 */}
      <div 
        className="w-full h-16 md:h-20 overflow-hidden pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)"
        }}
      >
        <img src={topBarImg} alt="Header Background" className="w-full h-auto block object-cover object-top" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-2">
        {/* 第1彈 Pill 標題 */}
        <div className="mb-8 text-center">
          <Pill className="text-xl">第1彈</Pill>
        </div>

        {/* 四星分組 */}
        <div className="mb-14">
          <div className="mb-6 flex justify-center">
            <Pill className="text-lg px-8">★★★★</Pill>
          </div>
          {renderCardGrid(fourStarCards)}
        </div>

        {/* 三星分組 */}
        <div className="mb-14">
          <div className="mb-6 flex justify-center">
            <Pill className="text-lg px-8">★★★</Pill>
          </div>
          {renderCardGrid(threeStarCards)}
        </div>

        {/* 二星分組 */}
        <div className="mb-14">
          <div className="mb-6 flex justify-center">
            <Pill className="text-lg px-8">★★</Pill>
          </div>
          {renderCardGrid(twoStarCards)}
        </div>
      </div>
    </div>
  );
}

function GoodsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 頂部漸層條 */}
      <div 
        className="w-full h-16 md:h-20 overflow-hidden pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)"
        }}
      >
        <img 
          src={topBarImg} 
          alt="Header Background" 
          className="w-full h-auto block object-cover object-top" 
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-24 pt-2">
        {/* 頁面大標題 */}
        <div className="mb-12 text-center">
          <Pill className="text-xl">周邊商品</Pill>
        </div>

        {/* 2x2 商品排版 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-16">
          {GOODS_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              {/* 1. 商品小膠囊標題 */}
              <Pill className="text-base md:text-lg mb-6">{item.title}</Pill>

              {/* 2. 商品圖片 */}
              <div className="w-64 h-64 md:w-72 md:h-72 flex items-center justify-center mb-6">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>

              {/* 3. 建議售價 */}
              <div 
                className="text-lg md:text-xl font-black mb-3 tracking-wider"
                style={{ color: "#F08BF0" }}
              >
                {item.price}
              </div>

              {/* 4. 商品說明文字 */}
              <p 
                className="text-sm md:text-base font-bold leading-relaxed text-left whitespace-pre-line max-w-sm px-2"
                style={{ color: "#3D3670" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= 主頁面控制 ================= */
export default function IdolSite() {
  const [currentPage, setCurrentPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen || profileId !== null ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") { setMenuOpen(false); setProfileId(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [menuOpen, profileId]);

  const goTo = (id) => {
    setCurrentPage(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF5FF] to-[#FFFFFF] text-gray-800" style={{ fontFamily: "'Zen Maru Gothic','Noto Sans TC',system-ui,sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;900&display=swap" rel="stylesheet" />
      
      <HamburgerMenu open={menuOpen} setOpen={setMenuOpen} goTo={goTo} activePage={currentPage} />
      
      {profileId !== null && (
        <SingleProfileModal idolId={profileId} onClose={() => setProfileId(null)} />
      )}

      <main>
        {currentPage === "home" && <HomePage goTo={goTo} />}
        {currentPage === "idols" && <IdolsPage setProfileId={setProfileId} />}
        {currentPage === "gameplay" && <GameplayPage />}
        {currentPage === "cards" && <CardsPage />}
        {currentPage === "goods" && <GoodsPage />}
      </main>

      <footer 
        className="relative w-full h-20 md:h-24 bg-cover bg-center flex items-center justify-center shadow-inner"
        style={{ backgroundImage: `url(${footBgImg})` }}
      >
        {/* 如果 foot.png 本身已經帶有文字圖案，可以直接顯示全圖；
            若需要加上可點擊的社群連結，可使用下面的按鈕層： */}
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 md:gap-8">
            {/* 聯絡我們標題 */}
          <span 
            className="text-lg md:text-2xl font-black tracking-wider text-[#F08BF0]"
            style={{
              textShadow: "2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 2px 0 #fff, 2px 0 0 #fff, 0 -2px 0 #fff, -2px 0 0 #fff"
            }}
          >
            聯絡我們
          </span>

          {/* 社群按鈕列 */}
          <a 
            href="https://www.instagram.com/aipri_official_tw/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition hover:scale-105"
          >
            <img src={igBtnImg} alt="官方 Instagram" className="h-8 md:h-10 w-auto" />
          </a>
          <a 
            href="https://youtube.com/playlist?list=PLo_HY74ov2N090KvychSD9MzDY_MIzml7" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition hover:scale-105"
          >
            <img src={sytBtnImg} alt="中文版動畫" className="h-8 md:h-10 w-auto" />
          </a>
          <a 
            href="https://www.facebook.com/SegaTaiwan.CardGame/?locale=zh_TW" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition hover:scale-105"
          >
            <img src={fbBtnImg} alt="官方粉絲團" className="h-8 md:h-10 w-auto" />
          </a>
        </div>
      </footer>
    </div>
  );
}