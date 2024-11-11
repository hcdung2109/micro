import counterUp from "counterup2";
import Scrollbar from "smooth-scrollbar";
const $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = $;
  window.jQuery = $;
  require("select2");
  require("owl.carousel/dist/owl.carousel");
  require("isotope-layout");
  require("datatables.net");
  require("waypoints/lib/noframework.waypoints.min");
}
export const core = {
  index() {
    this.counterPlgInit();
    this.SmoothScrollbar();
    this.owlCarousel();
    this.activeTabPane();
    this.scroll();
  },
  progressInitVerticle(e) {
    const iqProgress = e;
    if (
      iqProgress !== undefined &&
      iqProgress !== null &&
      iqProgress !== undefined
    ) {
      iqProgress.style.width = "100%";
      iqProgress.style.transition = "height 2s ease 0s";
      iqProgress.style.height = iqProgress.getAttribute("data-value") + "%";
    }
  },
  changesidebar() {
    $(".wrapper-menu").click(function () {
      const body = document.querySelector("body");
      body.classList.toggle("sidebar-main");
    });
  },
  checkElement(type, element) {
    let found = false;
    let elements;
    switch (type) {
      case "class":
        elements = document.getElementsByClassName(element);
        if (
          elements !== undefined &&
          elements !== null &&
          elements.length > 0
        ) {
          found = true;
        }
        break;

      case "id":
        elements = document.getElementById(element);

        if (elements !== undefined && elements !== null) {
          found = true;
        }
        break;
    }
    return found;
  },
  counterPlgInit() {
    let waypointInit;
    Array.from(document.getElementsByClassName("counter")).forEach((c) => {
      waypointInit = new Waypoint({
        element: c,
        handler: (direction) => {
          if (direction === "down") {
            this.counterInit(c);
          }
        },
        offset: "bottom-in-view",
      });
    });
    return waypointInit;
  },
  SmoothScrollbar() {
    const elementExistMain = document.getElementById("sidebar-scrollbar");
    if (elementExistMain) {
      Scrollbar.init(document.querySelector("#sidebar-scrollbar"));
    }
    const elementExistRight = document.getElementById(
      "right-sidebar-scrollbar"
    );
    if (elementExistRight) {
      Scrollbar.init(document.querySelector("#right-sidebar-scrollbar"));
    }
  },
  counterInit(e) {
    if (e !== undefined && e !== null) {
      counterUp(e, {
        delay: 5,
        time: 100,
      });
    }
  },
  owlCarousel() {
    const elementExist = document.getElementsByClassName("owl-carousel");
    if (elementExist) {
      // eslint-disable-next-line no-undef
      $(".owl-carousel").each(function () {
        // eslint-disable-next-line no-undef
        const $carousel = $(this);
        $carousel.owlCarousel({
          items: $carousel.data("items"),
          loop: $carousel.data("loop"),
          margin: $carousel.data("margin"),
          nav: $carousel.data("nav"),
          dots: $carousel.data("dots"),
          autoplay: $carousel.data("autoplay"),
          autoplayTimeout: $carousel.data("autoplay-timeout"),
          navText: [
            '<i class="fas fa-angle-left fa-2x"></i>',
            '<i class="fas fa-angle-right fa-2x"></i>',
          ],
          responsiveClass: true,
          responsive: {
            // breakpoint from 0 up
            0: {
              items: $carousel.data("items-mobile-sm"),
            },
            // breakpoint from 480 up
            480: {
              items: $carousel.data("items-mobile"),
            },
            // breakpoint from 786 up
            786: {
              items: $carousel.data("items-tab"),
            },
            // breakpoint from 1023 up
            1023: {
              items: $carousel.data("items-laptop"),
            },
            1199: {
              items: $carousel.data("items"),
            },
          },
        });
      });
    }
  },
  progressInit(e) {
    const iqProgress = e;
    if (
      iqProgress !== undefined &&
      iqProgress !== null &&
      iqProgress !== undefined
    ) {
      iqProgress.style.transition = "width 2s ease 0s";
      iqProgress.style.width = iqProgress.getAttribute("data-value") + "%";
    }
  },
  initDataTable() {
    $(".table").DataTable();
  },
  loaderInit() {
    const load = document.getElementById("loading");
    animation.fadeOut(load, { duration: 0 });
    animation.fadeOut(load, { duration: 1000 });
    setTimeout(() => {
      load.classList.add("d-none");
    }, 1000);
  },
  scroll() {
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 0) {
        $(".iq-top-navbar").addClass("fixed");
      } else {
        $(".iq-top-navbar").removeClass("fixed");
      }
    });

    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 0) {
        $(".white-bg-menu").addClass("sticky-menu");
      } else {
        $(".white-bg-menu").removeClass("sticky-menu");
      }
    });
  },
  activeTabPane() {
    $("li a").click(function (e) {
      e.preventDefault();
      $("a").removeClass("active");
      $(this).addClass("active");
    });
  },
};
export const animation = {
  easing: {
    linear: function (progress) {
      return progress;
    },
    quadratic: function (progress) {
      return Math.pow(progress, 2);
    },
    swing: function (progress) {
      return 0.5 - Math.cos(progress * Math.PI) / 2;
    },
    circ: function (progress) {
      return 1 - Math.sin(Math.acos(progress));
    },
    back: function (progress, x) {
      return Math.pow(progress, 2) * ((x + 1) * progress - x);
    },
    bounce: function (progress) {
      // eslint-disable-next-line no-unused-vars,no-constant-condition
      for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (progress >= (7 - 4 * a) / 11) {
          return (
            -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2)
          );
        }
      }
    },
    elastic: function (progress, x) {
      return (
        Math.pow(2, 10 * (progress - 1)) *
        Math.cos(((20 * Math.PI * x) / 3) * progress)
      );
    },
  },
  animate: function (options) {
    const start = new Date();
    const id = setInterval(function () {
      const timePassed = new Date() - start;
      let progress = timePassed / options.duration;
      if (progress > 1) {
        progress = 1;
      }
      options.progress = progress;
      const delta = options.delta(progress);
      options.step(delta);
      if (progress === 1) {
        clearInterval(id);
      }
    }, options.delay || 10);
  },
  fadeOut: function (element, options) {
    const to = 1;
    this.animate({
      duration: options.duration,
      delta: function (progress) {
        progress = this.progress;
        return animation.easing.swing(progress);
      },
      step: function (delta) {
        element.style.opacity = to - delta;
      },
    });
  },
  fadeIn: function (element, options) {
    const to = 0;
    this.animate({
      duration: options.duration,
      delta: function (progress) {
        progress = this.progress;
        return animation.easing.swing(progress);
      },
      step: function (delta) {
        element.style.opacity = to + delta;
      },
    });
  },
};

export function toggleBodyClass(className, className1, addRemoveClass = false) {
  const example = document.body;

  if (addRemoveClass) {
    example.classList.add(className, className1);
  } else {
    example.classList.remove(className, className1);
  }
}

export const flatpickerSetting = {
  wrap: true,
  altFormat: "j M Y",
  altInput: true,
  dateFormat: "Y-m-d",
};
