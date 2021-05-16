import React from "react"

import ChallengeList from "~/components/ChallengeList"
import PageLayout from "~/components/PageLayout"

const MyChallengesScreen = () => {
  return (
    <PageLayout pageTitle="My challenges">
      <ChallengeList />
    </PageLayout>
  )
}

export default MyChallengesScreen
