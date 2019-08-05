import $ from "jquery";

export function resize(value) {
  // console.log($(window).width());
  let $window = $(window);
  let phoneWidth = $window.width();
  // let phoneHeight = $window.height();
  let radio = phoneWidth / 1334;
  return value * radio;
}
