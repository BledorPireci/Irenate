import Swiper from 'swiper';
import 'swiper/css';

let naturalScroll = true;
  
init();

function init() {
  cardsSlider();
  accordions();
  mobileMenu();
  tabs();
  navbarScroll();
}

function cardsSlider() {
  new Swiper(".cards-wrapper", {
    slidesPerView: 1,
    spaceBetween: 80,
    loop: true,
    autoplay: false,
    breakpoints: {
      992: {
        slidesPerView: 2,
        spaceBetween: 80,
      }
    }
  });
}

function accordions() {
  const acc = document.getElementsByClassName("accordion-btn");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      panel.classList.toggle("active");
    });
  }
}

function mobileMenu() {
  const menu_btn = document.querySelector(".hamburger");
  const mobile_menu = document.querySelector(".mobile-nav");
  const links = mobile_menu.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      menu_btn.classList.remove("is-active");
      mobile_menu.classList.remove("is-active");
      document.body.classList.remove("overflow-hidden");
      handleScroll(e, links)
    });
  });

  menu_btn.addEventListener("click", function () {
    menu_btn.classList.toggle("is-active");
    mobile_menu.classList.toggle("is-active");
    document.body.classList.toggle("overflow-hidden");
  });
}

function tabs() {
  const tabList = document.querySelectorAll(".tabs .tabs-clickable li");
  const tabButtons = document.querySelectorAll(".tabs .tabs-clickable li a");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const href = e.target.getAttribute("href");
      const li = e.target.parentNode;
      const prev = li.previousElementSibling;

      removeTabClasses();
      addActiveClass(li, prev);
      changeActiveTabContent(href);
    });
  });

  function removeTabClasses() {
    tabList &&
      tabList.length &&
      tabList.forEach((li) => {
        li.classList.remove("active", "prev-child");
      });
  }

  function addActiveClass(elem, prev, next) {
    elem && elem.classList.add("active");
    prev && prev.classList.add("prev-child");
  }

  function changeActiveTabContent(href) {
    const tabContent = document.querySelectorAll(".tabs .tabs-content .tab-content");
    tabContent &&
      tabContent.length &&
      tabContent.forEach((li) => {
        li.classList.remove("active");
      });
    href && document.querySelector(href).classList.add("active");
  }
}

function navbarScroll() {
  const links = document.querySelectorAll('.navbar-links a')
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      naturalScroll = false;
      e.preventDefault();
      handleScroll(e, links)
    })
  })
}

function handleScroll(e, links) {
  const headerHeight = document.querySelector('body > header').offsetHeight;
  const href = e.target.getAttribute('href')
  const target = document.querySelector(href);
  const targetOffset = target.offsetTop;
  links.forEach((link) => {
    link.classList.remove('active')
  })
  e.target.classList.add('active')

  scrollTo(0, targetOffset - headerHeight)
  setTimeout(() => {
    naturalScroll = true;
  }, 1000)
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.bottom >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 126
  );
}

const links = document.querySelectorAll('.navbar-links a')
const elements = [];
links.forEach(elem => {
  elements.push({ href: elem.getAttribute('href'), elem })
})

document.addEventListener('scroll', function (e) {
  if (!naturalScroll) return;

  elements.forEach(elem => {
    const section = document.querySelector(elem.href)

    if (isInViewport(section)) {
      links.forEach(link => {
        link.classList.remove('active')
      })
      elem.elem.classList.add('active')
    }
  })


});