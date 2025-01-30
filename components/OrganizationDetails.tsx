import type { Organization } from "@/types/organization"

interface OrganizationDetailsProps {
  organization: Organization
}

export default function OrganizationDetails({ organization }: OrganizationDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Organization Details</h2>
      <p className="mb-2">
        <strong>Years Participated:</strong> {organization.yearsParticipated.join(", ")}
      </p>
      <p className="mb-2">
        <strong>Programming Languages:</strong> {organization.programmingLanguages.join(", ")}
      </p>
      <p className="mb-2">
        <strong>Project Categories:</strong> {organization.projectCategories.join(", ")}
      </p>
      <p className="mb-2">
        <strong>Reliability Score:</strong> {organization.reliabilityScore.toFixed(2)}
      </p>
      <p className="mb-2">
        <strong>2025 Participation Probability:</strong> {(organization.probability2025 * 100).toFixed(1)}%
      </p>
    </div>
  )
}

