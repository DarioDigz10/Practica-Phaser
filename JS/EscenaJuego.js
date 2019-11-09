class EscenaJuego extends Phaser.Scene {

    constructor() {
        super("EscenaJuego");
    }

    preload()
    {
        this.load.image('escenario', 'assets/escenario.jpg');
        this.load.image('shadow', 'assets/shadow.png');
        this.load.image('escenario2', 'assets/escenario2.png');
        this.load.image('collider', 'assets/collider.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
    }

    create()
    {
        //Background for the game
        this.add.image(750, 450, 'escenario').setScale(1.5);
        this.add.image(750, 450, 'escenario2').setScale(1.5).setDepth(0.5);
        //Sombras
        this.add.image(1050, 630, 'shadow');
        this.add.image(740, 490, 'shadow');
        this.add.image(860, 770, 'shadow');
        this.add.image(550, 590, 'shadow');
        //  The platforms group contains the ground and the 2 ledges we can jump on
        colliders = this.physics.add.staticGroup();

        //  Here we create the Ground COLLIDERS.
        //colliders.create(100, 400, 'collider').setScale(0.2).refreshBody();
        colliders.create(1050, 640, 'collider').setScale(0.2).refreshBody();
        colliders.create(740, 500, 'collider').setScale(0.2).refreshBody();
        colliders.create(860, 780, 'collider').setScale(0.2).refreshBody();
        colliders.create(550, 600, 'collider').setScale(0.2).refreshBody();

        // The PLAYERS and its settings
        player1 = new Player(1050, 440, this);
        player3 = new Player(740, 300, this);
        player2 = new Player(860, 580, this);
        player = new Player(550, 440, this);

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  The score
        scoreText3 = this.add.text(16, 16, 'Score: ' + victoria3, {fontSize: '40px', fill: '#ffff00', stroke: '#00000f', strokeThickness: 2});
        scoreText1 = this.add.text(1300, 16, 'Score: ' + victoria1, {fontSize: '40px', fill: '#0000ff', stroke: '#00000f', strokeThickness: 2});
        scoreText = this.add.text(16, 800, 'Score: ' + victoria, {fontSize: '40px', fill: '#ff0000', stroke: '#00000f', strokeThickness: 2});
        scoreText2 = this.add.text(1300, 800, 'Score: ' + victoria2, {fontSize: '40px', fill: '#00ff00', stroke: '#00000f', strokeThickness: 2});
    }

    update()
    {
        /*
         if (gameOver)
         {
         //volver al menu principal
         this.scene.start("MainMenu");
         }//*/
        if (jugadoresMuertos >= 3) {
            ondasArray = [];
            gameOver = true;
        }

//PLAYER, LEFT
        if (!player.muerto) {
            if (cursors.left.isDown) player.saltar();
            else if (player.jumptimer != 0) {
                //reset jumptimer al dejar de pulsar la tecla
                player.jumptimer = 0;
                player.haSaltado = true;
            }
            if (player.haSaltado && player.body.touching.down) {
                player.haSaltado = false;
                ondasArray.push(new Onda(player.object.x, player.body.bottom, this.add.graphics({lineStyle: {width: 2, color: 0xff0000}}), "player"));
            }
        }
//PLAYER1, RIGHT	
        if (!player1.muerto) {
            if (cursors.right.isDown) player1.saltar();
            else if (player1.jumptimer != 0) {
                player1.jumptimer = 0;
                player1.haSaltado = true;
            }
            if (player1.haSaltado && player1.body.touching.down) {
                player1.haSaltado = false;
                ondasArray.push(new Onda(player1.object.x, player1.body.bottom, this.add.graphics({lineStyle: {width: 2, color: 0x0000ff}}), "player1"));
            }
        }
//PLAYER2, DOWN
        if (!player2.muerto) {
            if (cursors.down.isDown) player2.saltar();
            else if (player2.jumptimer != 0) {
                player2.jumptimer = 0;
                player2.haSaltado = true;
            }
            if (player2.haSaltado && player2.body.touching.down) {
                player2.haSaltado = false;
                ondasArray.push(new Onda(player2.object.x, player2.body.bottom, this.add.graphics({lineStyle: {width: 2, color: 0x00ff00}}), "player2"));
            }
        }
//PLAYER3, UP	
        if (!player3.muerto) {
            if (cursors.up.isDown) player3.saltar();
            else if (player3.jumptimer != 0) {
                player3.jumptimer = 0;
                player3.haSaltado = true;
            }
            if (player3.haSaltado && player3.body.touching.down) {
                player3.haSaltado = false;
                ondasArray.push(new Onda(player3.object.x, player3.body.bottom, this.add.graphics({lineStyle: {width: 2, color: 0xffff00}}), "player3"));
            }
        }
        //Update ELLIPSES
        for (var i = 0; i < ondasArray.length; i++) {
            ondasArray[i].expandir();
            ondasArray[i].render();
            //Colisiones:
            if (!player.muerto) {
                if (ondasArray[i].checkCollision(player.object.x, player.body.bottom) && player.body.touching.down && ondasArray[i].creator != "player") {
                    player.matar();
                    jugadoresMuertos++;
                }
            }
            if (!player1.muerto) {
                if (ondasArray[i].checkCollision(player1.object.x, player1.body.bottom) && player1.body.touching.down && ondasArray[i].creator != "player1") {
                    player1.matar();
                    jugadoresMuertos++;
                }
            }
            if (!player2.muerto) {
                if (ondasArray[i].checkCollision(player2.object.x, player2.body.bottom) && player2.body.touching.down && ondasArray[i].creator != "player2") {
                    player2.matar();
                    jugadoresMuertos++;
                }
            }
            if (!player3.muerto) {
                if (ondasArray[i].checkCollision(player3.body.x, player3.body.bottom) && player3.body.touching.down && ondasArray[i].creator != "player3") {
                    player3.matar();
                    jugadoresMuertos++;
                }
            }
        }

        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown && gameOver) {

            if (!player.muerto) {
                victoria++;
            }
            if (!player1.muerto) {
                victoria1++;
            }
            if (!player2.muerto) {
                victoria2++;
            }
            if (!player3.muerto) {
                victoria3++;
            }
            ondasArray = [];
            gameOver = false;
            jugadoresMuertos = 0;
            this.scene.start("EscenaJuego");
        }
    }
}
;