
class Player {
    constructor(x, y, scene) {
        this.object = scene.physics.add.sprite(x, y, 'dude');
        this.object.setBounce(0.2);
        scene.physics.add.collider(this.object, colliders);
        //Puntero al componente body:
        this.body = this.object.body;
        //Puntero al componente body.velocity:
        this.velocity =  this.body.velocity;
    }
}