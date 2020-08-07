import React from 'react'

const CreateForm = ({ handleSubmit, error }) => (
    <React.Fragment>
        <div className="room-name">
            <p>Room name: 1245</p>
        </div>
        <form>
            <input type="text" placeholder="Enter an username"/>
            <button type="submit">Create</button>
        </form>
    </React.Fragment>
)

export default CreateForm;
