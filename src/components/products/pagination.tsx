import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  search: string;
  category: string;
};

export function Pagination({
  currentPage,
  totalPages,
  search,
  category,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const items = getPaginationItems(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-raised)] p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm font-medium text-[var(--foreground)]">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <PaginationLink
          page={Math.max(1, currentPage - 1)}
          search={search}
          category={category}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationLink>

        {items.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex h-10 min-w-10 items-center justify-center px-1 text-sm font-semibold text-[var(--foreground)]"
            >
              ...
            </span>
          ) : (
            <PaginationLink
              key={item}
              page={item}
              search={search}
              category={category}
              isActive={item === currentPage}
            >
              {item}
            </PaginationLink>
          ),
        )}

        <PaginationLink
          page={Math.min(totalPages, currentPage + 1)}
          search={search}
          category={category}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationLink>
      </div>
    </nav>
  );
}

type PaginationLinkProps = {
  children: React.ReactNode;
  page: number;
  search: string;
  category: string;
  disabled?: boolean;
  isActive?: boolean;
};

function PaginationLink({
  children,
  page,
  search,
  category,
  disabled = false,
  isActive = false,
}: PaginationLinkProps) {
  const href = buildProductsUrl(page, search, category);

  if (disabled) {
    return (
      <span className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--foreground)]">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      scroll={false}
      className={
        isActive
          ? "inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[rgba(184,92,56,0.12)] px-4 text-sm font-semibold text-[var(--accent)]"
          : "inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[var(--border)] px-4 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
      }
    >
      {children}
    </Link>
  );
}

function buildProductsUrl(page: number, search: string, category: string) {
  const params = new URLSearchParams();

  if (search) {
    params.set("query", search);
  }

  if (category) {
    params.set("category", category);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

function getPaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPages] as const;
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ] as const;
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ] as const;
}
