import React from 'react'
import { useWorkspacesQuery } from '../../../graphql/gqlPrivateSchema'
import Loader from '../../common/page/loader/Loader'
import { PageContentWrapper } from '../../common/page/Page'
// import WorkspaceCard from '../../../pages/dashboard-page/workspace-card/WorkspaceCard'
// import CardGrid from '../../common/card-grid/CardGrid'
import './YourWorkspaces.less'

export const YourWorkspaces = () => {
  const { data, loading } = useWorkspacesQuery()

  if (loading) {
    return <Loader />
  }
  if (!data || data?.workspaces.length === 0) {
    return null
  }
  const a = 2
  return (
    <PageContentWrapper className="YourWorkspaces">
      <div className="grid-header">
        <h3>Your workspaces {a}</h3>
      </div>

      <div>
        Read the <a href="https://lingui.js.org">documentation</a>
        for more info.
      </div>
    </PageContentWrapper>
  )
}
