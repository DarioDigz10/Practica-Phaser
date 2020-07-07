class Onda {
    constructor(centerX, centerY, graphics, name) {
        // Elipse exteriorthis
        this.creator = name;
        this.radioX = 120;
        this.radioY = 50;
        this.ellipse = new Phaser.Geom.Ellipse(centerX, centerY, this.radioX, this.radioY);
        //Elipse interior
        this.radioX_inner = this.radioX - 10;
        this.radioY_inner = this.radioX - 10;
        this.ellipse_inner = new Phaser.Geom.Ellipse(centerX, centerY, this.radioX_inner, this.radioY_inner);
        //Relleno
        this.ellipse_relleno = new Phaser.Geom.Ellipse(centerX, centerY, this.radioX - 5, this.radioY - 5);
        this.graphics = graphics;
    }

    checkCollision(x, y) {
        return this.ellipse.contains(x, y) && !this.ellipse_inner.contains(x, y);
    }

    expandir() {
        //Incrementar el radio de la elipse exterior
        this.radioX += this.radioX * 0.01;
        this.radioY += this.radioY * 0.01;
        this.ellipse.setSize(this.radioX, this.radioY);
        //Actualizar el radio del la elipse interior; siempre se mantiene a 10 de distancia
        this.radioX_inner = this.radioX - 10;
        this.radioY_inner = this.radioY - 10;
        this.ellipse_inner.setSize(this.radioX_inner, this.radioY_inner);
        this.ellipse_relleno.setSize(this.radioX - 5, this.radioY - 5);
    }

    render() {
        this.graphics.clear();
        //this.graphics.strokeEllipseShape(this.ellipse, 64);
        //this.graphics.strokeEllipseShape(this.ellipse_inner, 64);
        this.graphics.strokeEllipseShape(this.ellipse_relleno, 64);
    }
}