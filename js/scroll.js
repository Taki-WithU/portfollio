const imageMap = {
  contents0: "img/contents00_left.png",
  contents1: "img/contents01.png",
  contents2: "img/contents02.png",
  contents3: "img/contents03.png",
  contents4: "img/contents04.png",
  contents5: "img/contents05.png",
  contents6: "img/contents06.png",
  contents7: "img/contents07_left.png",
  contents8: "img/contents08_left.png",
  contents9: "img/contents09_left.png",
  contents10: "img/contents10_left.png"
};

const leftImage = document.getElementById('left-image');
const navMenu = document.getElementById('nav-menu');

const sections = Object.keys(imageMap).map(id => document.getElementById(id));
const worksSection = document.getElementById('works');
const profielSection = document.getElementById('profiel');

const navLinks = {};
for (let i = 0; i <= 10; i++) {
  const linkId = `link-contents${i}`;
  const linkEl = document.getElementById(linkId);
  if (linkEl) navLinks[`contents${i}`] = linkEl;
}

// PROFILEとWORKSリンク
const linkProfiel = document.getElementById('link-profiel');
const linkWorks = document.getElementById('link-works');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // 全リンクのハイライトをリセット
  Object.values(navLinks).forEach(link => link?.classList.remove('active-link'));
  linkProfiel?.classList.remove('active-link');
  linkWorks?.classList.remove('active-link');

  // --- 背景色のリセット ---
// まず全部のbg-contentsクラスを削除（1〜10）
  for(let i = 1; i <= 10; i++) {
    document.body.classList.remove(`bg-contents${i}`);
  }

  // 1. PROFILE位置
  if (scrollY >= profielSection.offsetTop - 300 && scrollY < worksSection.offsetTop - 300) {
    linkProfiel?.classList.add('active-link');
    leftImage.src = imageMap.contents0;
    navMenu.classList.remove('highlight');
    return;
  }

  // 2. WORKS本体位置（contents1より上）
  if (scrollY >= worksSection.offsetTop - 300 && scrollY < sections[1].offsetTop - 300) {
    linkWorks?.classList.add('active-link');
    navMenu.classList.remove('highlight');
    return;
  }

  // 3. contents1〜10
  for (let i = sections.length - 1; i >= 1; i--) {
    const section = sections[i];
    if (!section) continue;

    if (scrollY >= section.offsetTop - 300) {
      const id = section.id;
      const imagePath = imageMap[id];
      if (imagePath) leftImage.src = imagePath;

      // highlight適用 (例：contents6以降)
      if (parseInt(id.replace('contents', '')) >= 11) {
        navMenu.classList.add('highlight');
      } else {
        navMenu.classList.remove('highlight');
      }

      const matchedLink = navLinks[id];
      if (matchedLink) matchedLink.classList.add('active-link');
      linkWorks?.classList.add('active-link'); // WORKSも強調

      // 【ここでbodyの背景色を変更】
      const contentNum = parseInt(id.replace('contents', ''));
      if (contentNum >= 1 && contentNum <= 10) {
        document.body.classList.add(`bg-contents${contentNum}`);
      }

      return;
    }
  }
});

// スムーススクロール（オフセット付き）
document.querySelectorAll('#nav-menu a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      const offset = 100;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  });
});
