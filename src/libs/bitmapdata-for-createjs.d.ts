// Type definitions for BitmapData ver1.0.0
// Project: http://kudox.jp/java-script/createjs-easeljs-bitmapdata
// Definitions by: gyoh_k <https://github.com/gyoh_k>
// Definitions: https://github.com/gyoh_k/TSDef_BitmapDataForCreateJS

/*
 Copyright (c) 2013 gyoh_k
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// AS3 like BitmapData class for CreateJS.
// Library documentation : http://kudox.jp/reference/bitmapdata_for_easeljs/


declare module createjs {
    export class BitmapData {
        constructor(image?:HTMLImageElement, width?:number, height?:number, fillColor?:string);

        constructor(image?:HTMLCanvasElement, width?:number, height?:number, fillColor?:string);

        constructor(image?:HTMLVideoElement, width?:number, height?:number, fillColor?:string);

        constructor(image?:HTMLImageElement, width?:number, height?:number, fillColor?:number);

        constructor(image?:HTMLCanvasElement, width?:number, height?:number, fillColor?:number);

        constructor(image?:HTMLVideoElement, width?:number, height?:number, fillColor?:number);

        constructor(image?:any, width?:number, height?:number, fillColor?:number);

        // properties
        canvas:HTMLCanvasElement;
        context:CanvasRenderingContext2D;
        height:number;
        name:string;
        rect:Rectangle;
        width:number;

        // methods
        applyFilter(source:BitmapData, sourceRect:Rectangle, destPoint:Point, filter:Filter):void;

        applyFilter(source:DisplayObject, sourceRect:Rectangle, destPoint:Point, filter:Filter):void;

        applyFilter(source:Stage, sourceRect:Rectangle, destPoint:Point, filter:Filter):void;

        applyFilter(source:HTMLImageElement, sourceRect:Rectangle, destPoint:Point, filter:Filter):void;

        applyFilter(source:HTMLCanvasElement, sourceRect:Rectangle, destPoint:Point, filter:Filter):void;

        applyFilter(source:HTMLVideoElement, sourceRect:Rectangle, destPoint:Point, filter:Filter):void;

        clearRect(x:number, y:number, width:number, height:number):void;

        clone():BitmapData;

        colorTransform(rect:Rectangle, colorTransform:ColorTransform):void;

        compare(otherSource:BitmapData):any; // BitmapData or int
        compare(otherSource:DisplayObject):any; // BitmapData or int
        compare(otherSource:Stage):any; // BitmapData or int
        compare(otherSource:HTMLImageElement):any; // BitmapData or int
        compare(otherSource:HTMLCanvasElement):any; // BitmapData or int
        compare(otherSource:HTMLVideoElement):any; // BitmapData or int

        copyChannel(source:BitmapData, sourceRect:Rectangle, destPoint:Point, sourceChannel:number, destChannel:number):void;

        copyChannel(source:DisplayObject, sourceRect:Rectangle, destPoint:Point, sourceChannel:number, destChannel:number):void;

        copyChannel(source:Stage, sourceRect:Rectangle, destPoint:Point, sourceChannel:number, destChannel:number):void;

        copyChannel(source:HTMLImageElement, sourceRect:Rectangle, destPoint:Point, sourceChannel:number, destChannel:number):void;

        copyChannel(source:HTMLCanvasElement, sourceRect:Rectangle, destPoint:Point, sourceChannel:number, destChannel:number):void;

        copyChannel(source:HTMLVideoElement, sourceRect:Rectangle, destPoint:Point, sourceChannel:number, destChannel:number):void;

        copyPixels(source:any, sourceRect:Rectangle, destPoint:Point, alphaSource?:any, alphaPoint?:Point, mergeAlpha?:boolean):void; // soucee, alphaSource ... BitmapData | DisplayObject | Stage | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
        dispose():void;

        draw(source:BitmapData, matrix?:Matrix2D, colorTransform?:ColorTransform, compositeOperation?:string, clipRect?:Rectangle, smoothing?:boolean):void;

        draw(source:DisplayObject, matrix?:Matrix2D, colorTransform?:ColorTransform, compositeOperation?:string, clipRect?:Rectangle, smoothing?:boolean):void;

        draw(source:Stage, matrix?:Matrix2D, colorTransform?:ColorTransform, compositeOperation?:string, clipRect?:Rectangle, smoothing?:boolean):void;

        draw(source:HTMLImageElement, matrix?:Matrix2D, colorTransform?:ColorTransform, compositeOperation?:string, clipRect?:Rectangle, smoothing?:boolean):void;

        draw(source:HTMLCanvasElement, matrix?:Matrix2D, colorTransform?:ColorTransform, compositeOperation?:string, clipRect?:Rectangle, smoothing?:boolean):void;

        draw(source:HTMLVideoElement, matrix?:Matrix2D, colorTransform?:ColorTransform, compositeOperation?:string, clipRect?:Rectangle, smoothing?:boolean):void;

        drawImage(source:BitmapData, sx?:number, sy?:number, sw?:number, sh?:number, dx?:number, dy?:number, dw?:number, dh?:number):void;

        drawImage(source:DisplayObject, sx?:number, sy?:number, sw?:number, sh?:number, dx?:number, dy?:number, dw?:number, dh?:number):void;

        drawImage(source:Stage, sx?:number, sy?:number, sw?:number, sh?:number, dx?:number, dy?:number, dw?:number, dh?:number):void;

        drawImage(source:HTMLImageElement, sx?:number, sy?:number, sw?:number, sh?:number, dx?:number, dy?:number, dw?:number, dh?:number):void;

        drawImage(source:HTMLCanvasElement, sx?:number, sy?:number, sw?:number, sh?:number, dx?:number, dy?:number, dw?:number, dh?:number):void;

        drawImage(source:HTMLVideoElement, sx?:number, sy?:number, sw?:number, sh?:number, dx?:number, dy?:number, dw?:number, dh?:number):void;

        expand(rect:Rectangle):void;

        fillRect(rect:Rectangle, color:string):void;

        fillRect(rect:Rectangle, color:number):void;

        floodFill(x:number, y:number, color:number):void;

        static getBitmapData(object:DisplayObject):BitmapData;

        getColorBoundsRect(mask:number, color:number, findColor?:boolean):Rectangle;

        getPixel(x:number, y:number):number;

        getPixel32(x:number, y:number):number;

        getPixels(rect:Rectangle):number[];

        histogram(hRect:Rectangle):number[];

        hitTest(firstPoint:Point, firstAlphaThreshold:number, secondObject:Point, secondObjectPoint?:Point, secondAlphaThreshold?:number):boolean;

        hitTest(firstPoint:Point, firstAlphaThreshold:number, secondObject:Rectangle, secondObjectPoint?:Point, secondAlphaThreshold?:number):boolean;

        hitTest(firstPoint:Point, firstAlphaThreshold:number, secondObject:BitmapData, secondObjectPoint?:Point, secondAlphaThreshold?:number):boolean;

        hitTest(firstPoint:Point, firstAlphaThreshold:number, secondObject:DisplayObject, secondObjectPoint?:Point, secondAlphaThreshold?:number):boolean;

        hitTest(firstPoint:Point, firstAlphaThreshold:number, secondObject:Stage, secondObjectPoint?:Point, secondAlphaThreshold?:number):boolean;

        hitTest(firstPoint:Point, firstAlphaThreshold:number, secondObject:HTMLImageElement, secondObjectPoint?:Point, secondAlphaThreshold?:number):boolean;

        hitTest(firstPoint:Point, firstAlphaThreshold:number, secondObject:HTMLCanvasElement, secondObjectPoint?:Point, secondAlphaThreshold?:number):boolean;

        hitTest(firstPoint:Point, firstAlphaThreshold:number, secondObject:HTMLVideoElement, secondObjectPoint?:Point, secondAlphaThreshold?:number):boolean;

        merge(source:BitmapData, sourceRect:Rectangle, destPoint:Point, redMultiplier:number, greenMultiplier:number, blueMultiplier:number, alphaMultiplier:number):void;

        merge(source:DisplayObject, sourceRect:Rectangle, destPoint:Point, redMultiplier:number, greenMultiplier:number, blueMultiplier:number, alphaMultiplier:number):void;

        merge(source:Stage, sourceRect:Rectangle, destPoint:Point, redMultiplier:number, greenMultiplier:number, blueMultiplier:number, alphaMultiplier:number):void;

        merge(source:HTMLImageElement, sourceRect:Rectangle, destPoint:Point, redMultiplier:number, greenMultiplier:number, blueMultiplier:number, alphaMultiplier:number):void;

        merge(source:HTMLCanvasElement, sourceRect:Rectangle, destPoint:Point, redMultiplier:number, greenMultiplier:number, blueMultiplier:number, alphaMultiplier:number):void;

        merge(source:HTMLVideoElement, sourceRect:Rectangle, destPoint:Point, redMultiplier:number, greenMultiplier:number, blueMultiplier:number, alphaMultiplier:number):void;

        noise(low?:number, high?:number, channelOptions?:number, grayScale?:boolean):void;

        paletteMap(source:BitmapData, sourceRect:Rectangle, destPoint:Point, redArray?:number[], greenArray?:number[], blueArray?:number[], alphaArray?:number[]):void;

        paletteMap(source:DisplayObject, sourceRect:Rectangle, destPoint:Point, redArray?:number[], greenArray?:number[], blueArray?:number[], alphaArray?:number[]):void;

        paletteMap(source:Stage, sourceRect:Rectangle, destPoint:Point, redArray?:number[], greenArray?:number[], blueArray?:number[], alphaArray?:number[]):void;

        paletteMap(source:HTMLImageElement, sourceRect:Rectangle, destPoint:Point, redArray?:number[], greenArray?:number[], blueArray?:number[], alphaArray?:number[]):void;

        paletteMap(source:HTMLCanvasElement, sourceRect:Rectangle, destPoint:Point, redArray?:number[], greenArray?:number[], blueArray?:number[], alphaArray?:number[]):void;

        paletteMap(source:HTMLVideoElement, sourceRect:Rectangle, destPoint:Point, redArray?:number[], greenArray?:number[], blueArray?:number[], alphaArray?:number[]):void;

        perlinNoise(baseX:number, baseY:number, numOctaves:number, randomSeed:number, stitch?:boolean, fractalNoise?:boolean, channelOptions?:number, grayScale?:boolean, offsets?:Point[], interpolateType?:string):void;

        pixelDissolve(source:BitmapData,    sourceRect:Rectangle, destPoint:Point, buffer?:number[], numPixels?:number, fillColor?:number):any; // number[] or number
        pixelDissolve(source:DisplayObject, sourceRect:Rectangle, destPoint:Point, buffer?:number[], numPixels?:number, fillColor?:number):any; // number[] or number
        pixelDissolve(source:Stage,            sourceRect:Rectangle, destPoint:Point, buffer?:number[], numPixels?:number, fillColor?:number):any; // number[] or number
        pixelDissolve(source:HTMLImageElement, sourceRect:Rectangle, destPoint:Point, buffer?:number[], numPixels?:number, fillColor?:number):any; // number[] or number
        pixelDissolve(source:HTMLCanvasElement, sourceRect:Rectangle, destPoint:Point, buffer?:number[], numPixels?:number, fillColor?:number):any; // number[] or number
        pixelDissolve(source:HTMLVideoElement, sourceRect:Rectangle, destPoint:Point, buffer?:number[], numPixels?:number, fillColor?:number):any; // number[] or number

        scroll(x:number, y:number):void;

        setPixel(x:number, y:number, color:number):void;

        setPixel32(x:number, y:number, color:number):void;

        setPixels(rect:Rectangle, inputArray:number[]):void;

        threshold(source:BitmapData, sourceRect:Rectangle, destPoint:Point, operation:string, threshold:number, color?:number, mask?:number, copySource?:boolean):void;

        threshold(source:DisplayObject, sourceRect:Rectangle, destPoint:Point, operation:string, threshold:number, color?:number, mask?:number, copySource?:boolean):void;

        threshold(source:Stage, sourceRect:Rectangle, destPoint:Point, operation:string, threshold:number, color?:number, mask?:number, copySource?:boolean):void;

        threshold(source:HTMLImageElement, sourceRect:Rectangle, destPoint:Point, operation:string, threshold:number, color?:number, mask?:number, copySource?:boolean):void;

        threshold(source:HTMLCanvasElement, sourceRect:Rectangle, destPoint:Point, operation:string, threshold:number, color?:number, mask?:number, copySource?:boolean):void;

        threshold(source:HTMLVideoElement, sourceRect:Rectangle, destPoint:Point, operation:string, threshold:number, color?:number, mask?:number, copySource?:boolean):void;

        toString():string;

        updateContext():void;

        updateImageData():void;
    }

    export class BitmapDataChannel {
        static ALPHA:number;
        static BLUE:number;
        static GREEN:number;
        static RED:number;
    }

    export class ColorTransform {
        constructor(redMultiplier?:number, greenMultiplier?:number, blueMultiplier?:number, alphaMultiplier?:number, redOffset?:number, greenOffset?:number, blueOffset?:number, alphaOffset?:number);

        // properties
        alphaMultiplier:number;
        alphaOffset:number;
        blueMultiplier:number;
        blueOffset:number;
        greenMultiplier:number;
        greenOffset:number;
        redMultiplier:number;
        redOffset:number;

        // methods
        clone():ColorTransform;

        concat(second:ColorTransform):void;

        toString():string;
    }
}
