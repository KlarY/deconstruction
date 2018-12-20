var cv = require('opencv');
var fs= require("fs");
let unit = 30;
async function start(){
    await resize();
    // await calculate();
}

async function calculate(){
    // let pics = fs.readdirSync('./resized');
    let pics = ['1148.jpg'];
    for (let i in pics) {
        try{
            await calculatePic(pics[i])
        }catch{
            continue;
        }
    }
}

async function calculatePic(pic){
    return new Promise((resolve, reject) =>{
        let x = 0, y = 0, z = 0;
        cv.readImage('./resized/' + pic, function(err, img){
            for(let i = 0; i < unit; i++){
                for(let j = 0; j < unit; j++){
                    let tmp = img.pixel(i,j);
                    x+=tmp[0];
                    y+=tmp[1];
                    z+=tmp[2];
                }
            }
            let av_x = Math.floor(x / (unit * unit));
            let av_y = Math.floor(y / (unit * unit));
            let av_z = Math.floor(z / (unit * unit));
            // var bins = 128,
            // size = [bins, bins, bins],
            // channels = [0, 1, 2],
            // range = [[0, 256], [0, 256], [0, 256]],
            // uniform = true;
    
            // /// Compute 64 (=bins^3) histograms:
            // var imageHist = cv.histogram.calcHist(img, channels, size, range, uniform);
            
            // var max = 0;
            // var maxColor = null;
            // var step = 256/bins;
            // var halfStep = step/2;
        
            // imageHist.map(function(bHist, bIndex){
            //     return bHist.map(function(bgHist, gIndex){
            //         return bgHist.map(function(bgrHist, rIndex){
            //             if(bgrHist > max) {
            //                 max = bgrHist; 
            //                 maxColor = [bIndex*step+halfStep, gIndex*step+halfStep, rIndex*step+halfStep];
            //             }
            //         })
            //     })
            // })
            console.log([av_x, av_y, av_z]);
            var newImg = new cv.Matrix(unit, unit, cv.Constants.CV_8UC3, [av_x, av_y, av_z]);
            // // var buff = new Buffer(40*40);
            // // for (let i = 0; i < 40*40; i++){
            // //     buff[i] = maxColor;
            // // }
            // // newImg.put(buff);
            newImg.save('test.jpg');
            newImg.release();
            delete newImg;
            img.release();
            delete img;

        })
    })
}

async function resize(){
    let pics = fs.readdirSync('./catpics');
    for (let i in pics) {
        try{
            await resizePic(pics[i])
        }catch{
            continue;
        }
    }
}

async function resizePic(pic){
    return new Promise((resolve, reject) =>{
        cv.readImage('./catpics/' + pic, function(err, img){
            if (err){
                console.log('Error in read:' + err);
                reject()
            }
            img.resize(unit, unit, function(err, im){
                if (err){
                    console.log('Error in resize:' + err);
                    reject()
                }
                im.save('./resized/' + pic);
                console.log(pic + 'resized');
                im.release();
                delete im;
                resolve();
            })
            img.release();
            delete img;
        })
    })
}

start()
  