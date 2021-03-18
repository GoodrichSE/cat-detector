const express = require('express')
const path = require('path')
const port = 5000
const { exec } = require('child_process');
var app = express()

// These are not properly defined as functions
// Make these callbacks instead, with function(){}
function dog () {
	console.log('Entering dog().')
	str = exec('echo "Arf"', (err, stdout, stderr) => {
	  console.log('Bash command called directly.')
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
	// Testing stdout
//	return "Arf!" 
}

function pig () {
	console.log('Entering pig().')
	exec('./cpp/build/Hello', (err, stdout, stderr) => {
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
	// This will write as expected, but also store the entire JSON object in str
	// Returning str then returns the entire object and not just the stdout string.
	// Maybe we could grab it from a field, or from an event?
//	str = exec('./cpp/build/Hello', (err, stdout, stderr) => {
//          console.log('Executable called.')
//          if (err) {
//            //some err occurred
//            console.log('Error occurred.')
//            console.error(err)
//          } else {
//           // the *entire* stdout and stderr (buffered)
//           console.log(`stdout: ${stdout}`);
//           console.log(`stderr: ${stderr}`);
//          }
//        })
//	return str
}

function cat () {
	console.log('Entering cat().')
	exec('./cpp/build/Main gettyimages-480868504-640_adpp.mp4', (err, stdout, stderr) => {
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
}

app.use(express.static(path.join(__dirname, 'public')))

function test_console () {
	console.log(dog())
	console.log(pig())
	console.log(cat())
}

function test_response () {
	// Direct string response
	app.get('/', (req, res) => {
	  res.send('Hello World!')
	})
	// String response called through bash on the server
	app.get('/dog', (req, res) => {
	  res.send(dog())
	})
	// String response called through bash on the server which calls a simple cpp binary
	app.get('/pig', (req, res) => {
	  res.send(pig())
	})
	// String response called through bash on the server which calls a more complex cpp binary
	app.get('/cat', (req, res) => {
	  res.send(cat())
	})
	// Inline call of the complex cpp binary via bash
	// This returns what seems to be an "exec" initiated with the bash command, instead of the results of the command
	app.get('/bird', (req, res) => {
	  res.send(exec('./cpp/build/Main ../gettyimages-480868504-640_adpp.mp4', (err, stdout, stderr) => {
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
	  )
	})
	app.listen(port, () => console.log(`Example app listening at http://localhost:${ port }`))
}

test_console()
//test_response()
