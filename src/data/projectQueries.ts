import { useQuery } from "@tanstack/react-query";
import { allProjects, featuredProjects } from "./projects";

export const projectQueryKeys = {
  all: ["projects"] as const,
  featured: ["projects", "featured"] as const,
  combined: ["projects", "combined"] as const,
  detail: (slug: string | undefined) => ["projects", "detail", slug] as const,
};

const queryOptions = {
  staleTime: Infinity,
  gcTime: 1000 * 60 * 30,
};

export function getCombinedProjects() {
  return [
    ...featuredProjects,
    ...allProjects.filter((project) => !featuredProjects.some((item) => item.slug === project.slug)),
  ];
}

export function useFeaturedProjectsQuery() {
  return useQuery({
    queryKey: projectQueryKeys.featured,
    queryFn: async () => featuredProjects,
    initialData: featuredProjects,
    ...queryOptions,
  });
}

export function useAllProjectsQuery() {
  return useQuery({
    queryKey: projectQueryKeys.all,
    queryFn: async () => allProjects,
    initialData: allProjects,
    ...queryOptions,
  });
}

export function useCombinedProjectsQuery() {
  return useQuery({
    queryKey: projectQueryKeys.combined,
    queryFn: async () => getCombinedProjects(),
    initialData: getCombinedProjects,
    ...queryOptions,
  });
}

export function useProjectQuery(slug: string | undefined) {
  return useQuery({
    queryKey: projectQueryKeys.detail(slug),
    queryFn: async () => getCombinedProjects().find((project) => project.slug === slug),
    initialData: () => getCombinedProjects().find((project) => project.slug === slug),
    enabled: Boolean(slug),
    ...queryOptions,
  });
}
