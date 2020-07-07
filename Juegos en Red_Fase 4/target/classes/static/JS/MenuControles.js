class MenuControles extends Phaser.Scene {

    constructor() {
        super("MenuControles");
    }
    preload()
    {
        this.load.image('fondo', 'assets/fondoMenu.jpg');
        this.load.image('escenario', 'assets/escenario.jpg');
        this.load.image('logoJuego', 'assets/logoWaveJump.png');
        this.load.image('back', 'assets/back.png');
        this.load.image('negro', 'assets/fondo.jpg');

    }

    create()
    {
        this.add.image(750, 450, 'fondo').setScale(2.07);
        this.add.image(750, 450, 'negro').setScale(1).setAlpha(0.6);;

        var texto = this.add.text(game.config.width / 2, (game.config.height / 2) - 250, 'How to play', {
            fontSize: '100px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        var texto1 = this.add.text(game.config.width / 2, (game.config.height / 2) - 100, 'Press SPACE to jump.', {
            fontSize: '35px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        var texto2 = this.add.text(game.config.width / 2, (game.config.height / 2), 'The more you press, the higher you jump.', {
            fontSize: '35px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        var texto3 = this.add.text(game.config.width / 2, (game.config.height / 2) + 100, 'When you hit the ground, a wave spawns', {
            fontSize: '35px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        var texto4 = this.add.text(game.config.width / 2, (game.config.height / 2) + 200, 'If a wave hit you, you die.', {
            fontSize: '35px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        var texto5 = this.add.text(game.config.width / 2, (game.config.height / 2) + 300, '', {
            fontSize: '35px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Arial'
        }).setOrigin(0.5);
/*
        var texto5 = this.add.text(game.config.width / 2, (game.config.height / 2) + 350, 'Press C to go back to Menu.', {
            fontSize: '35px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Amatica SC'
        }).setOrigin(0.5);*/
        /*
         this.logoMovil = this.add.image(game.config.width / 2, (game.config.height / 2) - 30, 'logoJuego').setScale(0.3);
         this.speed = 0.3;*/
        this.botonjoin = this.add.image(game.config.width / 2, (game.config.height / 1.212) - 30, 'back').setScale(0.3);
        this.botonjoin.setInteractive();
        this.botonjoin.on('pointerover', function (event) {

            this.setTint(0x909090);

        });

        this.botonjoin.on('pointerout', function (event) {

            this.clearTint();

        });
        this.botonjoin.on('pointerdown',function (event) {
            botonjoin=true;

        });
    }

    update()
    {


        if(botonjoin){
        	botonjoin=false;
        	var elem = document.getElementById("myText").style.display = 'block';
        	this.scene.start("MainMenu");
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