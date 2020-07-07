class WaitScene extends Phaser.Scene {

    constructor() {
        super("WaitScene");
    }
    
    preload()
    {
        this.load.image('fondo', 'assets/fondoMenu.jpg');
        this.load.image('escenario', 'assets/escenario.jpg');
        this.load.image('logoJuego', 'assets/logoWaveJump.png');
        this.load.image('back', 'assets/back.png');
        this.load.image('negro', 'assets/fondo.jpg');
        this.load.image('barrilAmarillo', 'assets/barrilAmarillo.png');
    }

    create()
    {
        this.add.image(750, 450, 'fondo').setScale(2.07);
        this.add.image(750, 450, 'negro').setScale(1).setAlpha(0.6);;
		
        var texto = this.add.text(game.config.width / 2, (game.config.height / 2) - 150, 'Waiting for players...', {
            fontSize: '75px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Arial'
        }).setOrigin(0.5);
		
        var texto1 = this.add.text(game.config.width / 2, (game.config.height / 2) - 50, 'Player 1: ...', {
            fontSize: '40px',
            fill: '#ff0000',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        var texto2 = this.add.text(game.config.width / 2, (game.config.height / 2) + 50, 'Player 2: ...', {
            fontSize: '40px',
            fill: '#0000ff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        var texto3 = this.add.text(game.config.width / 2, (game.config.height / 2) + 150, 'Player 3: ...', {
            fontSize: '40px',
            fill: '#00ff00',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        var texto4 = this.add.text(game.config.width / 2, (game.config.height / 2) + 250, 'Player 4: ...', {
            fontSize: '40px',
            fill: '#ffff00',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        var texto5 = this.add.text(game.config.width / 2, (game.config.height / 2) + 350, '', {
            fontSize: '55px',
            fill: '#ffffff',
            stroke: '#00000',
            strokeThickness: 3,
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        connection.send('conectado');
		connection.onmessage = function(msg) {
            if(msg.data.substring(0,1)=="t"){
            	console.log("Numero de jugador: " + msg.data.substring(1,2));
            	numeroJugadores=parseInt(msg.data.substring(1,2))+1;
            	miNumeroJugador=numeroJugadores;
            	console.log(numeroJugadores);
            	
            }else{
            	console.log("Se ha conectado el jugador " + msg.data.substring(0,1));
            	numeroJugadores++;
            	console.log(numeroJugadores);
            }

            texto5.setText('You are the player number '+miNumeroJugador);
            switch(numeroJugadores){
				case 3:
				     texto3.setText('Player 3: connected');
				case 2:
					texto2.setText('Player 2: connected');
				case 1:
					texto1.setText('Player 1: connected');
			}
        }
    }

    update()
    {
		if(numeroJugadores==4){
			this.scene.start("EscenaJuego");
		}
    }
}