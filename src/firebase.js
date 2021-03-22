import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBvmO69LDV-J5A26Gqqn5OS0UHibYfpx_M",
    authDomain: "my-project-car-eb5d0.firebaseapp.com",
    projectId: "my-project-car-eb5d0",
    storageBucket: "my-project-car-eb5d0.appspot.com",
    messagingSenderId: "519820416812",
    appId: "1:519820416812:web:825dece7d08fcef4457e89"
});

export const auth = firebaseConfig.auth();
export default firebaseConfig;