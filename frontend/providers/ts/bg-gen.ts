const colorArray = [
  '',
  'bg-gradient-to-bl from-pink-300 via-purple-300',
  'bg-gradient-to-tl from-yellow-200 via-pink-200 to-pink-400',
  'bg-gradient-to-br from-rose-100 to-teal-100',
  'bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r',
  'bg-gradient-to-br from-slate-500 to-yellow-100',
  'bg-conic-to-tl from-sky-500 via-orange-200 to-yellow-600',
  'Pastel bg-gradient-to-tr from-violet-500 to-orange-300',
  'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100',
  'bg-conic-to-tr from-blue-300 via-rose-400 to-amber-300',
]

export default async function BgGenerator(setBg: any) {
  const bg = Math.floor(Math.random() * (9 - 1 + 1) + 1);
  switch (bg) {
    case 1:
      await setBg(colorArray[1]);
      break;
    case 2:
      await setBg(colorArray[2]);
      break;
    case 3:
      await setBg(colorArray[3]);
      break;
    case 4:
      await setBg(colorArray[4]);
      break;
    case 5:
      await setBg(colorArray[5]);
      break;
    case 6:
      await setBg(colorArray[6]);
      break;
    case 7:
      await setBg(colorArray[7]);
      break;
    case 8:
      await setBg(colorArray[8]);
      break;
    case 9:
      await setBg(colorArray[9]);
      break;
  }
}