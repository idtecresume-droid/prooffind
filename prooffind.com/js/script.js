/* ============================================
   Prooffind.com - รับพิสูจน์อักษร
   Main Script
============================================ */

(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("active");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "ปิดเมนู" : "เปิดเมนู");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "เปิดเมนู");
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  var faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");

    if (question && answer) {
      question.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");

        faqItems.forEach(function (other) {
          other.classList.remove("open");
          var otherQuestion = other.querySelector(".faq-question");
          var otherAnswer = other.querySelector(".faq-answer");
          if (otherQuestion) {
            otherQuestion.setAttribute("aria-expanded", "false");
          }
          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }
        });

        if (!isOpen) {
          item.classList.add("open");
          question.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    }
  });

  /* ---------- Contact form ---------- */
  var contactForm = document.getElementById("contactForm");

  if (contactForm) {
    var alertSuccess = document.getElementById("alertSuccess");
    var alertError = document.getElementById("alertError");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("name");
      var email = document.getElementById("email");
      var service = document.getElementById("service");
      var message = document.getElementById("message");
      var phone = document.getElementById("phone");

      var valid = true;

      if (!name.value.trim()) {
        name.focus();
        valid = false;
      } else if (!isValidEmail(email.value)) {
        email.focus();
        valid = false;
      } else if (!service.value) {
        service.focus();
        valid = false;
      } else if (!message.value.trim()) {
        message.focus();
        valid = false;
      }

      if (!valid) {
        showAlert(alertError);
        return;
      }

      var recipient = contactForm.getAttribute("data-mailto");
      var selectedService = service.options[service.selectedIndex].text;
      var subject = "ขอใบเสนอราคาพิสูจน์อักษร - " + selectedService;
      var body = [
        "ชื่อ: " + name.value.trim(),
        "อีเมล: " + email.value.trim(),
        "โทรศัพท์ / LINE ID: " + (phone ? phone.value.trim() : "-"),
        "ประเภทบริการ: " + selectedService,
        "รายละเอียดงาน:",
        message.value.trim()
      ].join("\\n");

      if (!recipient) {
        showAlert(alertError);
        return;
      }

      showAlert(alertSuccess);
      window.location.href = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      contactForm.reset();
    });
  }

  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showAlert(el) {
    if (!el) return;

    var allAlerts = document.querySelectorAll(".alert");
    allAlerts.forEach(function (a) {
      a.classList.remove("show");
    });

    el.classList.add("show");

    setTimeout(function () {
      el.classList.remove("show");
    }, 6000);
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = "0 2px 16px rgba(17, 24, 39, 0.08)";
      } else {
        header.style.boxShadow = "none";
      }
    });
  }

  /* ---------- Footer year auto update ---------- */
  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

})();
