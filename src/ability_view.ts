import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';
import { Ability } from './ability.ts';
import { Abilities } from './ability.ts';

class AbilityDetailView extends Backbone.View<Ability> {
  constructor(options: any = {}) {
    options.tagName = 'div';
    options.id = 'ability-detail';
    options.events = {
      'click button.btn-close': 'close'
    };
    super(options);
  }

  initialize() {
    this.render();
  }

  render(): Backbone.View<Ability> {
    let template = _.template($('#ability-detail-template').html());
    this.$el.html(template(this.model.toJSON()));
    return this;
  }

  close(): void {
    // this.$el.parent().parent().remove();
    // Remove this view
    this.$el.remove();
    // Show view of the last selected hero
    $('div#hero-detail').show();
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
    let template = _.template($('#list-group-ability-template').html());
    this.$el.html(template(this.model.toJSON()));
    return this;
  }

  showAbilityDetail(): void {
    let self = this;
    // Fetch information of selected ability
    this.model.fetch({
      data: $.param({
        id: this.model.id
      }),
      success: function(model, response, options) {
        let abilityDetailView = new AbilityDetailView({
          model: model
        });
        // Hide view of selected hero
        $('div#hero-detail').hide();
        // Add view of selected ability
        $('div#detail-panel.panel.panel-default').append(abilityDetailView.el);
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
