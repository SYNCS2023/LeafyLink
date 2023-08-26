import { useRef, useEffect } from "react";
import module from "./perlin";

class Engine {
  el;
  w;
  h;
  ctx;
  particles = [];

  constructor(canvas_el, ctx) {
    this.el = canvas_el;
    this.w = canvas_el.offsetWidth; ctx.height
    this.h = canvas_el.offsetHeight;
    this.ctx = ctx;

    this.eventListeners();
    this.draw(Date.now() / 1000);
  }

  eventListeners() {
    let self = this;
    function resize() {
      self.w = document.documentElement.offsetWidth - 0.5;
      self.h = Math.max(window.innerHeight, document.documentElement.offsetHeight);

      // get the ratio of physical pixels to CSS pixels
      const dpr = window.devicePixelRatio || 1;

      // set the CSS dimensions of the canvas to fill the screen (using CSS pixels)
      self.el.style.width = `${self.w}px`;
      self.el.style.height = `${self.h}px`;

      // set the dimensions of the coordinate system used by the canvas - https://stackoverflow.com/a/2588404/5583289
      // (doesn"t affect the actual size on screen I think)
      // because self is larger than the size on screen (when dpr > 1), it"ll get scaled back down to normal
      // (while retaining the sharpness of all the physical pixels within each CSS pixel)
      self.el.width = Math.floor(self.w * dpr);
      self.el.height = Math.floor(self.h * dpr);

      // I think self gets applied to a global transformation matrix which is used for every draw operation
      // (that way you can use the same coordinates while drawing and have it scaled up)
      self.ctx.scale(dpr, dpr);
      self.particlesInit();
    }
    setTimeout(resize, 50);
    window.addEventListener("resize", resize);
    window.addEventListener("onload", resize);
  }

  draw(prevTime) {
    let nowTime = Date.now() / 1000;
    this.particlesDraw(nowTime - prevTime);
    this.drawAnimFrame = window.requestAnimationFrame(() => this.draw(nowTime));
  };

  particlesInit() {
    console.log(this.w, this.h)
    for (let i = 0; i < 300; ++i) {
      let x = Math.random() * this.w;
      let y = Math.random() * this.h;
      let drift = Math.random() * Math.PI * 2;
      let alpha = Math.random() * 0.5;
      let green = Math.random() * 128 + 127;
      let size = Math.random() * 2;
      this.particles.push({ x, y, drift, alpha, green, size });
    }
  }

  particlesDraw(duration) {
    let time = Date.now() / 1000;
    this.ctx.clearRect(0, 0, this.w, this.h);
    for (let particle of this.particles) {
      let r = 30 * particle.size * Math.sin(time / 2 + particle.drift) * Math.sin(time / 2 + particle.drift) + 10;
      this.ctx.fillStyle = `rgba(0, ${particle.green}, 0, ${particle.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, r, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  // particlesInit() {
  //   this.r = 50;
  //   this.scale = 8;
  // }

  // particlesDraw(duration) {
  //   let time = Date.now() / 1000;
  //   this.ctx.clearRect(0, 0, this.w, this.h);
  //   for (let x = 0; x * this.r <= this.w; x++) {
  //     for (let y = 0; y * this.r <= this.h; y++) {
  //       let alpha = .6 * (.5 + .5 * module.simplex3(x / this.scale, y / this.scale, time / 3));
  //       this.ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
  //       this.ctx.fillRect(x * this.r, y * this.r, this.r, this.r);
  //     }
  //   }
  // }
}

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (canvas && context) {
        new Engine(
          canvas,
          context,
        );
      }
    }, 10); // 10ms
  }, [canvasRef]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-50">
      <canvas ref={canvasRef}></canvas>
      <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-3xl"></div>
    </div>

  );
}

export default Background;