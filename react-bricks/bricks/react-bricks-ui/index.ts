import { types } from 'react-bricks/frontend'

// SHARED
import Badge from './shared/bricks/Badge'
import BulletListItem from './shared/bricks/BulletListItem'
import Button from './shared/bricks/Button'

// Theme structure
const allBricks: types.Theme = {
  themeName: 'React Bricks UI',
  categories: [
    {
      categoryName: 'Shared',
      bricks: [Badge, BulletListItem, Button],
    },
  ],
}

// Single bricks
export { Badge, Button, BulletListItem }

export default allBricks
