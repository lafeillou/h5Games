import $ from 'jquery'

export function resize(value) {
  // console.log($(window).width());
  // let $window = $(window);
  // let phoneWidth = $window.width();
  // // let phoneHeight = $window.height();
  // let radio = phoneWidth / 1334;
  let htmlFontSize =
    $('html')
      .css('font-size')
      .replace('px', '') * 1
  // return value * radio;
  return (value / 133.4) * htmlFontSize
}

export function playByLocalUrl(dom, url) {
  return new Promise(resolve => {
    let $audio = $('<audio></audio>')
    $audio.attr('src', url)
    // $audio.attr("loop", false);
    // $audio.attr("autoplay", true);

    $audio[0].addEventListener(
      'ended',
      () => {
        resolve()
      },
      false
    )
    setTimeout(() => {
      resolve()
    }, 6000)
    if (dom) {
      $(dom).html($audio)
    } else {
      $('#audio-wrap').html($audio)
    }
    $audio[0].play()
  })
}

export const lettersPos = {
  a: {
    url: './assets/images/letters/a.png',
    w: 173,
    h: 173,
    x: 276,
    y: 149
  },
  b: {
    url: './assets/images/letters/b.png',
    w: 173,
    h: 173,
    x: 474,
    y: 149
  },
  c: {
    url: './assets/images/letters/c.png',
    w: 173,
    h: 173,
    x: 680,
    y: 149
  },
  d: {
    url: './assets/images/letters/d.png',
    w: 173,
    h: 173,
    x: 908,
    y: 149
  },
  e: {
    url: './assets/images/letters/e.png',
    w: 173,
    h: 173,
    x: 367,
    y: 375
  },
  f: {
    url: './assets/images/letters/f.png',
    w: 173,
    h: 173,
    x: 575,
    y: 375
  },
  g: {
    url: './assets/images/letters/g.png',
    w: 173,
    h: 173,
    x: 800,
    y: 375
  }
}

export const svgPlayA = (x, y, w, h) => {
  return `
  <svg x="${x}"
  y="${y}"
  width="${w}"
  height="${h}"
  viewBox="0 0 96 96" xml:space="preserve">
  <g fill="transparent" stroke-width="3" stroke="black" >
    <path style="fill-rule:evenodd;clip-rule:evenodd;fill:none;" stroke-dasharray="5,5"
      d="M44.88,2.16c11.125,1.481,13.296,8.851,17.04,17.52
c6.262,14.499,12.3,31.36,17.52,46.32c0.56,2.64,1.12,5.28,1.68,7.92c1.571,5.108,6.042,11.497,0.96,16.32
c-2.917,2.768-8.808,3.182-11.28-0.48c-2.201-3.261-1.757-8.653-4.08-12c-6.483-9.338-28.652-9.121-38.16-2.88
c-0.838,6.789-2.294,21.286-11.28,18.48c-11.067-1.373-2.734-16.436-0.96-22.08c0.4-2.32,0.8-4.64,1.2-6.96
c0.64-4.799,1.28-9.6,1.92-14.4c3.143-14.022,9.493-39.805,19.44-46.32C40.516,2.528,42.804,2.943,44.88,2.16z"
    />
    <path
      style="fill-rule:evenodd;clip-rule:evenodd;fill:none;" stroke-dasharray="5,5"
      d="M45.6,20.16c-1.2,5.04-2.4,10.081-3.6,15.12
c-2.08,4.88-4.16,9.761-6.24,14.64c0.16,0,0.32,0,0.48,0c3.195,1.44,22.127,4.564,24.48,2.88c-3.766-8.107-7.163-17.765-11.04-25.44
C48.455,24.936,48.302,21.068,45.6,20.16z"
    />
  </g>
  </svg>
`
}
