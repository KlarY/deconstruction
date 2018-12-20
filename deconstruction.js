var cv = require('opencv');
const gm = require('gm')
var fs= require("fs");
let target;
const unit = 10;
let h, w;

async function start(){
    await resize('input.png');
    // await analyse();
    // await deconstruct();
}

async function resize(input){
    target = gm(input);
    target.size((err, val) => {
        h = Math.floor(val.height/unit);
        w = Math.floor(val.width/unit);
        let offsetX = Math.floor((val.width % unit) / 2);
        let offsetY = Math.floor((val.height % unit) / 2);
        console.log(`原图高${val.height}，宽${val.width}`);
        console.log(`高${h}个单位`);
        console.log(`宽${w}个单位`);
        console.log(`offsetX ${offsetX}`);
        console.log(`offsetY ${offsetY}`);
        target = target.crop(w * unit, h * unit , offsetX, offsetY);
    })
}

async function analyse(){

}
start();