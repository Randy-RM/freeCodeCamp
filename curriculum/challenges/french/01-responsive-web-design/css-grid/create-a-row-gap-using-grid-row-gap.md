---
id: 5a9036ee38fddaf9a66b5d36
title: Créer un écart de ligne à l'aide de grid-row-gap
challengeType: 0
videoUrl: 'https://scrimba.com/p/pByETK/cPbJ2Cv'
forumTopicId: 301125
dashedName: create-a-row-gap-using-grid-row-gap
---

# --description--

Vous pouvez ajouter un espace entre les lignes d'une grille en utilisant `grid-row-gap` de la même manière que vous avez ajouté un espace entre les colonnes dans le défi précédent.

# --instructions--

Créez un espace de `5px` de hauteur pour les rangées.

# --hints--

La classe `container` doit avoir une propriété `grid-row-gap` dont la valeur est `5px`.

```js
assert(
  code.match(/.container\s*?{[\s\S]*grid-row-gap\s*?:\s*?5px\s*?;[\s\S]*}/gi)
);
```

# --seed--

## --seed-contents--

```html
<style>
  .d1{background:LightSkyBlue;}
  .d2{background:LightSalmon;}
  .d3{background:PaleTurquoise;}
  .d4{background:LightPink;}
  .d5{background:PaleGreen;}

  .container {
    font-size: 40px;
    min-height: 300px;
    width: 100%;
    background: LightGray;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    /* Only change code below this line */

    
    /* Only change code above this line */
  }
</style>

<div class="container">
  <div class="d1">1</div>
  <div class="d2">2</div>
  <div class="d3">3</div>
  <div class="d4">4</div>
  <div class="d5">5</div>
</div>
```

# --solutions--

```html
<style>.container {grid-row-gap: 5px;}</style>
```
