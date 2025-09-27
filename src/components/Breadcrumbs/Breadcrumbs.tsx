import { Link } from '@tanstack/react-router'
import { HomeIcon, ChevronRightIcon } from '@/components'

export type BreadcrumbItem = {
  label: string
  href?: string
  current?: boolean
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRightIcon />
              {item.href ? (
                <Link
                  to={item.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="ml-4 text-sm font-medium text-gray-900" aria-current="page">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
