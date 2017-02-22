/// <reference path='../node_modules/@types/underscore/index.d.ts' />
/// <reference path='../node_modules/@types/backbone/index.d.ts' />
import * as _ from 'underscore';
import * as Backbone from 'backbone';
import { Hero } from './hero.ts';
import { Heroes } from './hero.ts';
import { AbilitiesView } from './ability_view.ts';

class HeroDetailView extends Backbone.View<Hero> {
  constructor(options: any = {}) {
    options.tagName = 'div';
    super(options);
  }

  initialize() {
    this.render();
  }

  render(): Backbone.View<Hero> {
    let templateHtml = '<div><%= localized_name %></div>'
    + '<div><img src="<%= portrait_url %>"/></div>'
    + '<div class="hero-abilities"></div>';
    let template = _.template(templateHtml);
    this.$el.html(template(this.model.toJSON()));
    let abilitiesView = new AbilitiesView({
      collection: this.model.getAbilities()
    });
    this.$('div.hero-abilities').html(abilitiesView.el);
    return this;
  }
}

class HeroView extends Backbone.View<Hero> {
  constructor(options: any = {}) {
    options.tagName = 'li';
    options.className = 'list-group-item';
    options.events = {
      'click': 'showAlert'
    };
    super(options);
    this.render();
  }

  render(): Backbone.View<Hero> {
    let templateHtml: string = '<div class="col-xs-12 col-sm-3">';
    templateHtml += '<img src="<%= icon_url %>" alt="<%= localized_name %>" class="img-responsive img-rounded" />';
    templateHtml += '</div>';
    templateHtml += '<div class="col-xs-12 col-sm-9">';
    templateHtml += '<span class="name"><%= localized_name %></span>';
    templateHtml += '</div>';
    templateHtml += '<div class="clearfix"></div>';
    let template = _.template(templateHtml);
    this.$el.html(template(this.model.toJSON()));
    return this;
  }

  showAlert(): void {
    let self = this;
    this.model.fetch({
      data: $.param({
        short_name: this.model.short_name
      }),
      success: function(model, response, options) {
        let heroDetailView = new HeroDetailView({
          model: model
        });
        // self.$el.parent().parent().siblings('#col-detail').html(heroDetailView.el);
        alert(JSON.stringify(model.toJSON()));
      }
    });
  }
}

class HeroesView extends Backbone.View<Backbone.Model> {
  constructor(options: any = {}) {
    options.tagName = 'ul';
    options.className = 'list-group';
    options.id = 'contact-list';
    super(options);
    let self = this;
    this.collection.fetch({
      success: function(collection, response, options) {
        self.render();
      }
    });
  }

  render(): Backbone.View<Backbone.Model> {
    let self = this;
    this.collection.forEach(function(hero) {
      let heroView = new HeroView({
        model: hero
      });
      self.$el.append(heroView.el);
    });
    return this;
  }
}

export { HeroesView };
