// import our restaurants
const restaurants = require('./restaurants.json');

// import a set of tools to talk to Firebase and Firestore
const { initializeApp, applicationDefault, cert} = require('firebase-admin/app');
const { getFirestore, Timestamp, FielValue } = require('firebase-admin/firestore');

// import our credentials
const credentials = require('./credentials.json');
const { deepCopy } = require('@firebase/util');
const { debugPort } = require('process');

// connect to Firebase services
initializeApp({
    credential: cert(credentials)
});

//connect to Firestore
const db = getFirestore();
const restRef = db.collection('restaurants')

// create a collection called "Restaurants"


//add each Restaurant
restRef.add(restaurants[3])
    .then(doc => {
        console.log('Added restaurant!', doc.id)
    })
    .catch(err => {
        console.log(err);
    });

restRef.doc('XLnOUnO4KX0HqvV0qHSX').get()
.then(doc => {
    console.log(doc.id, ' ==> ', doc.data());
})
.catch(err => console.error(err));



//get all documents

restRef.get()
    .then(snapshot =>{
        snapshot.forEach(doc => {
            console.log(doc.id, ' ==> ', doc.data())
        })
    })
    .catch(console.error);

//find a document


// querying a collection.
restRef.where('name', '==', 'Bolay').get()       // go into db collect. "where" Name is equal to "Bolay". Get this document.
    .then(snapshot => {
        snapshot.forEach(doc =>{
            console.log(doc.data());
        });
    })
    .catch(console.error);
