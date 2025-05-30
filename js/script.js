// Sistema de navegação e animações para FloodGuard
class FloodGuardAnimations {
    constructor() {
      this.init()
    }
  
    init() {
      this.setupScrollAnimations()
      this.setupActiveNavigation()
      this.setupHeaderScroll()
      this.setupSmoothScrolling()
      this.setupParallaxEffects()
    }
  
    // Animações de scroll para seções
    setupScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target
            element.classList.add("visible")
  
            // Animações específicas por seção
            this.animateSection(element)
          }
        })
      }, observerOptions)
  
      // Observar todas as seções
      document.querySelectorAll(".section-content").forEach((section) => {
        observer.observe(section)
      })
    }
  
    // Animações específicas para cada seção
    animateSection(element) {
      const sectionId = element.closest(".section").id
  
      switch (sectionId) {
        case "problema":
          this.animateStats()
          break
        case "tecnologias":
          this.animateTechGrid()
          break
        case "objetivos":
          this.animateObjectives()
          break
        case "publico":
          this.animateRiskRegions()
          break
        case "beneficios":
          this.animateBenefits()
          break
        case "uso-diario":
          this.animateSteps()
          break
      }
    }
  
    // Animação dos números estatísticos
    animateStats() {
      const statNumbers = document.querySelectorAll(".stat-number")
      statNumbers.forEach((stat, index) => {
        setTimeout(() => {
          stat.style.animation = "fadeInUp 0.6s ease-out forwards"
          this.countUpAnimation(stat)
        }, index * 200)
      })
    }
  
    // Animação de contagem crescente
    countUpAnimation(element) {
      const text = element.textContent
      const number = Number.parseInt(text.replace(/\D/g, ""))
      const suffix = text.replace(/[\d,]/g, "")
  
      if (number) {
        let current = 0
        const increment = number / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= number) {
            current = number
            clearInterval(timer)
          }
          element.textContent = Math.floor(current).toLocaleString() + suffix
        }, 30)
      }
    }
  
    // Animação do grid de tecnologias
    animateTechGrid() {
      const techItems = document.querySelectorAll(".tech-item")
      techItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.animation = "fadeInUp 0.5s ease-out forwards"
          item.style.transform = "translateY(0) scale(1)"
        }, index * 150)
      })
    }
  
    // Animação dos objetivos
    animateObjectives() {
      const objectives = document.querySelectorAll(".objective-item")
      objectives.forEach((item, index) => {
        setTimeout(() => {
          item.style.animation = "slideInLeft 0.6s ease-out forwards"
        }, index * 200)
      })
    }
  
    // Animação das regiões de risco
    animateRiskRegions() {
      const regions = document.querySelectorAll(".region-item")
      regions.forEach((item, index) => {
        setTimeout(() => {
          item.style.animation = "slideInRight 0.5s ease-out forwards"
          item.style.transform = "translateX(0)"
        }, index * 150)
      })
    }
  
    // Animação dos benefícios
    animateBenefits() {
      const benefits = document.querySelectorAll(".benefit-card")
      benefits.forEach((card, index) => {
        setTimeout(() => {
          card.style.animation = "fadeInUp 0.6s ease-out forwards"
          card.style.transform = "translateY(0) scale(1)"
        }, index * 200)
      })
    }
  
    // Animação dos passos diários
    animateSteps() {
      const steps = document.querySelectorAll(".step-item")
      steps.forEach((step, index) => {
        setTimeout(() => {
          step.style.animation = "slideInLeft 0.6s ease-out forwards"
  
          // Animação especial para o número
          const number = step.querySelector(".step-number")
          setTimeout(() => {
            number.style.animation = "pulse 0.5s ease-in-out"
          }, 300)
        }, index * 250)
      })
    }
  
    // Navegação ativa baseada no scroll
    setupActiveNavigation() {
      const sections = document.querySelectorAll(".section")
      const navLinks = document.querySelectorAll(".nav-link")
  
      const observerOptions = {
        threshold: 0.3,
        rootMargin: "-70px 0px -70px 0px",
      }
  
      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
  
            // Remove active de todos os links
            navLinks.forEach((link) => link.classList.remove("active"))
  
            // Adiciona active ao link correspondente
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`)
            if (activeLink) {
              activeLink.classList.add("active")
            }
          }
        })
      }, observerOptions)
  
      sections.forEach((section) => {
        navObserver.observe(section)
      })
    }
  
    // Efeito no header durante o scroll
    setupHeaderScroll() {
      const header = document.querySelector(".header")
      let lastScrollY = window.scrollY
  
      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY
  
        if (currentScrollY > 100) {
          header.classList.add("scrolled")
        } else {
          header.classList.remove("scrolled")
        }
  
        // Esconder/mostrar header baseado na direção do scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          header.style.transform = "translateY(-100%)"
        } else {
          header.style.transform = "translateY(0)"
        }
  
        lastScrollY = currentScrollY
      })
    }
  
    // Scroll suave para âncoras
    setupSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault()
          const target = document.querySelector(anchor.getAttribute("href"))
  
          if (target) {
            const headerHeight = document.querySelector(".header").offsetHeight
            const targetPosition = target.offsetTop - headerHeight - 20
  
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            })
          }
        })
      })
    }
  
    // Efeitos de parallax sutis
    setupParallaxEffects() {
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset
        const parallaxElements = document.querySelectorAll(".section-image")
  
        parallaxElements.forEach((element, index) => {
          const speed = 0.1 + index * 0.05
          const yPos = -(scrolled * speed)
          element.style.transform = `translateY(${yPos}px)`
        })
      })
    }
  }
  
  // Efeitos de hover avançados
  class HoverEffects {
    constructor() {
      this.init()
    }
  
    init() {
      this.setupCardHovers()
      this.setupImageHovers()
      this.setupButtonHovers()
    }
  
    setupCardHovers() {
      const cards = document.querySelectorAll(".benefit-card, .tech-item, .stat-item")
  
      cards.forEach((card) => {
        card.addEventListener("mouseenter", (e) => {
          this.createRippleEffect(e)
        })
      })
    }
  
    setupImageHovers() {
      const images = document.querySelectorAll(".section-image")
  
      images.forEach((image) => {
        image.addEventListener("mouseenter", () => {
          image.style.filter = "brightness(1.1) saturate(1.2)"
        })
  
        image.addEventListener("mouseleave", () => {
          image.style.filter = "brightness(1) saturate(1)"
        })
      })
    }
  
    setupButtonHovers() {
      const navLinks = document.querySelectorAll(".nav-link")
  
      navLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          link.style.boxShadow = "0 4px 15px rgba(59, 130, 246, 0.3)"
        })
  
        link.addEventListener("mouseleave", () => {
          link.style.boxShadow = "none"
        })
      })
    }
  
    createRippleEffect(e) {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
  
      const ripple = document.createElement("div")
      ripple.style.cssText = `
              position: absolute;
              border-radius: 50%;
              background: rgba(59, 130, 246, 0.3);
              transform: scale(0);
              animation: ripple 0.6s linear;
              left: ${x}px;
              top: ${y}px;
              width: 20px;
              height: 20px;
              margin-left: -10px;
              margin-top: -10px;
              pointer-events: none;
          `
  
      card.style.position = "relative"
      card.style.overflow = "hidden"
      card.appendChild(ripple)
  
      setTimeout(() => {
        ripple.remove()
      }, 600)
    }
  }
  
  // Sistema de notificações de alerta (simulação)
  class AlertSystem {
    constructor() {
      this.init()
    }
  
    init() {
      this.createAlertDemo()
    }
  
    createAlertDemo() {
      // Simular alerta após 5 segundos na página
      setTimeout(() => {
        this.showAlert("Alerta de Teste", "Sistema de monitoramento ativo. Condições normais.", "info")
      }, 5000)
    }
  
    showAlert(title, message, type = "info") {
      const alertContainer = this.getOrCreateAlertContainer()
  
      const alert = document.createElement("div")
      alert.className = `alert alert-${type}`
      alert.innerHTML = `
              <div class="alert-content">
                  <div class="alert-icon">${this.getAlertIcon(type)}</div>
                  <div class="alert-text">
                      <h4>${title}</h4>
                      <p>${message}</p>
                  </div>
                  <button class="alert-close">&times;</button>
              </div>
          `
  
      // Estilos inline para o alerta
      alert.style.cssText = `
              position: relative;
              background: linear-gradient(135deg, #dbeafe, #bfdbfe);
              border: 1px solid #3b82f6;
              border-radius: 8px;
              padding: 1rem;
              margin-bottom: 0.5rem;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              animation: slideInRight 0.5s ease-out;
          `
  
      alertContainer.appendChild(alert)
  
      // Auto-remover após 5 segundos
      setTimeout(() => {
        this.removeAlert(alert)
      }, 5000)
  
      // Botão de fechar
      alert.querySelector(".alert-close").addEventListener("click", () => {
        this.removeAlert(alert)
      })
    }
  
    getOrCreateAlertContainer() {
      let container = document.querySelector(".alert-container")
      if (!container) {
        container = document.createElement("div")
        container.className = "alert-container"
        container.style.cssText = `
                  position: fixed;
                  top: 90px;
                  right: 20px;
                  z-index: 1001;
                  max-width: 400px;
              `
        document.body.appendChild(container)
      }
      return container
    }
  
    getAlertIcon(type) {
      const icons = {
        info: "💧",
        warning: "⚠️",
        danger: "🚨",
        success: "✅",
      }
      return icons[type] || icons.info
    }
  
    removeAlert(alert) {
      alert.style.animation = "slideOutRight 0.3s ease-in forwards"
      setTimeout(() => {
        alert.remove()
      }, 300)
    }
  }
  
  // Adicionar estilos CSS para animações via JavaScript
  const additionalStyles = `
      @keyframes ripple {
          to {
              transform: scale(4);
              opacity: 0;
          }
      }
      
      @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
      }
      
      @keyframes slideInRight {
          from {
              transform: translateX(100%);
              opacity: 0;
          }
          to {
              transform: translateX(0);
              opacity: 1;
          }
      }
      
      @keyframes slideOutRight {
          from {
              transform: translateX(0);
              opacity: 1;
          }
          to {
              transform: translateX(100%);
              opacity: 0;
          }
      }
      
      .alert-content {
          display: flex;
          align-items: center;
          gap: 1rem;
      }
      
      .alert-icon {
          font-size: 1.5rem;
      }
      
      .alert-text h4 {
          margin: 0 0 0.25rem 0;
          font-weight: 600;
          color: #1e40af;
      }
      
      .alert-text p {
          margin: 0;
          color: #475569;
          font-size: 0.875rem;
      }
      
      .alert-close {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          color: #64748b;
          margin-left: auto;
      }
      
      .alert-close:hover {
          color: #1e40af;
      }
  `
  
  // Adicionar estilos ao documento
  const styleSheet = document.createElement("style")
  styleSheet.textContent = additionalStyles
  document.head.appendChild(styleSheet)
  
  // Inicializar todas as funcionalidades quando o DOM estiver carregado
  document.addEventListener("DOMContentLoaded", () => {
    new FloodGuardAnimations()
    new HoverEffects()
    new AlertSystem()
  
    console.log("🌊 FloodGuard - Sistema de Prevenção de Enchentes carregado com sucesso!")
  })
  
  // Função para simular dados em tempo real
  function simulateRealTimeData() {
    const regions = ["São Paulo", "Rio de Janeiro", "Porto Alegre", "Belo Horizonte"]
    const riskLevels = ["Baixo", "Médio", "Alto"]
  
    setInterval(() => {
      const randomRegion = regions[Math.floor(Math.random() * regions.length)]
      const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)]
  
      if (randomRisk === "Alto" && Math.random() > 0.8) {
        const alertSystem = new AlertSystem()
        alertSystem.showAlert(
          `Alerta para ${randomRegion}`,
          `Nível de risco: ${randomRisk}. Monitore as condições locais.`,
          randomRisk === "Alto" ? "warning" : "info",
        )
      }
    }, 30000) // A cada 30 segundos
  }
  
  // Iniciar simulação de dados em tempo real
  setTimeout(simulateRealTimeData, 10000)
  