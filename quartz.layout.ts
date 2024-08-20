import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { FileNode } from "./quartz/components/ExplorerNode";

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
      Component.Explorer({
        useSavedState: false,
        sortFn: (fileNodeA: FileNode, fileNodeB: FileNode) => {
          if (fileNodeA.file && fileNodeB.file) {
            const frontmatterWeightA: number = (fileNodeA.file.frontmatter?.weight ?? 999) as number;
            const frontmatterWeightB = (fileNodeB.file.frontmatter?.weight ?? 999) as number;
          
            if (frontmatterWeightA < frontmatterWeightB) {
              return -1;
            }
          
            return 1;
          }

          return fileNodeA.displayName.localeCompare(fileNodeB.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        }
      })
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
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
