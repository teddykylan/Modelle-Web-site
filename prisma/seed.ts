import { PrismaClient, Role, TemplateStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80";

async function main() {
  await prisma.purchase.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.templateFile.deleteMany();
  await prisma.templateImage.deleteMany();
  await prisma.template.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.sellerProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Password123!", 12);

  const admin = await prisma.user.create({
    data: {
      email: "admin@templatehub.cm",
      name: "Admin TemplateHub",
      passwordHash,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  });

  const sellers = await Promise.all(
    [
      { email: "seller1@templatehub.cm", name: "Studio Douala", company: "Douala Web Studio" },
      { email: "seller2@templatehub.cm", name: "Yaoundé Design", company: "YDE Creative" },
      { email: "seller3@templatehub.cm", name: "Afrique Digital", company: "Afrique Digital Agency" },
    ].map(async (s) => {
      const user = await prisma.user.create({
        data: {
          email: s.email,
          name: s.name,
          passwordHash,
          role: Role.SELLER,
          emailVerified: new Date(),
          sellerProfile: {
            create: {
              companyName: s.company,
              bio: "Créateur de templates modernes pour l'Afrique francophone.",
              verified: true,
            },
          },
        },
        include: { sellerProfile: true },
      });
      return user;
    })
  );

  const buyer = await prisma.user.create({
    data: {
      email: "buyer@templatehub.cm",
      name: "Acheteur Test",
      passwordHash,
      role: Role.BUYER,
      emailVerified: new Date(),
    },
  });

  await prisma.payment.create({
    data: {
      userId: buyer.id,
      amount: 100000,
      currency: "XAF",
      provider: "TEST",
      providerId: "seed-test-buyer-100000-xaf",
      status: "COMPLETED",
      metadata: { note: "Solde de test fictif 100000 XAF" },
    },
  });

  const categories = await Promise.all(
    [
      { name: "Business", slug: "business", icon: "briefcase", order: 1 },
      { name: "Portfolio", slug: "portfolio", icon: "image", order: 2 },
      { name: "E-commerce", slug: "ecommerce", icon: "shopping-cart", order: 3 },
      { name: "Landing Page", slug: "landing-page", icon: "rocket", order: 4 },
      { name: "Blog", slug: "blog", icon: "newspaper", order: 5 },
      { name: "SaaS", slug: "saas", icon: "cloud", order: 6 },
      { name: "Restaurant", slug: "restaurant", icon: "utensils", order: 7 },
      { name: "Agence", slug: "agence", icon: "building", order: 8 },
    ].map((c) => prisma.category.create({ data: c }))
  );

  const tags = await Promise.all(
    ["React", "Next.js", "Tailwind", "Vue", "Dark Mode", "Responsive"].map((name, i) =>
      prisma.tag.create({
        data: {
          name,
          slug: name.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-"),
          usageCount: 5 - i,
        },
      })
    )
  );

  console.log("Seed completed:");
  console.log(`  Admin: ${admin.email}`);
  console.log(`  Sellers: ${sellers.map((s) => s.email).join(", ")}`);
  console.log(`  Buyer: ${buyer.email}`);
  console.log("  Buyer test funds: 100000 XAF (paiement fictif créé)");
  console.log("  Password for all: Password123!");
  console.log("  Aucun template n'a été ajouté. Les vendeurs pourront ajouter leurs propres modèles en production.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
