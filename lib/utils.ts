import { type ClassValue, clsx } from 'clsx'
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountFromMiliUnits(amount: number) {
  return amount / 1000
}

export function convertAmountToMiliUnits(amount: number) {
  return Math.round(amount * 1000)
}

export function formatCurrency(value: number) {
  const finalValue = convertAmountFromMiliUnits(value)
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(finalValue)
}

export function calculcatePercentChange(current: number, previuos: number) {
  if (previuos === 0) {
    return previuos === current ? 0 : 100
  }

  return ((current - previuos) / previuos) * 100
}

export function fillMissingDays(
  activeDays: {
    date: Date
    income: number
    expenses: number
  }[],
  startDate: Date,
  endDate: Date
) {
  if (activeDays.length === 0) {
    return []
  }

  const allDays = eachDayOfInterval({ start: startDate, end: endDate })

  const transactionByDay = allDays.map(day => {
    const found = activeDays.find(d => isSameDay(d.date, day))

    if (found) {
      return found
    } else {
      return { date: day, income: 0, expenses: 0 }
    }
  })
  return transactionByDay
}

type Period = {
  from: string | Date | undefined
  to: string | Date | undefined
}
export function formatDateRange(period?: Period) {
  const defaultTo = new Date()
  const defaultFrom = subDays(defaultTo, 30)

  if (!period?.from) {
    return `${format(defaultFrom, 'LLL dd')} - ${format(
      defaultTo,
      'LLL dd, y'
    )}`
  }

  if (period?.to) {
    return `${format(period.from, 'LLL dd')} - ${format(
      period.to,
      'LLL dd, y'
    )}`
  }

  return format(period.from, 'LLL dd, y')
}
