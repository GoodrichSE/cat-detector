const { exec } = require('child_process');
exec('./../cpp/build/Main gettyimages-480868504-640_adpp.mp4', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
});
