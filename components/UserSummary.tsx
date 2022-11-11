import { DefaultSession } from "next-auth"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { MouseEventHandler, useEffect, useState } from "react"
import styled from "styled-components"
import { getUserSummary } from "../services/user"

type StatsT = {
  points: number,
  questions: number,
  votes: number
}

export default function UserSummary() {
  const { push } = useRouter()
  const { data } = useSession()
  const [stats, setStats] = useState<StatsT>({
    points: 0,
    questions: 0,
    votes: 0
  })

  useEffect(() => {
    (async () => {
      try {
        if (!data?.user?.email) {
          return
        }
        const response = await getUserSummary({ email: data.user.email })
        setStats(() => response.data)
      } catch(error) {
        console.error(error)
      }
    })()
  }, [data?.user?.email])

  const handleAskQuestion: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()
    push('/ask', '/ask', { shallow: true })
  }
  return (
    <Container>
      <div>
        <p>My Points: {stats.points}</p>
        <p>Questions: {stats.questions}</p>
        <p>Votes: {stats.votes}</p>
      </div>
      <div>
        <p>Have any doubt?</p>
        <AskQuestionButton onClick={handleAskQuestion}>Ask Question</AskQuestionButton>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
  background: rgba(51, 89, 134, 0.33);
  border-radius: 10px;
  padding: 10px 20px;
  justify-content: space-between;
  font-size: 1.2rem;
`

const AskQuestionButton = styled.button`
  border: none;
  padding: 10px;
  color: white;
  background: #2F67AA;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  transition: all 0.1s 0s ease-in-out;
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`
