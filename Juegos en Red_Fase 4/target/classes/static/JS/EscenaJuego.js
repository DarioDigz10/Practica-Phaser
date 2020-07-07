class EscenaJuego extends Phaser.Scene {

    prueba(){
    	mensaje();
    }
    constructor() {
        super("EscenaJuego");

    }

    preload()
    {
        this.load.image('escenario', 'assets/escenario.jpg');
        this.load.image('shadow', 'assets/shadow.png');
        this.load.image('escenario2', 'assets/escenario2.png');
        this.load.image('collider', 'assets/collider.png');

        this.load.image('Red', 'assets/barrilRojo.png');
        this.load.image('Blue', 'assets/barrilAzul.png');
        this.load.image('Green', 'assets/barrilVerde.png');
        this.load.image('Yellow', 'assets/barrilAmarillo.png');

        this.load.audio("musicBg", 'assets/background.mp3');
        this.load.audio("wave", 'assets/bow.mp3');
    }

    create()
    {

        //  A simple background for our game
        this.add.image(750, 450, 'escenario').setScale(1.5);
        //this.sound.play("musicBg");
        music = this.sound.add("musicBg");
        wave = this.sound.add("wave");
        wave.play({volume: 0, loop: false});
        music.play({volume: 1, loop: true});
        this.add.image(750, 450, 'escenario2').setScale(1.5).setDepth(0.5);
        //Sombras
        this.add.image(1050, 630, 'shadow').setAlpha(0.6);
        this.add.image(740, 490, 'shadow').setAlpha(0.6);
        this.add.image(860, 770, 'shadow').setAlpha(0.6);
        this.add.image(550, 590, 'shadow').setAlpha(0.6);
        //  The platforms group contains the ground and the 2 ledges we can jump on
        colliders = this.physics.add.staticGroup();

        //  Here we create the Ground COLLIDERS.
        //colliders.create(100, 400, 'collider').setScale(0.2).refreshBody();
        colliders.create(1050, 660, 'collider').setScale(0.2).refreshBody();
        colliders.create(740, 520, 'collider').setScale(0.2).refreshBody();
        colliders.create(860, 800, 'collider').setScale(0.2).refreshBody();
        colliders.create(550, 620, 'collider').setScale(0.2).refreshBody();

        // The PLAYERS and its settings
        player = new Player(1050, 440, 'Red', this);
        player1 = new Player(740, 300, 'Blue', this);
        player2 = new Player(860, 580, 'Green', this);
        player3 = new Player(550, 440, 'Yellow', this);

        //  Our player animations, turning, walking left and walking right.
        /*this.anims.create({
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
         });*/

        //  Input Events
        jumpKey = this.input.keyboard.addKey('SPACE')
        jumpKey0 = this.input.keyboard.addKey('right')
        jumpKey1 = this.input.keyboard.addKey('W')
        jumpKey2 = this.input.keyboard.addKey('G')
        jumpKey3 = this.input.keyboard.addKey('left')

        //  The score
        scoreText3 = this.add.text(16, 16, 'Score: ' + victoria3, {fontSize: '40px', fill: '#ffff00', stroke: '#00000f', strokeThickness: 2});
        scoreText1 = this.add.text(1300, 16, 'Score: ' + victoria1, {fontSize: '40px', fill: '#0000ff', stroke: '#00000f', strokeThickness: 2});
        scoreText = this.add.text(16, 800, 'Score: ' + victoria, {fontSize: '40px', fill: '#ff0000', stroke: '#00000f', strokeThickness: 2});
        scoreText2 = this.add.text(1300, 800, 'Score: ' + victoria2, {fontSize: '40px', fill: '#00ff00', stroke: '#00000f', strokeThickness: 2});
        

            		connection.onerror = function(e) {
            			console.log("WS error: " + e);
            		}
            		connection.onmessage = function(msg) {
            			//console.log("WS message: " + msg.data+"  Jugador  "+msg.data.substring(0,1));
            			if(msg.data.substring(1,2)==2){
            				//console.log("Se crea onda "+msg.data.substring(0,1));
            				switch(msg.data.substring(0,1)){
            					case '0':
            					creaOnda=true;
            						break;
            				    case '1':
            				    creaOnda1=true;
            				    	break;
            					case '2':
            					creaOnda2=true;
            						break;
            					case '3':
            					
            					creaOnda3=true;
            				
            						break;
            				}
            			}
            			if(msg.data.substring(1,2)==0){
            				//console.log("Se crea onda "+msg.data.substring(0,1));
            				switch(msg.data.substring(0,1)){
            					case '0':
            					saltandoOn=1;
            						break;
            				    case '1':
            				    saltandoOn1=1;
            				    	break;
            					case '2':
            					saltandoOn2=1;
            						break;
            					case '3':
            					saltandoOn3=1;
            						break;
            				}
            			}
            			if(msg.data.substring(1,2)==1){
            				//console.log("Se crea onda "+msg.data.substring(0,1));
            				switch(msg.data.substring(0,1)){
            					case '0':
            					saltandoOn=0;
            						break;
            				    case '1':
            				    saltandoOn1=0;
            				    	break;
            					case '2':
            					saltandoOn2=0;
            						break;
            					case '3':
            					saltandoOn3=0;
            						break;
            				}
            			}
            			if(msg.data.substring(1,2)==3){
            				console.log("Muerto Jugador"+msg.data.substring(0,1));
            				/*switch(msg.data.substring(0,1)){
            					case '0':
            						matado=true;
            						break;
            				    case '1':
            				   	 	matado1=true;
            				    	break;
            					case '2':
            						matado2=true;
            						break;
            					case '3':
            						matado3=true;
            						break;
            				}*/
            			}
            			if(msg.data.substring(1,2)==4){
            				reinicioJuego=true;
            			}
            		}
            		
    }

	salta(){
		connection.send('0');
    }
    dejoSalta(){
		connection.send('1');
    }
    creoOnda(){
		connection.send('2');
    }
    muero(){
		connection.send('3');
    }
	reiniciarEscena(){
		connection.send('4');
    }
    
    update()
    {
    
    	if(reinicioJuego){
    		reinicioJuego=false;
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
            haSaltado = false;
            haSaltado1 = false;
            haSaltado2 = false;
            haSaltado3 = false;
            saltandoOn=0;
            saltandoOn1=0;
            saltandoOn2=0;
            saltandoOn3=0;
			creaOnda=true;
			creaOnda1=true;
			creaOnda2=true;
			creaOnda3=true;
            gameOver = false;
            jugadoresMuertos = 0;
            this.scene.start("EscenaJuego");
    	}
    	if(saltandoOn==1 && !player.muerto){
    		player.velocity.y = -150;
    	}
    	if(saltandoOn1==1 && !player1.muerto){
    		player1.velocity.y = -150;
    	}
    	if(saltandoOn2==1 && !player2.muerto){
    		player2.velocity.y = -150;
    	}
    	if(saltandoOn3==1 && !player3.muerto){
    		player3.velocity.y = -150;
    	}
    	
        if (jugadoresMuertos >= 3 && !gameOver) {
            var win = "Nobody";
            var strikeWin = '#ff0000';
            if (!player.muerto) {
                win = "RED";
                strikeWin = '#ff0000';
            }
            if (!player1.muerto) {
                win = "BLUE";
                strikeWin = '#0000ff';
            }
            if (!player2.muerto) {
                win = "GREEN";
                strikeWin = '#00ff00';
            }
            if (!player3.muerto) {
                win = "YELLOW";
                strikeWin = '#ffff00';
            }

            var texto = this.add.text(game.config.width / 2, game.config.height / 3, win, {
                fontSize: '100px',
                fill: strikeWin,
                stroke: '#00000',
                strokeThickness: 3,
                fontFamily: 'Amatica SC'
            }).setOrigin(0.5).setDepth(1);

            var texto = this.add.text(game.config.width / 2, game.config.height / 2, 'Press Enter to restart', {
                fontSize: '100px',
                fill: '#ffffff',
                stroke: '#00000',
                strokeThickness: 3,
                fontFamily: 'Amatica SC'
            }).setOrigin(0.5).setDepth(1);
            ondasArray = [];
            gameOver = true;
        }

//PLAYER, LEFT
        if (!player.muerto ) {
            if (jumpKey.isDown && player.body.touching.down && 1==miNumeroJugador)
            {   //player en el suelo y puede saltar
				this.salta();
                jumptimer = 1;
                player.velocity.y = -150;
            } else if (jumpKey.isDown && (jumptimer != 0)) {
                //player esta en el aire pulsando la tecla de saltar todavia
                if (jumptimer > 25) {
                    // // player lleva 30 frames en el aire
                    this.dejoSalta();
                    jumptimer = 0;
                    haSaltado = true;
                } else {
                    // player puede seguir saltando, no ha alcanzado los 30 frames
                    jumptimer++;
                    player.velocity.y = -150;
                }
            } else if (jumptimer != 0) {
                //reset jumptimer al dejar de pulsar la tecla
                this.dejoSalta();
                jumptimer = 0;
                haSaltado = true;
            }
            if (haSaltado && player.body.touching.down || creaOnda) {
            	if(!creaOnda)
            		this.creoOnda();
                	haSaltado = false;
                creaOnda=false;
                wave.play({volume: 1, loop: false});
                ondasArray.push(new Onda(player.object.x, player.body.bottom, this.add.graphics({lineStyle: {width: 8, color: 0xff0000,alpha:0.5}}), "player"));
            }
        }
//PLAYER1, RIGHT	
        if (!player1.muerto ) {
            if (jumpKey.isDown && player1.body.touching.down && 2==miNumeroJugador)
            {
            	this.salta();
                jumptimer1 = 1;
                player1.body.velocity.y = -150;
            } else if (jumpKey.isDown && (jumptimer1 != 0))
            {
                if (jumptimer1 > 25) {
                	this.dejoSalta();
                    jumptimer1 = 0;
                    haSaltado1 = true;
                } else {
                    jumptimer1++;
                    player1.body.velocity.y = -150;
                }
            } else if (jumptimer1 != 0) {
            	this.dejoSalta();
                jumptimer1 = 0;
                haSaltado1 = true;
            }

            if (haSaltado1 && player1.body.touching.down || creaOnda1) {
            	if(!creaOnda1)
            		this.creoOnda();
                haSaltado1 = false;
                creaOnda1=false;
                wave.play({volume: 1, loop: false});
                ondasArray.push(new Onda(player1.object.x, player1.body.bottom, this.add.graphics({lineStyle: {width: 8, color: 0x0000ff,alpha:0.5}}), "player1"));
            }
        }
//PLAYER2, DOWN
        if (!player2.muerto ) {
            if (jumpKey.isDown && player2.body.touching.down && 3==miNumeroJugador)
            {
            	this.salta();
                jumptimer2 = 1;
                player2.body.velocity.y = -150;
            } else if (jumpKey.isDown && (jumptimer2 != 0))
            {
                if (jumptimer2 > 25) {
                    jumptimer2 = 0;
                    this.dejoSalta();
                    haSaltado2 = true;
                } else {
                    jumptimer2++;
                    player2.body.velocity.y = -150;
                }
            } else if (jumptimer2 != 0) {
            	this.dejoSalta();
                jumptimer2 = 0;
                haSaltado2 = true;
            }
            if (haSaltado2 && player2.body.touching.down || creaOnda2) {
                if(!creaOnda2)
            		this.creoOnda();
                haSaltado2 = false;
                creaOnda2=false;
                wave.play({volume: 1, loop: false});
                ondasArray.push(new Onda(player2.object.x, player2.body.bottom, this.add.graphics({lineStyle: {width: 8, color: 0x00ff00,alpha:0.5}}), "player2"));
            }
        }
//PLAYER3, UP	
        if (!player3.muerto ) {
            if (jumpKey.isDown && player3.body.touching.down && 4==miNumeroJugador)
            {
            	this.salta();
                jumptimer3 = 1;
                player3.body.velocity.y = -150;
            } else if (jumpKey.isDown && (jumptimer3 != 0))
            {
                if (jumptimer3 > 25) {
                	this.dejoSalta();
                    jumptimer3 = 0;
                    haSaltado3 = true;
                } else {
                    jumptimer3++;
                    player3.body.velocity.y = -150;
                }
            } else if (jumptimer3 != 0) {
            	this.dejoSalta();
                jumptimer3 = 0;
                haSaltado3 = true;
            }
            if (haSaltado3 && player3.body.touching.down || creaOnda3) {
            	if(!creaOnda3)
            		this.creoOnda();
            	haSaltado3 = false;                
                creaOnda3=false;
                
                wave.play({volume: 1, loop: false});
                ondasArray.push(new Onda(player3.object.x, player3.body.bottom, this.add.graphics({lineStyle: {width: 8, color: 0xffff00,alpha:0.5}}), "player3"));
                
            }
        }

        //Update ELLIPSES
        for (var i = 0; i < ondasArray.length; i++) {
            ondasArray[i].expandir();
            ondasArray[i].render();
            //ondasArray[i]checkCollision(player3.x, player3.y);
            if (!player.muerto) {
                if (ondasArray[i].checkCollision(player.object.x, player.body.bottom) && player.body.touching.down && ondasArray[i].creator != "player") {
                    player.matar();
                    this.muero();
                    jugadoresMuertos++;
                }
            }

            if (!player1.muerto) {
                if (ondasArray[i].checkCollision(player1.object.x, player1.body.bottom) && player1.body.touching.down && ondasArray[i].creator != "player1") {
                    player1.matar();                    
					this.muero();
                    jugadoresMuertos++;
                }
            }
            if (!player2.muerto) {
                if (ondasArray[i].checkCollision(player2.object.x, player2.body.bottom) && player2.body.touching.down && ondasArray[i].creator != "player2") {
                    player2.matar();
                    this.muero();
                    jugadoresMuertos++;
                }
            }
            if (!player3.muerto) {
                if (ondasArray[i].checkCollision(player3.body.x, player3.body.bottom) && player3.body.touching.down && ondasArray[i].creator != "player3") {
                    player3.matar();
                    this.muero();
                    jugadoresMuertos++;
                }
            }
        }
        if(matado){
        	matado=false;
			player.matar();
            jugadoresMuertos++;
        }
        if(matado1){
        	matado1=false;
			player1.matar();
            jugadoresMuertos++;
        }
		if(matado2){
			matado2=false;
			player2.matar();
            jugadoresMuertos++;
        }
		if(matado3){
			matado3=false;
			player3.matar();
            jugadoresMuertos++;
        }

        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown && gameOver) {
			this.reiniciarEscena();
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
            haSaltado = false;
            haSaltado1 = false;
            haSaltado2 = false;
            haSaltado3 = false;
            gameOver = false;
            jugadoresMuertos = 0;
            this.scene.start("EscenaJuego");
        }
    }

}
;