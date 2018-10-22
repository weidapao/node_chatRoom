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
