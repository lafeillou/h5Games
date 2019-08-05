import $ from "jquery";

export function resize(value) {
  // console.log($(window).width());
  let $window = $(window);
  let phoneWidth = $window.width();
  // let phoneHeight = $window.height();
  let radio = phoneWidth / 1334;
  return value * radio;
}

export function playByLocalUrl(dom, url, cb) {
  let $audio = $("<audio></audio>");
  $audio.attr("src", url);
  $audio.attr("loop", false);

  if (typeof cb === "function") {
    $audio[0].addEventListener("ended", cb, false);
  }

  if (dom) {
    $(dom).html($audio);
  } else {
    $("body")
      .find("audio")
      .remove();
    $("body").append($audio);
  }

  $audio[0].play();
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
