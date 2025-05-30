import { Chart } from "@/components/ui/chart"
// Sistema de navegação e animações para HidroSafe
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
        link.style.boxShadow = "0 4px 15px rgba(56, 189, 248, 0.4)"
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
            background: rgba(56, 189, 248, 0.4);
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
            background: linear-gradient(135deg, #e0f2fe, #bae6fd);
            border: 2px solid #38bdf8;
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
        color: #0284c7;
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
        color: #38bdf8;
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

  console.log("💧 HidroSafe - Sistema de Prevenção de Enchentes carregado com sucesso!")
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

// Funcionalidade para gráficos
class ChartManager {
  constructor() {
    this.charts = {}
    this.init()
  }

  init() {
    this.createDeathsChart()
    this.createRegionChart()
    this.createPrecipitationChart()
    this.createEconomicChart()
    this.setupMapInteraction()
  }

  createDeathsChart() {
    const ctx = document.getElementById("deathsChart")
    if (!ctx) return

    this.charts.deaths = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["2004", "2006", "2008", "2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
        datasets: [
          {
            label: "Mortes por Enchentes",
            data: [180, 220, 340, 280, 450, 380, 320, 290, 410, 350, 280],
            borderColor: "#38bdf8",
            backgroundColor: "rgba(56, 189, 248, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "#e2e8f0",
            },
          },
          x: {
            grid: {
              color: "#e2e8f0",
            },
          },
        },
      },
    })
  }

  createRegionChart() {
    const ctx = document.getElementById("regionChart")
    if (!ctx) return

    this.charts.region = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Sudeste", "Sul", "Nordeste", "Centro-Oeste", "Norte"],
        datasets: [
          {
            data: [45, 25, 15, 10, 5],
            backgroundColor: ["#dc2626", "#ff6b6b", "#10b981", "#fbbf24", "#f59e0b"],
            borderWidth: 2,
            borderColor: "#ffffff",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    })
  }

  createPrecipitationChart() {
    const ctx = document.getElementById("precipitationChart")
    if (!ctx) return

    this.charts.precipitation = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        datasets: [
          {
            label: "São Paulo",
            data: [240, 220, 160, 75, 60, 50, 45, 40, 80, 125, 150, 200],
            backgroundColor: "#38bdf8",
          },
          {
            label: "Rio de Janeiro",
            data: [280, 260, 190, 100, 70, 55, 50, 45, 90, 140, 170, 230],
            backgroundColor: "#0ea5e9",
          },
          {
            label: "Porto Alegre",
            data: [120, 110, 100, 90, 95, 110, 120, 115, 130, 140, 130, 125],
            backgroundColor: "#7dd3fc",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Precipitação (mm)",
            },
          },
        },
      },
    })
  }

  createEconomicChart() {
    const ctx = document.getElementById("economicChart")
    if (!ctx) return

    this.charts.economic = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
        datasets: [
          {
            label: "Prejuízos (R$ bilhões)",
            data: [12.5, 18.2, 15.8, 22.1, 16.9, 14.3],
            backgroundColor: ["#ff6b6b", "#ff8e8e", "#ffa8a8", "#ff6b6b", "#ff8e8e", "#38bdf8"],
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Prejuízos (R$ bilhões)",
            },
          },
        },
      },
    })
  }

  setupMapInteraction() {
    const regions = document.querySelectorAll(".region")
    const regionDetails = document.getElementById("regionDetails")

    const regionData = {
      sul: {
        name: "Região Sul",
        risk: "Alto Risco",
        description: "A região Sul apresenta alto risco devido às chuvas intensas sazonais e topografia acidentada.",
        cities: ["Porto Alegre", "Curitiba", "Florianópolis"],
        stats: {
          population: "2.8 milhões em risco",
          events: "45 eventos/ano",
          precipitation: "120-180mm crítico",
        },
      },
      sudeste: {
        name: "Região Sudeste",
        risk: "Muito Alto Risco",
        description: "Concentra as maiores metrópoles e maior densidade populacional em áreas de risco.",
        cities: ["São Paulo", "Rio de Janeiro", "Belo Horizonte"],
        stats: {
          population: "8.5 milhões em risco",
          events: "78 eventos/ano",
          precipitation: "40-60mm crítico",
        },
      },
      "centro-oeste": {
        name: "Centro-Oeste",
        risk: "Médio Risco",
        description: "Risco moderado concentrado nas áreas urbanas durante período chuvoso.",
        cities: ["Brasília", "Goiânia", "Campo Grande"],
        stats: {
          population: "1.2 milhões em risco",
          events: "25 eventos/ano",
          precipitation: "80-120mm crítico",
        },
      },
      nordeste: {
        name: "Região Nordeste",
        risk: "Baixo Risco",
        description: "Menor incidência, mas eventos concentrados podem ser devastadores.",
        cities: ["Salvador", "Recife", "Fortaleza"],
        stats: {
          population: "900 mil em risco",
          events: "15 eventos/ano",
          precipitation: "100-150mm crítico",
        },
      },
      norte: {
        name: "Região Norte",
        risk: "Médio Risco",
        description: "Risco relacionado às cheias dos rios e chuvas amazônicas.",
        cities: ["Manaus", "Belém", "Porto Velho"],
        stats: {
          population: "800 mil em risco",
          events: "20 eventos/ano",
          precipitation: "150-200mm crítico",
        },
      },
    }

    regions.forEach((region) => {
      region.addEventListener("click", () => {
        const regionKey = region.dataset.region
        const data = regionData[regionKey]

        if (data && regionDetails) {
          regionDetails.innerHTML = `
            <h3>${data.name}</h3>
            <p class="risk-level"><strong>Nível:</strong> ${data.risk}</p>
            <p>${data.description}</p>
            
            <h4>Principais Cidades:</h4>
            <ul>
              ${data.cities.map((city) => `<li>${city}</li>`).join("")}
            </ul>
            
            <h4>Estatísticas:</h4>
            <ul>
              <li><strong>População em risco:</strong> ${data.stats.population}</li>
              <li><strong>Eventos anuais:</strong> ${data.stats.events}</li>
              <li><strong>Precipitação crítica:</strong> ${data.stats.precipitation}</li>
            </ul>
          `
        }

        // Destacar região selecionada
        regions.forEach((r) => (r.style.stroke = "none"))
        region.style.stroke = "#38bdf8"
        region.style.strokeWidth = "3"
      })

      region.addEventListener("mouseenter", () => {
        region.style.opacity = "1"
        region.style.filter = "brightness(1.1)"
      })

      region.addEventListener("mouseleave", () => {
        region.style.opacity = "0.8"
        region.style.filter = "brightness(1)"
      })
    })
  }
}

// Sistema de calculadora de risco
class RiskCalculator {
  constructor() {
    this.createCalculator()
  }

  createCalculator() {
    // Criar calculadora de risco interativa
    const calculatorHTML = `
      <div class="risk-calculator" style="display: none;">
        <h3>Calculadora de Risco por CEP</h3>
        <div class="calculator-form">
          <input type="text" id="cepInput" placeholder="Digite seu CEP" maxlength="9">
          <button id="calculateRisk">Calcular Risco</button>
        </div>
        <div id="riskResult"></div>
      </div>
    `

    // Adicionar à página se não existir
    if (!document.querySelector(".risk-calculator")) {
      const container = document.querySelector(".resources-grid")
      if (container) {
        container.insertAdjacentHTML("afterend", calculatorHTML)
      }
    }

    this.setupCalculatorEvents()
  }

  setupCalculatorEvents() {
    const calculateBtn = document.getElementById("calculateRisk")
    const cepInput = document.getElementById("cepInput")
    const resultDiv = document.getElementById("riskResult")

    if (calculateBtn && cepInput && resultDiv) {
      calculateBtn.addEventListener("click", () => {
        const cep = cepInput.value.replace(/\D/g, "")
        if (cep.length === 8) {
          this.calculateRisk(cep, resultDiv)
        } else {
          resultDiv.innerHTML = '<p style="color: red;">CEP inválido. Digite um CEP válido.</p>'
        }
      })

      cepInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "")
        if (value.length > 5) {
          value = value.replace(/(\d{5})(\d)/, "$1-$2")
        }
        e.target.value = value
      })
    }
  }

  calculateRisk(cep, resultDiv) {
    // Simulação de cálculo de risco baseado no CEP
    const riskData = this.getRiskByCEP(cep)

    resultDiv.innerHTML = `
      <div class="risk-result">
        <h4>Resultado para CEP ${cep}</h4>
        <div class="risk-level ${riskData.level.toLowerCase().replace(" ", "-")}">
          <strong>Nível de Risco:</strong> ${riskData.level}
        </div>
        <p><strong>Região:</strong> ${riskData.region}</p>
        <p><strong>Precipitação crítica:</strong> ${riskData.criticalRain}</p>
        <p><strong>Tempo médio de alerta:</strong> ${riskData.alertTime}</p>
        <div class="recommendations">
          <h5>Recomendações:</h5>
          <ul>
            ${riskData.recommendations.map((rec) => `<li>${rec}</li>`).join("")}
          </ul>
        </div>
      </div>
    `
  }

  getRiskByCEP(cep) {
    // Simulação baseada nos primeiros dígitos do CEP
    const firstDigit = cep.charAt(0)

    const riskMap = {
      0: {
        // SP
        level: "Muito Alto",
        region: "Grande São Paulo",
        criticalRain: "45mm/h",
        alertTime: "6 horas",
        recommendations: [
          "Mantenha kit de emergência sempre pronto",
          "Cadastre-se no sistema de alertas",
          "Identifique rotas de evacuação",
          "Evite áreas baixas durante chuvas",
        ],
      },
      1: {
        // SP Interior
        level: "Alto",
        region: "Interior de São Paulo",
        criticalRain: "55mm/h",
        alertTime: "8 horas",
        recommendations: [
          "Monitore previsões meteorológicas",
          "Prepare plano familiar de emergência",
          "Mantenha documentos protegidos",
        ],
      },
      2: {
        // RJ
        level: "Muito Alto",
        region: "Rio de Janeiro",
        criticalRain: "40mm/h",
        alertTime: "5 horas",
        recommendations: [
          "Atenção especial a encostas",
          "Evite áreas de várzea",
          "Mantenha contato com vizinhos",
          "Tenha sempre rota alternativa",
        ],
      },
      3: {
        // MG/ES
        level: "Alto",
        region: "Minas Gerais/Espírito Santo",
        criticalRain: "50mm/h",
        alertTime: "7 horas",
        recommendations: ["Monitore níveis de rios próximos", "Prepare kit de emergência", "Conheça abrigos públicos"],
      },
      4: {
        // BA/SE
        level: "Médio",
        region: "Bahia/Sergipe",
        criticalRain: "70mm/h",
        alertTime: "10 horas",
        recommendations: ["Acompanhe alertas meteorológicos", "Mantenha drenagem limpa", "Tenha plano de comunicação"],
      },
      5: {
        // PR
        level: "Alto",
        region: "Paraná",
        criticalRain: "48mm/h",
        alertTime: "6 horas",
        recommendations: ["Atenção a chuvas de verão", "Prepare casa para temporais", "Mantenha kit de emergência"],
      },
      8: {
        // RS
        level: "Alto",
        region: "Rio Grande do Sul",
        criticalRain: "35mm/h",
        alertTime: "5 horas",
        recommendations: [
          "Atenção especial no outono/inverno",
          "Monitore níveis de rios",
          "Prepare evacuação preventiva",
        ],
      },
      9: {
        // RS Interior
        level: "Médio",
        region: "Interior do RS",
        criticalRain: "60mm/h",
        alertTime: "8 horas",
        recommendations: ["Monitore condições climáticas", "Mantenha comunicação ativa", "Prepare plano familiar"],
      },
    }

    return (
      riskMap[firstDigit] || {
        level: "Baixo",
        region: "Região com baixo histórico",
        criticalRain: "80mm/h",
        alertTime: "12 horas",
        recommendations: [
          "Mantenha-se informado sobre condições locais",
          "Tenha plano básico de emergência",
          "Monitore alertas meteorológicos",
        ],
      }
    )
  }
}

// Inicializar novas funcionalidades
document.addEventListener("DOMContentLoaded", () => {
  // Aguardar um pouco para garantir que os elementos estejam carregados
  setTimeout(() => {
    new ChartManager()
    new RiskCalculator()
  }, 1000)

  console.log("💧 HidroSafe - Portal Completo carregado com todas as funcionalidades!")
})
