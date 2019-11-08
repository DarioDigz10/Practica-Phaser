class EscenaJuego extends Phaser.Scene {

    constructor() {
        super("EscenaJuego");
    }

    preload()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('collider', 'assets/collider.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
    }

    create()
    {
        //  A simple background for our game
        this.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        colliders = this.physics.add.staticGroup();

        //  Here we create the Ground COLLIDERS.
        colliders.create(100, 400, 'collider').setScale(0.2).refreshBody();
        colliders.create(700, 400, 'collider').setScale(0.2).refreshBody();
        colliders.create(400, 550, 'collider').setScale(0.2).refreshBody();
        colliders.create(400, 250, 'collider').setScale(0.2).refreshBody();

        // The PLAYERS and its settings
        player = new Player(100, 350, this);
        player1 = new Player(700, 350, this);
        player2 = new Player(400, 500, this);
        player3 = new Player(400, 200, this);

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

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {x: 12, y: 0, stepX: 70}
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
    }

    update()
    {
        if (gameOver)
        {
            //volver al menu principal
            this.scene.start("MainMenu");
        }

//PLAYER, LEFT

        if (cursors.left.isDown && player.body.touching.down)
        {   //player en el suelo y puede saltar
            ondasArray.push(new Onda(player.object.x, player.object.y, this.add.graphics({lineStyle: {width: 2, color: 0xff0000}})));
            jumptimer = 1;
            player.velocity.y = -150;
        } else if (cursors.left.isDown && (jumptimer != 0)) {
            //player esta en el aire pulsando la tecla de saltar todavia
            if (jumptimer > 25) {
                // // player lleva 30 frames en el aire
                jumptimer = 0;
            } else {
                // player puede seguir saltando, no ha alcanzado los 30 frames
                jumptimer++;
                player.velocity.y = -150;
            }
        } else if (jumptimer != 0) {
            //reset jumptimer al dejar de pulsar la tecla
            jumptimer = 0;
        }

        //PLAYER1, RIGHT			
        if (cursors.right.isDown && player1.body.touching.down)
        {
            ondasArray.push(new Onda(player1.object.x, player1.object.y, this.add.graphics({lineStyle: {width: 2, color: 0x0000ff}})));
            jumptimer1 = 1;
            player1.body.velocity.y = -150;
        } else if (cursors.right.isDown && (jumptimer1 != 0))
        {
            if (jumptimer1 > 25) {
                jumptimer1 = 0;
            } else {
                jumptimer1++;
                player1.body.velocity.y = -150;
            }
        } else if (jumptimer1 != 0) {
            jumptimer1 = 0;
        }

        //PLAYER2, DOWN		
        if (cursors.down.isDown && player2.body.touching.down)
        {
            ondasArray.push(new Onda(player2.object.x, player2.object.y, this.add.graphics({lineStyle: {width: 2, color: 0x00ff00}})));
            jumptimer2 = 1;
            player2.body.velocity.y = -150;
        } else if (cursors.down.isDown && (jumptimer2 != 0))
        {
            if (jumptimer2 > 25) {
                jumptimer2 = 0;
            } else {
                jumptimer2++;
                player2.body.velocity.y = -150;
            }
        } else if (jumptimer2 != 0) {
            jumptimer2 = 0;
        }

        //PLAYER3, UP				
        if (cursors.up.isDown && player3.body.touching.down)
        {
            ondasArray.push(new Onda(player3.object.x, player3.object.y, this.add.graphics({lineStyle: {width: 2, color: 0xffff00}})));
            jumptimer3 = 1;
            player3.body.velocity.y = -150;
        } else if (cursors.up.isDown && (jumptimer3 != 0))
        {
            if (jumptimer3 > 25) {
                jumptimer3 = 0;
            } else {
                jumptimer3++;
                player3.body.velocity.y = -150;
            }
        } else if (jumptimer3 != 0) {
            jumptimer3 = 0;
        }

        //Update ELLIPSES
        for (var i = 0; i < ondasArray.length; i++) {
            ondasArray[i].expandir();
            ondasArray[i].render();
        }
    }

    collectStar(player, star)
    {
        star.disableBody(true, true);

        //  Add and update the score
        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }
    }

    hitBomb(player, bomb)
    {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }
}
;