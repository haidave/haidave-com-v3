import { format, formatDistanceToNow } from 'date-fns'

export const formatDate = (date: string, includeRelative = false) => {
  const targetDate = new Date(date)
  const fullDate = format(targetDate, 'MMM d, yyyy')

  if (!includeRelative) {
    return fullDate
  }

  const relativeDate = formatDistanceToNow(targetDate, { addSuffix: true })
  return `${fullDate} (${relativeDate})`
}
