let linkArr = []

const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const deletebtn = document.getElementById("delete-btn")
const tabbtn = document.getElementById("tab-btn")

const ulel = document.getElementById("ul-el")

let linksFromLocalStorage = JSON.parse(localStorage.getItem("linkArr"))

if(linksFromLocalStorage){
    linkArr = linksFromLocalStorage
    renderArr(linkArr)
}

tabbtn.addEventListener("click",function(){

    chrome.tabs.query({active : true,currentWindow: true},function(tabs){
        linkArr.push(tabs[0].url)
        localStorage.setItem("linkArr",JSON.stringify(linkArr))
        renderArr(linkArr)
    })
})

function renderArr(arr) {
    let websites = ""

    for(let i=0; i<arr.length;i++){
        websites += 
        `<li>
            <a target='_blank' href='${arr[i]}'>
                ${arr[i]}
            </a>
        </li>`
    }
    ulel.innerHTML = websites
}

inputbtn.addEventListener("click",function(){
    linkArr.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("linkArr",JSON.stringify(linkArr))
    renderArr(linkArr)
})

deletebtn.addEventListener("click",function(){
    linkArr=[]
    localStorage.clear()
    renderArr(linkArr)
})