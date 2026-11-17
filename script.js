const list = document.getElementById('lista')
const input = document.getElementById('input')
const submitButton = document.getElementById('submit')
const resetButton = document.getElementById('reset')

let toDoArray = JSON.parse(localStorage.getItem('toDoArray')) ||
 [
    'skapa din egna att göra lista',
    'grön knapp låter dig redigera',
    'röd knapp raderar',
    'lägg till nya uppgifter nedan'
]

function renderList () {
    let i = 0
    list.innerHTML = '';
    toDoArray.forEach((listItem) => {
       
    list.innerHTML += `
    <li id=item` + i + `
        class="list-group-item d-flex justify-content-between">
        <div>
          <input type="checkbox"/>
          `+ listItem + `
        </div>
        <div>
          <img 
            class="ps-5"
            onclick=editItem(` + i + `)
            src="assets/edit.png"
            alt="redigera" />
          <img
            src="assets/delete.png"
            onclick=removeItem(` + i + `)
            alt="radera" />
        </div>
        </li>` 
        i++
    } )
}

function addItem () {
    const inputValue = input.value

    if (inputValue === null || inputValue.trim() === "") {
        return
    };

    toDoArray.push(inputValue )

    input.value = ''

    saveList()
    renderList()
}

function editItem (item) {
    const newValue = prompt('Vad vill du ändra till?', toDoArray[item])
    toDoArray[item] = newValue

    saveList()
    renderList()
}

function removeItem (item) {
    toDoArray.splice(item,1)

    saveList()
    renderList()
}

submitButton.onclick = () => {
    addItem()
}

resetButton.onclick = () => {
    toDoArray = 
    ['skapa din egna att göra lista',
    'grön knapp låter dig redigera',
    'röd knapp raderar',
    'lägg till nya uppgifter nedan']

    saveList()
    renderList()

}

function saveList () {
    localStorage.setItem('toDoArray', JSON.stringify(toDoArray))    
}

renderList()

