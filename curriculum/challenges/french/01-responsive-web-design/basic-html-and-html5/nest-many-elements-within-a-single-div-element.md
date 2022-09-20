---
id: bad87fee1348bd9aede08835
title: Intégration de plusieurs éléments dans un seul élément div
challengeType: 0
videoUrl: 'https://scrimba.com/p/pVMPUv/cNW4kC3'
forumTopicId: 18246
dashedName: nest-many-elements-within-a-single-div-element
---

# --description--

L'élément `div`, également connu sous le nom d'élément de division, est un conteneur à usage général pour d'autres éléments.

L'élément `div` est probablement l'élément HTML le plus utilisé de tous.

Comme tout autre élément non auto-fermant, vous pouvez ouvrir un élément `div` avec `<div>` et le fermer sur une autre ligne avec `</div>`. 

# --instructions--

Placez vos listes "Les choses que les chats aiment" et "Les 3 choses que les chats détestent le plus" dans un seul élément `div`.

Indice : essayez de placer votre balise `div` d'ouverture au-dessus de votre élément `p` "Les choses que les chats aiment" et votre balise `div` de fermeture après votre balise `ol` de fermeture, de sorte que vos deux listes se trouvent dans un seul `div`.

# --hints--

Vos éléments `p` doivent être imbriqués dans votre élément `div`.

```js
assert($('div').children('p').length > 1);
```

Votre élément `ul` doit être incorporé dans votre élément `div`.

```js
assert($('div').children('ul').length > 0);
```

Votre élément `ol` doit être imbriqué dans votre élément `div`.

```js
assert($('div').children('ol').length > 0);
```

Votre élément `div` doit avoir une balise de fermeture.

```js
assert(
  code.match(/<\/div>/g) &&
    code.match(/<\/div>/g).length === code.match(/<div>/g).length
);
```

# --seed--

## --seed-contents--

```html
<h2>CatPhotoApp</h2>
<main>
  <p>Cliquez ici pour voir plus <a href="#">des photos de chats</a>.</p>

  <a href="#"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" alt="A cute orange cat lying on its back."></a>

  <p>Les choses que les chats aiment:</p>
  <ul>
    <li>l'herbe à chat</li>
    <li>les pointeurs laser</li>
    <li>les lasagnes</li>
  </ul>
  <p>Les 3 choses que les chats détestent le plus:</p>
  <ol>
    <li>le traitement des puces</li>
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

# --solutions--

```html
<h2>CatPhotoApp</h2>
<main>
  <p>Cliquez ici pour voir plus <a href="#">des photos de chats</a>.</p>
  
  <a href="#"><img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" alt="A cute orange cat lying on its back."></a>
  <div>
    <p>Les choses que les chats aiment:</p>
  <ul>
    <li>l'herbe à chat</li>
    <li>les pointeurs laser</li>
    <li>les lasagnes</li>
  </ul>
    <p>Les 3 choses que les chats détestent le plus:</p>
  <ol>
    <li>le traitement des puces</li>
    <li>le tonnerre</li>
    <li>les autres chats</li>
  </ol>
  </div>
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
