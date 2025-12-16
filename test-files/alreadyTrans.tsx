import { Trans } from '@lingui/react/macro'

export const Example = () => {
  return (
    <Button
      variant="outline"
      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
    >
      <Trans>View All Events</Trans>
    </Button>
  )
}
