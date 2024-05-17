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
  let fotos = [];
  let botones = [];

  function preload() {
    // Carga de las imágenes necesarias
    this.load.image('mapa', '../assets/img/mapa.png');
    this.load.image('botonO', '../assets/img/play.png');
    this.load.image('ragdoll', '../assets/img/a.jpeg');
    this.load.image('siamese', '../assets/img/b.jpeg');
    this.load.image('mainecoon', '../assets/img/s.jpeg');
    this.load.image('persian', '../assets/img/p.jpeg');
    this.load.image('sphinx', '../assets/img/si.jpeg');
  }

  function create() {
    // Añadir la imagen del mapa y hacerla interactiva
    map = this.add.image(0, 0, 'mapa').setOrigin(0, 0).setInteractive();

    // Crear las fotos y ocultarlas inicialmente
    fotos = [
      this.add.sprite(180, 310, 'ragdoll').setScale(0.25).setVisible(false),
      this.add.sprite(180, 310, 'siamese').setScale(0.25).setVisible(false),
      this.add.sprite(180, 310, 'mainecoon').setScale(0.25).setVisible(false),
      this.add.sprite(180, 310, 'persian').setScale(0.25).setVisible(false),
      this.add.sprite(180, 310, 'sphinx').setScale(0.25).setVisible(false)
    ];

    // Configurar los botones con sus posiciones, rotaciones y eventos
    botones = [
      { x: 200, y: 400, rotation: 0, foto: fotos[0], texto: 'Ragdoll (USA)' },
      { x: 1750, y: 550, rotation: 0, foto: fotos[1], texto: 'Siamese (Thailand)' },
      { x: 400, y: 400, rotation: 0, foto: fotos[2], texto: 'Maine Coon (USA)' },
      { x: 1400, y: 450, rotation: 0, foto: fotos[3], texto: 'Persian (Iran)' },
      { x: 300, y: 200, rotation: 0, foto: fotos[4], texto: 'Sphinx (Canada)' }
    ];

    // Añadir los botones al mapa y configurar los eventos de clic
    botones.forEach((btnConfig, index) => {
      let boton = this.add.sprite(btnConfig.x, btnConfig.y, 'botonO').setInteractive().setScale(0.5).setRotation(Phaser.Math.DegToRad(btnConfig.rotation));
      boton.on('pointerdown', function() {
        btnConfig.foto.setVisible(true);
        map.setAlpha(0.3);
        titulo.setText(btnConfig.texto);
      });
      boton.on('pointerup', function () {
        btnConfig.foto.setVisible(false);
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