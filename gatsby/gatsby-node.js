import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizzas.js');
  // query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // what is the url for the new page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
  // loop over each pizza and create a page for that pizza
}

async function turnToppingsIntoPages({ graphql, actions }) {
  console.log('turning the toppings into pages');
  // get tempalte
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // createpage for that topping
  data.toppings.nodes.forEach((topping) => {
    console.log('creating pages', topping.name);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // todo regex
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // pass topping data to pizza
}

export async function createPages(params) {
  // Create pages dynamically
  // Pizza
  // Wait for all promisies to be resolved before finish this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);

  // Toppings
  // slicemasters
}
