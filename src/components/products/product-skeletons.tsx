function SkeletonBlock({
  className,
}: {
  className: string;
}) {
  return <div className={`animate-pulse rounded-2xl bg-[var(--border)]/55 ${className}`} />;
}

export function ListingPageSkeleton() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-8 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] px-5 py-8 shadow-[0_20px_80px_rgba(53,35,23,0.08)] sm:px-8 sm:py-10 lg:px-12">
        <header className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.9fr)] lg:items-end">
          <div className="space-y-4">
            <SkeletonBlock className="h-8 w-44 rounded-full" />
            <div className="space-y-3">
              <SkeletonBlock className="h-14 w-full max-w-3xl" />
              <SkeletonBlock className="h-6 w-full max-w-2xl" />
              <SkeletonBlock className="h-6 w-4/5 max-w-xl" />
            </div>
          </div>

          <div className="grid gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-raised)] p-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <SkeletonBlock className="h-10 w-14" />
                <SkeletonBlock className="h-4 w-full" />
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-raised)] p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_220px_180px]">
          <div className="space-y-2">
            <SkeletonBlock className="h-4 w-28" />
            <SkeletonBlock className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-12 w-full" />
          </div>
          <div className="space-y-2 rounded-[1.25rem] bg-[var(--surface)] px-4 py-3">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="mt-2 h-4 w-full" />
            <SkeletonBlock className="mt-2 h-4 w-3/4" />
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-8 w-80 max-w-full" />
            </div>
            <SkeletonBlock className="h-4 w-44" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <article
                key={index}
                className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-raised)]"
              >
                <SkeletonBlock className="h-60 w-full rounded-none" />
                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <SkeletonBlock className="h-4 w-20" />
                    <SkeletonBlock className="h-5 w-14" />
                  </div>
                  <div className="space-y-2">
                    <SkeletonBlock className="h-7 w-3/4" />
                    <SkeletonBlock className="h-4 w-full" />
                    <SkeletonBlock className="h-4 w-5/6" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <SkeletonBlock className="h-18 w-full" />
                    <SkeletonBlock className="h-18 w-full" />
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                    <SkeletonBlock className="h-4 w-20" />
                    <SkeletonBlock className="h-11 w-11 rounded-full" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export function ProductDetailSkeleton() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-6 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_20px_80px_rgba(53,35,23,0.08)] sm:p-8 lg:p-10">
        <SkeletonBlock className="h-4 w-40" />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)]">
            <SkeletonBlock className="aspect-[4/3] w-full rounded-none" />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <SkeletonBlock className="h-8 w-28 rounded-full" />
                <SkeletonBlock className="h-5 w-24" />
              </div>
              <div className="space-y-3">
                <SkeletonBlock className="h-14 w-full" />
                <SkeletonBlock className="h-6 w-full" />
                <SkeletonBlock className="h-6 w-5/6" />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-4"
                >
                  <SkeletonBlock className="h-4 w-16" />
                  <SkeletonBlock className="mt-3 h-8 w-20" />
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-raised)] p-5">
              <SkeletonBlock className="h-6 w-48" />
              <div className="mt-4 space-y-3">
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-11/12" />
                <SkeletonBlock className="h-4 w-4/5" />
              </div>
            </div>

            <div className="grid gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-raised)] p-5 sm:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="rounded-[1.25rem] bg-[var(--surface)] px-4 py-4">
                  <SkeletonBlock className="h-4 w-24" />
                  <SkeletonBlock className="mt-3 h-7 w-32" />
                  <SkeletonBlock className="mt-3 h-4 w-full" />
                  <SkeletonBlock className="mt-2 h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function RelatedProductsSkeleton() {
  return (
    <section className="space-y-5 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_20px_80px_rgba(53,35,23,0.08)] sm:p-8 lg:p-10">
      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="h-8 w-64 max-w-full" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <article
            key={index}
            className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-raised)]"
          >
            <SkeletonBlock className="h-52 w-full rounded-none" />
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-4">
                <SkeletonBlock className="h-4 w-20" />
                <SkeletonBlock className="h-5 w-14" />
              </div>
              <div className="space-y-2">
                <SkeletonBlock className="h-7 w-4/5" />
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-3/4" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
