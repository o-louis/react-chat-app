import React from 'react'

const JoinForm = ({ handleSubmit, error }) => (
    <form>
        <input type="text" placeholder="Enter an id room"/>
        <input type="text" placeholder="Enter an username"/>
        <button type="submit">Join</button>
    </form>
)

export default JoinForm;
