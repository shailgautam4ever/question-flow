import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, ReactElement, useEffect } from 'react'
import styled from 'styled-components';
import Nav from '../components/Nav'
import Sidebar from './Sidebar';

type Props = {
  children?: React.ReactNode;
}

const Layout: FC<Props> = ({ children }): ReactElement => {
  const { data, status } = useSession()
  const { push } = useRouter()
  useEffect(() => {
    if (!data && status === 'unauthenticated') {
      push('/', '/', { shallow: true })
    }
  }, [data])
  return (
    <LayoutContainer>
      <Nav />
      <BodyContainer>
        <Sidebar />
        <PageContent>
          {children}
        </PageContent>
      </BodyContainer>
    </LayoutContainer>
  )
}

export default Layout

const LayoutContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F8F8F8;
`

const BodyContainer = styled.div`
  display: flex;
  flex: 1;
`

const PageContent = styled.div`
  flex: 1;
  padding: 10px 20px;
  overflow: auto;
  height: 92vh;
`
