
const express = require('express')
const download = require('./helpers/downloader')
const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const app = express()
const cors = require('cors')
const port = 8080
const TEST_FFMPEG_PATH = "C:/ffmpeg/bin/ffmpeg.exe"
const FFMPEG_PATH = "/usr/bin/ffmpeg"


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
          proc.setFfmpegPath(FFMPEG_PATH)
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
          proc.setFfmpegPath(FFMPEG_PATH)
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
      case 'AVI':
        ytdl(url).pipe(fs.createWriteStream(`${process.cwd()}\\temps\\${videoName}.mp4`)).on('finish', async () => {
          var proc = new ffmpeg({ source: `${process.cwd()}\\temps\\${videoName}.mp4` })
          proc.setFfmpegPath(TEST_FFMPEG_PATH)
          proc.saveToFile(`${process.cwd()}\\temps\\${videoName}.avi`).on('end', () => {
            filepath = `${process.cwd()}\\temps\\${videoName}.avi`
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
          proc.setFfmpegPath(FFMPEG_PATH)
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

  const { path } = req.query
  console.log(path)

  return res.download(path)




})

app.get('/delete', async (req, res) => {
  var responseObject = {}

  try {
    fs.rm(`${process.cwd()}\\temps`, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      fs.mkdirSync(`${process.cwd()}\\temps`)
      console.log(`temps are deleted!`);
    });
    responseObject['error'] = null
    responseObject['data'] = 'Deleted Successfully'
  }
  catch (e) {
    responseObject['error'] = e.toString()
    responseObject['data'] = null
  }

  return res.json(responseObject)

})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
