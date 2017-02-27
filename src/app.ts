import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import 'jquery.searchable/jquery.searchable.js';

import { Heroes } from './hero.ts';
import { HeroesView } from './hero_view.ts';
import { Items } from './item.ts';
import { ItemsView } from './item_view.ts';

// Expose jquery for global usage
import 'expose-loader?$!jquery';
import 'expose-loader?jQuery!jquery';

class AppView extends Backbone.View<Backbone.Model> {
  private eventBus: any;

  constructor(options: any = {}) {
    options.el = 'div.container';
    options.events = {
      'change select': 'changeSelect'
    };
    super(options);
    this.eventBus = _.extend({}, Backbone.Events);

    this.render();
  }

  render(): Backbone.View<Backbone.Model> {
    let heroesView = new HeroesView({
      collection: new Heroes(),
      eventBus: this.eventBus
    });
    let itemsView = new ItemsView({
      collection: new Items(),
      eventBus: this.eventBus
    });

    this.$('div#main-panel.panel.panel-default').append(heroesView.el);
    this.$('div#main-panel.panel.panel-default').append(itemsView.el);

    $(document).ready(function() {
      (<any>$('[data-toggle="tooltip"]')).tooltip();

      $('[data-command="toggle-search"]').on('click', function(event) {
        event.preventDefault();
        // Apply searchable plugin when click search button
        (<any>$('.list-group')).searchable({
          searchField: '#contact-list-search',
          selector: 'li',
          childSelector: '.col-xs-12',
          show: function( elem ) {
            elem.slideDown(100);
          },
          hide: function( elem ) {
            elem.slideUp( 100 );
          }
        })
        $(this).toggleClass('hide-search');

        if ($(this).hasClass('hide-search')) {
          $('.c-search').closest('.row').slideUp(100);
        } else {
          $('.c-search').closest('.row').slideDown(100);
        }
      });
    });

    return this;
  }

  changeSelect() {
    this.eventBus.trigger('changeSelect', this.$('select').val());
  }
}

class AppRouter extends Backbone.Router {
  routes = {
    '': 'showMainScene',
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
