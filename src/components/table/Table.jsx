export default function Table({ children, stickyFirstColumn = true }) {
  return <table className={stickyFirstColumn ? "table--sticky-first-column" : undefined}>{children}</table>;
}
