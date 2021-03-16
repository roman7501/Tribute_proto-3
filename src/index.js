import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, DrawSVGPlugin);

const scrolling = () => {};

scrolling();

class Lines {
  constructor() {
    this.init();
  }

  init() {
    this.anim();
  }

  anim() {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });

    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed",
    });
    gsap.from("#intro-1", { scrollTrigger: "#intro-1", x: -200, delay: 0.5, duration: 2 });
    gsap.from("#intro-2", { scrollTrigger: "#intro-2", x: -200, delay: 0.5, duration: 2 });

    gsap.from("#text-1", {
      scrollTrigger: { trigger: "#text-1", scroller: "[data-scroll-container]" },
      x: -200,
      duration: 5,
    });

    gsap.from("#text-2", {
      scrollTrigger: { trigger: "#text-2", scroller: "[data-scroll-container]" },
      x: -200,
      duration: 5,
    });
    gsap.from("#text-3", {
      scrollTrigger: { trigger: "#text-3", scroller: "[data-scroll-container]" },
      x: -200,
      duration: 5,
    });
    gsap.from("#text-4", {
      scrollTrigger: { trigger: "#text-4", scroller: "[data-scroll-container]" },
      x: -200,
      duration: 5,
    });
    gsap.from("#text-5", {
      scrollTrigger: { trigger: "#text-5", scroller: "[data-scroll-container]" },
      x: -200,
      duration: 5,
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }
}

new Lines();
