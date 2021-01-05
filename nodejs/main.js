const express = require('express')
const app = express()
const port = 5000
const { exec } = require('child_process');

const cat = exec('./../cpp/build/Main gettyimages-480868504-640_adpp.mp4', (err, stdout, stderr) => {
	  if (err) {
	    //some err occurred
	    console.error(err)
	  } else {
	   // the *entire* stdout and stderr (buffered)
	   console.log(`stdout: ${stdout}`);
	   console.log(`stderr: ${stderr}`);
	  }
	});

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/cat', (req, res) => {
  res.send(cat())
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


