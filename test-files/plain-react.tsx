export interface IFeedbackTemplateProps {
  displayName: string
  topicTitle: string
  feedback: string
  topicUrl: string
}

const FeedbackTemplate = ({
  feedback,
  displayName,
  topicTitle,
  topicUrl,
}: IFeedbackTemplateProps) => (
  <>
    <Para>
      {displayName} has left feedback on your resource: {topicTitle}
    </Para>
    <Callout>
      <Para>{feedback}</Para>
    </Callout>
    <br />
    <ResourceLink
      link={topicUrl}
      title={topicTitle}
      utmCampaign={UtmCampaignEnum.new_feedback}
    />
  </>
)

export const renderFeedbackEmail = (
  feedbacks: IFeedbackTemplateProps[],
  organisation: OrganisationModel
): string => {
  const headerProps = organisation.getEmailTemplateHeaderProps()

  return ReactDOMServer.renderToStaticMarkup(
    <EmailTemplate {...headerProps}>
      <Body>
        <Heading>New Feedback for you</Heading>
        {feedbacks.map((feedback) => {
          return <FeedbackTemplate {...feedback} key={feedback.topicUrl} />
        })}
      </Body>
    </EmailTemplate>
  )
}
