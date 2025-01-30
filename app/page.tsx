import OrganizationList from "@/components/OrganizationList"
import BackToTop from "@/components/BackToTop"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            GSOC Organizations Analytics
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Explore and analyze Google Summer of Code organizations from 2016 to
            2024. Filter by technology, year, reliability score, and 2025
            participation probability.
          </p>
          <p className="text-sm text-muted-foreground">
            Built by{" "}
            <Link
              href="https://github.com/dhruv0rathore"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              dhruv0rathore
            </Link>
          </p>
        </div>
        <OrganizationList />
      </main>
      <BackToTop />
    </div>
  )
}

