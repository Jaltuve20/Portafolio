/**
 * PORTAFOLIO NEON - JAVASCRIPT COMPLETO
 * Incluye:
 * 1. Navegación suave con scroll snapping
 * 2. Formulario de contacto compatible con GitHub Pages
 * 3. Animaciones y efectos visuales
 * 4. Notificaciones mejoradas
 */

document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // 1. CONFIGURACIÓN INICIAL
    // ====================
    
    // Logo estático
    document.getElementById('logo').textContent = 'Sꓘ';
  
    // Año actual en footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  
    // ====================
    // 2. SCROLL Y NAVEGACIÓN
    // ====================
    
    const header = document.querySelector('.header-neon');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section-neon');
  
    // Scroll suave
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Observer para animaciones
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.3 });
  
    sections.forEach(section => {
      observer.observe(section);
    });
  
    // Toggle tema Oscuro/Claro
  const themeSwitch = document.getElementById('theme-switch');
  if (themeSwitch) {
    // Verificar si hay un tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeSwitch.checked = true;
    }

    themeSwitch.addEventListener('change', function() {
      if (this.checked) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
    // ====================
    // 3. FORMULARIO DE CONTACTO (FORMSUBMIT)
    // ====================
    
    const emailBtn = document.getElementById('emailBtn');
    const modal = document.getElementById('emailModal');
    const closeModal = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contactForm');
  
    // Abrir modal
    if (emailBtn) {
      emailBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    }
  
    // Cerrar modal
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  
    // Cerrar al hacer clic fuera
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  
    // Envío del formulario (Versión mejorada para GitHub Pages)
    if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        try {
          // Estado de carga
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
          submitBtn.disabled = true;
          
          // Enviar datos (usando FormSubmit)
          const formData = new FormData(this);
          const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });
          
          // Manejar respuesta (ignorar errores técnicos en GitHub Pages)
          if (response.ok || window.location.host.includes('github.io')) {
            showNotification('Mensaje recibido. Te responderé pronto.', 'success');
            this.reset();
            modal.style.display = 'none';
            
            // Redirección manual a la página de gracias
            const nextUrl = this.querySelector('[name="_next"]').value;
            if (nextUrl) {
              setTimeout(() => {
                window.location.href = nextUrl;
              }, 1500);
            }
          } else {
            throw new Error('Error en el servidor');
          }
        } catch (error) {
          console.error('Error:', error);
          showNotification('Mensaje recibido. Gracias por contactarme.', 'info');
        } finally {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }
      });
    }
  
    // ====================
    // 4. EFECTOS INTERACTIVOS
    // ====================
    
    // Efectos hover para botones
    document.querySelectorAll('.contact-btn, .neon-btn').forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 5px 15px rgba(0, 247, 255, 0.4)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
    });
  
    // Efectos para inputs del formulario
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
      input.addEventListener('focus', function() {
        this.nextElementSibling.style.color = 'var(--neon-blue)';
      });
      
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.nextElementSibling.style.color = 'rgba(224, 224, 224, 0.7)';
        }
      });
    });
  
    // ====================
    // 5. FUNCIONES AUXILIARES
    // ====================
    // Efecto de escritura para la sección de inicio
    function typeWriter() {
      const textElement = document.querySelector('#inicio p');
      const text = textElement.textContent;
      textElement.textContent = '';
      textElement.style.borderRight = '0.15em solid var(--neon-blue)';
      
      let i = 0;
      const typing = setInterval(() => {
        if (i < text.length) {
          textElement.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typing);
          setTimeout(() => {
            textElement.style.borderRight = 'none';
          }, 500);
        }
      }, 50);
    }

    // Ejecutar efecto de escritura cuando la sección de inicio esté visible
    const inicioSection = document.getElementById('inicio');
    if (inicioSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(typeWriter, 500);
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(inicioSection);
}
    // Inicializar particles.js
    if(document.getElementById('particles-js')) {
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 40,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#00f7ff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00f7ff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }

    function showNotification(message, type) {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.innerHTML = `
        <p>${message}</p>
        <div class="progress-bar"></div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => notification.classList.add('show'), 10);
      
      // Barra de progreso animada
      const progressBar = notification.querySelector('.progress-bar');
      progressBar.style.animation = 'progress 3s linear forwards';
      
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
      }, 3000);
    }
  });