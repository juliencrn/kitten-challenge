import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import { Button, Card, List, Text } from "@ui-kitten/components"
import differenceInDays from "date-fns/differenceInDays"

import imageBg from "~/assets/image-article-background-2.jpg"
import { getChallenges } from "~/firebase"
import { Challenge } from "~/models/Challenge"

import ImageOverlay from "./ImageOverlay"
import renderIcon from "./RenderIcon"

const ChallengeCard = ({ item }: { item: Challenge }) => {
  const deadline = item.deadline.toDate()
  const daysLeft = differenceInDays(deadline, new Date())

  return (
    <Card style={styles.item}>
      <ImageOverlay style={styles.itemImage} source={imageBg}>
        <Text style={styles.itemTitle} category="h2" status="control">
          {item.title}
        </Text>
        <Text style={styles.itemDescription} category="s1" status="control">
          {`There's a lot of advice out there on how to eat healthy, and if we're being honest, it can sometimes feel like too much to think about.`}
        </Text>
        <View style={styles.itemFooter}>
          <Button
            style={styles.iconButton}
            appearance="ghost"
            status="control"
            accessoryLeft={renderIcon("calendar-outline")}
          >
            {`${daysLeft} days left or pay ${item.price} €`}
          </Button>
        </View>
      </ImageOverlay>
    </Card>
  )
}

export default function ChallengeList() {
  const [challenges, setChallenges] = useState<Challenge[]>([])

  useEffect(() => {
    getChallenges().then(docs => setChallenges(docs))
  }, [])

  return (
    <List
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={challenges}
      renderItem={ChallengeCard}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    margin: 0,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  item: {
    marginVertical: 8,
    height: 220,
  },
  itemImage: {
    ...StyleSheet.absoluteFillObject,
    height: 220,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  itemTitle: {
    zIndex: 1,
  },
  itemDescription: {
    zIndex: 1,
    marginVertical: 16,
  },
  itemFooter: {
    position: "absolute",
    flexDirection: "row",
    left: 8,
    bottom: 8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
})
