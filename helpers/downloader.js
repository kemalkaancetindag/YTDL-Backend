const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');




const download = async (url,type) => {
    console.log(process.cwd())
    switch(type) {
        case 'MP4':
            ytdl(url).pipe(fs.createWriteStream(`${process.cwd()}\\temps\\video.mp4`));
           
        case 'MP3':
            ytdl(url).pipe(fs.createWriteStream(`${process.cwd()}\\temps\\video.mp4`)).on('finish', convert);
            console.log( `${process.cwd()}\\temps\\video.mp3`)
            

          
      } 
    
  

}

const convert = async () => {
    var proc = new ffmpeg({ source: `${process.cwd()}\\temps\\video.mp4` })
        proc.setFfmpegPath("C:/FFmpeg/bin/ffmpeg.exe")
        proc.saveToFile(`${process.cwd()}\\temps\\video.mp3`, (stdout, stderr) => {
            if (stderr) {
                console.log(stderr)
            }
            else {
                console.log('done')
            }
        }
    
    )


}



module.exports = download
