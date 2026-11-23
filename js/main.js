// ===== Hoja de vida - Andrés Felipe Medina Arguello =====
document.addEventListener("DOMContentLoaded", () => {

  // 1. Año actual en el pie de página
  document.getElementById("year").textContent = new Date().getFullYear();

  // 2. Construir las barras de habilidades a partir de los atributos data-*
  document.querySelectorAll(".skill-bar").forEach((bar) => {
    const label = bar.dataset.label;
    const level = bar.dataset.level;
    bar.innerHTML = `
      <div class="d-flex justify-content-between mb-1">
        <span>${label}</span><span>${level}%</span>
      </div>
      <div class="progress" role="progressbar" aria-label="${label}"
           aria-valuenow="${level}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" data-width="${level}%"></div>
      </div>`;
  });

  // 3. Animaciones al entrar en pantalla (secciones y barras)
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains("progress-bar")) {
        el.style.width = el.dataset.width;
      } else {
        el.classList.add("visible");
      }
      obs.unobserve(el);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal, .progress-bar").forEach((el) => observer.observe(el));

  // 4. Cerrar el menú hamburguesa al pulsar un enlace (celular)
  const menu = document.getElementById("menu");
  document.querySelectorAll("#menu .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // 5. Botón "volver arriba"
  const btnArriba = document.getElementById("btnArriba");
  window.addEventListener("scroll", () => {
    btnArriba.classList.toggle("show", window.scrollY > 400);
  });
  btnArriba.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // 6. Imprimir / guardar como PDF (muestra todo antes de imprimir)
  document.getElementById("btnImprimir").addEventListener("click", () => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    document.querySelectorAll(".progress-bar").forEach((el) => (el.style.width = el.dataset.width));
    window.print();
  });

  // 7. Cuenta regresiva hasta la disponibilidad para etapa productiva
  const countdown = document.getElementById("countdown");
  const fechaInicio = new Date(2027, 11, 11); // 11 de diciembre de 2027
  const dias = Math.ceil((fechaInicio - new Date()) / (1000 * 60 * 60 * 24));
  countdown.textContent = dias > 0
    ? `Faltan ${dias} días.`
    : "¡Disponible para iniciar ahora!";
});
