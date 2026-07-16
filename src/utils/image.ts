// Dynamic project image glob resolver for Vite production bundling
const projectImages = import.meta.glob<{ default: string }>('/src/assets/projects/**/*', { eager: true });

export const getImageUrl = (path: string): string => {
  if (path && path in projectImages) {
    return projectImages[path].default;
  }
  return path;
};
