---
id: 587d774e367417b2b2512aa0
title: Envelopper le contenu dans l'élément d'article
challengeType: 0
videoUrl: 'https://scrimba.com/c/cPp79S3'
forumTopicId: 301029
dashedName: wrap-content-in-the-article-element
---

# --description--

`article` is another one of the new HTML5 elements that add semantic meaning to your markup. `article` is a sectioning element and is used to wrap independent, self-contained content. The tag works well with blog entries, forum posts, or news articles.

Determining whether content can stand alone is usually a judgment call, but you can use a couple of simple tests. Ask yourself if you removed all surrounding context, would that content still make sense? Similarly, for text, would the content hold up if it were in an RSS feed?

Remember that folks using assistive technologies rely on organized, semantically meaningful markup to better understand your work.

**Note:** The `section` element is also new with HTML5, and has a slightly different semantic meaning than `article`. An `article` is for standalone content, and a `section` is for grouping thematically related content. They can be used within each other, as needed. For example, if a book is the `article`, then each chapter is a `section`. When there's no relationship between groups of content, then use a `div`.

`<div>` - groups content
`<section>` - groups related content
`<article>` - groups independent, self-contained content

# --instructions--

Camper Cat a utilisé les balises `article` pour envelopper les articles sur sa page de blog, mais il a oublié de les utiliser autour de celui du haut. Changez la balise `div` pour utiliser une balise `article` à la place.

# --hints--

Votre code devrait comporter trois balises `article`.

```js
assert($('article').length == 3);
```

Votre code ne devrait pas avoir de balises `div`.

```js
assert($('div').length == 0);
```

# --seed--

## --seed-contents--

```html
<h1>Pensées profondes avec Maître Camper Cat</h1>
<main>
  <div>
    <h2>Les Dossiers Garfield : Les lasagnes comme carburant d'entraînement ?</h2>
    <p>L'Internet regorge d'opinions diverses sur les paradigmes nutritionnels, de l'herbe à chat paléo aux nettoyages de boules de poils. Mais tournons notre attention vers un carburant d'entraînement souvent négligé, et examinons le tiercé protein-carb-NOM qu'est la lasagne...</p>
  </div>

  <img src="samuraiSwords.jpeg" alt="">

  <article>
    <h2>Vaincre son ennemi : le point rouge est à nous !</h2>
    <p>Les félins du monde entier ont fait la guerre aux ennemis les plus tenaces. Cette némésis rouge combine à la fois l'astuce, la discrétion et la vitesse de l'éclair. Mais tenez bon, amis combattants, l'heure de la victoire pourrait bientôt sonner...</p>
  </article>

  <img src="samuraiSwords.jpeg" alt="">

  <article>
    <h2>Chuck Norris est-il un homme à chats ?</h2>
    <p>Chuck Norris est largement considéré comme le premier artiste martial de la planète, et c'est une coïncidence totale que toute personne qui ne partage pas ce fait disparaisse mystérieusement peu après. Mais la vraie question est de savoir s'il aime les chats...</p>
  </article>
</main>
```

# --solutions--

```html
<h1>Pensées profondes avec Maître Camper Cat</h1>
<main>
  <article>
    <h2>Les Dossiers Garfield : Les lasagnes comme carburant d'entraînement ?</h2>
    <p>L'Internet regorge d'opinions diverses sur les paradigmes nutritionnels, de l'herbe à chat paléo aux nettoyages de boules de poils. Mais tournons notre attention vers un carburant d'entraînement souvent négligé, et examinons le tiercé protein-carb-NOM qu'est la lasagne...</p>
  </article>

  <img src="samuraiSwords.jpeg" alt="">

  <article>
    <h2>Vaincre son ennemi : le point rouge est à nous !</h2>
    <p>Les félins du monde entier ont fait la guerre aux ennemis les plus tenaces. Cette némésis rouge combine à la fois l'astuce, la discrétion et la vitesse de l'éclair. Mais tenez bon, amis combattants, l'heure de la victoire pourrait bientôt sonner...</p>
  </article>

  <img src="samuraiSwords.jpeg" alt="">

  <article>
    <h2>Chuck Norris est-il un homme à chats ?</h2>
    <p>Chuck Norris est largement considéré comme le premier artiste martial de la planète, et c'est une coïncidence totale que toute personne qui ne partage pas ce fait disparaisse mystérieusement peu après. Mais la vraie question est de savoir s'il aime les chats...</p>
  </article>
</main>
```
