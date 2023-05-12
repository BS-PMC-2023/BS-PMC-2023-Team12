import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault()

    console.log(history);
    


    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      // history.push('/')
      navigate('/');

    }
  }

  return (
    <Form onSubmit={SubmitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='חיפוש'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2' color='black'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
