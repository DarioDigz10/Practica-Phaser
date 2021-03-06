
class Player {
    constructor(x, y, sprite, scene) {
        this.object = scene.physics.add.sprite(x, y, sprite);
        this.object.setDepth(1);
        this.object.setBounce(0);
        scene.physics.add.collider(this.object, colliders);
        //Puntero al componente body:
        this.body = this.object.body;
        //Puntero al componente body.velocity:
        this.velocity = this.body.velocity;
        this.muerto = false;
    }
    matar() {

        //this.object.disableBody(true, true);
        this.muerto = true;
        this.object.destroy();
    }
}