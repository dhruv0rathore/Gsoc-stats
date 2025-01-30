import Link from "next/link"
import Image from "next/image"
import type { Organization } from "@/types/organization"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Twitter, Globe } from "lucide-react"

interface OrganizationCardProps {
  organization: Organization
}

export default function OrganizationCard({ organization }: OrganizationCardProps) {
  const currentYear = new Date().getFullYear()
  const recentYears = Object.keys(organization.years)
    .map(Number)
    .filter((year) => year >= currentYear - 2)

  const reliabilityScore = (recentYears.length / 3) * 100
  const probability2025 = recentYears.length === 3 ? 0.9 : recentYears.length === 2 ? 0.6 : 0.3

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={organization.image_url || "/placeholder.svg"}
              alt={`${organization.name} logo`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <CardTitle className="text-lg font-bold">{organization.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{organization.description}</p>
        <div className="mb-2 flex flex-wrap gap-1">
          {organization.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {Object.keys(organization.years).map((year) => (
            <Badge key={year} variant="outline" className="text-xs">
              {year}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-muted p-4 text-xs">
        <div className="flex items-center space-x-2">
          <span>Reliability: {reliabilityScore.toFixed(0)}%</span>
          <span>2025 Probability: {(probability2025 * 100).toFixed(0)}%</span>
        </div>
        <div className="flex space-x-2">
          {organization.twitter_url && (
            <Link href={organization.twitter_url} target="_blank" rel="noopener noreferrer">
              <Twitter className="h-4 w-4" />
            </Link>
          )}
          {organization.blog_url && (
            <Link href={organization.blog_url} target="_blank" rel="noopener noreferrer">
              <Globe className="h-4 w-4" />
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

