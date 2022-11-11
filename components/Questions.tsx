import Image from "next/image"
import { FC, MouseEventHandler, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { FaArrowAltCircleUp, FaArrowCircleDown } from 'react-icons/fa'
import { TbMoodEmpty } from 'react-icons/tb'
import { RiQuestionAnswerFill } from 'react-icons/ri'
import { useRouter } from "next/router"
import { getQuestions } from "../services/questions"

type QuestionT = {
  _id: string,
  title: string,
  votesCount: number,
  answersCount: number,
  slug: string,
  creator: {
    name: string,
    image: string
  },
  createdAt: string
}

export default function Questions() {
  const [questions, setQuestions] = useState<QuestionT[]>([])
  useEffect(() => {
    fetchQuestions()
  }, [])
  const fetchQuestions = useCallback(async () => {
    try {
      const response = await getQuestions()
      setQuestions(() => response.data)
    } catch(error) {
      console.error(error)
    }
  }, [])
  return (
    <Container>
      {questions.map(q => <QuestionItem key={q._id} {...q} />)}
      {!questions.length && (
        <NoQuestionPlaceholder />
      )}
    </Container>
  )
}
const NoQuestionPlaceholder = () => {
  return (
    <Center>
      <TbMoodEmpty size={60} color='#335986' />
      <h1>No Question yet!! Post One</h1>
    </Center>
  )
}

const QuestionItem: FC<QuestionT> = ({ title, votesCount = 0, creator, createdAt, answersCount = 0, slug }) => {
  const { push } = useRouter()

  const handleOnQuestionItemClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    push(`/${slug}`, `/${slug}`, { shallow: true })
  }

  const VoteIcon = votesCount >= 0 ? FaArrowAltCircleUp : FaArrowCircleDown
  const voteIconcolor = votesCount >= 0 ? '#68AB50' : '#C22D2D'
  
  return (
    <QuestionWrapper onClick={handleOnQuestionItemClick}>
      <LeftWrapper>
        <Title>{title}</Title>
        <CreatorInfo>
          <Image alt='creator-image' src={creator.image} width={20} height={20} />
          <span>{creator.name}</span>
          <CreatedAt>{new Date(createdAt).toLocaleDateString()}</CreatedAt>
        </CreatorInfo>
      </LeftWrapper>
      <RightWrapper>
        <StatInfo>
          <VoteIcon size={30} color={voteIconcolor} />
          <span>{votesCount} votes</span>
        </StatInfo>
        <StatInfo>
          <RiQuestionAnswerFill size={30} color={'#999'} />
          <span>{answersCount} answers</span>
        </StatInfo>
      </RightWrapper>
    </QuestionWrapper>
  )
}

const Container = styled.div`
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  justify-content: space-between;
  font-size: 1.2rem;
  margin-bottom: 5rem;
`
const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  h1 {
    color: #335986;
  }
`
const QuestionWrapper = styled.button`
  border: none;
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  cursor: pointer;
  transition: all 0.1s 0s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }
`
const LeftWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`

const RightWrapper = styled.div`
  max-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 15px;

`
const StatInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  i {
    width: 100px;
  }
`

const Title = styled.span`
  color: #335986;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
`
const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const CreatedAt = styled.span`
  color: #999;
`
