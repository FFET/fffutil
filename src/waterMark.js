/**
 * water mask
 *
 * @author cds
 * @since 0.0.1
 * @example
 *
 */

const _id = `__gwm_${+new Date()}`;
const MutationObserver =
  window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

/**
 * svg way
 */
class SvgWay {
  constructor(watermark) {
    this.watermark = watermark;
  }
  render() {
    const { txt, x, y, width, height, color, font, fontSize, alpha, angle } = this.watermark;
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${height}px">
                <text x="${x}px" y="${y}px" dy="${fontSize}px"
                    text-anchor="start"
                    stroke="${color}"
                    stroke-opacity="${alpha}"
                    fill="none"
                    transform="rotate(${angle},${x} ${y})"
                    font-weight="100"
                    font-size="${fontSize}"
                    font-family="${font}"
                    >
                    ${txt}
                </text>
            </svg>`;
    return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
  }
}

/**
 * element way
 */
class ElementWay {
  constructor(watermark) {
    this.watermark = watermark;
  }

  _createItem() {
    const { txt, x, y, font, color, fontSize, alpha, angle, width, height } = this.watermark;
    const item = document.createElement("div");
    bindCSS(item, {
      position: "relative",
      width,
      height,
      flex: `0 0 ${width}px`,
      overflow: "hidden",
      pointerEvents: "none",
    });
    const span = document.createElement("span");
    span.innerHTML = txt;
    bindCSS(span, {
      position: "absolute",
      top: `${y}px`,
      left: `${x}px`,
      fontFamily: font,
      fontSize: `${fontSize}px`,
      color: color,
      lineHeight: 1.5,
      opacity: alpha,
      fontWeight: 400,
      transform: `rotate(${angle}deg)`,
      transformOrigin: "0 0",
      userSelect: "none",
      whiteSpace: "nowrap",
      overflow: "hidden",
    });
    item.appendChild(span);
    return item;
  }

  render() {
    let i = 0;
    const { width, height } = this.watermark;
    const { clientWidth, clientHeight } = document.documentElement || document.body;
    const column = Math.ceil(clientWidth / width);
    const rows = Math.ceil(clientHeight / height);
    const wrap = document.createElement("div");
    bindCSS(wrap, {
      display: "flex",
      flexWrap: "wrap",
      width: `${width * column}px`,
      height: `${height * rows}px`,
    });
    for (; i < column * rows; i++) wrap.appendChild(this._createItem());
    return wrap;
  }
}

function setStyle(elem, key, value) {
  elem.style[key] = value;
}

function isSupport(attribute) {
  return attribute in document.documentElement.style;
}

function bindCSS(elem, css) {
  return Object.keys(css).forEach((key) => setStyle(elem, key, css[key]));
}

function bindMutationEvent(target, container, callback) {
  const eventList = [
    "DOMAttrModified",
    "DOMAttributeNameChanged",
    "DOMCharacterDataModified",
    "DOMElementNameChanged",
    "DOMNodeInserted",
    "DOMNodeInsertedIntoDocument",
    "DOMNodeRemoved",
    "DOMNodeRemovedFromDocument",
    "DOMSubtreeModified",
  ];
  eventList.map((eventName) => target.addEventListener(eventName, () => callback(), false));
  document.body.addEventListener("DOMSubtreeModified", () => callback(), false);
  return {
    containerObserver: {
      disconnect: () =>
        container.removeEventListener("DOMSubtreeModified", () => callback(), false),
    },
    observer: {
      disconnect: () =>
        eventList.map((eventName) =>
          target.removeEventListener(eventName, () => callback(), false)
        ),
    },
  };
}

function observer(target, container, callback) {
  if (!MutationObserver) return bindMutationEvent(target, container, callback);
  const containerObserver = new MutationObserver((mutationsList) =>
    mutationsList.forEach((mutation) =>
      mutation.removedNodes.forEach((_target) => _target === target && callback())
    )
  );
  containerObserver.observe(container, { childList: true });
  const observer = new MutationObserver(callback);
  observer.observe(target, {
    characterData: true,
    attributes: true,
    childList: true,
    subtree: true,
  });
  return { containerObserver, observer };
}

function disconnect({ containerObserver, observer }) {
  return containerObserver.disconnect() && observer.disconnect();
}

function creator(gwm = {}) {
  const { gwmDom } = gwm;
  const { css } = gwm.opts;
  const target = gwmDom ? gwmDom : document.getElementById(_id);
  if (target) target.remove();
  const gwmDiv = document.createElement("div");
  if (isSupport("pointerEvents")) {
    css.pointerEvents = "none";
    css.zIndex = css.zIndex < 0 ? 999999 : css.zIndex;
  }
  bindCSS(gwmDiv, css);
  gwmDiv.id = _id;
  return gwmDiv;
}

/**
 * canvas way
 */
class CanvasWay {
  constructor(watermark) {
    this.watermark = watermark;
    const { width, height } = watermark;
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("width", width);
    this.canvas.setAttribute("height", height);
  }

  render() {
    const { txt, x, y, width, height, font, color, fontSize, alpha, angle } = this.watermark;
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.font = `${fontSize}px ${font}`;
    ctx.translate(x, y);
    ctx.rotate((Math.PI / 180) * angle);
    ctx.translate(-x, -y - fontSize);
    ctx.fillText(txt, x, y + fontSize);
    return this.canvas.toDataURL();
  }
}

const CANVAS = "canvas";
const SVG = "svg";
const ELEMENT = "element";
const DEFAULT_STYLE = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: "hidden",
  zIndex: -10,
  backgroundRepeat: "no-repeat",
};

const wayFactory = (mode, wm) => {
  let impl = null;
  const way = [CANVAS, SVG, ELEMENT];
  if (mode) {
    mode = mode.toLowerCase();
    mode = way.indexOf(mode) >= 0 ? mode : "";
  }
  if (!mode) mode = "svg";
  switch (mode) {
    case CANVAS:
      impl = new CanvasWay(wm);
      break;
    case SVG:
      impl = new SvgWay(wm);
      break;
    default:
      impl = new ElementWay(wm);
  }
  return impl;
};

const getElement = (container) => {
  if (typeof container === "string") {
    const dom = document.querySelector(container);
    if (dom) return dom;
    return document.body;
  }
  return container;
};

/**
 * watermark
 */
function dateConvert() {
  const now = new Date();
  const fullYear = now.getFullYear();
  const month = now.getMonth() > 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
  const date = now.getDate() > 9 ? now.getDate() : `0${now.getDate()}`;
  return `${fullYear}-${month}-${date}`;
}

class Watermark {
  constructor(params) {
    this.txt = params.txt;
    this.width = params.width;
    this.height = params.height;
    this.x = params.x;
    this.y = params.y;
    this.font = params.font;
    this.fontSize = params.fontSize;
    this.color = params.color;
    this.alpha = params.alpha;
    this.angle = params.angle;
  }
}
/**
 * generate watermark
 */
class GenerateWatermark {
  creation(opts = {}) {
    opts.css = Object.assign({}, DEFAULT_STYLE, opts.css);
    this.opts = opts;
    this.cancel();
    const { mode, watch, container = document.body } = opts;
    this.wrap = getElement(container);
    if (this.wrap !== document.body) {
      this.opts.css.position = "absolute";
      bindCSS(this.wrap, { position: "relative" });
    }
    this.gwmDom = creator(this);
    const wm = new Watermark(opts);
    const impl = wayFactory(mode, wm);
    const result = impl.render();
    if (mode === ELEMENT) this.gwmDom.appendChild(result);
    else this.gwmDom.style.background = `url("${result}")`;
    const first = this.wrap.firstChild;
    if (first) this.wrap.insertBefore(this.gwmDom, first);
    else this.wrap.appendChild(this.gwmDom);
    if (watch !== false) this.observer = this.observing();
    if (opts.destroy) this.creation = (f) => f;
  }

  observing() {
    return observer(this.gwmDom, this.wrap, () => this.creation(this.opts));
  }

  cancel() {
    if (this.observer) disconnect(this.observer);
  }
}

/**
 *  water mask
 */
export function waterMark({
  txt = "watermask",
  container,
  gwm = new GenerateWatermark(),
  options = {},
}) {
  gwm.creation({
    txt,
    width: 300,
    height: 200,
    color: "#000",
    fontSize: 14,
    x: 10,
    y: 80,
    font: "microsoft yahe",
    alpha: 0.2,
    angle: -15,
    container,
    ...options,
  });
  return gwm;
}
