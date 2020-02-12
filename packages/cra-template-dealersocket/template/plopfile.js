module.exports = plop => {
  plop.setGenerator('functional-component', {
    description: 'Create a functional component.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name?',
        validate: value => {
          if (value.length) return true;
          return 'A component name is required.';
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.js',
        templateFile: '.plop/FunctionalComponent/FunctionalComponent.js',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.spec.js',
        templateFile: '.plop/FunctionalComponent/FunctionalComponent.spec.js',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.stories.js',
        templateFile:
          '.plop/FunctionalComponent/FunctionalComponent.stories.js',
      },
    ],
  });

  plop.setGenerator('class-component', {
    description: 'Create a class component.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name?',
        validate: value => {
          if (value.length) return true;
          return 'A container name is required.';
        },
      },
    ],
    actions: [],
  });

  plop.setGenerator('container', {
    description: 'Create a container.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the container name?',
        validate: value => {
          if (value.length) return true;
          return 'A container name is required.';
        },
      },
    ],
    actions: [],
  });

  plop.setGenerator('route', {
    description: 'Create a route.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the route name?',
        validate: value => {
          if (value.length) return true;
          return 'A route name is required.';
        },
      },
    ],
    actions: [],
  });
};
