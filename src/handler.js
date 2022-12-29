const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
    const { title, tags, body } = req.payload //properti yang akan diinputkan dari request client

    const id = nanoid(16) //membuat id tipe string random
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    //struktur objek yg disimpan di server
    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    }

    notes.push(newNote) //simpan ke array

    const isSuccess = notes.filter((note) => note.id === id).length > 0 //cek apakah sudah tersimpan di array

    if (isSuccess) {
        const response = h.response({
            status: 'succes',
            messege: 'Catatan Berhasil ditambahkan',
            data: {
                noteId: id
            }
        })

        response.code(201)
        return response
    }

    const response = h.response({
        status: 'fail',
        messege: 'catatan gagal ditambahkan'
    })

    response.code(500)
    return response
}

const getAllNoteHandler = () => ({
    status: 'success',
    data: {
        notes,
    }
})

const getNoteByIdHandler = (req, h) => {
    const { id } = req.params

    const note = notes.filter((n) => n.id === id)[0]

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (req, h) => {
    const { id } = req.params

    const { title, tags, body } = req.payload
    const updatedAt = new Date().toISOString()

    const index = notes.findIndex((note) => note.id === id)

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }

        const res = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        })
        res.code(200)
        return res
    }

    const res = h.response({
        status: 'fail',
        messege: 'Gagal update'
    })

    res.code(404)
    return res
}

const deleteNoteByIdHandler = (req, h) => {
    const { id } = req.params

    const index = notes.findIndex((note) => note.id === id)

    if (index !== -1) {
        notes.splice(index, 1)
        const res = h.response({
            status: 'success',
            message: 'note berhasil dihapus'
        })

        res.code(200)
        return res
    }

    const res = h.response({
        status: 'fail',
        message: 'gagal hapus'
    })

    res.code(404)
    return res
}

module.exports = { addNoteHandler, getAllNoteHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler }