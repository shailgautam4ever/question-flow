import Image from "next/image"
import { FC, MouseEventHandler, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { FaArrowAltCircleUp, FaArrowCircleDown, FaArrowCircleUp, FaCrown } from 'react-icons/fa'
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
import { answersState } from "../state/answers"
import { AnswerItemP, AnswerProps, AnswerT } from "../types"

export default function Answers({ questionId, correctAns, fetchAnswers }: AnswerProps) {
  const [answers, setAnswers] = useRecoilState<AnswerT[]>(answersState)
  useEffect(() => {
    if (questionId) {
      fetchAnswers()
    }
  }, [questionId])

  if (!answers.length) {
    return <p>No one has Answers Yet! Be the first one to answer this question.</p>
  }

  return (
    <Container>
      {answers.map(q => <AnswerItem key={q._id} {...q} correctAns={correctAns === q._id} />)}
    </Container>
  )
}

const AnswerItem: FC<AnswerItemP> = ({ content, votes = 0, creator, createdAt, answersCount = 0, slug, correctAns }) => {
  const { push } = useRouter()

  const handleOnQuestionItemClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    // push(`/${slug}`, `/${slug}`, { shallow: true })
  }

  const handleOnVoteClick = (type: 'up' | 'down'): MouseEventHandler<SVGElement> => (e)  => {
    e.preventDefault()
    e.stopPropagation()
  }

  const VoteIcon = votes >= 0 ? FaArrowAltCircleUp : FaArrowCircleDown
  const voteIconcolor = votes >= 0 ? '#68AB50' : '#C22D2D'
  
  return (
    <AnswerWrapper onClick={handleOnQuestionItemClick}>
      <LeftWrapper>
        <ActionWrapper>
            <FaArrowCircleUp onClick={handleOnVoteClick('up')} size={25} color='gray' />
            <span>{votes}</span>
            <FaArrowCircleDown onClick={handleOnVoteClick('down')} size={25} color='gray' />
          </ActionWrapper>
      </LeftWrapper>
      <RightWrapper>
        <Answer>{content}</Answer>
        <CreatorInfo>
          <Image alt='creator-image' src={creator.image} width={20} height={20} />
          <span>{creator.name}</span>
          <CreatedAt>{new Date(createdAt).toLocaleDateString()}</CreatedAt>
        </CreatorInfo>
      </RightWrapper>
      <div>
        <FaCrown className='cp' size={30} color={correctAns ? '#ff8700' : 'gray'} />
      </div>
    </AnswerWrapper>
  )
}

const Container = styled.div`
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  gap: 25px;
  border-radius: 10px;
  justify-content: space-between;
  font-size: 1.2rem;
  margin-bottom: 5rem;
  padding: 10px;
  background: white
`

const AnswerWrapper = styled.div`
  border: none;
  padding: 20px;
  display: flex;
  border-bottom: 2px solid #eee;
  .cp {
    cursor: pointer;
  }
`
const RightWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`

const LeftWrapper = styled.div`
  max-width: 150px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Answer = styled.span`
  color: #131617;
  font-style: normal;
  font-size: 20px;
  line-height: 29px;
  flex: 1;
`
const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const CreatedAt = styled.span`
  color: #999;
`

const ActionWrapper = styled.div`
  width: 60px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  span {
    padding: 10px;
    color: gray;
  }
  svg {
    cursor: pointer;
    transition: all 0.1s 0s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
`