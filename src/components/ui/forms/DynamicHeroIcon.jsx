import * as HIcons from '@heroicons/react/outline'

const DynamicHeroIcon = (props) => {
  const {...icons} = HIcons
  const TheIcon = icons[props.icon]

  return (
    <>
      <TheIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
    </>
  )
}

export default DynamicHeroIcon