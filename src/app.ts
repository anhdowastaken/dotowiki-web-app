import * as $ from 'jquery';
import * as Backbone from 'backbone';
import { Heroes } from './hero.ts';
import { HeroesView } from './hero_view.ts';
import { Items } from './item.ts';
import { ItemsView } from './item_view.ts';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class AppView extends Backbone.View<Backbone.Model> {
  constructor() {
    super();
    this.render();
  }

  render(): Backbone.View<Backbone.Model> {
    let heroesView = new HeroesView({
      collection: new Heroes()
    });
    let itemsView = new ItemsView({
      collection: new Items()
    });
    this.$el.append(heroesView.el);
    this.$el.append(itemsView.el);
    return this;
  }
}

class AppRouter extends Backbone.Router {
  routes = {
    '': 'showMainScene',
    'hero/:name': 'showHeroScene'
  };

  constructor() {
    super();
    (<any>this)._bindRoutes(); // NOTE: Bind routes with corresponding callbacks
  }

  showMainScene(): void {
    // console.log('showHomeScene');
    $(document.body).append((new AppView()).el);
  }
}

const appRouter = new AppRouter();
Backbone.history.start();
