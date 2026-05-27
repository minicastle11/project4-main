import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateForm from '../components/CreateForm'

function Create({ onCreate,onCancel }) {
    const navigate = useNavigate();
    
    return(
        <>
            <CreateForm onAddBook={onCreate} onCancel={() => navigate('/list')} />
        </>
    );
}

export default Create
