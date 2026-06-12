import Link from "next/link";
import { Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TemplateGrid } from "@/components/marketplace/TemplateGrid";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { getPublishedTemplates, getCategories } from "@/lib/templates";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [{ templates: featured }, { templates: trending }, categories] = await Promise.all([
    getPublishedTemplates({ featured: true, limit: 4 }),
    getPublishedTemplates({ sort: "popular", limit: 8 }),
    getCategories(),
  ]);

  return (
    <div>
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              Designs modernes 2025-2026
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Modèles de sites web{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                modernes
              </span>{" "}
              pour l&apos;Afrique
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              TemplateHub CM — marketplace francophone avec paiement sécurisé via Paystack.
            </p>
            <div className="mt-8 max-w-xl mx-auto">
              <SearchBar placeholder="Rechercher un template..." />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Catégories</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group rounded-xl border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-md"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg">
                {cat.icon?.[0]?.toUpperCase() ?? "T"}
              </div>
              <p className="mt-2 text-sm font-medium group-hover:text-primary">{cat.name}</p>
              <p className="text-xs text-muted-foreground">{cat._count.templates} templates</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Pourquoi choisir TemplateHub CM</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border bg-card p-6 text-center">
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
              ✓
            </span>
            <h3 className="font-semibold">Paiement sécurisé</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Payez facilement avec Paystack, carte ou Mobile Money, sans complication.
            </p>
          </div>
          <div className="rounded-3xl border bg-card p-6 text-center">
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xl font-bold">
              ⚡
            </span>
            <h3 className="font-semibold">Accès immédiat</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Téléchargez votre template dès la confirmation de paiement et commencez votre projet.
            </p>
          </div>
          <div className="rounded-3xl border bg-card p-6 text-center">
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
              🌍
            </span>
            <h3 className="font-semibold">Support local</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Une marketplace pensée pour l’Afrique francophone et les entrepreneurs locaux.
            </p>
          </div>
          <div className="rounded-3xl border bg-card p-6 text-center">
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xl font-bold">
              💼
            </span>
            <h3 className="font-semibold">Templates optimisés</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Designs modernes et performants, prêts à être personnalisés pour votre activité.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-muted/20 rounded-3xl">
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold">Comment ça marche</h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Trouvez un template, achetez en quelques clics et téléchargez immédiatement le package prêt à être modifié.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
            <div className="rounded-3xl border bg-card p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                1
              </span>
              <h3 className="mt-4 font-semibold">Recherchez</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Filtrez par catégorie, prix et technologie pour trouver le template idéal.
              </p>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                2
              </span>
              <h3 className="mt-4 font-semibold">Achetez</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Paiement sécurisé via Paystack avec carte ou Mobile Money.
              </p>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                3
              </span>
              <h3 className="mt-4 font-semibold">Personnalisez</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Téléchargez vos fichiers sources et mettez votre marque en ligne rapidement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Ce que disent nos utilisateurs</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              « J’ai trouvé un template pro et j’ai pu lancer mon site vitrine en moins d’une journée. Service très pratique pour le Cameroun. »
            </p>
            <p className="mt-4 text-sm font-semibold">– Djibril, entrepreneur</p>
          </div>
          <div className="rounded-3xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              « Paiement Mobile Money simple, téléchargement immédiat et le design était exactement ce que je recherchais. »
            </p>
            <p className="mt-4 text-sm font-semibold">– Aïcha, freelance</p>
          </div>
          <div className="rounded-3xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              « Le catalogue est bien organisé, j’ai pu comparer rapidement plusieurs templates avant de décider. »
            </p>
            <p className="mt-4 text-sm font-semibold">– Samuel, startup</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Featured</h2>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/templates?featured=true">
              Voir tout <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6">
          <TemplateGrid templates={featured} />
        </div>
      </section>

      {trending.length > 0 && (
        <section className="bg-muted/30 border-y">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <h2 className="text-2xl font-bold">Trending</h2>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/templates?sort=popular">
                  Voir tout <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-6">
              <TemplateGrid templates={trending} />
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold">Vendez vos templates</h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Rejoignez notre communauté de créateurs camerounais. Commission de 25%, paiements locaux pour vos clients.
        </p>
        <Button size="lg" className="mt-6" asChild>
          <Link href="/register?role=seller">Devenir vendeur</Link>
        </Button>
      </section>
    </div>
  );
}
