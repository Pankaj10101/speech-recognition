const language = document.querySelector("#language")
const record = document.querySelector(".startspeech")
const textarea = document.querySelector("#textarea")
const clear = document.querySelector(".clear")
const downloadbtn = document.querySelector(".download")
const soundimage = document.querySelector(".sound")

function addlanguages() {

    languages.forEach(e => {
        const option = document.createElement("option");
        option.value = e.code;
        option.innerHTML = e.name;
        language.appendChild(option)
    })
}
addlanguages()

let recording = false;
let recognition = window.webkitSpeechRecognition || window.SpeechRecognitionAlternative;
let spRec = new recognition();
spRec.continuous = true;
spRec.interimResults = true;
console.log(textarea.textContent)



spRec.onresult = res =>{

    const text = Array.from(res.results);
    let newText = text.map((e)=>{
        e = e[0].transcript;
        return e;
    })
    newText = newText.join(".")
    textarea.value = newText;
    console.log(newText)

}


console.log(spRec)
record.addEventListener("click", ()=>{
    spRec.lang = language.value
    downloadbtn.disabled = false
    if(!recording){
        console.log("started")
        soundimage.classList.remove("bar")
        spRec.start();
        recording= true;
    }else{
        console.log("stop")
        spRec.stop()
        soundimage.classList.add("bar")
        recording = false;
    }

})


if(textarea.value !=""){

}else downloadbtn.disabled = true
downloadbtn.addEventListener("click", download)

function download(){
    var textareaVal = textarea.value;
    var filename = "script.txt";
    var element = document.createElement("a")
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textareaVal))
    element.setAttribute('download', filename)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    element.body.removeChild(element)
}

clear.addEventListener("click", ()=>{
    textarea.value = "";
    downloadbtn.disabled = true;
})

const checkbox = document.querySelector('.theme-switcher-checkbox');

checkbox.addEventListener('change', function() {
  if (this.checked) {
    console.log(checkbox, this.checked)
    document.body.classList.add('dark-theme');
  } else {
    console.log(checkbox, this.checked)
    document.body.classList.remove('dark-theme');
  }
});

