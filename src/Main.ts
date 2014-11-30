///<reference path="../typings/tsd.d.ts" />

module app {
    "use strict";

    export class Main {
        private stage: createjs.Stage;
        private circle: createjs.Shape;

        constructor(canvas_id: string) {
            this.stage = new createjs.Stage(canvas_id);
            this.circle = new createjs.Shape();
            this.circle.graphics.beginFill("red").drawCircle(0, 0, 50);
            this.circle.x = 100;
            this.circle.y = 100;
            this.stage.addChild(this.circle);
            // stage.addChild(new createjs.Shape()).setTransform(100,100).graphics.f("red").dc(0,0,50);
            this.stage.update();
        }

    }
}
