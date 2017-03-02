class Sun {
    constructor(radius, planets, k, angle, color, rotationToDraw) {
        this.radius = radius;
        this.planets = planets;
        this.k = k;
        this.angle = angle;
        this.color = color;
        this.rotationToDraw = rotationToDraw;
        this.path = [];
        this.first = null;
        this.hasCompletedOrbit = false;
        this.startedDrawing = false;
        this.firstChildSingleRotationAngle = this.rotationToDraw + (this.angle);
        this.sun = new Orbit(p.width / 2, p.height / 2, p.width / 4, 0, this.k, this.angle, null);
        let next = this.sun;
        for (var i = 0; i < this.planets; i++) {
            next = next.addChild();
            if (this.first == null) {
                this.first = next;
            }
        }
        this.end = next;
    }
    update() {
        for (var i = 0; i < resolution; i++) {
            var next = this.sun;
            while (next != null) {
                next.update();
                next = next.child;
            }
            if (!this.hasCompletedOrbit) {
                this.path.push(p.createVector(this.end.x, this.end.y));
            }
            if (this.first.angle > this.firstChildSingleRotationAngle) {
                this.hasCompletedOrbit = true;
            }
            else {
            }
        }
    }
    show() {
        var next = this.sun;
        while (next != null) {
            next.show();
            next = next.child;
        }
        p.beginShape();
        p.stroke(this.color);
        p.noFill();
        for (var pos of this.path) {
            p.vertex(pos.x, pos.y);
        }
        p.endShape();
    }
}
//# sourceMappingURL=sun.js.map