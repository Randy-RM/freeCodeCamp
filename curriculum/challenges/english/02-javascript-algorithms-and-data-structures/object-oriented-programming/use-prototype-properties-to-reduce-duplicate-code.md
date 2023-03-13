---
id: 587d7dae367417b2b2512b7c
title: Utiliser les propriétés des prototypes pour réduire le code dupliqué
challengeType: 1
forumTopicId: 301336
dashedName: use-prototype-properties-to-reduce-duplicate-code
---

# --description--

Puisque `numLegs` aura probablement la même valeur pour toutes les instances de `Bird`, vous avez essentiellement une variable dupliquée `numLegs` à l'intérieur de chaque instance de `Bird`.

Ce n'est peut-être pas un problème lorsqu'il n'y a que deux instances, mais imaginez qu'il y ait des millions d'instances. Cela ferait beaucoup de variables dupliquées.

Une meilleure façon est d'utiliser le `prototype` de `Bird`. Les propriétés du `prototype` sont partagées par TOUTES les instances de `Bird`. Voici comment ajouter `numLegs` au `prototype` de Bird :

```js
Bird.prototype.numLegs = 2;
```

Maintenant, toutes les instances de `Bird` ont la propriété `numLegs`.

```js
console.log(duck.numLegs);
console.log(canary.numLegs);
```

Since all instances automatically have the properties on the `prototype`, think of a `prototype` as a "recipe" for creating objects. Note that the `prototype` for `duck` and `canary` is part of the `Bird` constructor as `Bird.prototype`. Nearly every object in JavaScript has a `prototype` property which is part of the constructor function that created it.

# --instructions--

Add a `numLegs` property to the `prototype` of `Dog`

# --hints--

`beagle` should have a `numLegs` property.

```js
assert(beagle.numLegs !== undefined);
```

`beagle.numLegs` should be a number.

```js
assert(typeof beagle.numLegs === 'number');
```

`numLegs` should be a `prototype` property not an own property.

```js
assert(beagle.hasOwnProperty('numLegs') === false);
```

# --seed--

## --seed-contents--

```js
function Dog(name) {
  this.name = name;
}



// Only change code above this line
let beagle = new Dog("Snoopy");
```

# --solutions--

```js
function Dog (name) {
  this.name = name;
}
Dog.prototype.numLegs = 4;
let beagle = new Dog("Snoopy");
```
