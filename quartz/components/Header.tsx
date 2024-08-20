import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return children.length > 0 ? <header><div class="page-header">{children}</div></header> : null
}

Header.css = `
header {
  position: sticky;
    top: 0;
    padding: 1rem 0;
    background-color: var(--light);
    z-index: 999;
  }

header > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
}

header h1 {
  margin: 0;
  flex: auto;
}
`

export default (() => Header) satisfies QuartzComponentConstructor
