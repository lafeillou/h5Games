import $ from "jquery";

export function resize(value) {
  // console.log($(window).width());
  let $window = $(window);
  let phoneWidth = $window.width();
  // let phoneHeight = $window.height();
  let radio = phoneWidth / 1334;
  return value * radio;
}

export function playByLocalUrl(dom, url) {
  let $audio = $("<audio></audio>");
  $audio.attr("src", url);
  $(dom).html($audio);
  $audio[0].play();
}
