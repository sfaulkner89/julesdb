import { GoPerson } from 'react-icons/go'
import { AiFillClockCircle } from 'react-icons/ai'
import { BiWorld } from 'react-icons/bi'
import { FaStickyNote, FaTag } from 'react-icons/fa'

export const elements = [
  {
    name: 'Designer',
    type: 'text',
    logo: <GoPerson />
  },
  {
    name: 'Year',
    type: 'text',
    logo: <AiFillClockCircle />
  },
  {
    name: 'Country',
    type: 'text',
    logo: <BiWorld />
  },
  {
    name: 'Photos',
    type: 'file'
  },
  {
    name: 'Notes',
    type: 'text',
    logo: <FaStickyNote />
  },
  {
    name: 'Tags',
    type: 'text',
    logo: <FaTag />
  }
]
