import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TemplateGrid } from "@/components/marketplace/TemplateGrid";
import { getPublishedTemplates, getCategories } from "@/lib/templates";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  const { templates, total } = await getPublishedTemplates({
    category: slug,
    limit: 24,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">{category.name}</h1>
      {category.description && (
        <p className="mt-2 text-muted-foreground">{category.description}</p>
      )}
      <p className="mt-1 text-sm text-muted-foreground">{total} templates</p>
      <div className="mt-8">
        {total === 0 ? (
          <div className="rounded-3xl border bg-card p-10 text-center">
            <h2 className="text-2xl font-semibold">Aucun template disponible</h2>
            <p className="mt-3 text-muted-foreground">
              Cette catégorie est prête à accueillir de vrais modèles. Les vendeurs peuvent uploader leur propre template.
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link href="/register?role=seller">Devenir vendeur</Link>
            </Button>
          </div>
        ) : (
          <TemplateGrid templates={templates} />
        )}
      </div>
    </div>
  );
}
