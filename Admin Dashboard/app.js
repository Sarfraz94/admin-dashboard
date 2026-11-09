import { firebaseConfig } from './config/firebase_config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getFirestore, collection, where, getDocs, query } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

let users = document.getElementById("users")
let Category = document.getElementById("Category")


async function getAllStats() {
    const userRef = collection(db, "users")
    const data = await getDocs(userRef)
    console.log(data.docs)
    users.innerText=data.docs.length>10  ? "10+":data .docs.length
    for (var value of data.docs) {
        console.log(value.data())
    }

}

async function getAllStatsCategory() {
    const userRef = collection(db, "Category")
    const data = await getDocs(userRef)
    console.log(data.docs)
    Category.innerText=data.docs.length>10  ? "10+":data .docs.length
    for (var value of data.docs) {
        console.log(value.data())
    }

}

getAllStats()
getAllStatsCategory()