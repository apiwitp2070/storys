import { useEffect } from 'react'
import BG from './globalVar'

export const BgList = [
  'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400',
  'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100',
  'bg-gradient-to-tl from-gray-700 via-gray-900 to-black',
  'bg-gradient-to-bl from-green-200 via-green-300 to-blue-500',
  'bg-gradient-to-r from-purple-400 to-yellow-400',
  'bg-gradient-to-r from-yellow-200 via-green-200 to-green-300',
  'bg-gradient-to-r from-green-300 to-purple-400',
  'bg-gradient-to-r from-rose-100 to-teal-100',
  'bg-gradient-to-r from-rose-400 to-orange-300',
  'bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r',
  'bg-gradient-to-r from-slate-500 to-yellow-100',
  'bg-gradient-to-tr from-violet-500 to-orange-300',
]

// Total of 12 colors (Arr[0] - [11])

export const handleChangeBg = () => {
  if (BG.color < 11) {
    BG.color += 1
  } else {
    BG.color = 0
  }
}
