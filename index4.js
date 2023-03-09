import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, setDoc, addDoc, updateDoc,deleteDoc, getDoc, query, collection, getDocs , where, onSnapshot} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
//import { getFirestore, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
//import { collection, query, where, onSnapshot } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyATjda28LgYjep8uBjZd9GALYIANScdQbI",
    authDomain: "myvote1-48d54.firebaseapp.com",
    projectId: "myvote1-48d54",
    storageBucket: "myvote1-48d54.appspot.com",
    messagingSenderId: "411882358807",
    appId: "1:411882358807:web:c9044c10bc2a747eed3452",
    measurementId: "G-4ZRZGBJWKJ"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    const auth = getAuth();
//const dbRef = 
  
  // Handle phone number verification
  const phoneNumberInput = document.getElementById('phone-number-input');
  const verifyPhoneNumberButton = document.getElementById('verify-phone-number-button');
  const codeAuthContainer = document.getElementById('code-auth-container');
  const verificationCodeInput = document.getElementById('verification-code-input');
  const verifyCodeButton = document.getElementById('verify-code-button');
  let confirmationResult;

  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
    },
    'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
    }
  }, auth);

  recaptchaVerifier.render().then(function(widgetId) {
    window.recaptchaWidgetId = widgetId;
//  updateSignInButtonUI();
});
  
  verifyPhoneNumberButton.addEventListener('click', () => {
    const phoneNumber = phoneNumberInput.value;

   // var db = getFirestore(app);

    // Define your query
   //  query = collection(db, "users").where("aadhar", "==", phoneNumber);

    const q = query(collection(db, "users"), where("aadhar", "==", phoneNumber));

    getDocs(q)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
          const firstDoc = querySnapshot.docs[0];
          console.log("Mobile No.:", firstDoc.data().mobile);
          var res = firstDoc.data().mobile;
    //const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //const cities = [];
      //const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //  const cities = [];
      //  querySnapshot.forEach((doc) => {
      //      console.log("Aadhar",doc.data().mobile);
      //  });
      //});
     
    };
    // Execute the query
    // query.get()
    // .then(function(querySnapshot) {
    //     // Process the results of the query
    //     querySnapshot.forEach(function(doc) {
    //     //var data = doc.data();
    //     console.log(doc.data().aadhar);
    //     });
    // })
    // .catch(function(error) {
    //     console.error(error);
    // });

    // const phoneNumber1 = data;
 

   //  firebase.auth().signInWithPhoneNumber(res, appVerifier)
    //   .then((result) => {
    //     confirmationResult = result;
    //    codeAuthContainer.style.display = 'block';
    //     phoneNumberInput.disabled = true;
    //     verifyPhoneNumberButton.disabled = true;
    //   })
    //   .catch((error) => {
    //    console.error(error);
    //   });
      var phoneNumber1 = "+91" + res;
       signInWithPhoneNumber(auth, phoneNumber1, recaptchaVerifier)
       .then((confirmationResult) => {
           
           const code = prompt("Enter the verification code sent to your phone number:");
           return confirmationResult.confirm(code);
       })
       .then((result) => {
           // User successfully signed in
           console.log(result.user);
       })
       .catch((error) => {
           // Handle errors
           console.error(error);
       });
       
  
  
  verifyCodeButton.addEventListener('click', () => {
    const verificationCode = verificationCodeInput.value;
    confirmationResult.confirm(verificationCode)
      .then((result) => {
        // Phone number is verified, do something
        console.log(`Phone number ${result.user.phoneNumber1} is verified`);
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
  });