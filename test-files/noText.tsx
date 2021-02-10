import React, { FC } from 'react'
import { useWorkspacesQuery } from '../../../graphql/gqlPrivateSchema'
import Loader from '../../common/page/loader/Loader'
import { PageContentWrapper } from '../../common/page/Page'

import './YourWorkspaces.less'

export const YourWorkspaces: FC = () => {
  const { data, loading } = useWorkspacesQuery()

  if (loading) {
    return <Loader />
  }
  if (!data || data?.workspaces.length === 0) {
    return null
  }

  return (
    <PageContentWrapper className="YourWorkspaces">
      <div className="grid-header"></div>
    </PageContentWrapper>
  )
}
