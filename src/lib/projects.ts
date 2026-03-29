import { allProjects } from 'content-collections'

export type PortfolioProject = (typeof allProjects)[number]

export function getProjects() {
  return [...allProjects].sort((a, b) => a.order - b.order)
}

export function getFeaturedProjects(limit = 3) {
  return getProjects().slice(0, limit)
}

export function getProjectBySlug(slug: string) {
  return allProjects.find((project) => project._meta.path === slug)
}
