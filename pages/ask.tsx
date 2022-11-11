import Head from "next/head"
import { useRouter } from "next/router"
import { FormEventHandler, useState } from "react"
import styled from "styled-components"
import Layout from "../components/Layout"
import { submitNewQuestion } from "../services/questions"
import { QuestionBody } from "../types"

export default function Question() {
  const { push } = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async e => {
    try {
      e.preventDefault()
      if (loading) return
      const form = e.target as HTMLFormElement
      const data = Object.fromEntries(new FormData(form).entries())
      if (!data.title) {
        return setError('Invalid Title')
      } else if (!data.body) {
        return setError('Invalid Body')
      }
      if (error) setError('')
      setLoading(true)
      await submitNewQuestion(data as QuestionBody)
      push('/', '/', { shallow: true })
      setLoading(false)
    } catch (error) {
      setError('Someting went wrong!')
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Ask a Question</title>
      </Head>
      <h2>Ask a Question</h2>
      <Form onSubmit={handleOnSubmit}>
        <FormItem>
          <label htmlFor='title'>Title</label>
          <small>Be specific and imagine you're asking a question to another person</small>
          <input id='title' name='title' placeholder='Enter your Question Title here.' />
        </FormItem>
        <FormItem>
          <label htmlFor='body'>Body</label>
          <small>Include all the information someone would need to answer your question</small>
          <textarea rows={10} id='body' name='body' placeholder='Question body goes here.' />
        </FormItem>
        <button type='submit'>Submit your Question</button>
        {error ? (
          <Error>{error}</Error>
        ) : null}
      </Form>
    </Layout>
  )
}

const Form = styled.form`
  padding: 2rem 20px;
  button {
    border: none;
    padding: 10px 20px;
    background: #2F67AA;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
    border-radius: 30px;
    cursor: pointer;
  }
`

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  gap: 6px;
  label {
    font-weight: 600;
    font-size: 20px;
  }
  small {
    color: #999;
  }
  input, textarea {
    border: none;
    resize: none;
    padding: 20px 10px;
    border-radius: 10px;
    // outline: none;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
    font-family: arial;
  }
`
const Error = styled.div`
  padding: 10px;
  color: tomato;
`