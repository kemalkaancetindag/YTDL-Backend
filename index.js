
const express = require('express')
const download = require('./helpers/downloader')
const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const app = express()
const cors = require('cors')
const port = 3000


app.use(cors())

app.get('/create-content', async (req, res) => {
  const { url, type, videoName } = req.query
  var responseObject = {}
  var filepath = null
  try {
    switch (type) {
      case 'MP4':
        ytdl(url).pipe(fs.createWriteStream(`${process.cwd()}\\temps\\${videoName}.mp4`)).on('finish', () => {
          filepath = `${process.cwd()}\\temps\\${videoName}.mp4`
          responseObject['error'] = null
          responseObject['data'] = filepath
          return res.json(responseObject)
        });
      break;

      case 'MP3':
        ytdl(url).pipe(fs.createWriteStream(`${process.cwd()}\\temps\\${videoName}.mp4`)).on('finish', async () => {
          var proc = new ffmpeg({ source: `${process.cwd()}\\temps\\${videoName}.mp4` })
          proc.setFfmpegPath("C:/FFmpeg/bin/ffmpeg.exe")
          proc.saveToFile(`${process.cwd()}\\temps\\${videoName}.mp3`).on('end', () => {
            filepath = `${process.cwd()}\\temps\\${videoName}.mp3`
            responseObject['error'] = null
            responseObject['data'] = filepath
            return res.json(responseObject)
          })
        });
      break;

      case 'WEBM':
        ytdl(url).pipe(fs.createWriteStream(`${process.cwd()}\\temps\\${videoName}.mp4`)).on('finish', async () => {
          var proc = new ffmpeg({ source: `${process.cwd()}\\temps\\${videoName}.mp4` })
          proc.setFfmpegPath("C:/FFmpeg/bin/ffmpeg.exe")
          proc.saveToFile(`${process.cwd()}\\temps\\${videoName}.webm`).on('end', () => {
            filepath = `${process.cwd()}\\temps\\${videoName}.webm`
            responseObject['error'] = null
            responseObject['data'] = filepath
            return res.json(responseObject)
          })
          .on('error', (e) => {
            console.log(e.toString())

          })
        });
      
      break;


      case 'M4A':
        ytdl(url).pipe(fs.createWriteStream(`${process.cwd()}\\temps\\${videoName}.mp4`)).on('finish', async () => {
          var proc = new ffmpeg({ source: `${process.cwd()}\\temps\\${videoName}.mp4` })
          proc.setFfmpegPath("C:/FFmpeg/bin/ffmpeg.exe")
          proc.saveToFile(`${process.cwd()}\\temps\\${videoName}.m4a`).on('end', () => {
            filepath = `${process.cwd()}\\temps\\${videoName}.m4a`
            responseObject['error'] = null
            responseObject['data'] = filepath
            return res.json(responseObject)
          })
          .on('error', (e) => {
            console.log(e.toString())

          })
        });
      break;
    }
  
  }
  catch (e) {
    responseObject['error'] = e.toString()
    responseObject['data'] = null
    return res.json(responseObject)
  }

 


})

app.get('/download', async (req, res) => {

  const {path} = req.query
  console.log(path)

  return res.download(path)


})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
