///<reference path="../typings/tsd.d.ts" />
///<reference path="libs/bitmapdata-for-createjs.d.ts" />

module app {
    "use strict";

    export class Main {
        private stage:createjs.Stage;
        private queue:createjs.LoadQueue;

        private image:HTMLImageElement;
        private bitmapData:createjs.BitmapData;
        private bd:createjs.BitmapData;
        private bitmap:createjs.Bitmap;
        private point:createjs.Point = new createjs.Point();

        //preloader
        preloader:createjs.LoadQueue;
        manifest:Object[];
        totalLoaded = 0;

        constructor(canvas_id:string) {
            this.stage = new createjs.Stage(canvas_id);

            this.manifest = [
                {src: "images/emitter.png", id: "emitter"}
            ];

            this.queue = new createjs.LoadQueue(false);
            this.queue.addEventListener("progress", () => this.handleProgress());
            this.queue.addEventListener("complete", () => this.handleComplete());
            this.queue.addEventListener("fileload", () => this.handleFileLoad());
            this.queue.loadManifest(this.manifest);
        }

        handleProgress(event?:createjs.Event):void {
            //use event.loaded to get the percentage of the loading
        }

        handleComplete(event?:createjs.Event):void {
            this.image = <HTMLImageElement>this.queue.getResult("emitter");
            this.init();
        }

        handleFileLoad(event?:createjs.Event):void {
            // do nothing.
        }

        init():void {

            var board:createjs.Shape = new createjs.Shape();
            board.graphics.beginFill("#005500");
            board.graphics.drawRect(0, 0, 600, 400);
            board.graphics.endFill();
            this.stage.addChild(board);


            var base:createjs.Shape = new createjs.Shape();
            base.graphics.beginFill("#996633");
            base.graphics.drawRect(0, 400, 600, 20);
            base.graphics.endFill();
            this.stage.addChild(base);

            this.bitmapData = new createjs.BitmapData(null, 400, 400, "rgba(0,0,0,0)");
            this.bitmap = new createjs.Bitmap(this.bitmapData.canvas);
            this.bitmap.x = 100;
            this.stage.addChild(this.bitmap);

            this.bd = new createjs.BitmapData(this.image, this.image.width, this.image.height);
            this.bitmapData.pixelDissolve(this.bd, this.bd.rect, this.point, null, 400 * 400 * 0.4);

            //this.stage.addChild(new createjs.Bitmap(bd.canvas));

            createjs.Ticker.on("tick", () => this.tick(createjs.Event));
            createjs.Ticker.setFPS(30);
        }

        tick(event:createjs.Event):void {
            this.stage.update();
        }
    }

}


