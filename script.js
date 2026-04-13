const reveals = document.querySelectorAll(".reveal");
const hoverSurfaces = document.querySelectorAll(".hero-card, .showcase-card, .feature-card");
const heroCard = document.querySelector(".hero-card");
const workRows = document.querySelectorAll(".work-row");
const birdCursor = document.querySelector(".bird-cursor");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

reveals.forEach((item, index) => {
  if (item.classList.contains("hero-left")) {
    item.dataset.reveal = "left";
  } else if (item.classList.contains("hero-right")) {
    item.dataset.reveal = "right";
  } else if (item.classList.contains("hero-visual")) {
    item.dataset.reveal = "zoom";
  }
  item.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
  revealObserver.observe(item);
});

hoverSurfaces.forEach((surface) => {
  surface.addEventListener("pointermove", (event) => {
    const rect = surface.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    surface.style.setProperty("--liquid-x", `${x}%`);
    surface.style.setProperty("--liquid-y", `${y}%`);
    surface.style.setProperty("--liquid-alpha", surface === heroCard ? "1.05" : "1.2");
  });

  surface.addEventListener("pointerleave", () => {
    surface.style.setProperty("--liquid-alpha", "0");
  });
});

const animateWorkRows = () => {
  const viewportHeight = window.innerHeight || 1;

  workRows.forEach((row, index) => {
    const rect = row.getBoundingClientRect();
    const progress = Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0), 1);
    const shift = (0.5 - progress) * 42;
    const tilt = (progress - 0.5) * 4;

    row.style.setProperty("--work-shift", `${shift}px`);
    row.style.setProperty("--work-tilt", `${tilt}deg`);
    row.style.opacity = progress > 0.04 ? "1" : "";
    row.style.transitionDelay = `${Math.min(index * 90, 260)}ms`;
  });
};

animateWorkRows();

window.addEventListener("scroll", () => {
  requestAnimationFrame(animateWorkRows);
}, { passive: true });

window.addEventListener("resize", animateWorkRows);

workRows.forEach((row) => {
  const media = row.querySelector(".work-media");
  const layers = row.querySelectorAll(".therayu-image-shell, .work-cover-image, .work-window, .media-frame-grid, .process-card-left, .process-lines, .work-orb");

  if (!media || !layers.length) {
    return;
  }

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let frame = null;

  const render = () => {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    layers.forEach((layer, index) => {
      const strength = layer.classList.contains("work-orb") ? 0.55 : 0.18 + index * 0.03;
      layer.style.setProperty("--drift-x", `${currentX * strength}px`);
      layer.style.setProperty("--drift-y", `${currentY * strength}px`);
    });

    media.style.transform = `perspective(1200px) rotateX(${(-currentY * 0.18).toFixed(2)}deg) rotateY(${(currentX * 0.22).toFixed(2)}deg)`;

    if (Math.abs(targetX - currentX) > 0.08 || Math.abs(targetY - currentY) > 0.08) {
      frame = requestAnimationFrame(render);
    } else {
      frame = null;
    }
  };

  media.addEventListener("pointermove", (event) => {
    const rect = media.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 20;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 20;

    if (!frame) {
      frame = requestAnimationFrame(render);
    }
  });

  media.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;

    if (!frame) {
      frame = requestAnimationFrame(render);
    }
  });
});

if (birdCursor) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let lastX = mouseX;
  let rotation = 0;
  let bob = 0;

  const fly = () => {
    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;
    bob += 0.14;

    const deltaX = currentX - lastX;
    rotation += (((deltaX * 1.8)) - rotation) * 0.14;
    lastX = currentX;

    const lift = Math.sin(bob) * 2.5;
    birdCursor.style.transform = `translate3d(${currentX - 26}px, ${currentY - 26 + lift}px, 0) rotate(${rotation}deg)`;
    requestAnimationFrame(fly);
  };

  requestAnimationFrame(fly);

  window.addEventListener("pointermove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    birdCursor.classList.add("is-visible");
  }, { passive: true });

  window.addEventListener("pointerdown", () => {
    birdCursor.style.scale = "0.92";
  });

  window.addEventListener("pointerup", () => {
    birdCursor.style.scale = "1";
  });

  document.addEventListener("mouseleave", () => {
    birdCursor.classList.remove("is-visible");
  });
}
