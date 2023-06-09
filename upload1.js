const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');
const { initializeApp } = require('firebase/app');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIxo5ybK7tIzXXNgpZPd63Hab5HwZUats",
  authDomain: "groovehub254.firebaseapp.com",
  projectId: "groovehub254",
  storageBucket: "groovehub254.appspot.com",
  messagingSenderId: "132444995873",
  appId: "1:132444995873:web:d9e5de1a0ebab39414be60",
  measurementId: "G-Y5VL02SGZE"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the Firebase Storage service
const storage = getStorage(firebaseApp);

// Set up the multer storage
const storageConfig = multer.memoryStorage();
const upload = multer({ 
  storage: storageConfig,
  limits: { fileSize: 1024 * 1024 * 20 },
});


// Create an Express app
const app = express();

// Enable CORS
app.use(cors());

// Define the route to handle the file upload
app.post('/upload', upload.single('beat-file'), (req, res) => {
  try {
    const file = req.file;

    // Get a reference to the storage location where you want to upload the MP3 file
    const storageRef = ref(storage, 'beats/' + file.originalname);

    // Upload the file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file.buffer);

    // Monitor the upload progress
    uploadTask.on('state_changed',
      function (snapshot) {
        // Handle progress, such as displaying a progress bar
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload progress: ' + progress + '%');
        // You can update a progress bar or display the progress in your UI
      },
      function (error) {
        // Handle errors during the upload
        console.error('Error uploading file:', error);
        // You can show an error message to the user or handle the error in an appropriate way
        res.status(500).json({ error: 'Error uploading file' });
      },
      function () {
        // Handle successful upload
        // You can get the download URL of the uploaded file
        getDownloadURL(storageRef)
          .then(function (downloadURL) {
            console.log('File available at', downloadURL);
            // Perform further actions with the download URL if needed
            res.status(200).json({ downloadURL });
          })
          .catch(function (error) {
            console.error('Error getting download URL:', error);
            // Handle any errors that occur while retrieving the download URL
            res.status(500).json({ error: 'Error getting download URL' });
          });
      }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
