---
id: 587d7b7c367417b2b2512b1a
title: Noms de propriétés d'accès avec la notation entre crochets
challengeType: 1
forumTopicId: 301150
dashedName: access-property-names-with-bracket-notation
---

# --description--

Dans le premier défi objet, nous avons mentionné l'utilisation de la notation entre crochets comme moyen d'accéder aux valeurs des propriétés en utilisant l'évaluation d'une variable. Par exemple, imaginons que notre objet `foods` soit utilisé dans un programme pour une caisse enregistreuse de supermarché. Nous avons une fonction qui définit la variable `selectedFood` et nous voulons vérifier la présence de cet aliment dans notre objet `foods`. Cela pourrait ressembler à ceci :

```js
let selectedFood = getCurrentFood(scannedItem);
let inventory = foods[selectedFood];
```

Ce code va évaluer la valeur stockée dans la variable `selectedFood` et retourner la valeur de cette clé dans l'objet `foods`, ou `undefined` si elle n'est pas présente. La notation entre parenthèses est très utile car parfois les propriétés des objets ne sont pas connues avant l'exécution ou nous devons y accéder d'une manière plus dynamique.

# --instructions--

Nous avons défini une fonction, `checkInventory`, qui reçoit un élément scanné comme argument. Elle renvoie la valeur actuelle de la clé `scannedItem` dans l'objet `foods`. Vous pouvez supposer que seules des clés valides seront fournies comme argument à `checkInventory`. 

# --hints--

`checkInventory` devrait être une fonction.

```js
assert.strictEqual(typeof checkInventory, 'function');
```

L'objet `foods` ne doit contenir que les paires clé-valeur suivantes : `pommes: 25`, `oranges: 32`, `prunes: 28`, `bananes: 13`, `raisins: 35`, `fraises: 27`.

```js
assert.deepEqual(foods, {
  pommes : 25,
  oranges : 32,
  prunes : 28,
  bananes : 13,
  raisins : 35,
  fraises : 27
});
```

`checkInventory("apples")` should return `25`.

```js
assert.strictEqual(checkInventory('pommes'), 25);
```

`checkInventory("bananas")` should return `13`.

```js
assert.strictEqual(checkInventory('bananes'), 13);
```

`checkInventory("strawberries")` should return `27`.

```js
assert.strictEqual(checkInventory('fraises'), 27);
```

# --seed--

## --seed-contents--

```js
let foods = {
  pommes : 25,
  oranges : 32,
  prunes : 28,
  bananes : 13,
  raisins : 35,
  fraises : 27
};

function checkInventory(scannedItem) {
  // Ne changez que le code en dessous de cette ligne

  // Ne changez que le code au-dessus de cette ligne
}

console.log(checkInventory("pommes"));
```

# --solutions--

```js
let foods = {
  pommes : 25,
  oranges : 32,
  prunes : 28,
  bananes : 13,
  raisins : 35,
  fraises : 27
};

function checkInventory(scannedItem) {
  return foods[scannedItem];
}
```
