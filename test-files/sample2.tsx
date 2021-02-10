import React, { FC } from 'react'

const limitDefaults = [5, 6, 6, 8]

export const RecentlyViewedTopics: FC = () => {
  const limit = getValueForScreenSize(limitDefaults)

  const { data } = useRecentlyUpdatedTopicEnrolmentsQuery({
    variables: {
      limit: limit ?? 6,
    },
  })
  if (!data) {
    return <Loader />
  }
  const { recentlyUpdatedTopicEnrolments } = data?.me

  if (recentlyUpdatedTopicEnrolments?.length === 0) {
    return null
  }

  return (
    <PageContentWrapper className="RecentlyViewed">
      <div className="grid-header">
        <h3>Recently viewed</h3>
      </div>

      <CardGrid
        cards={recentlyUpdatedTopicEnrolments.map((enrolment, idx) => {
          const { topicVersion } = enrolment

          let image: string | null | undefined = null
          let imageVariants
          if (topicVersion && topicVersion.backgroundImage) {
            const { backgroundImage } = topicVersion
            imageVariants = backgroundImage.imageVariants
            const resizedImage = backgroundImage.imageVariants.find(
              (imageVariant) => imageVariant.size_key === '300x200'
            )
            image = resizedImage ? resizedImage.cdnUrl : backgroundImage.cdnUrl
          }

          return (
            <ResourceCard
              key={idx}
              image={image}
              imageSrcSet={resourceCardCoverImageSrcSet(imageVariants)}
              // @ts-expect-error
              enrolment={enrolment}
              topicId={enrolment.topic.id}
              title={enrolment.topicVersion?.title}
              description={enrolment.topicVersion?.summary}
              author={enrolment.topic.author}
              readDurationMins={enrolment.topicVersion?.readDurationMins}
            />
          )
        })}
      />
    </PageContentWrapper>
  )
}
