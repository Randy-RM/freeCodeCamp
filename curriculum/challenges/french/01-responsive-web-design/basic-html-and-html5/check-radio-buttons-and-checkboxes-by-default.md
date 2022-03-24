---
id: bad87fee1348bd9aedd08835
title: Vérifier les boutons radio et les cases à cocher par défaut
challengeType: 0
videoUrl: 'https://scrimba.com/p/pVMPUv/cWk3Qh6'
forumTopicId: 301094
dashedName: check-radio-buttons-and-checkboxes-by-default
---

# --description--

Vous pouvez faire en sorte qu'une case à cocher ou un bouton radio soit coché par défaut en utilisant l'attribut `checked`.

Pour ce faire, il suffit d'ajouter le mot "checked" à l'intérieur d'un élément de saisie. Par exemple :

```html
<input type="radio" name="test-name" checked>
```

# --instructions--

Configurez le premier de vos boutons radio et la première de vos cases à cocher pour qu'ils soient tous deux cochés par défaut.

# --hints--

Le premier bouton radio de votre formulaire doit être coché par défaut.

```js
assert($('input[type="radio"]').prop('checked'));
```

La première case à cocher de votre formulaire doit être cochée par défaut.

```js
assert($('input[type="checkbox"]').prop('checked'));
```

Vous ne devez pas modifier le texte intérieur de l'étiquette `Indoor`.

```js
assert.equal(document.querySelector('label[for="indoor"]')?.innerText?.trim(), 'Indoor');
```

Vous ne devez pas modifier le texte intérieur de l'étiquette `Loving`.

```js
assert.equal(document.querySelector('label[for="loving"]')?.innerText?.trim(), 'Loving');
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
    <li>le traitement contre les puces</li>
    <li>le tonnerre</li>
    <li>les autres chats</li>
  </ol>
  <form action="https://www.freecatphotoapp.com/submit-cat-photo">
    <label for="indoor"><input id="indoor" type="radio" name="indoor-outdoor" value="indoor" checked> Indoor</label>
    <label for="outdoor"><input id="outdoor" type="radio" name="indoor-outdoor" value="outdoor"> Outdoor</label><br>
    <label for="loving"><input id="loving" type="checkbox" name="personality" value="loving" checked> Loving</label>
    <label for="lazy"><input id="lazy" type="checkbox" name="personality" value="lazy"> Lazy</label>
    <label for="energetic"><input id="energetic" type="checkbox" name="personality" value="energetic"> Energetic</label><br>
    <input type="text" placeholder="cat photo URL" required>
    <button type="submit">Submit</button>
  </form>
</main>
```
