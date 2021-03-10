import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

export default class Lines {
  constructor() {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

    this.tl1 = gsap.timeline({});

    this.shapes = "rect, circle, ellipse, polyline, line";
    this.tl = gsap.timeline({ repeat: 1, yoyo: true });

    this.init();
  }

  init() {
    this.anim();
  }

  anim() {
    this.tl1.from("circle, ellipse", { drawSVG: 0, duration: 5 });

    this.tl.from("#line-1", { duration: 1, delay: 0.5, drawSVG: 0 });
  }
}
