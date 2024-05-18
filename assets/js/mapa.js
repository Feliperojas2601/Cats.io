document.addEventListener("DOMContentLoaded", function() {
  // Ajuste inicial del tamaño del canvas al tamaño de la ventana menos 60 píxeles
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Configuración inicial del juego Phaser
  const config = {
    type: Phaser.AUTO,
    width: width - 60,
    height: height - 60,
    parent: 'main-content-map',
    backgroundColor: '#CCEEFF',
    physics: {
      default: 'arcade',
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  const game = new Phaser.Game(config);

  let map, cursors, titulo;
  let botones = [];
  let cards = [];

  function preload() {
    // Carga de las imágenes necesarias
    this.load.image('mapa', '../assets/img/mapa.png');
    this.load.image('botonO', '../assets/img/play.png');
    this.load.image('ragdoll', '../assets/img/a.jpeg');
    this.load.image('siamese', '../assets/img/b.jpeg');
    this.load.image('mainecoon', '../assets/img/s.jpeg');
    this.load.image('persian', '../assets/img/p.jpeg');
    this.load.image('sphinx', '../assets/img/si.jpeg');
    this.load.image('bengal', '../assets/img/st.jpeg');
    this.load.image('britishshorthair', '../assets/img/a.jpeg');
    this.load.image('scottishfold', '../assets/img/b.jpeg');
    this.load.image('savannah', '../assets/img/s.jpeg');
  }

  function create() {
    // Añadir la imagen del mapa y hacerla interactiva
    map = this.add.image(0, 0, 'mapa').setOrigin(0, 0).setInteractive();

    // Información de las tarjetas
    const infoTexts = [
      "Ragdoll: Originario de USA, conocido por su temperamento dócil y relajado.",
      "Siamese: Originario de Tailandia, famoso por su cuerpo esbelto y ojos azules.",
      "Maine Coon: Originario de USA, conocido por su gran tamaño y pelaje espeso.",
      "Persian: Originario de Irán, famoso por su cara plana y pelaje largo.",
      "Sphinx: Originario de Canadá, conocido por su apariencia sin pelo.",
      "Bengal: Originario de USA, conocido por su apariencia salvaje similar a un leopardo.",
      "British Shorthair: Originario del Reino Unido, famoso por su pelaje denso y ojos redondos.",
      "Scottish Fold: Originario de Escocia, conocido por sus orejas dobladas hacia adelante.",
      "Savannah: Originario de USA, famoso por su gran tamaño y apariencia exótica.",
      "Birman: Originario de Myanmar, conocido por su pelaje largo y ojos azules."
    ];

    // Crear las tarjetas de información que contienen las fotos y el texto
    const cardData = [
      { key: 'ragdoll', text: infoTexts[0] },
      { key: 'siamese', text: infoTexts[1] },
      { key: 'mainecoon', text: infoTexts[2] },
      { key: 'persian', text: infoTexts[3] },
      { key: 'sphinx', text: infoTexts[4] },
      { key: 'bengal', text: infoTexts[5] },
      { key: 'britishshorthair', text: infoTexts[6] },
      { key: 'scottishfold', text: infoTexts[7] },
      { key: 'savannah', text: infoTexts[8] },
      { key: 'birman', text: infoTexts[9] }
    ];

    cardData.forEach((data, index) => {
      const card = this.add.container(this.scale.width / 2, this.scale.height / 2).setVisible(false);
      const image = this.add.image(0, 0, data.key).setScale(0.5).setOrigin(0.5, 1);
      const bg = this.add.rectangle(0, image.displayHeight / 2 + 75, 300, 100, 0x000000, 0.7).setOrigin(0.5, 0);
      const infoText = this.add.text(-140, image.displayHeight / 2 + 85, data.text, { font: '16px Arial', fill: '#ffffff', wordWrap: { width: 280 } });
      card.add([image, bg, infoText]);
      cards.push(card);
    });

    // Configurar los botones con sus posiciones, rotaciones y eventos
    botones = [
      { x: 200, y: 400, rotation: 0, card: cards[0], texto: 'Ragdoll (USA)' },
      { x: 1750, y: 550, rotation: 0, card: cards[1], texto: 'Siamese (Thailand)' },
      { x: 400, y: 400, rotation: 0, card: cards[2], texto: 'Maine Coon (USA)' },
      { x: 1400, y: 450, rotation: 0, card: cards[3], texto: 'Persian (Iran)' },
      { x: 300, y: 200, rotation: 0, card: cards[4], texto: 'Sphinx (Canada)' },
      { x: 300, y: 330, rotation: 0, card: cards[5], texto: 'Bengal (USA)' },
      { x: 1000, y: 250, rotation: 0, card: cards[6], texto: 'British Shorthair (UK)' },
      { x: 1000, y: 200, rotation: 0, card: cards[7], texto: 'Scottish Fold (Scotland)' },
      { x: 300, y: 400, rotation: 0, card: cards[8], texto: 'Savannah (USA)' },
      { x: 1700, y: 500, rotation: 0, card: cards[9], texto: 'Birman (Myanmar)' }
    ];

    // Añadir los botones al mapa y configurar los eventos de clic
    botones.forEach((btnConfig, index) => {
      let boton = this.add.sprite(btnConfig.x, btnConfig.y, 'botonO').setInteractive().setScale(0.5).setRotation(Phaser.Math.DegToRad(btnConfig.rotation));
      boton.on('pointerdown', function() {
        cards.forEach(card => card.setVisible(false)); // Ocultar todas las tarjetas antes de mostrar la seleccionada
        btnConfig.card.setVisible(true);
        map.setAlpha(0.3);
        titulo.setText(btnConfig.texto);
      });
      boton.on('pointerup', function () {
        btnConfig.card.setVisible(false);
        map.setAlpha(1);
        titulo.setText('');
      });
      botones[index].sprite = boton;
    });

    // Configurar las teclas de cursor para mover el mapa
    cursors = this.input.keyboard.createCursorKeys();
  }

  function update() {
    // Mover el mapa y los botones según las teclas de cursor presionadas
    if (cursors.left.isDown) {
      map.x -= 5;
      botones.forEach(btn => btn.sprite.x -= 5);
    } else if (cursors.right.isDown) {
      map.x += 5;
      botones.forEach(btn => btn.sprite.x += 5);
    } else if (cursors.up.isDown) {
      map.y -= 5;
      botones.forEach(btn => btn.sprite.y -= 5);
    } else if (cursors.down.isDown) {
      map.y += 5;
      botones.forEach(btn => btn.sprite.y += 5);
    }
  }
});
