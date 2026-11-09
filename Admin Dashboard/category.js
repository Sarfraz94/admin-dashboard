import { firebaseConfig } from './config/firebase_config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getFirestore, collection, where, getDocs, query, doc, setDoc, serverTimestamp,
deleteDoc,
updateDoc

 } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const catName = document.getElementById("catName")
const catBtn = document.getElementById("catBtn")
const uptBtn = document.getElementById("uptBtn")
let cat = document.getElementById("cat")
let catTotal = document.getElementById("catTotal")

catBtn.addEventListener("click", addNewCategory)

let selectedItem =null;


async function addNewCategory() {
    const CategoryRef = doc(collection(db, "Category"));
    await setDoc(CategoryRef, {
        categoryName: catName.value,
        categoryKey: CategoryRef.id,
        createdAt: serverTimestamp()
    })

    getAllCategory()

}



async function getAllCategory() {
    const CategoryRef = collection(db, "Category");
    const data = await getDocs(CategoryRef)
    console.log(data.docs)
    catTotal.innerText = data.docs.length
    cat.innerHTML = `
     <tr>
                    <th>S.no</th>
                    <th>Category Name</th>

                    <th>Status</th>
                </tr>
    `
    var index = 1;
    for (var value of data.docs) {
        console.log(value.data())
        cat.innerHTML += `
         <tr>
                    <th>${index}</th>
                    <th class='text'>${value.data()["categoryName"]}</th>
                    <th>
                    <button id=${value.data()["categoryKey"]} class='btn btn-success' onclick='editCategory(this)' >Edit</button>
                    <button id=${value.data()["categoryKey"]} class='btn btn-danger delete-btn' onclick='DeleteDoc(this)' >Delete</button>
                  </th>
                </tr>
        `
        index += 1;
    }
}

function editCategory(e){
    catBtn.classList.add("d-none")
    uptBtn.classList.remove("d-none")
    uptBtn.addEventListener("click",updateCategory)
    selectedItem=e
    console.log(e.id)
    var categoryName = e.parentNode.parentNode.children[1].innerText
    catName.value=categoryName

}

async function updateCategory(){
    console.log(selectedItem.id)
    const categoryRef = doc(db, "Category", selectedItem.id);
    await updateDoc(categoryRef,{
         categoryName: catName.value
    })
    .then((val)=>{
        alert("updated item")
        getAllCategory()
        catBtn.classList.remove("d-none")
        uptBtn.classList.add("d-none")
        catName.value=""
    })
}

async function DeleteDoc(e){
    const categoryReg= doc(db,"Category",e.id)
   await deleteDoc(categoryReg)
    .then((val)=>{
        alert("deleet item")
        e.parentNode.parentNode.remove()
        getAllCategory()
        
    })
    .catch((e)=>{
        console.log(e)
    })
}

window.DeleteDoc= DeleteDoc
window.editCategory= editCategory
// window.edit= DeleteDoc


getAllCategory()