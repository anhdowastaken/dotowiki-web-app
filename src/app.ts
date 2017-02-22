import * as $ from 'jquery';
import * as Backbone from 'backbone';
import { Heroes } from './hero.ts';
import { HeroesView } from './hero_view.ts';
import { Items } from './item.ts';
import { ItemsView } from './item_view.ts';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
// import 'https://rawgit.com/stidges/jquery-searchable/master/dist/jquery.searchable-1.0.0.min.js';
import 'expose?$!jquery';
import 'expose?jQuery!jquery';

class AppView extends Backbone.View<Backbone.Model> {
  constructor(options: any = {}) {
    options.el = 'div.container';
    super(options);
  }

  initialize() {
    this.render();
  }

  render(): Backbone.View<Backbone.Model> {
    let heroesView = new HeroesView({
      collection: new Heroes()
    });
    let itemsView = new ItemsView({
      collection: new Items()
    });
    this.$el.find('div.panel.panel-default').append(heroesView.el);
    // this.$('#col-heroes').append(heroesView.el);
    // this.$('#col-items').append(itemsView.el);
    // console.log(heroesView.collection);
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
    $(document).ready(function() {
      new AppView();
    });
  }
}

const appRouter = new AppRouter();
Backbone.history.start();
