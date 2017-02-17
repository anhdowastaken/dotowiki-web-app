/// <reference path='../node_modules/@types/underscore/index.d.ts' />
/// <reference path='../node_modules/@types/backbone/index.d.ts' />
import * as _ from 'underscore';
import * as Backbone from 'backbone';
import { Hero } from './hero.ts';
import { Heroes } from './hero.ts';

class HeroView extends Backbone.View<Backbone.Model> {
  constructor(options: any = {}) {
    options.tagName = 'li';
    options.className = 'class-hero';
    options.events = {
      'click': 'showAlert'
    };
    super(options);
    this.render();
  }

  render(): Backbone.View<Backbone.Model> {
    let template = _.template('<img src="<%= icon_url %>"/>');
    this.$el.html(template(this.model.toJSON()));
    return this;
  }

  showAlert(): void {
    alert(this.model.get('localized_name'));
  }
}

class HeroesView extends Backbone.View<Backbone.Model> {
  constructor(options: any = {}) {
    options.tagName = 'ul';
    options.className = 'class-heroes';
    super(options);
    let self = this;
    // this.collection.bind('reset', _.bind(this.render, this));
    this.collection.fetch({
      success: function(collection, response, options) {
        // console.log(collection);
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
    // console.log(this.el);
    return this;
  }
}

export { HeroesView };
