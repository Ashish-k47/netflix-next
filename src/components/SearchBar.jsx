export default function SearchBar({ value, onChange, placeholder = 'Search movies…', autoFocus = false }) {
  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search movies"
        className="w-full rounded-full border border-base-700 bg-base-900 py-3.5 pl-11 pr-4 text-base text-neutral-100 placeholder:text-neutral-500 focus:border-accent-500 focus:outline-none"
      />
    </div>
  )
}
