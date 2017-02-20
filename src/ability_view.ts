/// <reference path='../node_modules/@types/underscore/index.d.ts' />
/// <reference path='../node_modules/@types/backbone/index.d.ts' />
import * as _ from 'underscore';
import * as Backbone from 'backbone';
import { Ability } from './ability.ts';
import { Abilities } from './ability.ts';

class AbilityDetailView extends Backbone.View<Ability> {
  constructor(options: any = {}) {
    options.tagName = 'div';
    super(options);
  }

  initialize() {
    this.render();
  }

  render(): Backbone.View<Ability> {
    let templateHtml = '<div><%= full_name %></div>'
    + '<div><img src="<%= portrait_url %>"/></div>';
    let template = _.template(templateHtml);
    this.$el.html(template(this.model.toJSON()));
    return this;
  }
}

class AbilityView extends Backbone.View<Ability> {
  constructor(options: any = {}) {
    options.tagName = 'li';
    options.className = 'class-ability';
    options.events = {
      'click': 'showAlert'
    };
    super(options);
    this.render();
  }

  render(): Backbone.View<Ability> {
    let template = _.template('<img class="img-rounded" src="<%= icon_url %>"/><span><%= full_name %></span>');
    // console.log(this.model);
    this.$el.html(template(this.model.toJSON()));
    return this;
  }

  showAlert(): void {
    let self = this;
    this.model.fetch({
      data: $.param({
        id: this.model.ability_id
      }),
      success: function(model, response, options) {
        // console.log(model);
        let abilityDetailView = new AbilityDetailView({
          model: model
        });
        self.$el.parent().parent().parent().html(abilityDetailView.el);
      }
    });
  }
}

class AbilitiesView extends Backbone.View<Backbone.Model> {
  constructor(options: any = {}) {
    options.tagName = 'ul';
    options.className = 'class-ability list-unstyled';
    super(options);
    // let self = this;
    // this.collection.fetch({
      // success: function(collection, response, options) {
        // self.render();
    //   }
    // });
    this.render();
  }

  render(): Backbone.View<Backbone.Model> {
    let self = this;
    this.collection.forEach(function(ability) {
      let abilityView = new AbilityView({
        model: ability
      });
      self.$el.append(abilityView.el);
    });
    return this;
  }
}

export { AbilitiesView };
