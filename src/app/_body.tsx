import { Layout } from 'antd';
import Loading from 'components/loading';
import React from 'react'
import { SecondaryRoutes } from 'app/routes';

const { Content } = Layout
/**
 * AppBody
 */
const AppBody: React.FC = () => {
  const { isLoading } = { isLoading: false }

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