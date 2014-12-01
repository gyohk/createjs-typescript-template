///<reference path="../typings/tsd.d.ts" />
///<reference path="libs/bitmapdata-for-createjs.d.ts" />

module app {
    "use strict";

    export class Main {
        private stage:createjs.Stage;
        private canvas:HTMLCanvasElement;

        private squares = [];
        private container: createjs.Container;
        private settings: any;
        private isChanged = true;
        private logoBmp: createjs.Bitmap;

        private logo: HTMLImageElement;
        private loader: HTMLImageElement;

        constructor(canvas_id:string) {
            this.canvas = <HTMLCanvasElement>document.getElementById(canvas_id);
            this.stage = new createjs.Stage(this.canvas);

            this.init();
        }

        init():void {
            this.stage.enableMouseOver(10);
            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", this.tick);
            this.settings = {
                max:5,
                min:1,
                changeEffect:this.handleChangeEffect
            };

            var gui = new dat.GUI();
            gui.add(this.settings, 'max', 0.1, 5);
            gui.add(this.settings, 'min', 0.1, 2);
            gui.add(this.settings, 'changeEffect');

            this.loader = new Image();
            this.loader.onload = this.handleLoad;
            this.loader.src = "images/mona.jpg";

            this.logo = new Image();
            this.logo.src = "images/createJS.png";
            this.logo.onload = this.handleLogo;
        }

        handleLogo = () => {
            this.logoBmp = new createjs.Bitmap(this.logo);
            this.logoBmp.x = this.stage.canvas.width - this.logo.width;
            this.logoBmp.y = this.stage.canvas.height - this.logo.height;
            this.stage.addChild(this.logoBmp);
            this.stage.update();
        };

        handleChangeEffect = () => {
            this.isChanged = !this.isChanged;
        };

        handleLoad = () => {
            var width = 25;
            var height = 25;
            var padding = 1;
            var cols = Math.ceil(this.loader.width / width);
            var rows = Math.ceil(this.loader.height / height);
            this.container = new createjs.Container();
            this.container.cursor = "pointer";
            var source = new createjs.Bitmap(this.loader);
            var total = cols*rows;
            for(var i=0;i<total;i++) {
                var square = new createjs.Bitmap(source.cacheCanvas);
                source.uncache();
                var x = (width + padding) * (i%cols);
                var y = (i/cols | 0) * (height+padding);
                source.cache(x, y, width, height, 1);
                square.regX = width>>1;
                square.regY = height>>1;
                square.x = x;
                square.y = y;
                this.squares.push(square);
                this.container.addChild(square);
            }
            this.container.x = this.canvas.width - (cols*width)>>1;
            this.container.y = this.canvas.height - (rows*height)>>1;
            this.stage.addChild(this.container);
        };

        handleMouseOver = (target:createjs.Bitmap) => {
            var maxScale = this.settings.max;
            var minScale = this.settings.min;
            var dx = this.container.x + (target.x - this.stage.mouseX) ;
            var dy = this.container.y + (target.y - this.stage.mouseY) ;
            var distance = Math.sqrt(dx*dx+dy*dy);
            var value = (this.isChanged) ? (distance/100) : (100/distance);
            var scale = Math.max(minScale, Math.min(value, maxScale));
            target.scaleX = target.scaleY = scale;
            if (this.isChanged) {
                if (target.scaleX === maxScale) {
                    this.container.setChildIndex(target, this.container.getNumChildren()-1);
                }
            }
        };

        tick = () => {
            var l = this.squares.length;
            for(var i=0;i<l;i++) {
                var square = this.squares[i];
                this.handleMouseOver(square);
            }
            this.stage.update();
        };
    }
}

