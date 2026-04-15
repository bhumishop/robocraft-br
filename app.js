const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    const currentStep = ref(0);
    const totalSteps = 5;
    const selectedRobot = ref(null);
    const selectedTTS = ref(null);
    const selectedGuide = ref(null);
    const mobileMenuOpen = ref(false);
    const scrollProgress = ref(0);
    const activeGuideStep = ref(0);

    const steps = [
      { id: 'start', label: 'Início', route: '/' },
      { id: 'robot', label: 'Robô', route: '/robot' },
      { id: 'tts', label: 'Voz', route: '/tts' },
      { id: 'guides', label: 'Guias', route: '/guides' },
      { id: 'shops', label: 'Lojas', route: '/shops' },
      { id: 'dimos', label: 'DimOS', route: '/dimos' },
    ];

    const robots = [
      {
        id: 'head-humanoid',
        title: 'Cabeça Humanóide com Olhos Animatrônicos',
        price: 'R$ 150–400',
        difficulty: 'easy',
        time: '4–6 horas',
        description: 'Cabeça falante com olhos que se movem. Ideal para templos budistas, recepcionistas e museus interativos. Usa kit de olhos animatrônicos + Arduino.',
        parts: [
          { name: 'Kit Olhos Animatrônicos', price: 'R$ 60–120', link: 'https://lista.mercadolivre.com.br/olhos-animatronicos', qty: 1 },
          { name: 'Arduino Uno R3', price: 'R$ 35–60', link: 'https://lista.mercadolivre.com.br/arduino-uno-r3', qty: 1 },
          { name: 'PCA9685 Driver Servo 16ch', price: 'R$ 25–45', link: 'https://lista.mercadolivre.com.br/pca9685-servo', qty: 1 },
          { name: 'Servos SG90', price: 'R$ 8–15 cada', link: 'https://lista.mercadolivre.com.br/servo-sg90', qty: 4 },
          { name: 'DFPlayer Mini MP3', price: 'R$ 20–35', link: 'https://lista.mercadolivre.com.br/dfplayer-mini', qty: 1 },
          { name: 'Alto-falante 3W 4Ω', price: 'R$ 8–15', link: 'https://lista.mercadolivre.com.br/alto-falante-3w', qty: 1 },
          { name: 'Cartão MicroSD 8GB', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/microsd-8gb', qty: 1 },
          { name: 'Fonte 5V 2A', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/fonte-5v-2a', qty: 1 },
        ],
        useCases: ['Templos budistas', 'Centros culturais', 'Recepção', 'Museus interativos', 'Apresentações'],
        pinout: {
          arduino: { sda: 'A4', scl: 'A5', d10: 'D10', d11: 'D11', vcc: '5V', gnd: 'GND' },
          pca9685: { vcc: 'VCC', gnd: 'GND', scl: 'SCL', sda: 'SDA' },
          dfplayer: { tx: 'D11', rx: 'D10', spk+: 'SPK+', spk-: 'SPK-' },
        },
        guide: 'head-humanoid'
      },
      {
        id: 'carro-2wd',
        title: 'Carro 2WD com Câmera e IA',
        price: 'R$ 200–350',
        difficulty: 'medium',
        time: '6–8 horas',
        description: 'Chassi 2WD com câmera ESP32-CAM. Controle Wi-Fi, pode rodar IA local com DimOS. Base para projetos de patrulhamento.',
        parts: [
          { name: 'Chassi 2WD Arduino', price: 'R$ 40–70', link: 'https://lista.mercadolivre.com.br/chassi-2wd-arduino', qty: 1 },
          { name: 'ESP32-CAM', price: 'R$ 35–55', link: 'https://lista.mercadolivre.com.br/esp32-cam', qty: 1 },
          { name: 'Módulo FTDI USB', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/ftdi-usb', qty: 1 },
          { name: 'L298N Driver Motor', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/l298n', qty: 1 },
          { name: 'Bateria 18650', price: 'R$ 10–20 cada', link: 'https://lista.mercadolivre.com.br/bateria-18650', qty: 2 },
          { name: 'Suporte bateria 18650', price: 'R$ 8–15', link: 'https://lista.mercadolivre.com.br/suporte-18650', qty: 1 },
          { name: 'HC-SR04 Ultrassônico', price: 'R$ 10–18', link: 'https://lista.mercadolivre.com.br/hc-sr04', qty: 1 },
          { name: 'Jumpers Macho-Macho', price: 'R$ 5–10', link: 'https://lista.mercadolivre.com.br/jumpers', qty: 1 },
        ],
        useCases: ['Patrulhamento', 'Monitoramento remoto', 'Educação STEM', 'Competições', 'Exploração'],
        pinout: {
          l298n: { in1: 'D8', in2: 'D9', in3: 'D10', in4: 'D11', vcc: '12V', gnd: 'GND' },
          esp32: { u0t: 'TX', u0r: 'RX', gpio0: 'GPIO0', enable: 'EN' },
        },
        guide: 'carro-2wd'
      },
      {
        id: 'esp32-cam',
        title: 'ESP32-CAM Visão Computacional',
        price: 'R$ 35–55',
        difficulty: 'easy',
        time: '1–2 horas',
        description: 'Módulo de visão mais barato. Stream via Wi-Fi, TensorFlow Lite para detecção de objetos. Ideal para vigilância e IoT.',
        parts: [
          { name: 'ESP32-CAM AI-Thinker', price: 'R$ 35–55', link: 'https://lista.mercadolivre.com.br/esp32-cam', qty: 1 },
          { name: 'Módulo FTDI USB', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/ftdi-usb', qty: 1 },
          { name: 'MicroSD 8GB', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/microsd-8gb', qty: 1 },
          { name: 'Case Impresso 3D', price: 'R$ 5–15', link: 'https://www.thingiverse.com/search?q=esp32+cam+case', qty: 1 },
        ],
        useCases: ['Câmera segurança', 'Monitoramento plantas', 'Visão computacional', 'IoT', 'Projetos STEM'],
        pinout: {
          ftdi: { vcc: '5V', gnd: 'GND', tx: 'RX', rx: 'TX' },
          esp32: { u0t: 'U0T', u0r: 'U0R', gpio0: 'GPIO0', enable: 'EN' },
        },
        guide: 'esp32-cam'
      },
      {
        id: 'braitenberg',
        title: 'Robô Braitenberg V2',
        price: 'R$ 80–150',
        difficulty: 'easy',
        time: '2–3 horas',
        description: 'Robô reativo baseado em sensores de luz. Segue fontes de luz automaticamente. Conceito clásico de IA em hardware.',
        parts: [
          { name: 'Chassi 2WD', price: 'R$ 40–70', link: 'https://lista.mercadolivre.com.br/chassi-2wd-arduino', qty: 1 },
          { name: 'Arduino Uno', price: 'R$ 35–60', link: 'https://lista.mercadolivre.com.br/arduino-uno-r3', qty: 1 },
          { name: 'L298N Driver', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/l298n', qty: 1 },
          { name: 'LDR (2x)', price: 'R$ 2–5 cada', link: 'https://lista.mercadolivre.com.br/ldr', qty: 2 },
          { name: 'Bateria 9V', price: 'R$ 10–20', link: 'https://lista.mercadolivre.com.br/bateria-9v', qty: 1 },
        ],
        useCases: ['Educação', 'Demonstrações', 'Competições básicas', 'Feiras de ciência'],
        guide: 'braitenberg'
      },
      {
        id: 'braco-servo',
        title: 'Braço Robótico 4DOF',
        price: 'R$ 200–350',
        difficulty: 'hard',
        time: '8–12 horas',
        description: 'Braço robótico com 4 graus de liberdade. Controle por joystick ou código. ParaPick and place.',
        parts: [
          { name: 'Servos MG996R (4x)', price: 'R$ 15–25 cada', link: 'https://lista.servos-mg996r', qty: 4 },
          { name: 'Arduino Mega', price: 'R$ 50–80', link: 'https://lista.mercadolivre.com.br/arduino-mega', qty: 1 },
          { name: 'PCA9685 Driver', price: 'R$ 25–45', link: 'https://lista.mercadolivre.com.br/pca9685-servo', qty: 1 },
          { name: 'Joystick PS2', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/joystick-ps2', qty: 1 },
          { name: 'Estrutura Acrílico', price: 'R$ 30–50', link: 'https://lista.mercadolivre.com.br/kit-braço-robótico', qty: 1 },
          { name: 'Fonte 5V 3A', price: 'R$ 20–35', link: 'https://lista.mercadolivre.com.br/fonte-5v-3a', qty: 1 },
        ],
        useCases: ['Pick and place', 'Educação', 'Pesquisa', 'Competições'],
        guide: 'braco-servo'
      },
      {
        id: 'line-follower',
        title: 'Robô Seguidor de Linha',
        price: 'R$ 100–200',
        difficulty: 'easy',
        time: '3–4 horas',
        description: 'Robô que segue linha no chão usando sensores IR. Perfeito para competições e educação.',
        parts: [
          { name: 'Chassi 2WD', price: 'R$ 40–70', link: 'https://lista.mercadolivre.com.br/chassi-2wd-arduino', qty: 1 },
          { name: 'Arduino Uno', price: 'R$ 35–60', link: 'https://lista.mercadolivre.com.br/arduino-uno-r3', qty: 1 },
          { name: 'L298N Driver', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/l298n', qty: 1 },
          { name: 'Sensor IR QTR-8RC (5x)', price: 'R$ 20–35', link: 'https://lista.mercadolivre.com.br/sensor-ir-qtr', qty: 1 },
          { name: 'Bateria 18650 (2x)', price: 'R$ 20–40', link: 'https://lista.mercadolivre.com.br/bateria-18650', qty: 1 },
        ],
        useCases: ['Competições', 'Educação', 'Feiras de ciência', 'Robótica básica'],
        guide: 'line-follower'
      },
      {
        id: 'esp32-home',
        title: 'ESP32 Smart Home',
        price: 'R$ 50–100',
        difficulty: 'easy',
        time: '2–3 horas',
        description: 'Controle de dispositivos domésticos via Wi-Fi. Relay, sensor temperatura, automação residencial.',
        parts: [
          { name: 'ESP32 DevKit', price: 'R$ 25–40', link: 'https://lista.mercadolivre.com.br/esp32-devkit', qty: 1 },
          { name: 'Módulo Relay 5V', price: 'R$ 10–20', link: 'https://lista.mercadolivre.com.br/modulo-relay-5v', qty: 1 },
          { name: 'DHT22 Sensor', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/dht22', qty: 1 },
          { name: 'Jumpers', price: 'R$ 5–10', link: 'https://lista.mercadolivre.com.br/jumpers', qty: 1 },
        ],
        useCases: ['Automação residencial', 'Monitoramento', 'IoT', 'Controle远程'],
        guide: 'esp32-home'
      },
      {
        id: 'robot-tank',
        title: 'Robot Tank Tread',
        price: 'R$ 150–250',
        difficulty: 'medium',
        time: '5–6 horas',
        description: 'Robô com esteiras para terrenos irregulares. Usa motores TT, controle PWM, sensor ultrasonic.',
        parts: [
          { name: 'Chassi Tank', price: 'R$ 50–80', link: 'https://lista.mercadolivre.com.br/chassi-tank', qty: 1 },
          { name: 'Motores TT (2x)', price: 'R$ 20–35 cada', link: 'https://lista.mercadolivre.com.br/motor-tt', qty: 2 },
          { name: 'L298N Driver', price: 'R$ 15–25', link: 'https://lista.mercadolivre.com.br/l298n', qty: 1 },
          { name: 'Arduino Mega', price: 'R$ 50–80', link: 'https://lista.mercadolivre.com.br/arduino-mega', qty: 1 },
          { name: 'HC-SR04', price: 'R$ 10–18', link: 'https://lista.mercadolivre.com.br/hc-sr04', qty: 1 },
        ],
        useCases: ['Terrenos irregulares', 'Exploração outdoor', 'Robô de resgate'],
        guide: 'robot-tank'
      },
    ];

    const ttsProviders = [
      {
        id: 'edge-tts',
        name: 'Edge TTS',
        type: 'cloud',
        free: true,
        quality: 'Alta',
        latency: 'Baixa',
        languages: 'pt-BR excelente',
        voices: 'pt-BR-FranciscaNeural, pt-BR-AntonioNeural',
        description: 'Gratuito, vozes neurais naturais. Melhor custo-benefício para português.',
        install: 'pip install edge-tts',
        example: `edge-tts --text "Olá, sou seu robô!" --voice pt-BR-FranciscaNeural --write-media fala.mp3`,
        api: `import edge_tts
import asyncio

async def generate(texto, voice="pt-BR-FranciscaNeural"):
    tts = edge_tts.Communicate(texto, voice)
    await tts.save("fala.mp3")

asyncio.run(generate("Olá! Sou seu robô."))`,
        link: 'https://github.com/rany2/edge-tts'
      },
      {
        id: 'gtts',
        name: 'gTTS',
        type: 'cloud',
        free: true,
        quality: 'Média',
        latency: 'Média',
        languages: 'pt-BR bom',
        voices: 'pt-br',
        description: 'Simples e gratuito. Usa API Google Translate. Ideal para protótipos.',
        install: 'pip install gtts',
        example: `gtts-cli -v pt-br "Olá" -o fala.mp3`,
        api: `from gtts import gTTS
tts = gTTS("Olá!", lang='pt-br')
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
        voices: 'Rachel, Josh, Arnold + custom',
        description: 'Vozes mais realistas do mercado. Plano grátis 10k caracteres/mês. Voice cloning disponível.',
        install: 'pip install elevenlabs',
        example: `elevenlabs-tts "Olá" -v Rachel -o fala.mp3`,
        api: `from elevenlabs import generate, play, save
audio = generate(
  text="Olá! Sou seu robô.",
  voice="Rachel",
  model="eleven_multilingual_v2"
)
save(audio, "fala.mp3")
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
        voices: 'alloy, echo, fable, nova, shimmer',
        description: '6 vozes disponíveis, streaming em tempo real. Custo ~$15/1M caracteres.',
        install: 'pip install openai',
        example: `openai audio create -t "Olá" -v nova -m tts-1 -o fala.mp3`,
        api: `from openai import OpenAI
client = OpenAI()
response = client.audio.speech.create(
  model="tts-1",
  voice="nova",
  input="Olá! Sou seu robô."
)
response.stream_to_file("fala.mp3")`,
        pricing: '$15/1M caracteres',
        link: 'https://platform.openai.com/docs/guides/text-to-speech'
      },
      {
        id: 'piper-tts',
        name: 'Piper TTS',
        type: 'local',
        free: true,
        quality: 'Alta',
        latency: '<50ms',
        languages: 'pt-BR disponível',
        voices: 'pt_BR-edresson',
        description: '100% local, Neural TTS, roda em Raspberry Pi. Ideal para robôs autônomos.',
        install: `pip install piper-tts
# Baixar modelo: https://rhasspy.net/files/piper/pt_BR-edresson/`,
        example: `echo "Olá" | piper --model pt_BR-edresson --output_file fala.wav`,
        api: `from piper_tts import PiperVoice
voice = PiperVoice.load("pt_BR-edresson.onnx")
audio = voice.speak("Olá! Sou seu robô.")
with open("fala.wav", "wb") as f:
    f.write(audio)`,
        link: 'https://github.com/rhasspy/piper'
      },
      {
        id: 'coqui-tts',
        name: 'Coqui TTS',
        type: 'local',
        free: true,
        quality: 'Muito Alta',
        latency: 'Média-Alta',
        languages: 'pt-BR disponível',
        voices: 'multiplas',
        description: 'Open-source com modelos VITS/Tacotron. Pode treinar com sua voz!',
        install: `pip install TTS
# Download modelo:
tts --model_name pt/crosslingual`,
        api: `from TTS.api import TTS
tts = TTS("tts_models/pt/crosslingual")
tts.tts_to_file(
  text="Olá! Sou seu robô.",
  file_path="fala.wav"
)`,
        requirements: 'GPU recomendada para speed',
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
        voices: 'pt-br',
        description: 'Ultra-leve, roda em qualquer microcontrolador (Arduino, ESP32). Voz robótica autêntica.',
        install: 'sudo apt install espeak-ng',
        example: `espeak-ng -v pt-br "Olá, sou seu robô!"`,
        api: `import subprocess
subprocess.run(["espeak-ng", "-v", "pt-br", "-w", "fala.wav", "Olá!"])`,
        link: 'https://github.com/espeak-ng/espeak-ng'
      },
      {
        id: 'mimic3',
        name: 'Mimic3 TTS',
        type: 'local',
        free: true,
        quality: 'Alta',
        latency: 'Média',
        languages: 'pt-BR disponível',
        voices: 'mimic3',
        description: 'Baseado em Mozilla TTS. Rápido e open-source.',
        install: `pip install mimic3
# Baixar vozes:
mimic3 --download-voice pt_BR`,
        api: `from mimic3 import Mimic3
tts = Mimic3()
tts.speak("Olá! Sou seu robô.")`,
        link: 'https://github.com/Coeur/ai voice3'
      },
    ];

    const shops = [
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
        specialty: 'Robótica — sensores, drivers, kits',
        highlights: ['Conteúdo educacional', 'Kits prontos', 'Suporte técnico'],
        icon: 'RC'
      },
      {
        name: 'FilipeFlop',
        type: 'specialized',
        url: 'https://www.filipeflop.com',
        rating: 4.6,
        specialty: 'Arduino, Raspberry Pi, sensores',
        highlights: ['Frete grátis R$ 150', 'Tutorial e projetos', 'Produtos testados'],
        icon: 'FF'
      },
      {
        name: 'Shopee Brasil',
        type: 'marketplace',
        url: 'https://shopee.com.br',
        rating: 4.3,
        specialty: 'Preços 20-40% menores',
        highlights: ['Cupons desconto', 'Demora 15-30 dias', 'Importação direta'],
        icon: 'SP'
      },
      {
        name: 'Santa Ifigênia',
        type: 'physical',
        url: 'https://maps.app.goo.gl/SantaIfigenia',
        rating: 4.5,
        specialty: 'Loja física em SP',
        highlights: ['Rua Santa Ifigênia SP', 'Teste antes de comprar', 'Negociação direta'],
        icon: 'SI'
      },
      {
        name: 'Amazon Brasil',
        type: 'marketplace',
        url: 'https://www.amazon.com.br',
        rating: 4.7,
        specialty: 'Raspberry Pi, componentes premium',
        highlights: ['Prime 1-2 dias', 'Produtos originais', 'Devolução fácil'],
        icon: 'AZ'
      },
    ];

    const guides = [
      {
        id: 'head-humanoid',
        title: 'Montar Cabeça Humanóide Falante',
        difficulty: 'Fácil',
        time: '4–6 horas',
        overview: 'Este guia ensina como montar uma cabeça humanóide com olhos animatrônicos que se movem e fala sintetizada. Usa Arduino + PCA9685 para controle de servos e DFPlayer para áudio.',
        sections: [
          {
            title: '1. Montar os Olhos Animatrônicos',
            content: `O kit de olhos animatrônicos já vem com os suportes e servos. Monte conforme instruções do vendedor.

Conecte 2 servos SG90:
- Servo X: movimento horizontal (esquerda/direita)
- Servo Y: movimento vertical (cima/baixo)

Os servos SG90 usam sinal PWM. O PCA9685 gera sinais PWM para até 16 servos.`,
            diagram: [
              { from: 'Servo Olho X', pin: 'Amarelo (Sinal)', to: 'PCA9685 CH0' },
              { from: 'Servo Olho X', pin: 'Vermelho (VCC)', to: '5V Arduino' },
              { from: 'Servo Olho X', pin: 'Preto (GND)', to: 'GND Arduino' },
              { from: 'Servo Olho Y', pin: 'Amarelo (Sinal)', to: 'PCA9685 CH1' },
              { from: 'Servo Olho Y', pin: 'Vermelho (VCC)', to: '5V Arduino' },
              { from: 'Servo Olho Y', pin: 'Preto (GND)', to: 'GND Arduino' },
            ]
          },
          {
            title: '2. Conexão Arduino + PCA9685',
            content: `O PCA9685 é um driver PWM controlado via I2C. Permite controlar até 16 servos com apenas 2 pinos do Arduino.

Conexões I2C:
- SDA do PCA9685 → pino A4 do Arduino
- SCL do PCA9685 → pino A5 do Arduino
- VCC do PCA9685 → 5V do Arduino
- GND do PCA9685 → GND do Arduino`,
            diagram: [
              { from: 'Arduino A4', pin: 'SDA', to: 'PCA9685 SDA' },
              { from: 'Arduino A5', pin: 'SCL', to: 'PCA9685 SCL' },
              { from: 'Arduino 5V', pin: 'VCC', to: 'PCA9685 VCC' },
              { from: 'Arduino GND', pin: 'GND', to: 'PCA9685 GND' },
            ]
          },
          {
            title: '3. Sistema de Áudio com DFPlayer',
            content: `O DFPlayer Mini reproduz arquivos MP3 de um cartão MicroSD. Perfeito para robôs falantes.

Conexões:
- RX do DFPlayer → pino D10 do Arduino (via resistor!)
- TX do DFPlayer → pino D11 do Arduino
- SPK+ → alto-falante +
- SPK- → alto-falante -

IMPORTANTE: Use resistor 1k entre Arduino e RX do DFPlayer para evitar danos.`,
            diagram: [
              { from: 'Arduino D10', pin: 'TX', to: 'DFPlayer RX (1k)' },
              { from: 'Arduino D11', pin: 'RX', to: 'DFPlayer TX' },
              { from: 'DFPlayer SPK+', pin: 'SPK+', to: 'Alto-falante +' },
              { from: 'DFPlayer SPK-', pin: 'SPK-', to: 'Alto-falante -' },
              { from: 'DFPlayer VCC', pin: 'VCC', to: '5V Arduino' },
              { from: 'DFPlayer GND', pin: 'GND', to: 'GND Arduino' },
            ]
          },
          {
            title: '4. Código Arduino',
            content: `Carregue este código no Arduino para testar os olhos e áudio.`,
            code: `#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include <DFPlayer_Mini_Mp3.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

void setup() {
  Serial.begin(9600);
  pwm.begin();
  pwm.setPWMFreq(60);
  mp3_set_serial(Serial);
  delay(1);
  mp3_set_volume(20);
}

void loop() {
  // Olhos para frente
  pwm.setPWM(0, 0, 300);
  pwm.setPWM(1, 0, 300);
  delay(1000);
  
  // Olhos para direita
  pwm.setPWM(0, 0, 450);
  pwm.setPWM(1, 0, 300);
  delay(1000);
  
  // Olhos para esquerda
  pwm.setPWM(0, 0, 150);
  pwm.setPWM(1, 0, 300);
  delay(1000);
  
  // Tocar áudio
  mp3_play(1);
  delay(2000);
}`,
            codeLink: 'https://raw.githubusercontent.com/robocraft/robot-guide/main/examples/head-humanoid/arduino.ino'
          },
          {
            title: '5. Integração com DimOS (Avançado)',
            content: `Para adicionar IA com DimOS + Modal GLM-5.1, você precisa de um computador host (Raspberry Pi) connected ao Arduino via USB ou Wi-Fi.

Este código Python roda no Raspberry Pi e recebe texto do DimOS, converte para áudio, e envia comando para Arduino.`,
            code: `# dimos_robot.py
import edge_tts
import serial
import asyncio

arduino = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)

async def speak_and_act(texto):
    # Gerar áudio com Edge TTS
    tts = edge_tts.Communicate(texto, "pt-BR-FranciscaNeural")
    await tts.save("/tmp/fala.mp3")
    
    #Enviar comando para Arduino
    arduino.write(b"PLAY\\n")
    
    # Resposta do DimOS
    from dimos.agents.modal_agent import agent
    bot = agent()
    resposta = bot.chat(texto)
    await speak_and_act(resposta)

# Loop principal
async def main():
    await speak_and_act("Olá! Sou seu robô.")

asyncio.run(main())`,
            requirements: ['Raspberry Pi 4+', 'DimOS instalado', 'Conexão Wi-Fi']
          }
        ]
      },
      {
        id: 'carro-2wd',
        title: 'Montar Carro 2WD com Câmera',
        difficulty: 'Médio',
        time: '6–8 horas',
        overview: 'Guia completo para construir um carro 2WD com câmera ESP32-CAM. Inclui controle Wi-Fi, streaming de vídeo e integração com DimOS para IA.',
        sections: [
          {
            title: '1. Montar o Chassi',
            content: `Monte o chassi 2WD seguindo as instruções do fabricante. O chassi típicas inclui:
- 2 motores DC com redução
- 2 rodas
- 1 roda boba (front)
- Estrutura de acrílico ou MDF

Fixe o L298N ao chassi com fita dupla-face ou parafusos.`,
            diagram: [
              { from: 'Motor Esq', pin: 'Vermelho', to: 'L298N OUT1' },
              { from: 'Motor Esq', pin: 'Preto', to: 'L298N OUT2' },
              { from: 'Motor Dir', pin: 'Vermelho', to: 'L298N OUT3' },
              { from: 'Motor Dir', pin: 'Preto', to: 'L298N OUT4' },
            ]
          },
          {
            title: '2. Conexões L298N + Arduino',
            content: `O L298N controla 2 motores DC. Cada motor precisa de 2 pinos (direção) + 1 pino (PWM velocidade).

Pinos Arduino → L298N:
- D8 → IN1 (Motor Esq Forward)
- D9 → IN2 (Motor Esq Backward)
- D10 → IN3 (Motor Dir Forward)
- D11 → IN4 (Motor Dir Backward)

Alimentação:
- 12V do L298N → positivo bateria 7.4V
- GND do L298N → negativo bateria
- 5V do L298N → Arduino 5V (opicional)`,
            diagram: [
              { from: 'Arduino D8', pin: 'IN1', to: 'L298N IN1' },
              { from: 'Arduino D9', pin: 'IN2', to: 'L298N IN2' },
              { from: 'Arduino D10', pin: 'IN3', to: 'L298N IN3' },
              { from: 'Arduino D11', pin: 'IN4', to: 'L298N IN4' },
              { from: 'Bateria 7.4V', pin: '+', to: 'L298N 12V' },
              { from: 'Bateria 7.4V', pin: '-', to: 'L298N GND' },
              { from: 'L298N 5V', pin: '5V', to: 'Arduino VIN' },
            ]
          },
          {
            title: '3. Configurar ESP32-CAM',
            content: `O ESP32-CAM é um módulo com câmera OV2640 + Wi-Fi. Usa GPIO0 para programação.

Programação:
1. Conecte FTDI: FTDI RX → ESP32 TX, FTDI TX → ESP32 RX
2. GPIO0 → GND (para modo flash)
3. Execute upload do Arduino IDE`,
            diagram: [
              { from: 'FTDI 5V', pin: 'VCC', to: 'ESP32 5V' },
              { from: 'FTDI GND', pin: 'GND', to: 'ESP32 GND' },
              { from: 'FTDI TX', pin: 'TX', to: 'ESP32 U0R' },
              { from: 'FTDI RX', pin: 'RX', to: 'ESP32 U0T' },
              { from: 'FTDI DTR', pin: 'DTR', to: 'ESP32 GPIO0' },
            ]
          },
          {
            title: '4. Código ESP32-CAM',
            content: `Carregue o exemplo CameraWebServer do Arduino IDE. Configure:
- Board: ESP32 Wrover Module
- Partition: Huge APP
- PSRAM: Enabled`,
            code: `// Arduino IDE: Examples > ESP32 > Camera > CameraWebServer

// Configuração dos pinos para AI-Thinker
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM   -1
#define XCLK_GPIO_NUM     0
#define SIOD_GPIO_NUM    26
#define SIOC_GPIO_NUM    27

#define Y9_GPIO_NUM      36
#define Y8_GPIO_NUM      37
#define Y7_GPIO_NUM     38
#define Y6_GPIO_NUM     39
#define Y5_GPIO_NUM     34
#define Y4_GPIO_NUM     35
#define Y3_GPIO_NUM     32
#define Y2_GPIO_NUM      33
#define VSYNC_GPIO_NUM   25
#define HREF_GPIO_NUM   23
#define PCLK_GPIO_NUM    22`,
            link: 'https://raw.githubusercontent.com/espressif/arduino-esp32/master/libraries/ESP32/examples/Camera/CameraWebServer'
          },
          {
            title: '5. Código Controle Wi-Fi',
            content: `Controle o carro via browser ou integração com DimOS.`,
            code: `// webControl.ino - controle via Wi-Fi
#include <WiFi.h>
#include <ESP32Servo.h>

Servo motorEsq, motorDir;
int speed = 128;

void setup() {
  Serial.begin(115200);
  
  motorEsq.attach(4);
  motorDir.attach(2);
  
  // Criar Access Point
  WiFi.softAP("RoboCarro", "12345678");
  Serial.println(WiFi.softAPIP().toString());
}

void loop() {
  // Parse commands via Serial from Python/DimOS
  if (Serial.available()) {
    char cmd = Serial.read();
    switch(cmd) {
      case 'F': forward(); break;
      case 'B': backward(); break;
      case 'L': left(); break;
      case 'R': right(); break;
      case 'S': stop(); break;
    }
  }
}

void forward() {
  motorEsq.write(180); motorDir.write(0);
}
void backward() {
  motorEsq.write(0); motorDir.write(180);
}
void left() {
  motorEsq.write(0); motorDir.write(0);
}
void right() {
  motorEsq.write(180); motorDir.write(180);
}
void stop() {
  motorEsq.write(90); motorDir.write(90);
}`
          },
          {
            title: '6. Integração com DimOS',
            content: `Código Python para integrar o carro com DimOS + Modal GLM-5.1.`,
            code: `# robo_car.py
import serial
import cv2
from dimos.agents.modal_agent import agent

ser = serial.Serial('/dev/ttyUSB0', 115200)
camera = cv2.VideoCapture(0)
bot = agent()

def get_frame():
    ret, frame = camera.read()
    if ret:
        _, buf = cv2.imencode('.jpg', frame)
        return buf.tobytes()
    return None

def control_car(command):
    ser.write(command.encode())

while True:
    frame = get_frame()
    # Enviar frame para processing
    # Resposta do bot
    response = bot.process_frame(frame, "O que vê?")
    
    if "avançar" in response.lower():
        control_car('F')
    elif "voltar" in response.lower():
        control_car('B')
    elif "esquerda" in response.lower():
        control_car('L')
    elif "direita" in response.lower():
        control_car('R')
    else:
        control_car('S')`
          }
        ]
      },
      {
        id: 'esp32-cam',
        title: 'Montar ESP32-CAM',
        difficulty: 'Fácil',
        time: '1–2 horas',
        overview: 'Guia rápido para configurar ESP32-CAM com streaming de vídeo e detecção de objetos.',
        sections: [
          {
            title: '1. Preparar Hardware',
            content: `O ESP32-CAM precisa do módulo FTDI para programação.

Conexão FTDI → ESP32:
- 5V → 5V (NÃO 3.3V!)
- GND → GND
- TX → U0R (RX)
- RX → U0T (TX)
- GPIO0 → GND (para flash mode)`,
            diagram: [
              { from: 'FTDI VCC', pin: '5V', to: 'ESP32 5V' },
              { from: 'FTDI GND', pin: 'GND', to: 'ESP32 GND' },
              { from: 'FTDI TX', pin: 'TX', to: 'ESP32 U0R' },
              { from: 'FTDI RX', pin: 'RX', to: 'ESP32 U0T' },
              { from: 'Jumper', pin: 'GPIO0', to: 'ESP32 GND' },
            ]
          },
          {
            title: '2. Arduino IDE Setup',
            content: `Configure o Arduino IDE para ESP32:
1. Board Manager: esp32 by Espressif
2. Board: ESP32 Wrover Module
3. Flash Size: 4MB
4. Partition: Huge APP
5. PSRAM: Enabled`,
            code: `# Preferences > Additional Boards Manager URL:
https://raw.githubusercontent.com/espressif/arduino-esp32/master/package_esp32_index.json`
          },
          {
            title: '3. Flash CameraWebServer',
            content: `Carregue o exemplo CameraWebServer.`,
            code: `// File > Examples > ESP32 > Camera > CameraWebServer
// Selecione: AI-Thinker ESP32-CAM
// GPIO0 deve estar conectado a GND durante upload`,
            link: 'https://github.com/espressif/arduino-esp32/tree/master/libraries/ESP32/examples/Camera/CameraWebServer'
          },
          {
            title: '4. Acessar Stream',
            content: `Após upload:
1. Remova jumper GPIO0 → GND
2. Reset ESP32 (desconecte e reconecte)
3. Abra Serial Monitor (115200 baud)
4. O IP will be printed
5. Acesse http://IP/stream`,
            diagram: [
              { from: 'Browser', route: '/stream', to: 'ESP32-CAM Video Stream' },
              { from: 'Browser', route: '/photo', to: 'ESP32-CAM Captura' },
              { from: 'Browser', route: '/status', to: 'ESP32-CAM Status' },
            ]
          },
          {
            title: '5. TensorFlow Lite (Opcional)',
            content: `Adicione detecção de objetos com TensorFlow Lite.`,
            code: `# Install TensorFlow Lite
#include <tensorflow/lite/micro/all_ops_resolver.h>
#include <tensorflow/lite/micro/kernels/all_ops_resolver.h>
#include <tensorflow/lite/schema/schema_generated.h>

// Modelo TFLite
#include "model.tflite"

//detecção em loop
void detectObjects(frame) {
  // Run inference
  TfLiteTensor* input = interpreter->input(0);
  // Copy frame to input
  interpreter->Invoke();
  // Parse results
}`
          }
        ]
      },
      {
        id: 'braitenberg',
        title: 'Montar Robô Braitenberg',
        difficulty: 'Fácil',
        time: '2–3 horas',
        overview: 'Robô reativo que segue fontes de luz. Implementa comportamento biológico simples em hardware.',
        sections: [
          {
            title: '1.Circuitos com LDR',
            content: `Dois LDRs detectam luz. Conexão em divisor de tensão:
- LDR → A0 (esquerda)
- LDR → A1 (direita)`,
            diagram: [
              { from: 'LDR Esq', pin: 'A', to: 'Arduino A0' },
              { from: 'LDR Esq', pin: 'B', to: 'GND via 10k' },
              { from: 'LDR Dir', pin: 'A', to: 'Arduino A1' },
              { from: 'LDR Dir', pin: 'B', to: 'GND via 10k' },
            ]
          },
          {
            title: '2. Código Braitenberg',
            content: `Algoritmo:
- LDR esquerda ativada → motor esquerda para
- LDR direita ativada → motor direita para
- Ambas → seguir luz`,
            code: `// braitenberg.ino
int ldrEsq = A0;
int ldrDir = A1;
int motorEsqIn1 = 8;
int motorEsqIn2 = 9;
int motorDirIn1 = 10;
int motorDirIn2 = 11;

void setup() {
  pinMode(ldrEsq, INPUT);
  pinMode(ldrDir, INPUT);
  pinMode(motorEsqIn1, OUTPUT);
  pinMode(motorEsqIn2, OUTPUT);
  pinMode(motorDirIn1, OUTPUT);
  pinMode(motorDirIn2, OUTPUT);
}

void loop() {
  int esq = analogRead(ldrEsq);
  int dir = analogRead(ldrDir);
  
  // Lógica Braitenberg V2
  if (esq < 300 && dir < 300) {
    // Ambas luz → frente
    digitalWrite(motorEsqIn1, HIGH);
    digitalWrite(motorEsqIn2, LOW);
    digitalWrite(motorDirIn1, HIGH);
    digitalWrite(motorDirIn2, LOW);
  } else if (esq < dir) {
    // Mais luz esquerda → gira esquerda
    digitalWrite(motorEsqIn1, LOW);
    digitalWrite(motorEsqIn2, LOW);
    digitalWrite(motorDirIn1, HIGH);
    digitalWrite(motorDirIn2, LOW);
  } else if (dir < esq) {
    // Mais luz direita → gira direita
    digitalWrite(motorEsqIn1, HIGH);
    digitalWrite(motorEsqIn2, LOW);
    digitalWrite(motorDirIn1, LOW);
    digitalWrite(motorDirIn2, LOW);
  } else {
    // Sem luz → para
    digitalWrite(motorEsqIn1, LOW);
    digitalWrite(motorEsqIn2, LOW);
    digitalWrite(motorDirIn1, LOW);
    digitalWrite(motorDirIn2, LOW);
  }
}`
          }
        ]
      },
      {
        id: 'braco-servo',
        title: 'Montar Braço Robótico 4DOF',
        difficulty: 'Difícil',
        time: '8–12 horas',
        overview: 'Braço robótico com 4 servos para movimento articulationado.',
        sections: [
          {
            title: '1. Montar Estrutura',
            content: `4 graus de liberdade:
- Base (rotação horizontal)
- Ombro (levantamento)
- Cotovelo (dobramento)
- Garra (abrir/fechar)`,
            diagram: [
              { from: 'Servo Base', pin: 'CH0', to: 'PCA9685 CH0' },
              { from: 'Servo Ombro', pin: 'CH1', to: 'PCA9685 CH1' },
              { from: 'Servo Cotovelo', pin: 'CH2', to: 'PCA9685 CH2' },
              { from: 'Servo Garra', pin: 'CH3', to: 'PCA9685 CH3' },
            ]
          },
          {
            title: '2. Conexões',
            content: `Arduino Mega + PCA9685 + Joystick PS2`,
            diagram: [
              { from: 'Mega A0', pin: 'VRx', to: 'Joystick VRx' },
              { from: 'Mega A1', pin: 'VRy', to: 'Joystick VRy' },
              { from: 'Mega A2', pin: 'SW', to: 'Joystick SW' },
              { from: 'Mega SDA', pin: 'SDA', to: 'PCA9685 SDA' },
              { from: 'Mega SCL', pin: 'SCL', to: 'PCA9685 SCL' },
            ]
          },
          {
            title: '3. Código',
            content: `Controle por joystick.`,
            code: `// arm_control.ino
#include <Servo.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Servo base, ombro, cotovelo, garra;
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

int basePos = 300, ombroPos = 300, cotoveloPos = 300;

void setup() {
  pwm.begin();
  pwm.setPWMFreq(60);
}

void loop() {
  int x = analogRead(A0) / 4;  // 0-1023 → 0-255
  int y = analogRead(A1) / 4;
  
  basePos += (x - 128) / 10;
  ombroPos += (y - 128) / 10;
  
  pwm.setPWM(0, 0, basePos);
  pwm.setPWM(1, 0, ombroPos);
}`
          }
        ]
      },
      {
        id: 'line-follower',
        title: 'Montar Robô Seguidor de Linha',
        difficulty: 'Fácil',
        time: '3–4 horas',
        overview: 'Robô que segue linhas no chão usando sensores IR. Perfeito para competições de robótica e educação.',
        sections: [
          {
            title: '1. Sensores IR QTR',
            content: `O sensor QTR-8RC tem 8 sensores IR reflectivity. Para seguidores de linha,推荐的 5 sensores é suficiente.

Conexão:
- Pino digital para controle (ativa LOW)
- Saída analógica por canal`,
            diagram: [
              { from: 'QTR Pino 1', pin: 'A0', to: 'Arduino A0' },
              { from: 'QTR Pino 2', pin: 'A1', to: 'Arduino A1' },
              { from: 'QTR Pino 3', pin: 'A2', to: 'Arduino A2' },
              { from: 'QTR Pino 4', pin: 'A3', to: 'Arduino A3' },
              { from: 'QTR Pino 5', pin: 'A4', to: 'Arduino A4' },
              { from: 'QTR VCC', pin: '5V', to: 'Arduino 5V' },
              { from: 'QTR GND', pin: 'GND', to: 'Arduino GND' },
            ]
          },
          {
            title: '2. Código Seguidor de Linha',
            content: `Algoritmo PID para seguimento suave de linha.`,
            code: `// line_follower.ino
#include <QTRSensors.h>
#define NUM_SENSORS 5
#define EMITTER_PIN 2

QTRSensorsRC qtr((char[]) {A0, A1, A2, A3, A4}, NUM_SENSORS, EMITTER_PIN, QTR_NO_EMITTER_PIN);

int lastError = 0;
float KP = 0.1, KD = 0.2;
int motorSpeed = 150;

void setup() {
  // Calibração automática
  for (int i = 0; i < 250; i++) {
    qtr.calibrate();
    delay(20);
  }
}

void loop() {
  unsigned int position = qtr.readLine(black);
  int error = position - 2000;
  
  int motorDiff = (error * KP) + (error - lastError) * KD;
  lastError = error;
  
  int m1Speed = motorSpeed + motorDiff;
  int m2Speed = motorSpeed - motorDiff;
  
  analogWrite(5, m1Speed);
  analogWrite(6, m2Speed);
}`
          },
          {
            title: '3. Ajuste PID',
            content: `O PID controla a resposta do robô:
- KP: Ganho proporcional (resposta rápida)
- KD: Ganho derivativo (estabilidade)

 Ajuste:
1. KB = 0, Kp pequeno → Increase até oscila
2. Adicione KD para parar oscilação`,
            code: `# Parâmetros típicos
KP = 0.1 a 0.5
KD = 0.2 a 0.5

# Teste em pista de 3cm de largura`
          }
        ]
      },
      {
        id: 'esp32-home',
        title: 'ESP32 Smart Home',
        difficulty: 'Fácil',
        time: '2–3 horas',
        overview: 'Sistema de automação residencial com ESP32. Controle de dispositivos via Wi-Fi e monitoramento de temperatura.',
        sections: [
          {
            title: '1. Hardware',
            content: `ESP32 controlado via browser. Relay para dispositivos AC.

ATENÇÃO: Cuidado com alta tensão!`,
            diagram: [
              { from: 'ESP32 D4', pin: 'GPIO4', to: 'Relay IN1' },
              { from: 'ESP32 D5', pin: 'GPIO5', to: 'Relay IN2' },
              { from: 'ESP32 D18', pin: 'GPIO18', to: 'DHT22 Data' },
              { from: 'Relay VCC', pin: '5V', to: 'Fonte 5V' },
              { from: 'Relay COM', pin: 'COM', to: 'Tomada' },
            ]
          },
          {
            title: '2. Código Web Server',
            content: `Servidor web básico no ESP32 para controle.`,
            code: `#include <WiFi.h>
#include <DHT.h>

const char* ssid = "SUA_REDE";
const char* pass = "SUA_SENHA";
#define DHTPIN 18

DHT dht(DHTPIN, DHT22);
WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  server.begin();
}

void loop() {
  WiFiClient client = server.available();
  if (client) {
    String req = client.readStringUntil('\\r');
    if (req.indexOf("/on") > 0) digitalWrite(4, HIGH);
    if (req.indexOf("/off") > 0) digitalWrite(4, LOW);
    
    float temp = dht.readTemperature();
    client.print("HTTP/1.1 200 OK\\r\\nContent-Type: text/html\\r\\n\\r\\n");
    client.print("<h1>Temp: " + String(temp) + "</h1>");
  }
}`
          }
        ]
      },
      {
        id: 'robot-tank',
        title: 'Montar Robot Tank',
        difficulty: 'Médio',
        time: '5–6 horas',
        overview: 'Robô com esteiras para terrenos irregulares. Mais tração e estabilidade em superfícies rugosas.',
        sections: [
          {
            title: '1. Motores TT',
            content: `Motores TT (Turbo Torque) com redução. Maior torque que motores DC comuns.

Especificações típicas:
- Tensão: 6-12V
- RPM: 30-100
- Torque: 1-3 kg.cm`,
            diagram: [
              { from: 'Motor Esq', pin: '+', to: 'L298N OUT1' },
              { from: 'Motor Esq', pin: '-', to: 'L298N OUT2' },
              { from: 'Motor Dir', pin: '+', to: 'L298N OUT3' },
              { from: 'Motor Dir', pin: '-', to: 'L298N OUT4' },
            ]
          },
          {
            title: '2. Código Tank',
            content: `Controle de esteiras com rotação no lugar.`,
            code: `// tank_control.ino
#include <Servo.h>

Servo motorEsq, motorDir;

void setup() {
  motorEsq.attach(4);
  motorDir.attach(2);
}

void tankLeft() {
  // Gira no lugar para esquerda
  motorEsq.write(90);  // para
  motorDir.write(0);  // frente
}

void tankRight() {
  // Gira no lugar para direita
  motorEsq.write(180); // frente
  motorDir.write(90); // para
}

void forward() {
  motorEsq.write(180);
  motorDir.write(0);
}`,
            link: 'https://github.com/robocraft/tank-bot'
          }
        ]
      },
      {
        id: 'gesture-hand',
        title: 'Mão Robótica com Gesture',
        difficulty: 'Médio',
        time: '6–8 horas',
        overview: 'Mão robótica que replica gestos da mão humana usando luvas com sensores flex.',
        sections: [
          {
            title: '1. Sensores Flex',
            content: `Sensores flex alteram resistência ao dobrar. Conectados em divisor de tensão.`,
            diagram: [
              { from: 'Flex 1', pin: 'A0', to: 'Arduino A0 (dedo 1)' },
              { from: 'Flex 2', pin: 'A1', to: 'Arduino A1 (dedo 2)' },
              { from: 'Flex 3', pin: 'A2', to: 'Arduino A2 (dedo 3)' },
              { from: 'Flex 4', pin: 'A3', to: 'Arduino A3 (dedo 4)' },
            ]
          },
          {
            title: '2. Código',
            content: `Lê sensores flex e comanda servos correspondentes.`,
            code: `// gesture_hand.ino
#include <Servo.h>

Servo dedo1, dedo2, dedo3, dedo4;
int flexPins[] = {A0, A1, A2, A3};
Servo servos[] = {dedo1, dedo2, dedo3, dedo4};

void setup() {
  dedo1.attach(2); dedo2.attach(3);
  dedo3.attach(4); dedo4.attach(5);
}

void loop() {
  for (int i = 0; i < 4; i++) {
    int flex = analogRead(flexPins[i]);
    int angle = map(flex, 600, 900, 0, 180);
    servos[i].write(angle);
  }
}`
          }
        ]
      },
      {
        id: 'quadruped',
        title: 'Robô Quadrúpede (4 patas)',
        difficulty: 'Difícil',
        time: '10–14 horas',
        overview: 'Robô de 4 patas com 12 servos. Anda em diferentes direcciones usando gaite.',
        sections: [
          {
            title: '1. Configuração dos Servos',
            content: `12 servos (3 por patas):
- Coxa (esquerda/direita)
- Joelho (cima/baixo)
- Pé (frente/trás)`,
            diagram: [
              { from: 'Pata FD (Coxa)', pin: 'CH0', to: 'PCA9685 CH0' },
              { from: 'Pata FD (Joelho)', pin: 'CH1', to: 'PCA9685 CH1' },
              { from: 'Pata FE (Coxa)', pin: 'CH2', to: 'PCA9685 CH2' },
              { from: 'Pata FE (Joelho)', pin: 'CH3', to: 'PCA9685 CH3' },
              { from: 'Pata TD (Coxa)', pin: 'CH4', to: 'PCA9685 CH4' },
              { from: 'Pata TD (Joelho)', pin: 'CH5', to: 'PCA9685 CH5' },
            ]
          },
          {
            title: '2. Gaite',
            content: `Marcha alternada para locomoção. Duas patas por vez no chão.`,
            code: `#include <Servo.h>
#include <PCA9685.h>

PCA9685 pwm(0x40);

void walkForward() {
  // Levante patas ímpares
  pwm.setPWM(0, 0, 400);
  pwm.setPWM(3, 0, 400);
  delay(200);
  // Mova para frente
  pwm.setPWM(1, 0, 300);
  delay(200);
  // Abaixe
  pwm.setPWM(0, 0, 200);
  pwm.setPWM(3, 0, 200);
  // Repita para patas pares...
}`
          }
        ]
      },
      {
        id: 'voice-control',
        title: 'Controle por Voz offline',
        difficulty: 'Médio',
        time: '4–5 horas',
        overview: 'Controle robô por voz sem internet usando Vosk (speech-to-text local).',
        sections: [
          {
            title: '1. Instalação Vosk',
            content: `Vosk é um reconhecimento de voz offline leve. Funciona em Raspberry Pi.`,
            code: `# Install Vosk
pip install vosk

# Baixe modelo português
# https://alphacephei.com/vosk/models`
          },
          {
            title: '2. Código Python',
            content: `Reconhece comandos de voz e executa.`,
            code: `# voice_control.py
from vosk import Model, KaldiRecognizer
import pyaudio
import serial

model = Model("vosk-model-pt")
rec = KaldiRecognizer(model, 16000)

ser = serial.Serial('/dev/ttyUSB0', 9600)
p = pyaudio.PyAudio()
stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=8000)

while True:
    data = stream.read(1024)
    if rec.AcceptWaveform(data):
        result = eval(rec.Result())
        text = result.get("text", "")
        
        # Comandos
        if "frente" in text:
            ser.write(b"F")
        elif "tras" in text:
            ser.write(b"B")
        elif "esquerda" in text:
            ser.write(b"L")
        elif "direita" in text:
            ser.write(b"R")`
          }
        ]
      },
      {
        id: 'wifi-camera',
        title: 'Câmera Wi-Fi com Pan-Tilt',
        difficulty: 'Médio',
        time: '4–5 horas',
        overview: 'Câmera com movimento horizontal e vertical via browser ou bot.',
        sections: [
          {
            title: '1. Hardware Pan-Tilt',
            content: `Dois servos para movimento:
- Pan: rotação horizontal
- Tilt: rotação vertical`,
            diagram: [
              { from: 'Servo Pan', pin: 'GPIO 14', to: 'ESP32 D14' },
              { from: 'Servo Tilt', pin: 'GPIO 15', to: 'ESP32 D15' },
            ]
          },
          {
            title: '2. Código',
            content: `Servidor web com controles.`,
            code: `#include <WiFi.h>
#include <Servo.h>
#include "esp_camera.h"

Servo pan, tilt;

void setup() {
  pan.attach(14);
  tilt.attach(15);
  
  // Camera init...
}

void handleRequest(WiFiClient &client) {
  if (client.indexOf("/pan?angle=") > 0) {
    int angle = client.substring(client.indexOf("=")+1).toInt();
    pan.write(angle);
  }
}`,
            link: 'https://github.com/robocraft/wifi-pantilt'
          }
        ]
      },
    ];

    const filteredTTS = computed(() => ({
      cloud: ttsProviders.filter(t => t.type === 'cloud'),
      local: ttsProviders.filter(t => t.type === 'local'),
    }));

    const progressPercent = computed(() => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      return maxScroll > 0 ? (scrollProgress.value / maxScroll) * 100 : 0;
    });

    function scrollTo(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        mobileMenuOpen.value = false;
      }
    }

    function goToStep(stepIndex) {
      currentStep.value = stepIndex;
      const stepIds = ['home', 'robots', 'tts', 'guides', 'shops', 'dimos'];
      if (stepIds[stepIndex]) {
        scrollTo(stepIds[stepIndex]);
      }
    }

    function selectRobot(robot) {
      selectedRobot.value = robot;
      currentStep.value = 2;
      scrollTo('tts');
    }

    function selectTTS(tts) {
      selectedTTS.value = tts;
    }

    function selectGuide(guide) {
      selectedGuide.value = guide;
      activeGuideStep.value = 0;
      scrollTo('guide-detail');
    }

    function nextGuideStep() {
      if (selectedGuide.value && activeGuideStep.value < selectedGuide.value.sections.length - 1) {
        activeGuideStep.value++;
      }
    }

    function prevGuideStep() {
      if (activeGuideStep.value > 0) {
        activeGuideStep.value--;
      }
    }

    function closeRobot() {
      selectedRobot.value = null;
    }

    function closeTTS() {
      selectedTTS.value = null;
    }

    function closeGuide() {
      selectedGuide.value = null;
      activeGuideStep.value = 0;
    }

    function toggleMobileMenu() {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    }

    function copyCode(code) {
      navigator.clipboard.writeText(code).catch(() => {});
    }

    function getRatingStars(rating) {
      return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    }

    onMounted(() => {
      window.addEventListener('scroll', () => {
        scrollProgress.value = window.scrollY;
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
          mobileMenuOpen.value = false;
        }
      });
    });

    return {
      currentStep,
      totalSteps,
      steps,
      robots,
      ttsProviders,
      shops,
      guides,
      selectedRobot,
      selectedTTS,
      selectedGuide,
      mobileMenuOpen,
      scrollProgress,
      progressPercent,
      filteredTTS,
      activeGuideStep,
      scrollTo,
      goToStep,
      selectRobot,
      selectTTS,
      selectGuide,
      nextGuideStep,
      prevGuideStep,
      closeRobot,
      closeTTS,
      closeGuide,
      toggleMobileMenu,
      copyCode,
      getRatingStars,
    };
  },
  template: `
    <div id="app">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>

      <nav class="nav">
        <div class="nav-inner">
          <a class="logo" @click.prevent="scrollTo('home')">ROBOCRAFT BR</a>
          <button class="menu-toggle" @click="toggleMobileMenu" aria-label="Menu"></button>
          <ul class="nav-links" :class="{ active: mobileMenuOpen }">
            <li v-for="s in steps" :key="s.id">
              <a :class="{ active: currentStep === steps.indexOf(s) }" @click.prevent="goToStep(steps.indexOf(s))">{{ s.label }}</a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="mobile-overlay" :class="{ active: mobileMenuOpen }" @click="toggleMobileMenu"></div>

      <section id="home" class="hero">
        <div class="container">
          <div class="hero-content">
            <h1>Monte seu Robô com IA <span>no Brasil</span></h1>
            <p>Guia completo com peças do Mercado Livre, TTS local e na nuvem, integração com DimOS + Modal GLM-5.1. Do protótipo de R$ 35 ao robô de R$ 400.</p>
            <div class="hero-actions">
              <a class="btn btn-green" @click.prevent="goToStep(1)">Escolher Robô</a>
              <a class="btn btn-outline" @click.prevent="goToStep(2)">Ver Voz/TTS</a>
            </div>
            <div class="hero-stats">
              <div class="stat"><strong>{{ robots.length }}</strong> Projetos</div>
              <div class="stat"><strong>{{ ttsProviders.length }}</strong> Opções de Voz</div>
              <div class="stat"><strong>{{ shops.length }}</strong> Lojas</div>
            </div>
          </div>
        </div>
      </section>

      <section id="robots" class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">1. Escolha seu Robô</h2>
            <p class="section-sub">Do mais simples ao mais completo — todos com peças do Mercado Livre</p>
          </div>

          <div class="step-indicator">
            <div v-for="(s, i) in steps" :key="s.id" class="step" :class="{ active: currentStep === i, completed: currentStep > i }" @click="goToStep(i)">{{ s.label }}</div>
          </div>

          <div class="card-grid">
            <div v-for="r in robots" :key="r.id" class="card" :class="{ selected: selectedRobot?.id === r.id }" @click="selectRobot(r)">
              <div class="card-header">
                <h3 class="card-title">{{ r.title }}</h3>
                <span class="card-meta" :class="r.difficulty">{{ r.difficulty === 'easy' ? 'Fácil' : r.difficulty === 'medium' ? 'Médio' : ' Difícil' }}</span>
              </div>
              <p class="card-desc">{{ r.description }}</p>
              <div class="card-footer">
                <span class="card-price">{{ r.price }}</span>
                <span class="card-time">{{ r.time }}</span>
              </div>
            </div>
          </div>

          <div v-if="selectedRobot" class="detail-view">
            <div class="detail-header">
              <h3 class="detail-title">{{ selectedRobot.title }}</h3>
              <button class="back-btn" @click="closeRobot">× Fechar</button>
            </div>

            <div class="detail-meta">
              <span>Dificuldade: {{ selectedRobot.difficulty }}</span>
              <span>Tempo: {{ selectedRobot.time }}</span>
            </div>

            <h4>Lista de Peças (BOM)</h4>
            <table class="bom-table">
              <thead>
                <tr><th>Peça</th><th>Qtd</th><th>Preço</th><th>Link</th></tr>
              </thead>
              <tbody>
                <tr v-for="p in selectedRobot.parts" :key="p.name">
                  <td>{{ p.name }}</td>
                  <td>{{ p.qty }}</td>
                  <td>{{ p.price }}</td>
                  <td><a :href="p.link" target="_blank" rel="noopener">Mercado Livre</a></td>
                </tr>
              </tbody>
            </table>

            <h4>Pinout</h4>
            <div class="pinout-grid" v-if="selectedRobot.pinout">
              <div v-for="(pins, module) in selectedRobot.pinout" :key="module" class="pinout-card">
                <h5>{{ module }}</h5>
                <div v-for="(pin, name) in pins" :key="name" class="pin">
                  <span class="pin-name">{{ name }}</span>
                  <span class="pin-value">{{ pin }}</span>
                </div>
              </div>
            </div>

            <h4>Casos de Uso</h4>
            <div class="tag-list">
              <span v-for="uc in selectedRobot.useCases" :key="uc" class="tag">{{ uc }}</span>
            </div>

            <button class="btn btn-green" @click="selectGuide(guides.find(g => g.id === selectedRobot.guide))">Ver Guia de Montagem</button>
          </div>
        </div>
      </section>

      <section id="tts" class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">2. Escolha a Voz / TTS</h2>
            <p class="section-sub">TTS na nuvem (gratuito/pago) ou 100% local (sem internet)</p>
          </div>

          <div class="breadcrumb" v-if="selectedRobot">
            <a @click.prevent="goToStep(1)">{{ selectedRobot.title }}</a>
            <span class="breadcrumb-sep">→</span>
            <span class="breadcrumb-current">Escolher voz</span>
          </div>

          <h3 class="subsection-title">TTS na Nuvem</h3>
          <div class="tts-grid">
            <div v-for="t in filteredTTS.cloud" :key="t.id" class="tts-card" @click="selectTTS(t)">
              <div class="tts-header">
                <h4 class="tts-name">{{ t.name }}</h4>
                <span class="tts-badge" :class="t.free ? 'free' : 'paid'">{{ t.free ? 'Gratuito' : 'Pago' }}</span>
              </div>
              <p class="tts-desc">{{ t.description }}</p>
              <div class="tts-specs">
                <span>{{ t.quality }}</span>
                <span>{{ t.latency }}</span>
              </div>
              <code class="tts-code">{{ t.install }}</code>
            </div>
          </div>

          <h3 class="subsection-title">TTS Local (sem internet)</h3>
          <div class="tts-grid">
            <div v-for="t in filteredTTS.local" :key="t.id" class="tts-card" @click="selectTTS(t)">
              <div class="tts-header">
                <h4 class="tts-name">{{ t.name }}</h4>
                <span class="tts-badge local">Local</span>
              </div>
              <p class="tts-desc">{{ t.description }}</p>
              <div class="tts-specs">
                <span>{{ t.quality }}</span>
                <span>{{ t.latency }}</span>
              </div>
              <code class="tts-code">{{ t.install }}</code>
            </div>
          </div>

          <div v-if="selectedTTS" class="detail-view">
            <div class="detail-header">
              <h3 class="detail-title">{{ selectedTTS.name }}</h3>
              <button class="back-btn" @click="closeTTS">× Fechar</button>
            </div>
            <p class="detail-desc">{{ selectedTTS.description }}</p>
            
            <div class="code-block">
              <h4>Instalação</h4>
              <pre><code>{{ selectedTTS.install }}</code></pre>
              <button class="copy-btn" @click="copyCode(selectedTTS.install)">Copiar</button>
            </div>

            <div class="code-block" v-if="selectedTTS.api">
              <h4>API Python</h4>
              <pre><code>{{ selectedTTS.api }}</code></pre>
              <button class="copy-btn" @click="copyCode(selectedTTS.api)">Copiar</button>
            </div>

            <div class="code-block" v-if="selectedTTS.example">
              <h4>Exemplo</h4>
              <pre><code>{{ selectedTTS.example }}</code></pre>
              <button class="copy-btn" @click="copyCode(selectedTTS.example)">Copiar</button>
            </div>

            <a :href="selectedTTS.link" target="_blank" rel="noopener" class="btn btn-outline">Documentação</a>
          </div>

          <div v-if="selectedRobot && !selectedTTS" style="margin-top: 32px;">
            <button class="btn btn-red" @click="goToStep(3)">Próximo: Guias →</button>
          </div>
        </div>
      </section>

      <section id="guides" class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">3. Guias de Montagem</h2>
            <p class="section-sub">Passo a passo com diagramas de fiação e código</p>
          </div>

          <div class="breadcrumb" v-if="selectedRobot || selectedTTS">
            <a v-if="selectedRobot" @click.prevent="goToStep(1)">{{ selectedRobot.title }}</a>
            <span v-if="selectedRobot && selectedTTS" class="breadcrumb-sep"> → </span>
            <span v-if="selectedTTS" class="breadcrumb-current">{{ selectedTTS.name }}</span>
          </div>

          <div class="guide-list">
            <div v-for="g in guides" :key="g.id" class="guide-card" @click="selectGuide(g)">
              <div class="guide-number">{{ guides.indexOf(g) + 1 }}</div>
              <h4 class="guide-title">{{ g.title }}</h4>
              <p class="guide-meta">{{ g.difficulty }} · {{ g.time }}</p>
              <p class="guide-desc">{{ g.overview }}</p>
            </div>
          </div>

          <div v-if="selectedGuide" class="detail-view" id="guide-detail">
            <div class="detail-header">
              <h3 class="detail-title">{{ selectedGuide.title }}</h3>
              <button class="back-btn" @click="closeGuide">× Fechar</button>
            </div>

            <div class="guide-meta">
              <span>Dificuldade: {{ selectedGuide.difficulty }}</span>
              <span>Tempo: {{ selectedGuide.time }}</span>
            </div>

            <p class="detail-desc">{{ selectedGuide.overview }}</p>

            <div class="step-nav">
              <button class="btn btn-outline btn-sm" @click="prevGuideStep" :disabled="activeGuideStep === 0">← Anterior</button>
              <span class="step-counter">{{ activeGuideStep + 1 }} / {{ selectedGuide.sections.length }}</span>
              <button class="btn btn-outline btn-sm" @click="nextGuideStep" :disabled="activeGuideStep === selectedGuide.sections.length - 1">Próximo →</button>
            </div>

            <div class="step-list">
              <div class="step-item">
                <div class="step-header">
                  <span class="step-num">{{ activeGuideStep + 1 }}</span>
                  <h4 class="step-title">{{ selectedGuide.sections[activeGuideStep].title }}</h4>
                </div>
                <p class="step-content">{{ selectedGuide.sections[activeGuideStep].content }}</p>

                <div class="wiring-diagram" v-if="selectedGuide.sections[activeGuideStep].diagram">
                  <h5>Conexões</h5>
                  <div v-for="(conn, j) in selectedGuide.sections[activeGuideStep].diagram" :key="j" class="wire">
                    <span class="wire-label">{{ conn.from }}</span>
                    <span class="wire-pin">{{ conn.pin }}</span>
                    <span class="wire-arrow">→</span>
                    <span class="wire-label">{{ conn.to }}</span>
                  </div>
                </div>

                <div class="code-block" v-if="selectedGuide.sections[activeGuideStep].code">
                  <pre><code>{{ selectedGuide.sections[activeGuideStep].code }}</code></pre>
                  <button class="copy-btn" @click="copyCode(selectedGuide.sections[activeGuideStep].code)">Copiar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="shops" class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">4. Onde Comprar</h2>
            <p class="section-sub">Lojas recomendadas no Brasil</p>
          </div>

          <div class="shop-list">
            <div v-for="s in shops" :key="s.name" class="shop-card">
              <div class="shop-header">
                <span class="shop-icon">{{ s.icon }}</span>
                <div>
                  <h4 class="shop-name">{{ s.name }}</h4>
                  <span class="shop-type" :class="s.type">{{ s.type === 'marketplace' ? 'Marketplace' : s.type === 'specialized' ? 'Especializada' : 'Física' }}</span>
                </div>
              </div>
              <p class="shop-rating">{{ getRatingStars(s.rating) }} {{ s.rating }}</p>
              <p class="shop-specialty">{{ s.specialty }}</p>
              <ul class="shop-highlights">
                <li v-for="h in s.highlights" :key="h">{{ h }}</li>
              </ul>
              <a :href="s.url" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Visitar</a>
            </div>
          </div>
        </div>
      </section>

      <section id="dimos" class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">5. DimOS + IA</h2>
            <p class="section-sub">Conecte seu robô com IA</p>
          </div>

          <div class="features-grid">
            <div class="feature">
              <h4 class="feature-title">IA via Modal</h4>
              <p class="feature-desc">GLM-5.1-FP8 via OpenAI-compatible API.</p>
            </div>
            <div class="feature">
              <h4 class="feature-title">TTS Integrado</h4>
              <p class="feature-desc">Edge TTS, Piper, ElevenLabs.</p>
            </div>
            <div class="feature">
              <h4 class="feature-title">Visão Computacional</h4>
              <p class="feature-desc">ESP32-CAM, detecção de objetos.</p>
            </div>
            <div class="feature">
              <h4 class="feature-title">Modular</h4>
              <p class="feature-desc">Sensores, atuadores, novos agentes.</p>
            </div>
          </div>

          <div class="code-block">
            <h4>Instalar DimOS</h4>
            <pre><code>pip install uv
uv pip install dimos
# Configure MODAL_API_KEY no .env</code></pre>
            <button class="copy-btn" @click="copyCode('pip install uv\\nuv pip install dimos')">Copiar</button>
          </div>

          <a href="https://github.com/dimensionalOS/dimos" target="_blank" rel="noopener" class="btn btn-green">DimOS GitHub</a>
        </div>
      </section>

      <footer class="footer">
        <p>RoboCraft BR — Guia Open Source</p>
        <p>
          <a href="https://github.com">GitHub</a> ·
          <a href="/wiki">Wiki</a> ·
          <a href="/llms.txt">LLMs.txt</a>
        </p>
      </footer>
    </div>
  `
}).mount('#app');