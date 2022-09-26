---
id: 587d778c367417b2b2512aa9
title: Standardize Times with the HTML5 datetime Attribute
challengeType: 0
videoUrl: 'https://scrimba.com/c/cmzMgtz'
forumTopicId: 301025
dashedName: standardize-times-with-the-html5-datetime-attribute
---

# --description--

Pour continuer sur le thème de la date, HTML5 a également introduit l'élément `time` avec un attribut `datetime` pour standardiser les temps. L'élément `time` est un élément en ligne qui peut envelopper une date ou une heure sur une page. Un attribut `datetime` contient un format valide de cette date. Il s'agit de la valeur à laquelle accèdent les dispositifs d'assistance. Il permet d'éviter toute confusion en indiquant une version normalisée de l'heure, même si elle est écrite de manière informelle ou familière dans le texte.

Voici un exemple :

```html
<p>Maître Camper Cat a officié le combat en cage entre Goro et Scorpion. <time datetime="2013-02-13">mercredi dernier </time>, qui s'est terminé par un match nul.</p>
```

# --instructions--

es résultats du sondage de Camper Cat sur Mortal Kombat sont arrivés ! Enveloppez le texte d'une balise `time`.
 `Thursday, September 15<sup>th</sup>` et ajouter l'attribut `datetime` pour le fixer à `2016-09-15`.

# --hints--

Ton code doit avoir un élément `p` qui inclut le texte `Thank you to everyone for responding to Master Camper Cat's survey.` et inclut un élément `time`.

```js
assert(timeElement);
```

Les balises `time` ajoutées doivent entourer le texte `Thursday, September 15<sup>th</sup>`.

```js
assert(
  timeElement &&
    timeElement?.innerHTML?.trim() === 'Thursday, September 15<sup>th</sup>'
);
```

Votre balise `time` ajoutée doit avoir un attribut `datetime` qui n'est pas vide.

```js
assert(datetimeAttr && datetimeAttr?.length);
```

La valeur de l'attribut `datetime` que vous avez ajouté doit être `2016-09-15`.

```js
assert(datetimeAttr === '2016-09-15');
```

# --seed--

## --after-user-code--

```html
<script>
const pElement = [...document.querySelectorAll("article > p")]
  .filter(x => x?.textContent?.includes("Thank you to everyone for responding to Master Camper Cat's survey."));
const timeElement = pElement[0] ? pElement[0].querySelector("time") : null;
const datetimeAttr = timeElement?.getAttribute("datetime");
</script>
```

## --seed-contents--

```html
<body>
  <header>
    <h1>Tournois</h1>
  </header>
  <article>
    <h2>Résultats de l'enquête sur le tournoi de Mortal Kombat</h2>

    <!-- Only change code below this line -->

    <p>Merci à tous d'avoir répondu à l'enquête de Master Camper Cat. Le meilleur jour pour organiser le fameux tournoi Mortal Kombat est le jeudi 15 septembre. Que le meilleur ninja gagne !</p>

    <!-- Only change code above this line -->

    <section>
      <h3>Commentaires:</h3>
      <article>
        <p>Posté par : Sub-Zero le <time datetime="2016-08-13T20:01Z">August 13<sup>th</sup></time></p>
        <p>Johnny Cage a intérêt à être là, je vais le finir !</p>
      </article>
      <article>
        <p>Posté par : Doge on <time datetime="2016-08-15T08:12Z">August 15<sup>th</sup></time></p>
        <p>Wow, beaucoup de combat, si mortel.</p>
      </article>
      <article>
        <p>Posté par : The Grim Reaper on <time datetime="2016-08-16T00:00Z">August 16<sup>th</sup></time></p>
        <p>On dirait que je vais être occupé ce jour-là.</p>
      </article>
    </section>
  </article>
  <footer>&copy; 2018 Camper Cat</footer>
</body>
```

# --solutions--

```html
<body>
  <header>
    <h1>Tournois</h1>
  </header>
  <article>
    <h2>Résultats de l'enquête sur le tournoi de Mortal Kombat</h2>

    <p>Merci à tous d'avoir répondu à l'enquête de Master Camper Cat. Le meilleur jour pour organiser le fameux tournoi Mortal Kombat est le jeudi 15 septembre. Que le meilleur ninja gagne !</p>

    <section>
      <h3>Commentaires:</h3>
      <article>
        <p>Posté par : Sub-Zero le <time datetime="2016-08-13T20:01Z">August 13<sup>th</sup></time></p>
        <p>Johnny Cage a intérêt à être là, je vais le finir !</p>
      </article>
      <article>
        <p>Posté par : Doge on <time datetime="2016-08-15T08:12Z">August 15<sup>th</sup></time></p>
        <p>Wow, beaucoup de combat, si mortel.</p>
      </article>
      <article>
        <p>Posté par : The Grim Reaper on <time datetime="2016-08-16T00:00Z">August 16<sup>th</sup></time></p>
        <p>On dirait que je vais être occupé ce jour-là.</p>
      </article>
    </section>
  </article>
  <footer>&copy; 2018 Camper Cat</footer>
</body>
```
