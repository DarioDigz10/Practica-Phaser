class MainMenu extends Phaser.Scene {

    constructor() {
        super("MainMenu");
    }
    preload()
    {
        this.load.image('fondo', 'assets/fondoMenu.jpg');
        this.load.image('escenario', 'assets/escenario.jpg');
        this.load.image('logoJuego', 'assets/logoWaveJump.png');

    }

    create()
    {
        this.add.image(750, 450, 'fondo').setScale(2.07);



        var texto = this.add.text(game.config.width / 2, (game.config.height / 2) + 200, 'Press Enter to start.', {
            fontSize: '40px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Amatica SC'
        }).setOrigin(0.5)

        this.logoMovil = this.add.image(game.config.width / 2, (game.config.height / 2) - 30, 'logoJuego').setScale(0.2);
        this.speed = 0.3;

    }

    update()
    {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown) {
            this.scene.start("EscenaJuego");
        }

        this.logoMovil.y += this.speed;
        //console.log(this.logoMovil.y);
        if (this.logoMovil.y >= ((game.config.height / 2)) || this.logoMovil.y <= ((game.config.height / 2) - 30))
        {
            this.speed *= -1;
            //console.log(this.speed);
        }

    }

}