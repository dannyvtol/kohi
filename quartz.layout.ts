import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { FileNode } from "./quartz/components/ExplorerNode";

const Explorer = Component.Explorer({
  sortFn: (fileNodeA: FileNode, fileNodeB: FileNode) => {
    // Prioritize files before folders in listing
    if (fileNodeA.children.length === 0 && fileNodeB.children.length > 0) {
      return -1;
    }

    if (fileNodeA.children.length > 0 && fileNodeB.children.length === 0) {
      return 1;
    }

    if (fileNodeA.file !== null && fileNodeB.file !== null) {
      const frontmatterWeightA: number = (fileNodeA.file.frontmatter?.weight ?? 999) as number;
      const frontmatterWeightB = (fileNodeB.file.frontmatter?.weight ?? 999) as number;
    
      if (frontmatterWeightA < frontmatterWeightB) {
        return -1;
      }
    
      return 1;
    }

    // Sort folders by physical name instead of display name
    return fileNodeA.name.localeCompare(fileNodeB.name, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }
})

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Spacer(),
    Component.Search(),
    Component.Darkmode(),
  ],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/dannyvtol"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.TableOfContents(),
  ],
  left: [
    Component.DesktopOnly(
      Explorer
    ),
  ],
  right: [
    Component.Graph(),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.DesktopOnly(
      Explorer
    ),
  ],
  right: [],
}
