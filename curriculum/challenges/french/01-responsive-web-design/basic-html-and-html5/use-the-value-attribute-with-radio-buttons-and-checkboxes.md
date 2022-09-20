---
id: 5c6c06847491271903d37cfd
title: Utilisez l'attribut value avec les boutons radio et les cases à cocher.
challengeType: 0
forumTopicId: 301099
dashedName: use-the-value-attribute-with-radio-buttons-and-checkboxes
---

# --description--

Lorsqu'un formulaire est soumis, les données sont envoyées au serveur et comprennent des entrées pour les options sélectionnées. Les entrées de type `radio` et `checkbox` renvoient leurs valeurs à partir de l'attribut `value`.

Par exemple :

```html
<label for="indoor">
  <input id="indoor" value="indoor" type="radio" name="indoor-outdoor">Indoor
</label>
<label for="outdoor">
  <input id="outdoor" value="outdoor" type="radio" name="indoor-outdoor">Outdoor
</label>
```

Ici, vous avez deux entrées `radio`. Lorsque l'utilisateur soumet le formulaire avec l'option `indoor` sélectionnée, les données du formulaire comprendront la ligne : `indoor-outdoor=indoor`. Cela provient des attributs `name` et `value` de l'entrée "indoor".

Si vous omettez l'attribut `value`, les données du formulaire soumis utilisent la valeur par défaut, qui est `on`. Dans ce scénario, si l'utilisateur clique sur l'option "indoor" et soumet le formulaire, les données de formulaire résultantes seront `indoor-outdoor=on`, ce qui n'est pas utile. L'attribut "value" doit donc être défini sur une valeur permettant d'identifier l'option.

# --instructions--

Donnez à chacune des entrées existantes `radio` et `checkbox` l'attribut `value`. Ne créez pas de nouveaux éléments radio ou case à cocher. Utilisez le texte du label de l'entrée, en minuscules, comme valeur de l'attribut.

# --hints--

L'un de vos boutons radio doit avoir l'attribut `value` de `indoor`.

```js
assert(
  $('label:contains("Indoor") > input[type="radio"]').filter("[value='indoor']")
    .length > 0
);
```

L'un de vos boutons radio doit avoir l'attribut `value` avec la valeur `outdoor`.

```js
assert(
  $('label:contains("Outdoor") > input[type="radio"]').filter(
    "[value='outdoor']"
  ).length > 0
);
```

L'une de vos cases à cocher doit avoir l'attribut `value` avec la valeur `loving`.

```js
assert(
  $('label:contains("Loving") > input[type="checkbox"]').filter(
    "[value='loving']"
  ).length > 0
);
```

L'une de vos cases à cocher devrait avoir l'attribut `value` de `lazy`.

```js
assert(
  $('label:contains("Lazy") > input[type="checkbox"]').filter("[value='lazy']")
    .length > 0
);
```

L'une de vos cases à cocher doit avoir l'attribut `value` avec la valeur `energetic`.

```js
assert(
  $('label:contains("Energetic") > input[type="checkbox"]').filter(
    "[value='energetic']"
  ).length > 0
);
```

# --seed--

## --seed-contents--

```html
<h2>CatPhotoApp</h2>
<main>
  </p>Cliquez ici pour voir plus de <a href="#">photos de chats</a>.</p>

  <a href="#"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" alt="A cute orange cat lying on its back."></a>

  <p>Les choses que les chats aiment :</p>
  <ul>
    <li>l'herbe à chat</li>
    <li>les pointeurs laser</li>
    <li>les lasagnes</li>
  </ul>
  <p>Le top 3 des choses que les chats détestent :</p>
  <ol>
    <li>le traitement contre les puces</li>
    <li>le tonnerre</li>
    <li>les autres chats</li>
  </ol>
  <form action="https://www.freecatphotoapp.com/submit-cat-photo">
    <label for="indoor"><input id="indoor" type="radio" name="indoor-outdoor"> Indoor</label>
    <label for="outdoor"><input id="outdoor" type="radio" name="indoor-outdoor"> Outdoor</label><br>
    <label for="loving"><input id="loving" type="checkbox" name="personality"> Loving</label>
    <label for="lazy"><input id="lazy" type="checkbox" name="personality"> Lazy</label>
    <label for="energetic"><input id="energetic" type="checkbox" name="personality"> Energetic</label><br>
    <input type="text" placeholder="cat photo URL" required>
    <button type="submit">Submit</button>
  </form>
</main>
```

# --solutions--

```html
<h2>CatPhotoApp</h2>
<main>
  </p>Cliquez ici pour voir plus de <a href="#">photos de chats</a>.</p>

  <a href="#"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" alt="A cute orange cat lying on its back."></a>

  <p>Les choses que les chats aiment :</p>
  <ul>
    <li>l'herbe à chat</li>
    <li>les pointeurs laser</li>
    <li>les lasagnes</li>
  </ul>
  <p>Le top 3 des choses que les chats détestent :</p>
  <ol>
    <li>le traitement contre les puces</li>
    <li>le tonnerre</li>
    <li>les autres chats</li>
  </ol>
  <form action="https://www.freecatphotoapp.com/submit-cat-photo">
    <label for="indoor"><input id="indoor" type="radio" name="indoor-outdoor" value="indoor"> Indoor</label>
    <label for="outdoor"><input id="outdoor" type="radio" name="indoor-outdoor" value="outdoor"> Outdoor</label><br>
    <label for="loving"><input id="loving" type="checkbox" name="personality" value="loving"> Loving</label>
    <label for="lazy"><input id="lazy" type="checkbox" name="personality" value="lazy"> Lazy</label>
    <label for="energetic"><input id="energetic" type="checkbox" name="personality" value="energetic"> Energetic</label><br>
    <input type="text" placeholder="cat photo URL" required>
    <button type="submit">Submit</button>
  </form>
</main>
```
