import { Layout } from 'antd';
import Loading from 'components/loading';
import React from 'react'
import { SecondaryRoutes } from 'app/routes';
import { useAuth } from 'app/contexts/auth';

const { Content } = Layout
/**
 * AppBody
 */
const AppBody: React.FC = () => {
  const { isLoading } = useAuth();

  return (
    <Layout hasSider={false}>
      <Content>
        <Loading loading={Boolean(isLoading)} message="loading ...">
          <SecondaryRoutes />
        </Loading>
      </Content>
    </Layout>
  )
}

export default AppBody