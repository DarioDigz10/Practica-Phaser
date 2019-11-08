class MainMenu extends Phaser.Scene {

                constructor() {
                    super("MainMenu");
                }
                preload()
                {
                    this.load.image('sky', 'assets/sky.png');
                }

                create()
                {
                    this.add.image(400, 300, 'sky');
                    var texto = this.add.text(game.config.width / 2, game.config.height / 2, 'Press Enter to start', {
                        fontSize: '40px',
                        fill: '#000000'
                    }).setOrigin(0.5)
                }

                update()
                {
                    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown) {
                        this.scene.start("EscenaJuego");
                    }
                }
            }