function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  let duration = ''

  if (hours > 0) {
    duration += `${hours} hour${hours > 1 ? 's' : ''}`
    if (remainingMinutes) {
      duration += ` and ${remainingMinutes} min`
    }
  }

  if (!hours && remainingMinutes) {
    duration = `${remainingMinutes} min`
  }

  return duration
}

export default formatDuration
