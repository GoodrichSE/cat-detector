const express = require('express')
const path = require('path')
const port = 5000
const { exec } = require('child_process');
var app = express()

const dog = exec('echo "Arf"')

const cat = exec('./../cpp/build/Main gettyimages-480868504-640_adpp.mp4', (err, stdout, stderr) => {
  console.log('Executable called.')
  if (err) {
    //some err occurred
    console.log('Error occurred.')
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/dog', (req, res) => {
  res.send(dog())
})
app.get('/cat', (req, res) => {
  res.send(cat())
})
app.listen(port, () => console.log('Example app listening at http://localhost:${ port }'))
