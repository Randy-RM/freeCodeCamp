---
id: bad87fee1348bd9aedf08834
title: Créer un ensemble de boutons radio
challengeType: 0
forumTopicId: 16822
dashedName: create-a-set-of-radio-buttons
---

# --description--

Vous pouvez utiliser les <dfn>boutons radio</dfn> pour les questions où vous souhaitez que l'utilisateur ne vous donne qu'une seule réponse parmi plusieurs options.

Les boutons radio sont un type de `input`.

Chacun de vos boutons radio peut être imbriqué dans son propre élément `label`. En enveloppant un élément `input` à l'intérieur d'un élément `label`, le bouton radio sera automatiquement associé à l'élément label qui l'entoure.

Tous les boutons radio associés doivent avoir le même attribut `name` pour créer un groupe de boutons radio. En créant un groupe de boutons radio, la sélection d'un seul bouton radio désélectionnera automatiquement les autres boutons du même groupe, garantissant ainsi qu'une seule réponse sera fournie par l'utilisateur.

Voici un exemple de bouton radio :

```html
<label> 
  <input type="radio" name="indoor-outdoor">Indoor 
</label>
```

La meilleure pratique consiste à définir un attribut `for` sur l'élément `label`, dont la valeur correspond à celle de l'attribut `id` de l'élément `input`. Cela permet aux technologies d'assistance de créer un lien entre le label et l'élément `input` correspondant. Par exemple :

```html
<input id="indoor" type="radio" name="indoor-outdoor">
<label for="indoor">Indoor</label>
```

Nous pouvons également imbriquer l'élément `input` dans les balises `label` :

```html
<label for="indoor"> 
  <input id="indoor" type="radio" name="indoor-outdoor">Indoor 
</label>
```

# --instructions--

Ajoutez une paire de boutons radio à votre formulaire, chacun étant imbriqué dans son propre élément `label`. L'un d'eux doit avoir l'option `indoor` et l'autre l'option `outdoor`. Les deux doivent partager l'attribut `name` de `indoor-outdoor` pour créer un groupe de radios.

# --hints--

Votre page doit comporter deux éléments boutons `radio`.

```js
assert($('input[type="radio"]').length > 1);
```

Vos boutons radio doivent posséder l'attribut `name` égal à `indoor-outdoor`.

```js
assert($('input[type="radio"]').filter("[name='indoor-outdoor']").length > 1);
```

Chacun de vos deux éléments de bouton radio doit être imbriqué dans son propre élément `label`.

```js
assert($('label > input[type="radio"]:only-child').length > 1);
```

Chacun de vos éléments `label` doit avoir une balise de fermeture.

```js
assert(
  code.match(/<\/label>/g) &&
    code.match(/<label/g) &&
    code.match(/<\/label>/g).length === code.match(/<label/g).length
);
```

L'un de vos boutons radio devrait avoir le label `indoor`.

```js
assert(
  $('label')
    .text()
    .match(/indoor/gi)
);
```

L'un de vos boutons radio devrait avoir le label "extérieur".

```js
assert(
  $('label')
    .text()
    .match(/outdoor/gi)
);
```

Chacun de vos éléments de bouton radio doit être ajouté dans la balise `form`.

```js
assert($('label').parent().get(0).tagName.match('FORM'));
```

# --seed--

## --seed-contents--

```html
<h2>CatPhotoApp</h2>
<main>
 <p>Cliquez ici pour voir plus <a href="#">des photos de chats</a>.</p>

  <a href="#"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" alt="A cute orange cat lying on its back."></a>

 <p>Les choses que les chats aiment :</p>
  <ul>
    <li>l'herbe à chat</li>
    <li>les pointeurs laser</li>
    <li>les lasagnes</li>
  </ul>
  <p>Le top 3 des choses que les chats détestent :</p>
  <ol>
    <li>le traitement des puces</li>
    <li>le tonnerre</li>
    <li>les autres chats</li>
  </ol>
  <form action="https://www.freecatphotoapp.com/submit-cat-photo">
    <input type="text" placeholder="cat photo URL" required>
    <button type="submit">Soumettre</button>
  </form>
</main>
```

# --solutions--

```html
<h2>CatPhotoApp</h2>
<main>
  <p>Cliquez ici pour voir plus <a href="#">des photos de chats</a>.</p>
  
  <a href="#"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" alt="A cute orange cat lying on its back."></a>
  
  <p>Les choses que les chats aiment :</p>
  <ul>
    <li>l'herbe à chat</li>
    <li>les pointeurs laser</li>
    <li>les lasagnes</li>
  </ul>
  <p>Le top 3 des choses que les chats détestent :</p>
  <ol>
    <li>le traitement des puces</li>
    <li>le tonnerre</li>
    <li>les autres chats</li>
  </ol>
  <form action="https://www.freecatphotoapp.com/submit-cat-photo">
   <label for="indoor"><input id="indoor" type="radio" name="indoor-outdoor"> Indoor</label>
    <label for="outdoor"><input id="outdoor" type="radio" name="indoor-outdoor"> Outdoor</label><br>
    <input type="text" placeholder="cat photo URL" required>
    <button type="submit">Soumettre</button>
  </form>
</main>
```
