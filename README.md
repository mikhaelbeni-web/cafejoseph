# Café Joseph — site

Site du Café Joseph, restaurant italien casher laitier, 48 rue de Prony, Paris 17e.
Astro (pages statiques) · GSAP pour les animations de l'accueil · trois langues (FR, EN, HE en miroir).

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # recalcule les horaires de Chabbat puis génère dist/
```

## Ce qu'on modifie le plus souvent

| Quoi | Où |
| --- | --- |
| Plats, prix, descriptions, photos de la carte | `src/data/menu.ts` (un seul fichier, trois langues) |
| Téléphone, WhatsApp, liens, adresse, avis | `src/data/site.ts` |
| Textes du site | `src/i18n/fr.ts`, `en.ts`, `he.ts` |
| Horaires de la semaine | `src/lib/hours.ts` (`WEEK`) et les lignes `hours.rows` des fichiers de langue |
| Photos | `public/img/plats/` (WebP 800 et 1600 px) et `public/img/assiettes/` (détourées) |

## Horaires et Chabbat

`scripts/shabbat.mjs` calcule à chaque build, avec @hebcal/core, les périodes de fermeture
(allumage des bougies → havdala, Paris) pour Chabbat et les fêtes, sur trois ans.
Le navigateur en déduit le statut « ouvert / fermé », l'heure de fermeture du vendredi,
la réouverture du samedi soir (havdala + 30 min) et les créneaux du formulaire de réservation.

## Reste à fournir avant la mise en ligne

Voir les `TODO(owner)` dans `src/data/` : numéro WhatsApp, mention exacte de la téouda,
carte complète avec prix, mentions légales, relecture de l'hébreu, photos de salle et de terrasse.
