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
        //  A simple background for our game
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

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        /*stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {x: 12, y: 0, stepX: 70}
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        bombs = this.physics.add.group();
		*/
        //  The score
        scoreText3 = this.add.text(16, 16, 'Score: '+victoria3, {fontSize: '40px', fill: '#ffff00',stroke :  '#00000f' , strokeThickness :  2 });
        scoreText1 = this.add.text(1300, 16, 'Score: '+victoria1, {fontSize: '40px', fill: '#0000ff',stroke :  '#00000f' , strokeThickness :  2});
        scoreText = this.add.text(16, 800, 'Score: '+victoria, {fontSize: '40px', fill: '#ff0000',stroke :  '#00000f' , strokeThickness :  2});
        scoreText2 = this.add.text(1300, 800, 'Score: '+victoria2, {fontSize: '40px', fill: '#00ff00',stroke :  '#00000f' , strokeThickness :  2});
    }

    update()
    {
		
        /*if (gameOver)
        {
            //volver al menu principal
            this.scene.start("MainMenu");
        }*/
		if(jugadoresMuertos>=3){
			ondasArray=[];
			gameOver=true;
		}

//PLAYER, LEFT
		if(!player.muerto){
			if (cursors.left.isDown && player.body.touching.down)
			{   //player en el suelo y puede saltar
				
				jumptimer = 1;
				player.velocity.y = -150;
			} else if (cursors.left.isDown && (jumptimer != 0)) {
				//player esta en el aire pulsando la tecla de saltar todavia
				if (jumptimer > 25) {
					// // player lleva 30 frames en el aire
					jumptimer = 0;
					haSaltado=true;
				} else {
					// player puede seguir saltando, no ha alcanzado los 30 frames
					jumptimer++;
					player.velocity.y = -150;
				}
			} else if (jumptimer != 0) {
				//reset jumptimer al dejar de pulsar la tecla
				jumptimer = 0;
				haSaltado=true;
			}
			if(haSaltado && player.body.touching.down){
				haSaltado=false;
				ondasArray.push(new Onda(player.object.x, player.body.bottom, this.add.graphics({lineStyle: {width: 2, color: 0xff0000}}),"player"));
			}
		}
        //PLAYER1, RIGHT	
		if(!player1.muerto){		
			if (cursors.right.isDown && player1.body.touching.down)
			{
				jumptimer1 = 1;
				player1.body.velocity.y = -150;
			} else if (cursors.right.isDown && (jumptimer1 != 0))
			{
				if (jumptimer1 > 25) {
					jumptimer1 = 0;
					haSaltado1=true;
				} else {
					jumptimer1++;
					player1.body.velocity.y = -150;
				}
			} else if (jumptimer1 != 0) {
				jumptimer1 = 0;
				haSaltado1=true;
			}
			
			if(haSaltado1 && player1.body.touching.down){
				haSaltado1=false;
				ondasArray.push(new Onda(player1.object.x, player1.body.bottom, this.add.graphics({lineStyle: {width: 2, color: 0x0000ff}}),"player1"));
			}
		}
        //PLAYER2, DOWN
		if(!player2.muerto){			
			if (cursors.down.isDown && player2.body.touching.down)
			{
				jumptimer2 = 1;
				player2.body.velocity.y = -150;
			} else if (cursors.down.isDown && (jumptimer2 != 0))
			{
				if (jumptimer2 > 25) {
					jumptimer2 = 0;
					haSaltado2=true;
				} else {
					jumptimer2++;
					player2.body.velocity.y = -150;
				}
			} else if (jumptimer2 != 0) {
				jumptimer2 = 0;
				haSaltado2=true;
			}
			if(haSaltado2 && player2.body.touching.down){
				haSaltado2=false;
				ondasArray.push(new Onda(player2.object.x, player2.body.bottom, this.add.graphics({lineStyle: {width: 2, color: 0x00ff00}}),"player2"));
			}
		}
        //PLAYER3, UP	
		if(!player3.muerto){		
			if (cursors.up.isDown && player3.body.touching.down)
			{
				jumptimer3 = 1;
				player3.body.velocity.y = -150;
			} else if (cursors.up.isDown && (jumptimer3 != 0))
			{
				if (jumptimer3 > 25) {
					jumptimer3 = 0;
					haSaltado3=true;
				} else {
					jumptimer3++;
					player3.body.velocity.y = -150;
				}
			} else if (jumptimer3 != 0) {
				jumptimer3 = 0;
				haSaltado3=true;
			}
			if(haSaltado3 && player3.body.touching.down){
				haSaltado3=false;
				ondasArray.push(new Onda(player3.object.x, player3.body.bottom, this.add.graphics({lineStyle: {width: 2, color: 0xffff00}}),"player3"));
			}
		}
        //Update ELLIPSES
        for (var i = 0; i < ondasArray.length; i++) {
            ondasArray[i].expandir();
            ondasArray[i].render();
			//ondasArray[i]checkCollision(player3.x, player3.y);
			if(!player.muerto){
				if(ondasArray[i].checkCollision(player.object.x, player.body.bottom) && player.body.touching.down && ondasArray[i].creator!="player"){
					player.matar();
					jugadoresMuertos++;
				}
			}
			
			if(!player1.muerto){
				if(ondasArray[i].checkCollision(player1.object.x, player1.body.bottom) && player1.body.touching.down && ondasArray[i].creator!="player1"){
					player1.matar();
					jugadoresMuertos++;
				}
			}
			if(!player2.muerto){
				if(ondasArray[i].checkCollision(player2.object.x, player2.body.bottom) && player2.body.touching.down && ondasArray[i].creator!="player2"){
					player2.matar();
					jugadoresMuertos++;
				}
			}
			if(!player3.muerto){
				if(ondasArray[i].checkCollision(player3.body.x, player3.body.bottom) && player3.body.touching.down && ondasArray[i].creator!="player3"){
					player3.matar();
					jugadoresMuertos++;
				}
			}
        }

		
		//scoreText.addColor(ssss);scoreText
		
		

		 if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown && gameOver) {

				if(!player.muerto){
					victoria++;
				}
				if(!player1.muerto){
					victoria1++;
				}
				if(!player2.muerto){
					victoria2++;
				}
				if(!player3.muerto){
					victoria3++;
				}
				ondasArray=[];
				haSaltado=false;
				haSaltado1=false;
				haSaltado2=false;
				haSaltado3=false;
				gameOver=false;
				jugadoresMuertos = 0;
                this.scene.start("EscenaJuego");
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