///<reference path="../typings/tsd.d.ts" />
///<reference path="libs/bitmapdata-for-createjs.d.ts" />

module app {
    "use strict";

    export class Main {
        // プロパティ
        private stage:createjs.Stage;
        private bitmapData:createjs.BitmapData;
        private seed:number;
        private color:number;
        private point:createjs.Point = new createjs.Point();
        private canvas:createjs.Shape;
        private position:any = {x: 0, y: 0};
        private max:number = 4;
        private selectedId:number = 0;
        private bitmapDatas:createjs.BitmapData[];
        private seeds:number[];
        private colors:number[];
        private dictionary:any = {};
        private chalks:createjs.Shape[];
        private clearBtn:createjs.Shape;

        // コンストラクタ
        constructor(canvas_id:string) {
            this.stage = new createjs.Stage(canvas_id);
            this.stage.mouseEnabled = true;

            this.init();
        }

        // メソッド
        private init():void {
            var board:createjs.Shape = new createjs.Shape();
            board.graphics.beginFill("#005500");
            board.graphics.drawRect(0, 0, 600, 400);
            board.graphics.endFill();
            this.stage.addChild(board);

            var base:createjs.Shape = new createjs.Shape();
            base.graphics.beginFill("#996633");
            base.graphics.drawRect(0, 400, 600, 30);
            base.graphics.endFill();
            this.stage.addChild(base);

            this.bitmapDatas = [];
            this.seeds = [];
            for (var n:number = 0; n < this.max; n++) {
                var bd:createjs.BitmapData = new createjs.BitmapData(null, 600, 400, "rgba(0,0,0,0)");
                var bitmap:createjs.Bitmap = new createjs.Bitmap(bd.canvas);
                this.stage.addChild(bitmap);
                this.bitmapDatas.push(bd);
                this.seeds.push(Math.floor(Math.random()*10000));
            }
            this.colors = [0xFFFFFFFF, 0xFFFFFF66, 0xFFFFAACC, 0xFF66CCFF];
            this.canvas = new createjs.Shape();
            this.stage.addChild(this.canvas);
            this.bitmapData = this.bitmapDatas[this.selectedId];
            this.seed = this.seeds[this.selectedId];
            this.color = this.colors[this.selectedId];
            this.setup();
            this.stage.addEventListener("stagemousedown", this.press);

            createjs.Ticker.setFPS(10);
            this.stage.update();
        }

        private tick = (event:createjs.Event) => {
            this.update();
        };

        private press = (evt:MouseEvent) => {
            console.log("press");
            this.stage.removeEventListener("stagemousedown", this.press);
            this.stage.addEventListener("stagemouseup", this.release);
            this.position.x = this.stage.mouseX;
            this.position.y = this.stage.mouseY;

            createjs.Ticker.on("tick", this.tick);
        };

        private release = (evt:Event) => {
            console.log("release");
            this.stage.removeEventListener("stagemouseup", this.release);
            this.stage.addEventListener("stagemousedown", this.press);
            createjs.Ticker.removeAllEventListeners();
            this.canvas.graphics.clear();
        };

        private update():void {
            console.log("update");

            var px:number = this.stage.mouseX;
            var py:number = this.stage.mouseY;
            this.canvas.graphics.setStrokeStyle(10, "#FFFFFF");
            this.canvas.graphics.moveTo(this.position.x, this.position.y);
            this.canvas.graphics.lineTo(px, py);
            this.position.x = px;
            this.position.y = py;
            /*
            this.canvas.cache(0, 0, 600, 400);
            this.bitmapData.draw(this.canvas);
            this.bitmapData.pixelDissolve(this.bitmapData, this.bitmapData.rect, this.point, null, 600*400*0.4);
            /*
            if (this.selectedId > 0) {
                this.bitmapData.threshold(this.bitmapData, this.bitmapData.rect, this.point, ">", 0x00000000, this.color, 0x00FFFFFF);
            }

            this.canvas.uncache();
            */

            this.stage.update();
        }

        private select = (evt:MouseEvent) => {
            console.log("select");

            var target = <createjs.Shape>evt.target;
            this.selectedId = this.dictionary[target.name];
            console.log(this.selectedId);

            this.bitmapData = this.bitmapDatas[this.selectedId];
            this.seed = this.seeds[this.selectedId];
            this.color = this.colors[this.selectedId];
            for (var n:number = 0; n < this.max; n++) {
                var chalk:createjs.Shape = this.chalks[n];
                if (n === this.selectedId) {
                    chalk.rotation = 10;
                } else {
                    chalk.rotation = 0;
                }
            }
            this.stage.update();
        };

        private clear = (evt:MouseEvent) => {
            for (var n:number = 0; n < this.max; n++) {
                var bitmapData:createjs.BitmapData = this.bitmapDatas[n];
                bitmapData.fillRect(bitmapData.rect, 0x00000000);
            }
        };

        private setup = () => {
            var white:createjs.Shape = new createjs.Shape();
            white.graphics.beginFill("#FFFFFF");
            white.graphics.drawRoundRect(-30, -6, 60, 12, 6);
            white.graphics.endFill();
            white.name = "white";
            this.stage.addChild(white);
            white.x = 40;
            white.y = 415;
            white.addEventListener("click", this.select);

            var yellow:createjs.Shape = new createjs.Shape();
            yellow.graphics.beginFill("#FFFF66");
            yellow.graphics.drawRoundRect(-30, -6, 60, 12, 6);
            yellow.graphics.endFill();
            yellow.name = "yellow";
            this.stage.addChild(yellow);
            yellow.x = 110;
            yellow.y = 415;

            yellow.addEventListener("click", this.select);
            var pink:createjs.Shape = new createjs.Shape();
            pink.graphics.beginFill("#FFAACC");
            pink.graphics.drawRoundRect(-30, -6, 60, 12, 6);
            pink.graphics.endFill();
            pink.name = "pink";
            this.stage.addChild(pink);
            pink.x = 180;
            pink.y = 415;
            pink.addEventListener("click", this.select);

            var blue:createjs.Shape = new createjs.Shape();
            blue.graphics.beginFill("#66CCFF");
            blue.graphics.drawRoundRect(-30, -6, 60, 12, 6);
            blue.graphics.endFill();
            blue.name = "blue";
            this.stage.addChild(blue);
            blue.x = 250;
            blue.y = 415;
            blue.addEventListener("click", this.select);

            this.dictionary = {
                'white': 0,
                'yellow': 1,
                'pink': 2,
                'blue': 3
            };

            this.chalks = [white, yellow, pink, blue];
            white.rotation = 10;
            this.clearBtn = new createjs.Shape();
            this.clearBtn.graphics.beginFill("#ff0000").drawRect(0, 0, 150, 60);

            var label = new createjs.Text("clear", "bold 24px Arial", "#FFFFFF");
            label.name = "label";
            label.textAlign = "center";
            label.textBaseline = "middle";
            label.x = 150/2;
            label.y = 60/2;
            this.stage.addChild(this.clearBtn);
            this.clearBtn.x = 560;
            this.clearBtn.y = 415;
            this.clearBtn.addEventListener("click", this.clear);
        };
    }

}


