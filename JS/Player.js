
class Player {
    constructor(x, y, scene) {
        this.object = scene.physics.add.sprite(x, y, 'dude');
        this.object.setDepth(1);
        this.object.setBounce(0);
        this.object.setScale(2);
        scene.physics.add.collider(this.object, colliders);
        //Puntero al componente body:
        this.body = this.object.body;
        //Puntero al componente body.velocity:
        this.velocity = this.body.velocity;
        //Variables:
        this.muerto = false;
        this.haSaltado = false;
        this.jumptimer = 0;
    }

    saltar() {
        if (this.body.touching.down)
        {
            //player en el suelo y puede saltar
            this.jumptimer = 1;
            this.velocity.y = -200;
        } else if (this.jumptimer != 0) {
            //player esta en el aire pulsando la tecla de saltar todavia
            if (this.jumptimer > 30) {
                // player lleva 30 frames en el aire
                this.jumptimer = 0;
                this.haSaltado = true;
            } else {
                // player puede seguir saltando, no ha alcanzado los 30 frames
                this.jumptimer++;
                this.velocity.y += -10;
            }
        }
    }

    matar() {
        this.muerto = true;
        this.object.destroy();
    }
}