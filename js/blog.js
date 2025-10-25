import { blogData } from "../data/blogData.js";

// DYNAMIC BLOG CARD GENERATION
const cardContainer = document.getElementById("card-container");

function createBlogCard(blog) {
  const card = document.createElement("div");
  card.className =
    "flex flex-col border border-gray-500 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.01] transition ease-in-out duration-200 blog-card blog max-w-[30rem] mx-auto min-h-auto";

  card.innerHTML = `
    <div class="p-5">
      <h3 class="text-extraSecondary text-sm uppercase font-medium mb-4 md:text-base">
        ${blog.category}
      </h3>
      <div class="text-lg font-bold mb-4 md:text-2xl">
        ${blog.title}
      </div>
      <p class="text-sm text-gray-600 font- mb-8 md:text-base">
        ${blog.description}
      </p>
      <div class="flex items-center gap-x-2 group cursor-pointer max-w-fit">
        <a href="#" class="text-sm text-black font-semibold md:text-base">Read More</a>
        <i class="fa-solid fa-arrow-right text-sm font-extrabold group-hover:translate-x-1/2 transition ease-in-out duration-150"></i>
      </div>
    </div>
    <img src="${blog.image}" alt="${blog.category}" class="rounded-b-2xl h-[18rem] w-full">
  `;
  return card;
}

blogData.forEach((blog) => {
  const card = createBlogCard(blog);
  cardContainer.appendChild(card);
});

//  (Arrows + Load More)
const blogs = document.querySelectorAll("#card-container .blog");
const loadMoreBtn = document.getElementById("load-more-btn");
const prevBtn = document.getElementById("prev-btn");

const swiperContainer = document.getElementById("swiper-container");
const leftArrows = document.querySelectorAll(".fa-arrow-left");
const rightArrows = document.querySelectorAll(".fa-arrow-right");

const card = document.querySelector(".blog-card");
const cardWidth = card.offsetWidth;
const gap = 16;
const scrollAmount = cardWidth + gap;

let currentStartIndex = 0;
const maxVisibleCards = 3;

function isMobileScreen() {
  return window.innerWidth < 800;
}

function updateVisibleCards() {
  if (!isMobileScreen()) {
    blogs.forEach((blog) => (blog.style.display = "block"));
    loadMoreBtn.style.display = "none";
    prevBtn.style.display = "none";
    return;
  }

  blogs.forEach((blog, index) => {
    blog.style.display =
      index >= currentStartIndex && index < currentStartIndex + maxVisibleCards
        ? "block"
        : "none";
  });

  loadMoreBtn.style.display =
    currentStartIndex + maxVisibleCards >= blogs.length
      ? "none"
      : "inline-block";

  prevBtn.style.display = currentStartIndex <= 0 ? "none" : "block";
}

loadMoreBtn.addEventListener("click", () => {
  currentStartIndex += maxVisibleCards;
  updateVisibleCards();
});

prevBtn.addEventListener("click", () => {
  currentStartIndex -= maxVisibleCards;
  if (currentStartIndex < 0) currentStartIndex = 0;
  updateVisibleCards();
});

window.addEventListener("DOMContentLoaded", updateVisibleCards);
window.addEventListener("resize", () => {
  currentStartIndex = 0;
  updateVisibleCards();
});

function restoreInitialWidth() {
  swiperContainer.classList.remove("md:max-w-full");
  swiperContainer.classList.add("md:max-w-[80%]");
}

function expandToFullWidth() {
  swiperContainer.classList.remove("md:max-w-[80%]");
  swiperContainer.classList.add("md:max-w-full");
}

function updateArrowStates(atStart, atEnd) {
  leftArrows.forEach((arrow) => {
    arrow.classList.toggle("disabled", atStart);
    arrow.style.borderColor = atStart ? "#D1D5DB" : "#6B7280";
    arrow.style.color = atStart ? "#6B7280" : "#000";
    arrow.style.cursor = atStart ? "not-allowed" : "pointer";
    arrow.style.opacity = atStart ? "0.5" : "1";
  });

  rightArrows.forEach((arrow) => {
    arrow.classList.toggle("disabled", atEnd);
    arrow.style.borderColor = atEnd ? "#6B7280" : "#6B7280";
    arrow.style.color = atEnd ? "#6B7280" : "#000";
    arrow.style.cursor = atEnd ? "not-allowed" : "pointer";
    arrow.style.opacity = atEnd ? "0.5" : "1";
  });
}

function checkScrollPosition() {
  const scrollLeft = swiperContainer.scrollLeft;
  const scrollWidth = swiperContainer.scrollWidth;
  const containerWidth = swiperContainer.clientWidth;

  const atStart = scrollLeft <= 0;
  const atEnd = scrollLeft + containerWidth >= scrollWidth - 1;

  if (atStart || atEnd) restoreInitialWidth();
  updateArrowStates(atStart, atEnd);
}

leftArrows.forEach((arrow) =>
  arrow.addEventListener("click", () => {
    if (arrow.classList.contains("disabled")) return;
    swiperContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    expandToFullWidth();
    setTimeout(checkScrollPosition, 50);
  })
);

rightArrows.forEach((arrow) =>
  arrow.addEventListener("click", () => {
    if (arrow.classList.contains("disabled")) return;
    swiperContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    expandToFullWidth();
    setTimeout(checkScrollPosition, 50);
  })
);

window.addEventListener("load", checkScrollPosition);
