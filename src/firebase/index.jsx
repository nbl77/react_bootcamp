import firebase from 'firebase/app';
const fbConfig = {
	apiKey: "AIzaSyAXYoTEXacn3M7QZISYlFOMLDFtPTp8apc",
	authDomain: "tix-bioskop.firebaseapp.com",
	databaseURL: "https://tix-bioskop.firebaseio.com",
	projectId: "tix-bioskop",
	storageBucket: "tix-bioskop.appspot.com",
	messagingSenderId: "80359083501",
	appId: "1:80359083501:web:ffa8df438d8428660f2be4",
	measurementId: "G-VKPWV8BYC8"
};
export default firebase.initializeApp( fbConfig )
