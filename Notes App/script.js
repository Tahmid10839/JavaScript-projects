
const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach(note => {
        addNewNote(note.text,note.date);
    });
}

addBtn.addEventListener('click',()=>{
    addNewNote();
});

function addNewNote(text='',date=''){
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <div class="tools">
                <div class='date'>${date}</div>
                <button class="save"><i class="fas fa-save"></i></button>
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}">
        </div>
        <textarea class="${text?"hidden":""}"></textarea> 
    `;
    const saveBtn = note.querySelector('.save');
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');

    const main = note.querySelector('.main');
    const TextArea = note.querySelector('textarea');
    const dates = note.querySelector('.date');
    TextArea.value = text;
    main.innerHTML = marked(text);
    
    saveBtn.addEventListener('click',()=>{
        // main.classList.toggle('hidden');
        const value = TextArea.value;
        main.innerHTML = marked(value);
        // var dateObj = new Date();
        // var month = dateObj.getUTCMonth() + 1; //months from 1-12
        // var day = dateObj.getUTCDate();
        // var year = dateObj.getUTCFullYear();
        // newdate = year + "/" + month + "/" + day;

        // var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var date = new Date();
        //get mm dd yyyy
        // var mnth = monthNames[date.getMonth()];
        var mnth = date.getMonth()+1;
        var dt = date.getDate();
        var yr = date.getFullYear();

        //get hh mm ss
        var seconds = date.getSeconds();
        var min = date.getMinutes();
        var hour = date.getHours();

        //get AM/PM 
        var ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'
        minutes = min < 10 ? '0'+min : min;

        // $('#date').text('Dhaka : ' + mnth + ' ' + dt + ' '+ yr + ' ' + hour + ':'+ minutes + ':'+ seconds + ' ' + ampm);
        newdate = mnth + '/' + dt + '/'+ yr + '  ' + hour + ':'+ minutes + ':'+ seconds + ' ' + ampm;
        
        dates.innerHTML = newdate;
        TextArea.classList.add('hidden');
        main.classList.remove('hidden');
        updateLS(newdate);
    });
    editBtn.addEventListener('click',()=>{
        main.classList.add('hidden');
        TextArea.classList.remove('hidden');
    });

    deleteBtn.addEventListener('click',()=>{
        note.remove();
        updateLS();
    });
    
    // TextArea.addEventListener('input',(e)=>{
    //     const { value }= e.target;
    //     main.innerHTML = marked(value);

    //     updateLS();
    // });
    document.body.appendChild(note);
}

function updateLS(newdate){
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach(note=>{
        notes.push({text: note.value,date: newdate});
    })

    localStorage.setItem('notes',JSON.stringify(notes));
}


// var dateObj = new Date();
// var month = dateObj.getUTCMonth() + 1; //months from 1-12
// var day = dateObj.getUTCDate();
// var year = dateObj.getUTCFullYear();
// newdate = year + "/" + month + "/" + day;