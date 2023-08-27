import React, { useState } from 'react'
import { type loginFormFields } from '../types'

interface Props {
    onSubmit: ({username,password}: loginFormFields) => void
 }

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const handleSubmit = (event: React.KeyboardEvent<HTMLFormElement>): void => {
        event.preventDefault()
        // onSubmit({ username: usernameValue, password: passwordValue })
        onSubmit({ username: usernameValue, password: passwordValue })
        setUsernameValue('')
        setPasswordValue('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className='new-todo' 
                type="text" 
                placeholder="username"
                value={usernameValue}
                onChange={ (event) => { setUsernameValue(event.target.value) }}
                autoFocus
            />
            <input
                className='new-todo'
                type="password" 
                placeholder="password"
                value={passwordValue}
                onChange={ (event) => { setPasswordValue(event.target.value) }}
            />
           <input className='new-todo'type="submit"/>
        </form>
    )
}