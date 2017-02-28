import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';
import { Hero } from './hero.ts';
import { Heroes } from './hero.ts';
import { AbilitiesView } from './ability_view.ts';

class HeroDetailView extends Backbone.View<Hero> {
  constructor(options: any = {}) {
    options.tagName = 'div';
    options.id = 'hero-detail';
    options.events = {
      'click button.btn-close': 'close'
    };
    super(options);
  }

  initialize() {
    this.render();
  }

  render(): Backbone.View<Hero> {
    let template = _.template($('#hero-detail-template').html());
    this.$el.html(template(this.model.toJSON()));
    let abilitiesView = new AbilitiesView({
      collection: this.model.getAbilities()
    });
    // Replace content of the last hero by current selected one
    this.$('div.hero-abilities').html(abilitiesView.el);
    return this;
  }

  close(): void {
    // Remove view of current selected hero
    this.$el.remove();
    // Hide 'detail' panel
    $('div#detail-panel.panel.panel-default').hide();
    // Show 'main' panel
    $('div#main-panel.panel.panel-default').show();
  }
}

class HeroView extends Backbone.View<Hero> {
  constructor(options: any = {}) {
    options.tagName = 'li';
    options.className = 'list-group-item';
    options.events = {
      'click': 'showHeroDetail'
    };
    super(options);
    this.render();
  }

  render(): Backbone.View<Hero> {
    let template = _.template($('#list-group-item-template').html());
    this.$el.html(template(this.model.toJSON()));
    return this;
  }

  showHeroDetail(): void {
    let self = this;
    this.model.fetch({
      data: $.param({
        short_name: this.model.short_name
      }),
      success: function(model, response, options) {
        let heroDetailView = new HeroDetailView({
          model: model
        });
        // Hide 'main' panel
        $('div#main-panel.panel.panel-default').hide();
        // Replace content of 'detail' panel with information of selected hero
        $('div#detail-panel.panel.panel-default').html(heroDetailView.el);
        $('div#detail-panel.panel.panel-default').show();
      }
    });
  }
}

class HeroesView extends Backbone.View<Backbone.Model> {
  private eventBus: any;

  constructor(options: any = {}) {
    options.tagName = 'ul';
    options.className = 'list-group';
    options.id = 'hero-list';
    super(options);
    this.eventBus = options.eventBus;
    this.eventBus.listenTo(this.eventBus, 'changeSelect', this.changeSelect.bind(this));
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

  changeSelect(value: any) {
    switch (value) {
      case ('Hero'):
        this.$el.show();
        break;
      default:
        this.$el.hide();
        break;
    }
  }
}

export { HeroesView };
