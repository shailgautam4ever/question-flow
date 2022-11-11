import { useSession } from 'next-auth/react'
import Image from 'next/image'
import styled from 'styled-components'

export default function Nav(){
  const { data } = useSession()
  return (
    <NavContainer>
      <BrandInfo>
        <Image src='/favicon.ico' width={30} height={30} alt='logo' /> 
        <BrandName>Question Flow</BrandName>
      </BrandInfo>
      <UserInfo>
        <Image src={data?.user?.image ?? '/favicon.ico'} width={30} height={30} alt='user-image' />
        <span>{data?.user?.name ?? 'No Name'}</span>
      </UserInfo>
    </NavContainer>
  )
}

const NavContainer = styled.div`
  padding: 10px 20px;
  background: #335986;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const BrandName = styled.span`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 39px;
`
const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const UserInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: white;
  img {
    border-radius: 50%;
  }
`