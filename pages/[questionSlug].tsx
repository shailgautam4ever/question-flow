import { useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { ChangeEventHandler, useCallback, useEffect, useState } from "react"
import { FaArrowCircleDown, FaArrowCircleUp, FaArrowDown } from "react-icons/fa"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import Answers from "../components/Answers"
import Layout from "../components/Layout"
import { getAnswersByQuestionId, getQuestionBySlug, postAnswerByQuestionId } from "../services/questions"
import { answersState } from "../state/answers"
import { AnswerT, QuestionT } from "../types"

export default function Question() {
  const { query } = useRouter()
  const { data } = useSession()
  const [question, setQuestion] = useState<QuestionT>({
    title: '',
    _id: '',
    answersCount: 0,
    body: '',
    creator: { name: '', _id: '', image: '' },
    createdAt: '',
    slug: '',
    updatedAt: '',
    votesCount: 0,
    correctAns: ''
  })

  const [answer, setAnswer] = useState<string>('')
  const [error, setError] = useState('')
  const [answers, setAnswers] = useRecoilState<AnswerT[]>(answersState)

  const fetchAnswers = useCallback(async () => {
    try {
      const response = await getAnswersByQuestionId(question._id)
      setAnswers(() => response.data)
    } catch(error) {
      console.error(error)
    }
  }, [question._id])


  useEffect(() => {
    if (query.questionSlug) {
      getQuestionBySlug(query.questionSlug as string)
      .then(data => {
        setQuestion(data.data)
      }).catch(error => {
        setError('not found')
      })
    }
  }, [query])
  
  const hanleOnPostAnswerClick = () => {
    postAnswerByQuestionId(question._id, answer).then(() => {
      fetchAnswers()
      setAnswer('')
    })
  }
  
  const handleOnChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(e => {
    setAnswer(() => e.target.value)
  }, [])

  if (error === 'not found') {
    return (
      <Layout>
        <p>Question not found!</p>
      </Layout>
    )
  }
  return (
    <Layout>
      <Head>
        <title>Question</title>
      </Head>
      <Card>
        <QuestionWrapper>
          <ActionWrapper>
            <FaArrowCircleUp size={40} color='gray' />
            <span>{question.votesCount}</span>
            <FaArrowCircleDown size={40} color='gray' />
          </ActionWrapper>
          <QuestionInfo>
            <Title>{question.title}</Title>
            <Desc>{question.body}</Desc>
            <CreatorInfo>
              <Image src={question.creator.image} width={30} height={30} alt='creator-image' />
              <span>{question.creator.name}</span>
              <DateText>{new Date(question.createdAt).toLocaleDateString()}</DateText>
            </CreatorInfo>
          </QuestionInfo>
        </QuestionWrapper>
      </Card>
      <Answers questionId={question._id} correctAns='' fetchAnswers={fetchAnswers} />
      <Card>
        <Input value={answer} rows={6} placeholder='your answer goes here...' onChange={handleOnChange} />
        <BottomWrapper>
          <PostAnswer onClick={hanleOnPostAnswerClick}>Post Answer</PostAnswer>
          <UserInfo>
            <Image src={data?.user?.image ?? ''} width={30} height={30} alt='user-image' />
            <span>{data?.user?.name}</span>
          </UserInfo>
        </BottomWrapper>
      </Card>
    </Layout>
  )
}

const Card = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 10px 20px;
  margin-top: 20px;
`

const QuestionWrapper = styled.div`
  display: flex;
`

const ActionWrapper = styled.div`
  width: 60px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 30px;
    padding: 10px;
  }
  svg {
    cursor: pointer;
    transition: all 0.1s 0s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
`

const QuestionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled.span`
  color: #335986;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
`
const Desc = styled.span`
  flex: 1;
  padding: 5px 0px;
`
const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const DateText = styled.span`
  color: gray;
`
const Input = styled.textarea`
  border: none;
  padding: 10px;
  width: 100%;
  rows: 10;
  outline: none;
  resize: vertical;
  font-family: arial;
`
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`

const PostAnswer = styled.button`
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.1s 0s ease-in-out;
  margin-right: 20px;
  &:hover {
    transform: scale(1.1);
    background: #335986;
    color: #fff;
  }
`
const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`