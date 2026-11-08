// La carte — the single file to edit when dishes or prices change.
// Each text field holds the three languages. `price` in euros (null = not published yet).
// `photo` = file name in /public/img/plats (without size suffix); `plate` = cutout in /public/img/assiettes.
// TODO(owner): complete with the full in-house menu (salads, sushis, desserts, drinks) and missing prices.

export type L10n = { fr: string; en: string; he: string };
export type Tag = 'veg' | 'signature' | 'bestseller' | 'new';
export type Dish = {
  id: string;
  name: L10n;
  desc?: L10n;
  price: number | null;
  tags?: Tag[];
  photo?: string;
  plate?: string;
};
export type Category = { id: string; name: L10n; items: Dish[] };

const same = (s: string): L10n => ({ fr: s, en: s, he: s });

export const menuIsDraft = true;

export const menu: Category[] = [
  {
    id: 'entrees',
    name: { fr: 'Entrées', en: 'Starters', he: 'מנות פתיחה' },
    items: [
      {
        id: 'burrata', price: 22, tags: ['bestseller', 'veg'], photo: 'pizza-burrata-tomates-cerises', plate: 'pizza-burrata-tomates-cerises',
        name: { fr: 'Burrata crémeuse', en: 'Creamy burrata', he: 'בוראטה קרמית' },
        desc: {
          fr: 'Servie sur une pizzetta, tomates cerises, crème balsamique, basilic frais.',
          en: 'Served on a pizzetta, cherry tomatoes, balsamic cream, fresh basil.',
          he: 'מוגשת על פיצטה, עגבניות שרי, קרם בלסמי, בזיליקום טרי.',
        },
      },
      {
        id: 'carpaccio-dorade', price: 26, tags: ['signature'], photo: 'carpaccio-poisson-truffe', plate: 'carpaccio-poisson-truffe',
        name: { fr: 'Carpaccio de dorade', en: 'Sea bream carpaccio', he: 'קרפצ׳ו דניס' },
        desc: {
          fr: 'Huile de truffe, zestes de citron vert, noisettes torréfiées, ciboulette.',
          en: 'Truffle oil, lime zest, roasted hazelnuts, chives.',
          he: 'שמן כמהין, גרידת ליים, אגוזי לוז קלויים, עירית.',
        },
      },
      {
        id: 'carpaccio-saumon', price: 23, photo: 'carpaccio-saumon-parmesan', plate: 'carpaccio-saumon-parmesan',
        name: { fr: 'Carpaccio de saumon', en: 'Salmon carpaccio', he: 'קרפצ׳ו סלמון' },
        desc: {
          fr: 'Fleur de sel, zestes de citron, copeaux de parmesan, balsamique.',
          en: 'Fleur de sel, lemon zest, parmesan shavings, balsamic.',
          he: 'פלר דה סל, גרידת לימון, שבבי פרמזן, בלסמי.',
        },
      },
      {
        id: 'carpaccio-boutargue', price: 25, tags: ['signature'],
        name: { fr: 'Carpaccio de boutargue', en: 'Bottarga carpaccio', he: 'קרפצ׳ו בוטרגה' },
        desc: {
          fr: 'Oignon rouge, coriandre, citron, huile d’olive.',
          en: 'Red onion, coriander, lemon, olive oil.',
          he: 'בצל סגול, כוסברה, לימון, שמן זית.',
        },
      },
      {
        id: 'tartare-saumon', price: 19, photo: 'tartare-saumon-avocat',
        name: { fr: 'Tartare de saumon', en: 'Salmon tartare', he: 'טרטר סלמון' },
        desc: {
          fr: 'Citron vert, avocat, huile d’olive et balsamique.',
          en: 'Lime, avocado, olive oil and balsamic.',
          he: 'ליים, אבוקדו, שמן זית ובלסמי.',
        },
      },
      {
        id: 'cigares-chevre', price: 19, tags: ['veg'], photo: 'nems-chevre-noix',
        name: { fr: 'Cigares de chèvre et miel', en: 'Goat cheese & honey cigars', he: 'סיגרים גבינת עיזים ודבש' },
        desc: { fr: 'Roquette, noix, miel.', en: 'Rocket, walnuts, honey.', he: 'רוקט, אגוזי מלך, דבש.' },
      },
      {
        id: 'beignets-mozzarella', price: 15, tags: ['veg'], photo: 'croquettes-sauce-tomate',
        name: { fr: 'Beignets de mozzarella', en: 'Mozzarella fritters', he: 'כדורי מוצרלה מטוגנים' },
        desc: { fr: 'Roquette, pesto rouge.', en: 'Rocket, red pesto.', he: 'רוקט, פסטו אדום.' },
      },
      {
        id: 'parmigiana', price: 20, tags: ['veg'],
        name: { fr: 'Parmigiana d’aubergines', en: 'Aubergine parmigiana', he: 'פרמיג׳אנה חצילים' },
        desc: {
          fr: 'Sauce tomate, aubergines, mozzarella, parmesan.',
          en: 'Tomato sauce, aubergine, mozzarella, parmesan.',
          he: 'רוטב עגבניות, חצילים, מוצרלה, פרמזן.',
        },
      },
      {
        id: 'antipasti', price: 25,
        name: { fr: 'Antipasti', en: 'Antipasti', he: 'אנטיפסטי' },
        desc: {
          fr: 'Courgettes grillées, aubergines confites, tomates séchées, câpres, roquette, olives Kalamata, focaccia, copeaux de parmesan.',
          en: 'Grilled courgettes, confit aubergines, sun-dried tomatoes, capers, rocket, Kalamata olives, focaccia, parmesan shavings.',
          he: 'קישואים צלויים, חצילים מקורמלים, עגבניות מיובשות, צלפים, רוקט, זיתי קלמטה, פוקצ׳ה, שבבי פרמזן.',
        },
      },
      {
        id: 'focaccia', price: 15, tags: ['veg'],
        name: { fr: 'Focaccia maison', en: 'House focaccia', he: 'פוקצ׳ה של הבית' },
        desc: {
          fr: 'Ail, olives, tapenade, olives Kalamata.',
          en: 'Garlic, olives, tapenade, Kalamata olives.',
          he: 'שום, זיתים, טפנד, זיתי קלמטה.',
        },
      },
      {
        id: 'soupe-oignon', price: 15,
        name: { fr: 'Soupe à l’oignon gratinée', en: 'French onion soup', he: 'מרק בצל מוקרם' },
        desc: { fr: 'Croûtons, emmental.', en: 'Croutons, emmental.', he: 'קרוטונים, אמנטל.' },
      },
      {
        id: 'soupe-jour', price: 15,
        name: { fr: 'Soupe du jour', en: 'Soup of the day', he: 'מרק היום' },
      },
    ],
  },
  {
    id: 'pizzas',
    name: { fr: 'Pizzas', en: 'Pizzas', he: 'פיצות' },
    items: [
      {
        id: 'burratina', price: 22, tags: ['bestseller', 'veg'], photo: 'pizza-burratina', plate: 'pizza-burratina',
        name: same('Burratina'),
        desc: {
          fr: 'Sauce tomate, mozzarella, burrata crémeuse, tomates cerises, roquette, crème balsamique.',
          en: 'Tomato sauce, mozzarella, creamy burrata, cherry tomatoes, rocket, balsamic cream.',
          he: 'רוטב עגבניות, מוצרלה, בוראטה קרמית, עגבניות שרי, רוקט, קרם בלסמי.',
        },
      },
      { id: 'tartufo', price: null, name: same('Tartufo') },
      { id: 'amstrong', price: null, name: same('Amstrong') },
      { id: 'goldman', price: null, name: same('Goldman') },
      { id: 'santana', price: null, name: same('Santana') },
      { id: 'clederman', price: null, name: same('Clederman') },
      { id: 'rossini', price: null, name: same('Rossini') },
      { id: 'sanders', price: null, name: same('Sanders') },
      { id: 'jackson', price: null, name: same('Jackson') },
      { id: 'noce-miele', price: null, name: same('Nocé Mielé') },
    ],
  },
  {
    id: 'pates',
    name: { fr: 'Pâtes', en: 'Pasta', he: 'פסטה' },
    items: [
      {
        id: 'linguine-truffe', price: 25, tags: ['signature', 'veg'],
        name: { fr: 'Linguine ai funghi & truffe', en: 'Linguine ai funghi & truffle', he: 'לינגוויני פטריות וכמהין' },
        desc: {
          fr: 'Champignons frais, sauce à la crème de truffes, copeaux de parmesan.',
          en: 'Fresh mushrooms, truffle cream sauce, parmesan shavings.',
          he: 'פטריות טריות, רוטב שמנת כמהין, שבבי פרמזן.',
        },
      },
      { id: 'rigatoni-rosa', price: null, name: { fr: 'Rigatoni rosa salmon', en: 'Rigatoni rosa salmon', he: 'ריגטוני רוזה סלמון' } },
      { id: 'rigatoni-romana', price: null, name: { fr: 'Rigatoni Romana', en: 'Rigatoni Romana', he: 'ריגטוני רומנה' } },
      { id: 'penne-champignon', price: null, name: { fr: 'Penne crème champignon', en: 'Penne, mushroom cream', he: 'פנה שמנת פטריות' } },
      { id: 'penne-rosee', price: null, name: { fr: 'Penne rosée', en: 'Penne rosée', he: 'פנה רוזה' } },
      { id: 'penne-quattro', price: null, name: { fr: 'Penne quattro formaggi gratinée', en: 'Penne quattro formaggi, gratinated', he: 'פנה ארבע גבינות מוקרמת' } },
    ],
  },
  {
    id: 'gratines',
    name: { fr: 'Gratinés', en: 'Gratins', he: 'מוקרמים' },
    items: [
      { id: 'dauphinois', price: null, name: { fr: 'Dauphinois', en: 'Gratin dauphinois', he: 'גרטן דופינואה' } },
      { id: 'gratin-salmone', price: null, name: { fr: 'Gratin al salmone', en: 'Gratin al salmone', he: 'גרטן סלמון' } },
      { id: 'gratin-linguine', price: null, name: { fr: 'Gratin de linguine à la crème', en: 'Linguine cream gratin', he: 'לינגוויני מוקרם בשמנת' } },
    ],
  },
  {
    id: 'poissons',
    name: { fr: 'Poissons & bowls', en: 'Fish & bowls', he: 'דגים וקערות' },
    items: [
      {
        id: 'complet-poisson', price: 39, tags: ['signature'],
        name: { fr: 'Complet poisson', en: 'Complet poisson', he: 'קומפלט דג' },
        desc: {
          fr: 'Saumon, thon ou dorade, focaccia maison, frites fraîches, œuf au plat, piment, tastira, salade.',
          en: 'Salmon, tuna or sea bream, house focaccia, fresh fries, fried egg, chilli, tastira, salad.',
          he: 'סלמון, טונה או דניס, פוקצ׳ה של הבית, צ׳יפס טרי, ביצת עין, פלפל חריף, טסטירה, סלט.',
        },
      },
      {
        id: 'poke', price: 25, tags: ['bestseller', 'new'], photo: 'poke-bowl-saumon',
        name: { fr: 'Poké Hawaï', en: 'Hawaiian poke', he: 'פוקה הוואי' },
        desc: {
          fr: 'Tartare de saumon ou thon, riz vinaigré, sésame, mangue, concombre, edamame, avocat, radis noir, sauce soja.',
          en: 'Salmon or tuna tartare, seasoned rice, sesame, mango, cucumber, edamame, avocado, black radish, soy sauce.',
          he: 'טרטר סלמון או טונה, אורז מתובל, שומשום, מנגו, מלפפון, אדממה, אבוקדו, צנונית שחורה, רוטב סויה.',
        },
      },
      { id: 'tartare-thon', price: null, name: { fr: 'Tartare de thon mayo', en: 'Tuna tartare, mayo', he: 'טרטר טונה במיונז' } },
    ],
  },
  {
    id: 'accompagnements',
    name: { fr: 'À partager', en: 'To share', he: 'לחלוק' },
    items: [
      { id: 'frites-tartufata', price: null, tags: ['veg'], photo: 'frites-truffe-parmesan', name: { fr: 'Frites tartufata', en: 'Tartufata fries', he: 'צ׳יפס טרטופטה' }, desc: { fr: 'Truffe, parmesan.', en: 'Truffle, parmesan.', he: 'כמהין, פרמזן.' } },
    ],
  },
];

export const allDishes = menu.flatMap((c) => c.items.map((d) => ({ ...d, category: c.id })));
export const dish = (id: string) => {
  const d = allDishes.find((x) => x.id === id);
  if (!d) throw new Error(`Unknown dish ${id}`);
  return d;
};

// Home page selections
export const homeSignatures = ['burratina', 'carpaccio-dorade', 'burrata', 'carpaccio-saumon'];
export const homeShortlist = ['burrata', 'carpaccio-dorade', 'cigares-chevre', 'burratina', 'tartare-saumon', 'carpaccio-saumon', 'poke', 'linguine-truffe'];

export function formatPrice(p: number | null, lang: 'fr' | 'en' | 'he') {
  if (p === null) return '';
  if (lang === 'en') return `€${p}`;
  return `${p} €`;
}
