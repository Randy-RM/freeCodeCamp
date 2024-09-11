const routes = {
  learningPath: {
    index: '/learning-path',
    aws: '/learning-path/aws-courses',
    moodle: '/learning-path/:category/:categoryId',
    fullstack: '/learning-path/developpement-web'
  },
  catalogue: {
    index: '/catalogue',
    catalogueTitle: '/catalogue/:value',
    aws: '/catalogue/amazon-web-service',
    programmation: '/catalogue/programmation',
    moodle: '/catalogue/:category'
  }
};

export default routes;
