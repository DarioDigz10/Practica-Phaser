class MenuControles extends Phaser.Scene {

    constructor() {
        super("MenuControles");
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

        var texto = this.add.text(game.config.width / 2, (game.config.height / 2) - 250, 'Controls', {
            fontSize: '100px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Amatica SC'
        }).setOrigin(0.5);

        var texto1 = this.add.text(game.config.width / 2, (game.config.height / 2) - 100, 'Player 1: Left arrow.', {
            fontSize: '40px',
            fill: '#ffff00',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Amatica SC'
        }).setOrigin(0.5);

        var texto2 = this.add.text(game.config.width / 2, (game.config.height / 2), 'Player 2: W.', {
            fontSize: '40px',
            fill: '#0000ff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Amatica SC'
        }).setOrigin(0.5);

        var texto3 = this.add.text(game.config.width / 2, (game.config.height / 2) + 100, 'Player 3: Right arrow.', {
            fontSize: '40px',
            fill: '#ff0000',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Amatica SC'
        }).setOrigin(0.5);

        var texto4 = this.add.text(game.config.width / 2, (game.config.height / 2) + 200, 'Player 4: G.', {
            fontSize: '40px',
            fill: '#00ff00',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Amatica SC'
        }).setOrigin(0.5);

        var texto5 = this.add.text(game.config.width / 2, (game.config.height / 2) + 300, 'Press Enter to start.', {
            fontSize: '40px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Amatica SC'
        }).setOrigin(0.5);
/*
        var texto5 = this.add.text(game.config.width / 2, (game.config.height / 2) + 350, 'Press C to go back to Menu.', {
            fontSize: '40px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Amatica SC'
        }).setOrigin(0.5);*/
        /*
         this.logoMovil = this.add.image(game.config.width / 2, (game.config.height / 2) - 30, 'logoJuego').setScale(0.3);
         this.speed = 0.3;*/

    }

    update()
    {

        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown) {
            this.scene.start("EscenaJuego");
        }
/*
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC).isDown) {
            this.scene.start("MainMenu");
        }*/
        /*
         this.logoMovil.y += this.speed;
         //console.log(this.logoMovil.y);
         if (this.logoMovil.y >= ((game.config.height / 2)) || this.logoMovil.y <= ((game.config.height / 2) - 30))
         {
         this.speed *= -1;
         //console.log(this.speed);
         }*/

    }

}