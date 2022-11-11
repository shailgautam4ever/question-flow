import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import styled from "styled-components"

export default function Sidebar() {
  const { push } = useRouter()
  const handleSignOut = () => {
    signOut()
  }

  return (
    <Container>
      <MenuItem onClick={() => push('/', '/', { shallow: true })}>Home</MenuItem>
      <SignoutButton onClick={handleSignOut}>Sign Out</SignoutButton>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f1f1f1;
  width: 15rem;
  padding: 10px;
`

const MenuItem = styled.p`
  background: rgba(51, 89, 134, 0.33);
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`
const SignoutButton = styled.div`
  padding: 10px;
  color: #999;
  cursor: pointer;
`