import { type FilterValue } from '../types'
import { Filters } from './filters'

interface Props {
  completedCount: number
  activeCount: number
  filterSelected: FilterValue
  onClearCompleted: () => void
  handleFilterChange: (filter: FilterValue) => void
}

export const Footer: React.FC<Props> = ({
  completedCount,
  activeCount,
  onClearCompleted,
  filterSelected,
  handleFilterChange
}) => {
  return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> item left
            </span>
            <Filters
             filterSelected={filterSelected}
             onFilterChange={handleFilterChange}
            />
            {completedCount > 0 && (
              <button
                className="clear-completed"
                onClick={onClearCompleted}
              >
                Clear completed
              </button>
            )}
        </footer>
  )
}
