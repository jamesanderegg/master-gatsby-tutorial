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

export async function createPages(params) {
  // Create pages dynamically
  // Pizza
  await turnPizzasIntoPages(params);
  // Toppings
  // slicemasters
}
