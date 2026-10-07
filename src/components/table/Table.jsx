export default function Table({ children, stickyFirstColumn = true }) {
  return (
    <div className="table-scroll" tabIndex="0">
      <table className={stickyFirstColumn ? "table--sticky-first-column" : undefined}>{children}</table>
    </div>
  );
}
