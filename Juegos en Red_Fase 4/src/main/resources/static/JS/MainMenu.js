class MainMenu extends Phaser.Scene {

    constructor() {
        super("MainMenu");
    }
    preload() {
        this.load.image('fondo', 'assets/fondoMenu.jpg');
        this.load.image('escenario', 'assets/escenario.jpg');
        this.load.image('logoJuego', 'assets/logoWaveJump.png');
        this.load.image('join', 'assets/join.png');
        this.load.image('control', 'assets/control.png');
    }

    create() {
        this.add.image(750, 450, 'fondo').setScale(2.07);

        var texto = this.add.text(game.config.width / 2, (game.config.height / 2) + 300, 'Enter username:', {
            fontSize: '40px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Amatica SC'
        }).setOrigin(0.5);

        this.logoMovil = this.add.image(game.config.width / 2, (game.config.height / 2) - 30, 'logoJuego').setScale(0.3);
        this.botonjoin = this.add.image(game.config.width / 2 + 70, (game.config.height / 1.3), 'join').setScale(0.3);
        this.botonjoin.setInteractive();
        this.botonjoin.on('pointerover', function (event) {
            this.setTint(0x909090);
        });

        this.botonjoin.on('pointerout', function (event) {
            this.clearTint();
        });
        this.botonjoin.on('pointerdown', function (event) {
            botonjoin = true;
        });

        this.control = this.add.image(game.config.width / 2 - 70, (game.config.height / 1.3), 'control').setScale(0.3);
        this.control.setInteractive();
        this.control.on('pointerover', function (event) {
            this.setTint(0x909090);
        });

        this.control.on('pointerout', function (event) {
            this.clearTint();
        });
        this.control.on('pointerdown', function (event) {
            botoncontrol = true;
        });

        this.speed = 0.3;
    }

    update() {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown || botonjoin) {
            botonjoin = true;
            usuario = document.getElementById("myText").value;
            console.log(usuario);

            $.ajax({
                method: "POST",
                url: 'http://' + ip + ':8080/items/user',
                data: '{"id": 0, "name": "' + usuario + '","contadorMensajes": 0}',
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
            }).done(function (item) {
                console.log("Item created: " + JSON.stringify(item));
            }).fail(function (item) { console.log("MIERDA " + item) });

            var elem = document.getElementById("myText");

            elem.parentNode.removeChild(elem);
            this.scene.start("WaitScene");
        }

        if (botoncontrol) {
            botoncontrol = false;
            var elem = document.getElementById("myText").style.display = 'none';
            this.scene.start("MenuControles");
        }

        this.logoMovil.y += this.speed;
        if (this.logoMovil.y >= ((game.config.height / 2)) || this.logoMovil.y <= ((game.config.height / 2) - 30)) {
            this.speed *= -1;
        }
    }
}