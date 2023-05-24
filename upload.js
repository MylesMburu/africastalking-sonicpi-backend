{/* <input type="file" id="fileInput" accept="audio/mp3" onchange="handleFileSelect(event)"> */}



// Get a reference to the Firebase Storage service
var storage = firebase.storage();

// Get a reference to the storage location where you want to upload the MP3 file
var storageRef = storage.ref().child('beats/' + file);

// Upload the file to Firebase Storage
function handleFileSelect(event) {
  var fileInput = event.target;
  var file = fileInput.files[0];

  // Display the selected file name
  var fileNameDisplay = document.getElementById('fileNameDisplay');
  fileNameDisplay.textContent = file.name;

  // Create a new upload task
  var uploadTask = storageRef.put(file);

  // Monitor the upload progress
  uploadTask.on(
    'state_changed',
    function(snapshot) {
      // Handle progress, such as displaying a progress bar
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      // Update the progress bar with the value of 'progress'
    },
    function(error) {
      // Handle errors during the upload
      console.error('Error uploading file:', error);
    },
    function() {
      // Handle successful upload
      // You can get the download URL of the uploaded file
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        // Do something with the downloadURL, such as displaying it to the user
      });
    }
  );
}

// Add an event listener to the file input element
var fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', handleFileSelect);

