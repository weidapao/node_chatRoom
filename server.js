const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

const cache = {}

// 返回404
function send404(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.write('page 404')
  res.end()
}

// 发送文件
function sendFile(res, filePath, fileContent) {
  res.writeHead(200, { 'Content-Type': mime.getType(path.basename(filePath)) })
  res.end(fileContent)
}

// 静态文件
function serveStatic(res, cache, absPath) {
  if (cache[absPath]) {
    sendFile(res, absPath, cache[absPath])
  } else {
    fs.exists(absPath, function(exists) {
      if (exists) {
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(res)
          } else {
            cache[absPath] = data
            sendFile(res, absPath, data)
          }
        })
      } else {
        send404(res)
      }
    })
  }
}
