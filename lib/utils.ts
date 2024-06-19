import { type ClassValue, clsx } from 'clsx'
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
