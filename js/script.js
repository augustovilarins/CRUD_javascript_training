window.addEventListener('load', start);

var globalNames = ['Augusto','Aurelio', 'Cilene', 'Ayelo'];
var inputElement = null;
var isEditing = false;
var currentIndex = null;

function start() {
    preventFormSubmit();
    actaveInput();
    render();
}

function preventFormSubmit(){
    
    function handleFormSubmit(event){
        event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit',handleFormSubmit);
}

function actaveInput(){
    inputElement = document.querySelector('#inputName');
    inputElement.focus();

    function updateItem(newItem){
        globalNames[currentIndex] = newItem;
    }

    function handleTyping(event){
        if(event.key === 'Enter' && event.target.value.trim() !== ''){
            if(isEditing){
                updateItem(event.target.value);
                render();
                event.target.value = '';
            }else{
                globalNames.push(event.target.value);
                event.target.value = '';
                render();
            }

            isEditing = false;
            
        }
    }    

    inputElement.addEventListener('keyup',handleTyping);
}

function render (){

    function createDeleteButton(index){
        function deleteName(){
            console.log(index)
            globalNames.splice(index,1);
            console.log(globalNames);
            render();
        }
        var button = document.createElement('button');
        button.textContent = 'x'
        button.classList.add('deleteButton');
        button.addEventListener('click',deleteName);
        
        return button;
    }

    function createSpan(itemName,index){

        function editItem(){
            inputElement = document.querySelector('#inputName');
            inputElement.value = itemName;
            inputElement.focus();
            isEditing = true;
            currentIndex = index;

        }

        var name = document.createElement('span');
        name.textContent = ' '+itemName;
        name.classList.add('clickable');
        name.addEventListener('click',editItem);

        return name;
    }

    var namesElement = document.querySelector('#names');

    namesElement.innerHTML= ''

    var listElement = document.createElement('ul');

    for(let i = 0 ; i < globalNames.length ; i++){
        var itemElement = document.createElement('li');
        var name = createSpan(globalNames[i],i);
        var button = createDeleteButton(i);


        itemElement.appendChild(button);
        itemElement.appendChild(name)
        console.log(globalNames)
        listElement.appendChild(itemElement);
    }

    namesElement.appendChild(listElement);
}