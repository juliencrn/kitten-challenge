import React, { useEffect, useState } from "react"

import { Divider, List, ListItem } from "@ui-kitten/components"

import { db } from "../firebase"
import { Challenge } from "../models/challenge"

// TODO: Remove name
interface LegacyChallenge extends Omit<Challenge, "title"> {
  title?: string
  name: string // legacy
}

const renderItem = ({
  item: { title, name, deadline, price },
}: {
  item: LegacyChallenge
}) => (
  <ListItem
    title={title || name}
    description={JSON.stringify({ deadline, price })}
  />
)

export default function ChallengeList() {
  const [challenges, setChallenges] = useState<LegacyChallenge[]>([])

  useEffect(() => {
    const ref = db.collection("challenge")
    ref.onSnapshot(query => {
      const objs: LegacyChallenge[] = []

      query.forEach(doc => {
        objs.push({
          id: doc.id,
          ...doc.data(),
        } as LegacyChallenge)
      })

      setChallenges(objs)
    })
  }, [])

  return (
    <List
      style={{ width: "100%", maxHeight: 124 }}
      data={challenges}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  )
}
