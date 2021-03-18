const express = require('express')
const path = require('path')
const port = 5000
const { exec } = require('child_process');
var app = express()

// Calls subprocess to write to stdout
function dog () {
	console.log('Entering dog().')
	exec('echo "Arf"', (err, stdout, stderr) => {
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
	console.log('Exiting dog().')
	return 0
}

// Calls subprocess to call cpp binary to write to sdout
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
	// We can grab it with a res.json() call
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
	console.log('Exiting pig().')
	return 0
}

// Calls subprocess to call cpp binary which accepts an argument to write to sdout
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
	console.log('Exiting cat().')
	return 0
}

app.use(express.static(path.join(__dirname, 'public')))

// Tests functions without using the network
function test_console () {
	console.log(dog())
	console.log(pig())
	console.log(cat())
}

// Tests loopback and server reponses
function test_response () {
	// Direct string response
	app.get('/', (req, res) => {
	  res.send('Hello Wourld!')
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
	app.get('/llama', (req, res) => {
	  exec('./cpp/build/Main ../gettyimages-480868504-640_adpp.mp4', (err, stdout, stderr) => {
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

// Executes
test_console()
test_response()
