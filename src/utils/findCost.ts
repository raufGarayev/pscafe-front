import { differenceInSeconds, addHours, parseISO, format } from 'date-fns'

export const dateToHours = (
  dateString: string | undefined,
  showTimeParts = true,
  endDateString?: string | undefined
) => {
  if (dateString) {
    const date = parseISO(dateString)
    const zonedDate = addHours(date, -4)
    const now = endDateString ? addHours(parseISO(endDateString), -4) : new Date()
    const totalSeconds = differenceInSeconds(now, zonedDate)


    const hours = totalSeconds / 3600
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (showTimeParts) {
      if (hours >= 1) {
        return `${Math.floor(hours)} saat ${minutes} dəq., ${seconds} san.`
      } else if (minutes >= 1) {
        return `${minutes} dəq., ${seconds} san.`
      } else {
        return `${seconds} san.`
      }
    } else {
      return hours
    }
  }
}

export const calculatePrice = (
  hours: string | number | undefined,
  ratePerHour = 5
) => {
  if (!hours) {
    return 0
  }
  return (+hours * ratePerHour).toFixed(2)
}

export const dateToRealTime = (dateString: string) => {
  const date = parseISO(dateString)
  const dateAdjustedForTimezone = addHours(date, -4)
  const formattedDate = format(dateAdjustedForTimezone, 'HH:mm')

  return formattedDate
}

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - (hours * 3600)) / 60);
  const seconds = duration - (hours * 3600) - (minutes * 60);

  let result = '';
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  result += `${seconds}s`;

  return result;
}