class MainMenu extends Phaser.Scene {

                constructor() {
                    super("MainMenu");
                }
                preload()
                {
                    this.load.image('sky', 'assets/sky.png');
					this.load.image('escenario', 'assets/escenario.jpg');

                }

                create()
                {
                    this.add.image(400, 300, 'sky').setScale(3);
					this.add.image(750, 450, 'escenario').setScale(1.5);

                    var texto = this.add.text(game.config.width / 2, game.config.height / 2, 'Press Enter to start', {
                        fontSize: '100px',
                        fill: '#ffffff',
						stroke :  '#00000' , 
						strokeThickness :  3 ,
						fontFamily: 'Amatica SC'
                    }).setOrigin(0.5)
                }

                update()
                {
                    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown) {
                        this.scene.start("EscenaJuego");
                    }
                }
            }