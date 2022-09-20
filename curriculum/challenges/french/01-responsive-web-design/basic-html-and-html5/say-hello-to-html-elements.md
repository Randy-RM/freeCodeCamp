---
id: bd7123c8c441eddfaeb5bdef
title: Dites bonjour aux éléments HTML QBEL
challengeType: 0
videoUrl: 'https://scrimba.com/p/pVMPUv/cE8Gpt2'
forumTopicId: 18276
dashedName: say-hello-to-html-elements
---

# --description--

Bienvenue aux défis de codage HTML de freeCodeCamp. Ces défis vous permettront de vous familiariser avec le développement Web, étape par étape.

Tout d'abord, vous commencerez par créer une page Web simple en utilisant le langage HTML. Vous pouvez modifier le code dans votre éditeur de code, qui est intégré à cette page Web.

Voyez-vous le code dans votre éditeur de code qui dit "<h1>Hello</h1>` ? C'est un élément HTML.

La plupart des éléments HTML ont une balise d'ouverture et une balise de fermeture.

Les balises d'ouverture ressemblent à ceci :

```html
<h1>
```

Les balises de fermeture ressemblent à ceci :

```html
</h1>
```

La seule différence entre les balises ouvrantes et fermantes est la barre oblique après le chevron ouvrant d'une balise fermante.

Chaque défi comporte des tests que vous pouvez exécuter à tout moment en cliquant sur le bouton "Exécuter les tests". Lorsque vous aurez réussi tous les tests, vous serez invité à soumettre votre solution et à passer au défi de codage suivant.

# --instructions--

Pour réussir le test de ce défi, changez le texte de votre élément `h1` pour dire `Hello World`.

# --hints--

Votre élément `h1` doit contenir le texte `Hello World`.

```js
assert.isTrue(/hello(\s)+world/gi.test($('h1').text()));
```

# --seed--

## --seed-contents--

```html
<h1>Hello</h1>
```

# --solutions--

```html
<h1>Hello World</h1>
```
