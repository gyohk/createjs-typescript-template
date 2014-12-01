///<reference path="../typings/tsd.d.ts" />
///<reference path="libs/bitmapdata-for-createjs.d.ts" />
module app {
    "use strict";

    export class Main {
        private stage: createjs.Stage;
        private FPS = 60;
        private NUM_PARTICLE = 10000;
        private LIGHTER_SCALE = 5;
        private INTERVAL = 3000;

        private _stats: Stats;
        private _forceMapImage: HTMLImageElement;

        private stageW = 0;
        private stageH = 0;
        private rect: createjs.Rectangle = null;
        private bmd:createjs.BitmapData = null;
        private bitmap:createjs.Bitmap = null;
        private lighter: createjs.BitmapData = null;
        private forcemap:createjs.BitmapData = null;
        private particles = [];
        private intervalID: number = null;
        private channelX = 0;
        private channelY = 1;

        constructor(canvas_id: string) {
            var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvas_id);
            this.stage = new createjs.Stage(canvas);
            this.stageW = canvas.width;
            this.stageH = canvas.height;

            this._stats = new Stats();
            this._stats.setMode(0);
            this._stats.domElement.style.position = "absolute";
            this._stats.domElement.style.left = "0px";
            this._stats.domElement.style.top = "0px";
            document.body.appendChild(this._stats.domElement);
            this.load();
        }

        load():void {
            var loader = new createjs.LoadQueue();
            var fileloadHandler = (evt:any) => {
                this._forceMapImage = evt.result;
                loader.removeAllEventListeners();
                loader.removeAll();
                this.init();
            };
            loader.addEventListener("fileload", fileloadHandler);
            loader.loadFile({src:"images/forcemap.jpg", id:"forcemap"});
        }

        init():void{
            var w = this.stageW;
            var h = this.stageH;
            this.forcemap = new createjs.BitmapData(this._forceMapImage);
            var bmd = this.bmd = new createjs.BitmapData(null, w, h);
            this.bitmap = new createjs.Bitmap(bmd.canvas);
            this.stage.addChild(this.bitmap);
            this.lighter = new createjs.BitmapData(null, w / this.LIGHTER_SCALE, h / this.LIGHTER_SCALE);
            this.rect = new createjs.Rectangle(0, 0, w, h);
            var particles = this.particles;
            for (var i = 0, l = this.NUM_PARTICLE; i < l; i++) {
                var x = Math.random() * w >> 0;
                var y = Math.random() * h >> 0;
                particles[i] = new Particle(x, y, 0, 0, 0, 0);
            }
            createjs.Ticker.setFPS(this.FPS);
            createjs.Ticker.useRAF = true;
            createjs.Ticker.addEventListener("tick", () => {
                this.tick();
            });
            this.intervalID = setInterval(() => {
                this.changeMapChannel();
            }, this.INTERVAL);
        }

        changeMapChannel():void {
            this.channelX = ((Math.random() * 3) >> 0) * 8;
            this.channelY = ((Math.random() * 3) >> 0) * 8;
        }

        tick(evt?:any):void {
            var w = this.stageW;
            var h = this.stageH;
            var bmd = this.bmd;
            var forcemap = this.forcemap;
            bmd.fillRect(this.rect, 0xEE000000);
            var channelX = this.channelX;
            var channelY = this.channelY;
            var particles = this.particles;
            for (var i = 0, l = particles.length; i < l; i++) {
                var p = particles[i];
                var color = forcemap.getPixel(p.x, p.y);
                var cx = color >> channelX & 0xFF;
                var cy = color >> channelY & 0xFF;
                p.ax += (cx - 128) * 0.0005;
                p.ay += (cy - 128) * 0.0005;
                p.sx += p.ax;
                p.sy += p.ay;
                p.x += p.sx;
                p.y += p.sy;
                p.ax *= 0.96;
                p.ay *= 0.96;
                p.sx *= 0.92;
                p.sy *= 0.92;
                if (p.x < 0) {
                    p.x = w - 1;
                } else if (w <= p.x) {
                    p.x = 0;
                }
                if (p.y < 0) {
                    p.y = h - 1;
                } else if (h <= p.y) {
                    p.y = 0;
                }
                bmd.setPixel(p.x, p.y, 0x0099FF);
            }
            bmd.updateContext();
            var lighter = this.lighter;
            lighter.drawImage(bmd, 0, 0, w, h, 0, 0, w / this.LIGHTER_SCALE, h / this.LIGHTER_SCALE);
            bmd.draw(lighter, new createjs.Matrix2D(this.LIGHTER_SCALE, 0, 0, this.LIGHTER_SCALE, 0, 0), null, "lighter", null, true);
            this.stage.update();
            this._stats.update();
        }
    }

    class Particle {
        public x = 0;
        public y = 0;
        public ax = 0;
        public ay = 0;
        public sx = 0;
        public sy = 0;

        constructor(x: number, y: number, ax: number, ay: number, sx: number, sy: number) {
            this.x = x;
            this.y = y;
            this.ax = ax;
            this.ay = ay;
            this.sx = sx;
            this.sy = sy;
        }
    }
}
