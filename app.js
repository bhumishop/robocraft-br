const { createApp } = Vue;

createApp({
  data() {
    return {
      activeSection: 'home',
      mobileMenuOpen: false,
      selectedRobot: null,
      selectedGuide: null,
      selectedTTS: null,

      robots: [
        {
          id: 'head-robot',
          title: 'Cabeça Humanóide com Olhos Animatrônicos',
          price: 'R$ 150–400',
          difficulty: 'Fácil',
          description: 'Cabeça falante com olhos que se movem, perfeita para templos budistas, centros culturais e recepcionistas. Usa kit de olhos animatrônicos pronto do Mercado Livre + Arduino.',
          parts: [
            { name: 'Kit Olhos Animatrônicos', price: 'R$ 60–120', link: 'https://lista.mercadolivre.com.br/olhos-animatronicos' },
            { name: 'Arduino Uno R3', price: 'R$ 35–60', link: 'https://lista.mercadolivre.com.br/arduino-uno-r3' },
            { name: 'PCA9685 Driver Servo', price: 'R$ 25–45', link: 'https://lista.mercadolivre.com.br/pca9685-servo' },
            { name: 'Servos SG90 (2–4x)', price: 'R$ 8–15 cada', link: 'https://lista.mercadolivre.com.br/servo-sg90' },
            { name: 'Módulo MP3 DFPlayer', price: 'R$ 20–35', link: 'https://lista.mercadolivre.com.br/dfplayer-mini' },
            { name: 'Alto-falante 3W 4Ω', price: 'R$ 8–15', link: 'https://lista.mercadolivre.com.br/alto-falante-3w' },
          ],
          useCases: ['Templos budistas', 'Centros culturais', 'Recepção', 'Museus interativos'],
          guide: 'head-robot'
        },
        {
          id: 'carro-2wd',
          title: 'Carro 2WD com Câmera e IA',
          price: 'R$ 200–350',
          difficulty: 'Médio',
          description: 'Chassi 2WD com câmera ESP32-CAM ou Raspberry Pi, controle via Wi-Fi, pode rodar IA local com DimOS. Base para projetos mais complexos.',
          parts: [
            { name: 'Chassi 2WD Arduino', price: 'R$ 40–70', link: 'https://lista.mercadolivre.com.br/chassi-2wd-arduino' },
            { name: 'ESP32-CAM', price: 'R$ 35–55', link: 'https://lista.mercadolivre.com.br/esp32-cam' },
            { name: 'L298N Driver Motor', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/l298n' },
            { name: 'Bateria 18650 (2x)', price: 'R$ 20–40', link: 'https://lista.mercadolivre.com.br/bateria-18650' },
            { name: 'Sensor Ultrassônico HC-SR04', price: 'R$ 10–18', link: 'https://lista.mercadolivre.com.br/hc-sr04' },
          ],
          useCases: ['Patrulhamento', 'Monitoramento remoto', 'Educação STEM', 'Competições'],
          guide: 'carro-2wd'
        },
        {
          id: 'esp32-cam',
          title: 'ESP32-CAM Ultra-Barato',
          price: 'R$ 35–55',
          difficulty: 'Fácil',
          description: 'A opção mais barata para visão computacional. Transmite vídeo em tempo real via Wi-Fi, pode rodar deteção de objetos com TensorFlow Lite.',
          parts: [
            { name: 'ESP32-CAM + FTDI', price: 'R$ 35–55', link: 'https://lista.mercadolivre.com.br/esp32-cam' },
            { name: 'MicroSD 8GB', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/microsd-8gb' },
            { name: 'Case Impresso 3D', price: 'R$ 5–15 (filamento)', link: 'https://www.thingiverse.com/search?q=esp32+cam+case' },
          ],
          useCases: ['Câmera de segurança', 'Monitoramento de plantas', 'Visão computacional', 'IoT'],
          guide: 'esp32-cam'
        },
      ],

      ttsProviders: [
        {
          id: 'edge-tts',
          name: 'Edge TTS (Microsoft)',
          type: 'cloud',
          free: true,
          quality: 'Alta',
          latency: 'Baixa',
          languages: 'pt-BR excelente',
          description: 'Gratuito, vozes naturais, fácil de usar. Melhor custo-benefício para projetos.',
          install: 'pip install edge-tts',
          example: `edge-tts --text "Olá, sou seu robô!" \\
  --voice pt-BR-FranciscaNeural \\
  --write-media fala.mp3`,
          link: 'https://github.com/rany2/edge-tts'
        },
        {
          id: 'gtts',
          name: 'gTTS (Google)',
          type: 'cloud',
          free: true,
          quality: 'Média',
          latency: 'Média',
          languages: 'pt-BR bom',
          description: 'Simples e gratuito. Usa a API do Google Translate. Ideal para protótipos rápidos.',
          install: 'pip install gTTS',
          example: `from gtts import gTTS
tts = gTTS("Olá, sou seu robô!", lang='pt-br')
tts.save("fala.mp3")`,
          link: 'https://gtts.readthedocs.io/'
        },
        {
          id: 'elevenlabs',
          name: 'ElevenLabs',
          type: 'cloud',
          free: true,
          quality: 'Ultra Alta',
          latency: 'Média',
          languages: 'pt-BR excelente',
          description: 'Vozes mais realistas do mercado. Plano gratuito com 10k caracteres/mês. Clone de voz disponível.',
          install: 'pip install elevenlabs',
          example: `from elevenlabs import generate, play
audio = generate(
  text="Olá, sou seu robô!",
  voice="Rachel",
  model="eleven_multilingual_v2"
)
play(audio)`,
          link: 'https://elevenlabs.io/'
        },
        {
          id: 'openai-tts',
          name: 'OpenAI TTS',
          type: 'cloud',
          free: false,
          quality: 'Alta',
          latency: 'Baixa',
          languages: 'pt-BR bom',
          description: '6 vozes disponíveis, streaming em tempo real. Custo: ~$15/1M caracteres.',
          install: 'pip install openai',
          example: `from openai import OpenAI
client = OpenAI()
resp = client.audio.speech.create(
  model="tts-1",
  voice="nova",
  input="Olá, sou seu robô!"
)
resp.stream_to_file("fala.mp3")`,
          link: 'https://platform.openai.com/docs/guides/text-to-speech'
        },
        {
          id: 'piper-tts',
          name: 'Piper TTS',
          type: 'local',
          free: true,
          quality: 'Alta',
          latency: 'Muito Baixa',
          languages: 'pt-BR disponível',
          description: '100% local, roda em Raspberry Pi! Neural TTS otimizado, <50ms de latência. Ideal para robôs autônomos.',
          install: `# Instalar via pip
pip install piper-tts

# Ou baixar binário
# https://github.com/rhasspy/piper`,
          example: `echo "Olá, sou seu robô!" | \\
  piper --model pt_BR-edresson \\
  --output_file fala.wav`,
          link: 'https://github.com/rhasspy/piper'
        },
        {
          id: 'coqui-tts',
          name: 'Coqui TTS',
          type: 'local',
          free: true,
          quality: 'Muito Alta',
          latency: 'Média',
          languages: 'pt-BR disponível',
          description: 'Framework open-source com modelos VITS e Tacotron. Pode treinar com sua voz!',
          install: 'pip install TTS',
          example: `from TTS.api import TTS
tts = TTS("tts_models/pt/crosslingual")
tts.tts_to_file(
  text="Olá, sou seu robô!",
  file_path="fala.wav"
)`,
          link: 'https://github.com/coqui-ai/TTS'
        },
        {
          id: 'espeak-ng',
          name: 'eSpeak NG',
          type: 'local',
          free: true,
          quality: 'Baixa (robótica)',
          latency: 'Instantânea',
          languages: 'pt-BR disponível',
          description: 'Ultra-leve, roda em qualquer microcontrolador. Voz robótica autêntica. Zero dependência de nuvem.',
          install: 'sudo apt install espeak-ng',
          example: `# Terminal direto
espeak-ng -v pt-br "Olá, sou seu robô!"

# Salvar em WAV
espeak-ng -v pt-br -w fala.wav \\
  "Olá, sou seu robô!"`,
          link: 'https://github.com/espeak-ng/espeak-ng'
        },
      ],

      shops: [
        {
          name: 'Mercado Livre',
          type: 'marketplace',
          url: 'https://www.mercadolivre.com.br',
          rating: 4.8,
          specialty: 'Tudo — melhor variedade e preço',
          highlights: ['Envio full 24h', 'Compra Protection', 'Mais de 50k sellers'],
          icon: 'ML'
        },
        {
          name: 'RoboCore',
          type: 'specialized',
          url: 'https://www.robocore.com',
          rating: 4.7,
          specialty: 'Robótica especializada — sensores, drivers, kits',
          highlights: ['Conteúdo educacional', 'Kits prontos', 'Suporte técnico'],
          icon: 'RC'
        },
        {
          name: 'FilipeFlop (WEG)',
          type: 'specialized',
          url: 'https://www.filipeflop.com',
          rating: 4.6,
          specialty: 'Arduino, Raspberry Pi, sensores, módulos',
          highlights: ['Frete grátis acima de R$ 150', 'Tutorial e projetos', 'Produtos testados'],
          icon: 'FF'
        },
        {
          name: 'Shopee Brasil',
          type: 'marketplace',
          url: 'https://shopee.com.br',
          rating: 4.3,
          specialty: 'Preços imbatíveis — importação direta',
          highlights: ['Preços 20-40% menores', 'Cupons de desconto', 'Demora: 15-30 dias'],
          icon: 'SP'
        },
        {
          name: 'Santa Ifigênia (SP)',
          type: 'physical',
          url: 'https://maps.app.goo.gl/SantaIfigenia',
          rating: 4.5,
          specialty: 'Loja física em SP — retirada imediata',
          highlights: ['Rua Santa Ifigênia, SP', 'Teste antes de comprar', 'Negociação direta'],
          icon: 'SI'
        },
        {
          name: 'Amazon Brasil',
          type: 'marketplace',
          url: 'https://www.amazon.com.br',
          rating: 4.7,
          specialty: 'Raspberry Pi, Alexa, componentes premium',
          highlights: ['Prime: entrega 1-2 dias', 'Produtos originais', 'Devolução fácil'],
          icon: 'AZ'
        },
      ],

      guides: [
        {
          id: 'head-robot',
          title: 'Montar Cabeça Humanóide Falante',
          steps: [
            {
              title: 'Montar os Olhos Animatrônicos',
              content: 'O kit já vem com suportes e servos. Monte conforme instruções do vendedor. Conecte 2 servos SG90: um para movimento horizontal (X) e outro para vertical (Y).',
              diagram: {
                type: 'servo-eye',
                components: [
                  { label: 'Servo X', pin: 'PWM 0', to: 'PCA9685 CH0' },
                  { label: 'Servo Y', pin: 'PWM 1', to: 'PCA9685 CH1' },
                  { label: 'PCA9685', pin: 'VCC', to: '5V Arduino' },
                  { label: 'PCA9685', pin: 'SDA/SCL', to: 'A4/A5 Arduino' },
                ]
              }
            },
            {
              title: 'Conectar Arduino + PCA9685',
              content: 'O PCA9685 permite controlar até 16 servos via I2C. Conecte SDA no A4 e SCL no A5 do Arduino. Alimente com 5V do Arduino ou fonte externa.',
              diagram: {
                type: 'wiring',
                components: [
                  { label: 'Arduino 5V', pin: '5V', to: 'PCA9685 VCC' },
                  { label: 'Arduino GND', pin: 'GND', to: 'PCA9685 GND' },
                  { label: 'Arduino A4', pin: 'SDA', to: 'PCA9685 SDA' },
                  { label: 'Arduino A5', pin: 'SCL', to: 'PCA9685 SCL' },
                ]
              }
            },
            {
              title: 'Adicionar Som com DFPlayer Mini',
              content: 'O DFPlayer Mini reproduz MP3 de um cartão MicroSD. Conecte RX/TX nos pinos D10/D11 do Arduino. Conecte o alto-falante 3W diretamente no DFPlayer.',
              diagram: {
                type: 'wiring',
                components: [
                  { label: 'Arduino D10', pin: 'TX', to: 'DFPlayer RX' },
                  { label: 'Arduino D11', pin: 'RX', to: 'DFPlayer TX' },
                  { label: 'DFPlayer SPK+', pin: 'SPK+', to: 'Alto-falante +' },
                  { label: 'DFPlayer SPK-', pin: 'SPK-', to: 'Alto-falante -' },
                ]
              }
            },
            {
              title: 'Programar com IA (Opcional)',
              content: 'Integre com DimOS + Modal GLM-5.1 para respostas inteligentes. Use Edge TTS ou Piper TTS para gerar fala local ou na nuvem.',
              code: `# Exemplo com Edge TTS + Arduino
import edge_tts
import serial

arduino = serial.Serial('/dev/ttyUSB0', 9600)

async def falar(texto):
    tts = edge_tts.Communicate(
        texto, "pt-BR-FranciscaNeural"
    )
    await tts.save("/tmp/fala.mp3")
    
    # Enviar comando para Arduino
    arduino.write(b"PLAY\\n")`,
            },
          ]
        },
        {
          id: 'carro-2wd',
          title: 'Montar Carro 2WD com Câmera IA',
          steps: [
            {
              title: 'Montar o Chassi',
              content: 'Monte o chassi 2WD com os motores DC e rodas. Instale a roda boba na frente. Fixe a placa L298N no chassi com parafusos ou fita dupla-face.',
              diagram: {
                type: 'wiring',
                components: [
                  { label: 'Motor Esquerdo', pin: 'M1+', to: 'L298N OUT1' },
                  { label: 'Motor Esquerdo', pin: 'M1-', to: 'L298N OUT2' },
                  { label: 'Motor Direito', pin: 'M2+', to: 'L298N OUT3' },
                  { label: 'Motor Direito', pin: 'M2-', to: 'L298N OUT4' },
                ]
              }
            },
            {
              title: 'Conectar L298N + Arduino',
              content: 'Conecte IN1-IN4 nos pinos digitais do Arduino (17, 18, 22, 23 para Raspberry Pi). Alimente o L298N com bateria 18650 (7.4V).',
              diagram: {
                type: 'wiring',
                components: [
                  { label: 'Arduino D17', pin: 'PWM', to: 'L298N IN1' },
                  { label: 'Arduino D18', pin: 'PWM', to: 'L298N IN2' },
                  { label: 'Arduino D22', pin: 'PWM', to: 'L298N IN3' },
                  { label: 'Arduino D23', pin: 'PWM', to: 'L298N IN4' },
                  { label: 'Bateria 7.4V', pin: '+', to: 'L298N 12V' },
                  { label: 'Bateria 7.4V', pin: '-', to: 'L298N GND' },
                ]
              }
            },
            {
              title: 'Configurar ESP32-CAM',
              content: 'Flash o firmware CameraWebServer do Arduino IDE. Acesse pelo navegador para ver o stream em tempo real. Configure Wi-Fi.',
              code: `# Código DimOS para integrar câmera + IA
from dimos.robots.unitree.go2.blueprints.agentic import unitree_go2_agentic_modal

# Ou para seu carro 2WD:
from meu_robot.my_robot_2wd import robot_2wd

blueprint = robot_2wd(
    camera_url="http://192.168.1.100:81/stream",
    agent="modal",
)`,
            },
          ]
        },
      ],

      sections: [
        { id: 'home', label: 'Início', icon: '⌂' },
        { id: 'robots', label: 'Robôs', icon: '⚙' },
        { id: 'tts', label: 'Voz/TTS', icon: '🔊' },
        { id: 'guides', label: 'Guias', icon: '📖' },
        { id: 'shops', label: 'Lojas', icon: '🛒' },
        { id: 'dimos', label: 'DimOS', icon: '🧠' },
      ]
    };
  },

  computed: {
    filteredTTS() {
      return {
        cloud: this.ttsProviders.filter(t => t.type === 'cloud'),
        local: this.ttsProviders.filter(t => t.type === 'local'),
      };
    }
  },

  methods: {
    scrollTo(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.mobileMenuOpen = false;
      }
    },

    openRobot(robot) {
      this.selectedRobot = robot;
      this.scrollTo('robot-detail');
    },

    openGuide(guide) {
      this.selectedGuide = guide;
      this.scrollTo('guide-detail');
    },

    openTTS(tts) {
      this.selectedTTS = tts;
      this.scrollTo('tts-detail');
    },

    closeRobot() {
      this.selectedRobot = null;
    },

    closeGuide() {
      this.selectedGuide = null;
    },

    closeTTS() {
      this.selectedTTS = null;
    },

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },

    copyCode(code) {
      navigator.clipboard.writeText(code).catch(() => {});
    },

    formatPrice(price) {
      return price;
    },

    getRatingStars(rating) {
      return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    }
  },

  mounted() {
    // Scroll spy
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    // Close mobile menu on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        this.mobileMenuOpen = false;
      }
    });
  },

  template: `
    <div id="app">
      <!-- Mobile Menu Overlay -->
      <div class="mobile-overlay" :class="{ active: mobileMenuOpen }" @click="toggleMobileMenu"></div>

      <!-- Navigation -->
      <nav class="navbar">
        <div class="nav-inner">
          <a class="logo" @click.prevent="scrollTo('home')">
            <span class="logo-icon">⚡</span>
            <span class="logo-text">RoboCraft BR</span>
          </a>

          <button class="menu-toggle" @click="toggleMobileMenu" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>

          <ul class="nav-links" :class="{ active: mobileMenuOpen }">
            <li v-for="s in sections" :key="s.id">
              <a :class="{ active: activeSection === s.id }"
                 @click.prevent="scrollTo(s.id)">
                {{ s.icon }} {{ s.label }}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- HERO -->
      <section id="home" class="hero">
        <div class="hero-bg"></div>
        <div class="hero-content">
          <h1>Monte seu Robô com IA <span class="gradient-text">no Brasil</span></h1>
          <p>Guia completo com peças baratas do Mercado Livre, TTS local e na nuvem, integração com DimOS e Modal GLM-5.1. Do protótipo de R$ 35 ao robô completo de R$ 400.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" @click.prevent="scrollTo('robots')">Ver Robôs</a>
            <a class="btn btn-outline" @click.prevent="scrollTo('tts')">Voz/TTS</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><strong>3+</strong> Projetos</div>
            <div class="stat"><strong>7</strong> Opções de Voz</div>
            <div class="stat"><strong>6</strong> Lojas</div>
          </div>
        </div>
      </section>

      <!-- ROBOTS -->
      <section id="robots" class="section">
        <div class="container">
          <h2 class="section-title">Escolha seu Robô</h2>
          <p class="section-sub">Do mais simples ao mais completo — todos com peças do Mercado Livre</p>

          <div class="robots-grid">
            <div v-for="robot in robots" :key="robot.id" class="robot-card" @click="openRobot(robot)">
              <div class="robot-header">
                <span class="robot-icon">🤖</span>
                <span class="robot-difficulty">{{ robot.difficulty }}</span>
              </div>
              <h3>{{ robot.title }}</h3>
              <p>{{ robot.description }}</p>
              <div class="robot-footer">
                <span class="robot-price">{{ robot.price }}</span>
                <span class="robot-link">Ver detalhes →</span>
              </div>
            </div>
          </div>

          <!-- Robot Detail -->
          <div v-if="selectedRobot" id="robot-detail" class="robot-detail">
            <button class="back-btn" @click="closeRobot">← Voltar</button>
            <h3>{{ selectedRobot.title }}</h3>

            <h4>Lista de Peças (BOM)</h4>
            <table class="bom-table">
              <thead>
                <tr><th>Peça</th><th>Preço</th><th>Link</th></tr>
              </thead>
              <tbody>
                <tr v-for="(part, i) in selectedRobot.parts" :key="i">
                  <td>{{ part.name }}</td>
                  <td>{{ part.price }}</td>
                  <td><a :href="part.link" target="_blank" rel="noopener">Mercado Livre ↗</a></td>
                </tr>
              </tbody>
            </table>

            <h4>Casos de Uso</h4>
            <div class="use-cases">
              <span v-for="uc in selectedRobot.useCases" :key="uc" class="uc-tag">{{ uc }}</span>
            </div>

            <a class="btn btn-primary" @click.prevent="openGuide(guides.find(g => g.id === selectedRobot.guide))"
               v-if="selectedRobot.guide">
              Ver Guia de Montagem
            </a>
          </div>
        </div>
      </section>

      <!-- TTS -->
      <section id="tts" class="section">
        <div class="container">
          <h2 class="section-title">Voz / TTS — Fala do Robô</h2>
          <p class="section-sub">Escolha entre TTS na nuvem (gratuito ou pago) ou 100% local (sem internet)</p>

          <!-- Cloud TTS -->
          <h3 class="subsection-title">☁️ TTS na Nuvem</h3>
          <div class="tts-grid">
            <div v-for="tts in filteredTTS.cloud" :key="tts.id" class="tts-card" @click="openTTS(tts)">
              <div class="tts-header">
                <h4>{{ tts.name }}</h4>
                <span class="tts-badge" :class="tts.free ? 'free' : 'paid'">{{ tts.free ? 'Gratuito' : 'Pago' }}</span>
              </div>
              <p>{{ tts.description }}</p>
              <div class="tts-specs">
                <span>Qualidade: <strong>{{ tts.quality }}</strong></span>
                <span>Latência: <strong>{{ tts.latency }}</strong></span>
                <span>{{ tts.languages }}</span>
              </div>
              <code class="tts-code">{{ tts.install }}</code>
            </div>
          </div>

          <!-- Local TTS -->
          <h3 class="subsection-title">🏠 TTS Local (sem internet)</h3>
          <div class="tts-grid">
            <div v-for="tts in filteredTTS.local" :key="tts.id" class="tts-card" @click="openTTS(tts)">
              <div class="tts-header">
                <h4>{{ tts.name }}</h4>
                <span class="tts-badge local">Local</span>
              </div>
              <p>{{ tts.description }}</p>
              <div class="tts-specs">
                <span>Qualidade: <strong>{{ tts.quality }}</strong></span>
                <span>Latência: <strong>{{ tts.latency }}</strong></span>
                <span>{{ tts.languages }}</span>
              </div>
              <code class="tts-code">{{ tts.install }}</code>
            </div>
          </div>

          <!-- TTS Detail -->
          <div v-if="selectedTTS" id="tts-detail" class="tts-detail">
            <button class="back-btn" @click="closeTTS">← Voltar</button>
            <h3>{{ selectedTTS.name }}</h3>
            <p>{{ selectedTTS.description }}</p>
            
            <h4>Instalação</h4>
            <div class="code-block">
              <pre><code>{{ selectedTTS.install }}</code></pre>
              <button class="copy-btn" @click="copyCode(selectedTTS.install)">Copiar</button>
            </div>

            <h4>Exemplo de Uso</h4>
            <div class="code-block">
              <pre><code>{{ selectedTTS.example }}</code></pre>
              <button class="copy-btn" @click="copyCode(selectedTTS.example)">Copiar</button>
            </div>

            <a :href="selectedTTS.link" target="_blank" rel="noopener" class="btn btn-outline">
              Documentação ↗
            </a>
          </div>

          <!-- TTS Comparison -->
          <h3 class="subsection-title">📊 Comparação Rápida</h3>
          <table class="bom-table">
            <thead>
              <tr><th>TTS</th><th>Tipo</th><th>Qualidade</th><th>Latência</th><th>Preço</th></tr>
            </thead>
            <tbody>
              <tr v-for="tts in ttsProviders" :key="tts.id">
                <td><strong>{{ tts.name }}</strong></td>
                <td>{{ tts.type === 'cloud' ? 'Nuvem' : 'Local' }}</td>
                <td>{{ tts.quality }}</td>
                <td>{{ tts.latency }}</td>
                <td>{{ tts.free ? 'Grátis' : 'Pago' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- GUIDES -->
      <section id="guides" class="section">
        <div class="container">
          <h2 class="section-title">Guias de Montagem</h2>
          <p class="section-sub">Passo a passo completo com diagramas de fiação</p>

          <div class="guides-list">
            <div v-for="guide in guides" :key="guide.id" class="guide-card" @click="openGuide(guide)">
              <span class="guide-icon">📖</span>
              <h3>{{ guide.title }}</h3>
              <p>{{ guide.steps.length }} passos</p>
            </div>
          </div>

          <!-- Guide Detail -->
          <div v-if="selectedGuide" id="guide-detail" class="guide-detail">
            <button class="back-btn" @click="closeGuide">← Voltar</button>
            <h3>{{ selectedGuide.title }}</h3>

            <div v-for="(step, i) in selectedGuide.steps" :key="i" class="step">
              <div class="step-header">
                <span class="step-num">{{ i + 1 }}</span>
                <h4>{{ step.title }}</h4>
              </div>
              <p>{{ step.content }}</p>

              <!-- Wiring Diagram -->
              <div v-if="step.diagram" class="wiring-diagram">
                <div v-for="(conn, j) in step.diagram.components" :key="j" class="wire">
                  <span class="pin from">{{ conn.label }}</span>
                  <span class="pin-label">{{ conn.pin }}</span>
                  <span class="wire-line">━━━</span>
                  <span class="pin-label">{{ conn.to }}</span>
                </div>
              </div>

              <!-- Code Block -->
              <div v-if="step.code" class="code-block">
                <pre><code>{{ step.code }}</code></pre>
                <button class="copy-btn" @click="copyCode(step.code)">Copiar</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SHOPS -->
      <section id="shops" class="section">
        <div class="container">
          <h2 class="section-title">Lojas Recomendadas</h2>
          <p class="section-sub">Onde comprar peças de robótica no Brasil com melhor preço e confiança</p>

          <div class="shops-grid">
            <div v-for="shop in shops" :key="shop.name" class="shop-card">
              <div class="shop-header">
                <span class="shop-icon">{{ shop.icon }}</span>
                <div>
                  <h4>{{ shop.name }}</h4>
                  <span class="shop-type" :class="shop.type">{{ shop.type === 'marketplace' ? 'Marketplace' : shop.type === 'specialized' ? 'Especializada' : 'Física' }}</span>
                </div>
              </div>
              <p class="shop-rating">{{ getRatingStars(shop.rating) }} <strong>{{ shop.rating }}</strong></p>
              <p class="shop-specialty">{{ shop.specialty }}</p>
              <ul class="shop-highlights">
                <li v-for="h in shop.highlights" :key="h">✓ {{ h }}</li>
              </ul>
              <a :href="shop.url" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Visitar ↗</a>
            </div>
          </div>
        </div>
      </section>

      <!-- DIMOS -->
      <section id="dimos" class="section">
        <div class="container">
          <h2 class="section-title">Integração com DimOS</h2>
          <p class="section-sub">Conecte seu robô com IA usando DimOS + Modal GLM-5.1</p>

          <div class="dimos-features">
            <div class="feature">
              <span class="feature-icon">🧠</span>
              <h4>IA na Nuvem via Modal</h4>
              <p>Use GLM-5.1-FP8 via OpenAI-compatible API. Respostas inteligentes em português.</p>
            </div>
            <div class="feature">
              <span class="feature-icon">🔊</span>
              <h4>TTS Integrado</h4>
              <p>Combine com Edge TTS, Piper ou ElevenLabs para fala natural.</p>
            </div>
            <div class="feature">
              <span class="feature-icon">📹</span>
              <h4>Visão Computacional</h4>
              <p>ESP32-CAM, Raspberry Pi Camera ou webcam USB com detecção de objetos.</p>
            </div>
            <div class="feature">
              <span class="feature-icon">🔌</span>
              <h4>Modular e Extensível</h4>
              <p>Adicione sensores, atuadores e novos agentes sem refazer o código.</p>
            </div>
          </div>

          <div class="code-block">
            <h4>Exemplo: Agente DimOS para seu Robô</h4>
            <pre><code id="dimos-code"># Instale DimOS
pip install uv
uv pip install dimos

# Configure Modal GLM-5.1
# No .env:
MODAL_API_KEY=sua_chave_aqui

# Use o agente:
from dimos.agents.modal_agent import agent

meu_agente = agent()
# Conecte ao seu robô 2WD ou cabeça humanóide</code></pre>
            <button class="copy-btn" @click="copyCode(document.querySelector('#dimos-code')?.textContent || '')">Copiar</button>
          </div>

          <a href="https://github.com/dimensionalOS/dimos" target="_blank" rel="noopener" class="btn btn-primary">
            DimOS no GitHub ↗
          </a>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="footer">
        <p>RoboCraft BR — Guia Open Source para montar robôs com IA no Brasil 🇧🇷</p>
        <p>Feito com Vue 3 • Deploy via GitHub Pages • UI AMOLED Futurista</p>
        <p>
          <a href="https://github.com/dimensionalOS/dimos" target="_blank" rel="noopener">DimOS</a> •
          <a href="https://modal.com" target="_blank" rel="noopener">Modal</a> •
          <a href="https://www.mercadolivre.com.br" target="_blank" rel="noopener">Mercado Livre</a>
        </p>
      </footer>
    </div>
  `
}).mount('#app');
