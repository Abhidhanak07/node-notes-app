const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')

//                                                      ADDING A NEW NOTE
const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.find ((notes) => {
        return notes.title === title 
    })

    if (!duplicateNotes){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green('New Note added Successfully!'));
    }else{
        console.log(chalk.red('Note title is already taken! plz enter unique title'));
    }
   
} 


//                                                      REMOVING A NOTE
const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter( (note) => {
        return note.title !== title
    })

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note Removed Successfully!'));
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse('No Note found'));
    }
}


//                                                      LISTING A NOTE
const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes are...'));

    notes.forEach((note) => {
        console.log(note.title);
    });
}

//                                                      READ A NOTE PROVIDED BY TITLE
const readNotes = (title) => {
    const notes = loadNotes()
  
    const note = notes.find((note) =>  note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }else{
        console.log(chalk.red.inverse('Note Not found!!'));
    }
}



//                                                      FUNCTION THAT SAVES ALL THE NOTES TO THE NOTES JSON FILE
const saveNotes = (notes)=> {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}


//                                                      FUNCTION THAT LOAD THE NOTES FORM JSON FILE(DATA)
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch (e){
        return []
    }
   
}



//                                                      MODULE EXPORTS TO OTHER FILE
module.exports = {
    addNote:addNote,
    getNotes:addNote,
    removeNotes:removeNotes,
    listNotes:listNotes,
    readNotes:readNotes,
}