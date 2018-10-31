const pcFontSize = document.documentElement.style.fontSize;
function resizeMobile(e) {
  if (document.documentElement.clientWidth > 1080) {
    let scale = 1 / devicePixelRatio;
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute(
        "content",
        `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no`
      );
    document.documentElement.style.fontSize = pcFontSize;
  } else {
    // 1动态设置viewport的scale
    let scale = 1 / devicePixelRatio;
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute(
        "content",
        "initial-scale=" +
          scale +
          ", maximum-scale=" +
          scale +
          ", minimum-scale=" +
          scale +
          ", user-scalable=no"
      );
    // 2动态计算html的font-size
    document.documentElement.style.fontSize =
      document.documentElement.clientWidth / 10 + "px";

      // 3布局的时候，各元素的css尺寸=设计稿标注尺寸/设计稿横向分辨率/10

      // 4font-size可能需要额外的媒介查询，并且font-size不使用rem，这一点跟网易是一样的。
  }
}

// 淘宝做法:
// 针对mobile端
// width ,height, line-height, margin, padding
if (document.documentElement.clientWidth <= 1080) {
  // 当宽度超过1080时候可以视为可以访问pc端页面了
  window.addEventListener("resize", resizeMobile);
  resizeMobile();
}
