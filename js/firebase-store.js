let database;
let gUser;
const config = {
    apiKey: "AIzaSyCHfsmNn22SoRaBPSceIBTJU4H_apwvyJU",
    authDomain: "codepad-c2257.firebaseapp.com",
    databaseURL: "https://codepad-c2257.firebaseio.com",
    projectId: "codepad-c2257",
    storageBucket: "codepad-c2257.appspot.com",
    messagingSenderId: "978102417111"
};

firebase.initializeApp(config);
let provider = new firebase.auth.FacebookAuthProvider();

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        firebaseAuthEnabled = true;
        gUser = user;
        initDatabase(user.uid);
        firebaseSync(user.uid);
    }
    else {
        firebase.auth().signInWithRedirect(provider);
    }
});

const initDatabase = () => {
    database = firebase.firestore();
    database.settings({
        timestampsInSnapshots: true
    });
};

const userWriteDB = (uid, notes) => {
    database.collection("users").doc(uid).set({notes}).then(function () {
        console.log("Document successfully written!");
    });
};


const firebaseSync = (uid) => {
    let bodyElement = document.getElementsByTagName('body')[0];
    let notepadElement = document.getElementById('notepad_div');
    let docRef = database.collection("users").doc(uid);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            let firestoreContent = doc.data().notes;
            notepadElement.innerHTML = firestoreContent === null ? "" : firestoreContent;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    let timer = false;
    let loaderElement = document.getElementsByClassName('loader')[0];
    bodyElement.addEventListener('input', function () {
        // Avoid saving to firebase storage on every input key if they type very fast
        // The function will execute after 1500 milli seconds
        clearTimeout(timer);

        // show loader
        loaderElement.style.display = 'block';
        timer = setTimeout(function () {
            if (firebaseAuthEnabled) {
                userWriteDB(uid, notepadElement.innerHTML);
                // hide loader
                loaderElement.style.display = 'none';
            }
        }, 3000);

    });
};
