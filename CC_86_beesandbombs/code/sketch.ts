// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/H81Tdrmz2LA
// Original GIF: https://beesandbombs.tumblr.com/post/149654056864/cube-wave

//missing from p5.d.ts
class myP5 extends p5 {
    pointLight;
    directionalLight;
    WEBGL;
    dist;
    rotateX;
    rotateY;
    colorMode;
    RGB;
    HSB;
}

var p: myP5 = new myP5();

let angle = 0;
let w = 24;
let ma;
let maxD;

function setup() {
    p.createCanvas(400, 400, p.WEBGL);
    ma = p.atan(p.cos(p.QUARTER_PI));
    maxD = p.dist(0, 0, 200, 200);
}

function draw() {
    p.colorMode(p.RGB);
    p.background(200);

    p.ortho(-400, 400, 400, -400, 0, 1000);
    p.rotateX(-ma);
    p.rotateY(-p.QUARTER_PI);

    // lighting copied from Davenewt's variant: https://codepen.io/anon/pen/wprwdP?editors=0010
    p.colorMode(p.HSB);
    p.pointLight(255, 255, 255, 0, 0, 400);
    p.pointLight(100, 50, 100, -300, -300, p.height / 2);
    p.directionalLight(150, 150, 150, -0.8, -0.8, 0);

    for (let z = 0; z < p.height; z += w) {
        for (let x = 0; x < p.width; x += w) {
            p.push();
            let d = p.dist(x, z, p.width / 2, p.height / 2);
            let offset = p.map(d, 0, maxD, -p.PI, p.PI);
            let a = angle + offset;
            let h = p.floor(p.map(p.sin(a), -1, 1, 100, 300));
            (<any>p).translate(x - p.width / 2, 0, z - p.height / 2);
            //p.normalMaterial();

            p.ambientMaterial(210);
            //p.ambientMaterial(p.color('blue'));
            //p.ambientMaterial(p.color('green'));
            //p.ambientMaterial(p.color('red'));

            p.box(w, h, w);
            //rect(x - width / 2 + w / 2, 0, w - 2, h);
            p.pop();
        }
    }

  angle -= 0.1;
}