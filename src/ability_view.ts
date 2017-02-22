/// <reference path='../node_modules/@types/underscore/index.d.ts' />
/// <reference path='../node_modules/@types/backbone/index.d.ts' />
import * as _ from 'underscore';
import * as Backbone from 'backbone';
import { Ability } from './ability.ts';
import { Abilities } from './ability.ts';

class AbilityDetailView extends Backbone.View<Ability> {
  constructor(options: any = {}) {
    options.tagName = 'div';
    options.events = {
      'click button.btn-close': 'close'
    };
    super(options);
  }

  initialize() {
    this.render();
  }

  render(): Backbone.View<Ability> {
    let templateHtml: string = '<button type="button" class="btn btn-default btn-close">Close</button>';
    templateHtml += '<div><%= full_name %></div>';
    templateHtml += '<div><img src="<%= portrait_url %>"/></div>';
    templateHtml += '<div><%= description %></div>';
    let template = _.template(templateHtml);
    this.$el.html(template(this.model.toJSON()));
    return this;
  }

  close(): void {
    this.$el.parent().parent().remove();
  }
}

class AbilityView extends Backbone.View<Ability> {
  constructor(options: any = {}) {
    options.tagName = 'li';
    options.className = 'class-ability';
    options.events = {
      'click': 'showAbilityDetail'
    };
    super(options);
    this.render();
  }

  render(): Backbone.View<Ability> {
    let template = _.template('<img class="img-rounded" src="<%= icon_url %>"/><span><%= full_name %></span>');
    this.$el.html(template(this.model.toJSON()));
    return this;
  }

  showAbilityDetail(): void {
    let self = this;
    this.model.fetch({
      data: $.param({
        id: this.model.id
      }),
      success: function(model, response, options) {
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
