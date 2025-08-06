import React from 'react'
import Add from './Add'
import Table from './Table'

// This is the main index file for the Todos page
// It imports and renders the Add and Table components
// to manage and display todos.
function index() {
  return (
    <>
      <Add />
      <Table />
    </>
  )
}

export default index
