import { types } from 'react-bricks/frontend'

import reactBricksUITheme from './react-bricks-ui'

import HomeBrick from './custom/Home'
import AboutBrick from './custom/About'
import ApproachBrick from './custom/Approach'
import FoundationBrick from './custom/Foundation'
import ContactBrick from './custom/Contact'

import ScheduleBrick from './custom/Learn-more/Schedule'
import AdjustBrick from './custom/Learn-more/Adjust'
import EventsBrick from './custom/Learn-more/Events'

import AdmissionsBrick from './custom/Admissions'
import SubHeaderBrick from './custom/SubHeader'

const bricks: types.Theme[] = [
  reactBricksUITheme, // React Bricks UI
  {
    themeName: 'Default',
    categories: [
      {
        categoryName: 'Home Page',
        bricks: [HomeBrick],
      },
      {
        categoryName: 'About Page',
        bricks: [AboutBrick],
      },
      {
        categoryName: 'Approach Page',
        bricks: [ApproachBrick],
      },
      {
        categoryName: 'Schedule Page',
        bricks: [ScheduleBrick],
      },
      {
        categoryName: 'Adjust Page',
        bricks: [AdjustBrick],
      },
      {
        categoryName: 'Events Page',
        bricks: [EventsBrick],
      },
      {
        categoryName: 'Foundation Page',
        bricks: [FoundationBrick],
      },
      {
        categoryName: 'Admission Page',
        bricks: [AdmissionsBrick],
      },
      {
        categoryName: 'Contact Page',
        bricks: [ContactBrick],
      },
      {
        categoryName: 'SubHeader Entity',
        bricks: [SubHeaderBrick],
      },
    ],
  },
]

export default bricks
