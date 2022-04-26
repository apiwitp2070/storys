import React from "react";

export default async function BgGenerator(setBg: any) {
  const bg = Math.floor(Math.random() * (9 - 1 + 1) + 1);
  switch (bg) {
    case 1:
      await setBg('bg-gradient-to-bl from-pink-300 via-purple-300');
      break;
    case 2:
      await setBg('bg-gradient-to-tl from-yellow-200 via-pink-200 to-pink-400');
      break;
    case 3:
      await setBg('bg-gradient-to-br from-rose-100 to-teal-100');
      break;
    case 4:
      await setBg('bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r');
      break;
    case 5:
      await setBg('bg-gradient-to-br from-slate-500 to-yellow-100');
      break;
    case 6:
      await setBg('bg-conic-to-tl from-sky-500 via-orange-200 to-yellow-600');
      break;
    case 7:
      await setBg('Pastel bg-gradient-to-tr from-violet-500 to-orange-300');
      break;
    case 8:
      await setBg('bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100');
      break;
    case 9:
      await setBg('bg-conic-to-tr from-blue-300 via-rose-400 to-amber-300');
      break;
  }
}