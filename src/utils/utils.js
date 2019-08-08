import $ from "jquery";

export function resize(value) {
  // console.log($(window).width());
  // let $window = $(window);
  // let phoneWidth = $window.width();
  // // let phoneHeight = $window.height();
  // let radio = phoneWidth / 1334;
  let htmlFontSize =
    $("html")
      .css("font-size")
      .replace("px", "") * 1;
  // return value * radio;
  return (value / 133.4) * htmlFontSize;
}

export function playByLocalUrl(dom, url) {
  return new Promise(resolve => {
    let $audio = $("<audio></audio>");
    $audio.attr("src", url);
    // $audio.attr("loop", false);
    // $audio.attr("autoplay", true);

    $audio[0].addEventListener(
      "ended",
      () => {
        resolve();
      },
      false
    );
    setTimeout(() => {
      resolve();
    }, 6000);
    if (dom) {
      $(dom).html($audio);
    } else {
      $("#audio-wrap").html($audio);
    }
    $audio[0].play();
  });
}

export const lettersPos = {
  a: {
    url: "/assets/images/letters/a.png",
    w: 173,
    h: 173,
    x: 276,
    y: 149
  },
  b: {
    url: "/assets/images/letters/b.png",
    w: 173,
    h: 173,
    x: 474,
    y: 149
  },
  c: {
    url: "/assets/images/letters/c.png",
    w: 173,
    h: 173,
    x: 680,
    y: 149
  },
  d: {
    url: "/assets/images/letters/d.png",
    w: 173,
    h: 173,
    x: 908,
    y: 149
  },
  e: {
    url: "/assets/images/letters/e.png",
    w: 173,
    h: 173,
    x: 367,
    y: 375
  },
  f: {
    url: "/assets/images/letters/f.png",
    w: 173,
    h: 173,
    x: 575,
    y: 375
  },
  g: {
    url: "/assets/images/letters/g.png",
    w: 173,
    h: 173,
    x: 800,
    y: 375
  }
};
