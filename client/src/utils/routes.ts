//Notons l'utilisation de object.freeze() afin de
//rendre les objects immuables car on ne veut pas que ces propriétés change de valeurs.
const routes = Object.freeze({
  learningPath: Object.freeze({
    index: '/learning-path',
    aws: '/learning-path/aws-courses',
    moodle: '/learning-path/:category/:categoryId',
    fullstack: '/learning-path/developpement-web'
  }),
  catalogue: Object.freeze({
    index: '/catalogue',
    catalogueTitle: '/catalogue/:value',
    aws: '/catalogue/amazon-web-service',
    programmation: '/catalogue/programmation',
    moodle: '/catalogue/:category'
  })
});

const allQuery = Object.freeze({
  key: {
    level: 'level',
    duration: 'durée',
    language: 'langue',
    type: 'type'
  },
  value: Object.freeze({
    level: Object.freeze({
      debutant: 'Débutant',
      intermediaire: 'Intermediaire',
      avance: 'Avancé'
    }),
    duration: Object.freeze({
      lessOneHour: '>1h',
      overOneHour: '1>5h',
      overFiveHour: '>5h'
    }),
    language: Object.freeze({
      french: 'French',
      english: 'English'
    }),
    type: Object.freeze({
      cours: 'Cours',
      parcours: 'Parcours'
    })
  })
});

export { routes, allQuery };
