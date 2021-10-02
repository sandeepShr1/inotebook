const express = require('express');
const Note = require('../modules/Note')
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Route 1 Get all notes using: GET "/api/auth/getuser". Login required!
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong!")
    }
})

// Route 2 Post notes using: POST "/api/auth/addnotes". Login required!
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title!').isLength({ min: 5 }),
    body('description', 'Enter a valid description!').isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await notes.save();

        res.json(saveNote)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong!")
    }
})

// Route 3 UPDATE existing notes using: PUT "/api/notes/updatenote". Login required!
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //Create a new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found!") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed!");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong!")
    }
})

// Route 4 DELETE  notes using: DELETE "/api/notes/deletenote". Login required!
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found!") }

        // Allow deletion only is user owned this note 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed!");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Success note has been deleted.","notes": note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong!")
    }
})


module.exports = router