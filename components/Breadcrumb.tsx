import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbProps {
  items: { label: string; href: string }[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
            <Link
              href={item.href}
              className={`inline-flex items-center text-sm font-medium ${
                index === items.length - 1
                  ? "text-gray-500 dark:text-gray-400"
                  : "text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

