export interface Organization {
  name: string
  image_url: string
  image_background_color: string
  description: string
  url: string
  category: string
  irc_channel: string
  contact_email: string
  mailing_list: string
  twitter_url: string
  blog_url: string
  topics: string[]
  technologies: string[]
  years: {
    [year: string]: {
      slots: number
      projects: number
    }
  }
}

