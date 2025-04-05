document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
  }, 2000);

  const canvas = document.getElementById("birthday-canvas");
  const ctx = canvas.getContext("2d");
  let isDrawing = false;
  let currentColor = "#FF6B6B";

  function resizeCanvas() {
    const containerWidth = canvas.parentElement.clientWidth;
    canvas.width = containerWidth;
    canvas.height = containerWidth * 0.6;
    ctx.fillStyle = "#FFFDF7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("touchstart", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("touchend", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  function startDrawing(e) {
    isDrawing = true;
    draw(e);
  }

  function draw(e) {
    if (!isDrawing) return;

    let x, y;
    if (e.type.includes("touch")) {
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.offsetX;
      y = e.offsetY;
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 15;
    ctx.strokeStyle = currentColor;

    if (ctx.lastX === undefined) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.beginPath();
      ctx.moveTo(ctx.lastX, ctx.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.lastX = x;
    ctx.lastY = y;
    if (document.getElementById("reveal-btn").classList.contains("disabled")) {
      document.getElementById("reveal-btn").classList.remove("disabled");
    }
  }

  function stopDrawing() {
    isDrawing = false;
    ctx.lastX = undefined;
    ctx.lastY = undefined;
  }

  document.querySelectorAll(".color-swatch").forEach((swatch) => {
    swatch.addEventListener("click", function () {
      currentColor = this.getAttribute("data-color");
      document.querySelectorAll(".color-swatch").forEach((s) => s.classList.remove("active"));
      this.classList.add("active");
    });
  });

  document.getElementById("clear-btn").addEventListener("click", function () {
    ctx.fillStyle = "#FFFDF7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById("reveal-btn").classList.add("disabled");
  });

  document.getElementById("reveal-btn").addEventListener("click", function () {
    if (this.classList.contains("disabled")) return;

    document.getElementById("painting-game").classList.remove("active-section");
    document.getElementById("card-reveal").style.display = "block";

    const funnyMessages = [
      "You're not getting older, you're just becoming a classic!",
    ];
    const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    document.querySelector(".personalized-message").innerHTML = `
                    <p>${randomMessage}</p>
                    <p>Wishing you a beautiful day filled with laughter that uplifts your spirit, smiles that warm your heart, and positive energy that follows you wherever you go. May your health thrive in every way — body, mind, and soul — and may peace find you even in life’s busiest moments. May your career flourish with purpose, progress, and passion, and may exciting opportunities unfold with perfect timing. May financial abundance flow effortlessly into your life, supporting your dreams and bringing you freedom and comfort. May love surround you, kindness guide you, and inner strength carry you through every challenge. Keep believing in yourself, keep moving forward, and never forget how capable, worthy, and extraordinary you truly are — the world is brighter because you're in it.</p>
                    <p class="signature">- Your Biggest Fan</p>
                `;

    setTimeout(() => {
      document.querySelector(".watercolor-bloom").style.opacity = "1";
    }, 500);
  });

  // Final surprise
  document.getElementById("final-surprise-btn").addEventListener("click", function () {
    document.getElementById("card-reveal").style.display = "none";
    document.getElementById("final-surprise").style.display = "block";

    createConfetti();

    const music = document.getElementById("birthday-music");
    music.volume = 0.3;
    music.play();

    animateGooglyEyes();
    setupInteractivePortrait();
  });
  const balloonColors = ["#FF6B6B", "#FF9E7D", "#FFD166", "#06D6A0", "#118AB2", "#073B4C", "#7209B7", "#F72585"];
  function createBalloon() {
    const container = document.getElementById("balloon-container");
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    const size = Math.random() * 30 + 50;
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const rotation = (Math.random() - 0.5) * 30;
    balloon.style.backgroundColor = color;
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.5}px`;
    balloon.style.left = `${left}%`;
    balloon.style.animationDelay = `${delay}s`;
    balloon.style.transform = `rotate(${rotation}deg)`;
    const string = document.createElement("div");
    string.className = "balloon-string";
    string.style.height = `${size * 0.5}px`;
    balloon.appendChild(string);
    container.appendChild(balloon);
    setTimeout(() => {
      balloon.remove();
    }, 4000);
  }
  document.getElementById("release-balloons").addEventListener("click", function () {
    for (let i = 0; i < 15; i++) {
      setTimeout(createBalloon, i * 200);
    }
    const portrait = document.getElementById("birthday-portrait");
    portrait.style.animation = "spin 1s ease";
    setTimeout(() => {
      portrait.style.animation = "";
    }, 1000);
  });

  function setupInteractivePortrait() {
    const mustache = document.querySelector(".mustache");
    const portrait = document.getElementById("birthday-portrait");
    const interactiveArea = document.getElementById("portrait-interaction");
    mustache.addEventListener("click", function () {
      this.style.transform = "scale(1.5)";
      this.style.transition = "transform 0.3s";
      createHearts();
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 1000);
    });

    interactiveArea.addEventListener("mousemove", function (e) {
      const rect = portrait.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const tiltX = (y / rect.height) * 15;
      const tiltY = -(x / rect.width) * 15;

      portrait.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    interactiveArea.addEventListener("mouseleave", function () {
      portrait.style.transform = "rotateX(0) rotateY(0)";
    });
  }

  function createHearts() {
    const container = document.getElementById("balloon-container");

    for (let i = 0; i < 10; i++) {
      const heart = document.createElement("div");
      heart.innerHTML = "❤️";
      heart.style.position = "absolute";
      heart.style.fontSize = `${Math.random() * 20 + 15}px`;
      heart.style.left = `${Math.random() * 50 + 25}%`;
      heart.style.top = "60%";
      heart.style.opacity = "0";
      heart.style.animation = `float-up ${Math.random() * 2 + 1}s ease-in forwards`;
      heart.style.animationDelay = `${i * 0.1}s`;

      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 3000);
    }
  }

  document.getElementById("restart-btn").addEventListener("click", function () {
    document.getElementById("final-surprise").style.display = "none";
    document.getElementById("painting-game").classList.add("active-section");
    ctx.fillStyle = "#FFFDF7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById("reveal-btn").classList.add("disabled");
    document.getElementById("birthday-music").pause();
    document.getElementById("birthday-music").currentTime = 0;
  });

  function createConfetti() {
    const container = document.querySelector(".confetti-container");
    container.innerHTML = "";

    const emojis = ["🎉", "🎊", "🎈", "🎁", "🍰", "🥳", "🎂", "👑"];
    const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA", "#F8A5C2"];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      const color = colors[Math.floor(Math.random() * colors.length)];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const size = Math.random() * 20 + 15;
      const posX = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      const rotation = Math.random() * 360;

      confetti.innerHTML = emoji;
      confetti.style.color = color;
      confetti.style.fontSize = `${size}px`;
      confetti.style.left = `${posX}%`;
      confetti.style.animationDuration = `${duration}s`;
      confetti.style.animationDelay = `${delay}s`;
      confetti.style.transform = `rotate(${rotation}deg)`;

      container.appendChild(confetti);
    }
  }
  function animateGooglyEyes() {
    const pupils = document.querySelectorAll(".googly-pupil");
    const portrait = document.querySelector(".animated-portrait");

    portrait.addEventListener("mousemove", function (e) {
      const rect = portrait.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      pupils.forEach((pupil) => {
        const eye = pupil.parentElement;
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2 - rect.left;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2 - rect.top;

        const angle = Math.atan2(y - eyeCenterY, x - eyeCenterX);
        const distance = Math.min(8, Math.sqrt(Math.pow(x - eyeCenterX, 2) + Math.pow(y - eyeCenterY, 2)) / 10);

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
      });
    });
    setInterval(() => {
      if (Math.random() > 0.7) {
        pupils.forEach((pupil) => {
          pupil.style.transform = "translate(0, 0)";
          setTimeout(() => {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 5;
            pupil.style.transform = `translate(${x}px, ${y}px)`;
          }, 100);
        });
      }
    }, 2000);
  }

  const mustache = document.querySelector(".mustache");
  if (mustache) {
    mustache.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.5)";
      this.style.transition = "transform 0.5s";
    });

    mustache.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  }
});
