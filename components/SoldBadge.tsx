/* Gallery convention: a red dot marks a sold work. A white pill with red dot
   and text reads on both the paper caption panel and the dark hero panel. */
export function SoldBadge({ className = '' }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Sold"
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-sold/25 bg-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-sold ${className}`}
    >
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-sold" />
      <span aria-hidden="true">Sold</span>
    </span>
  );
}
