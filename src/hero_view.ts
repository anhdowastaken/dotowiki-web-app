/// <reference path='../node_modules/@types/underscore/index.d.ts' />
/// <reference path='../node_modules/@types/backbone/index.d.ts' />
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
    // Prepare template
    let templateHtml: string = '<button type="button" class="btn btn-default btn-close">Close</button>';
    templateHtml += '<div><%= localized_name %></div>';
    templateHtml += '<div><img src="<%= portrait_url %>"/></div>';
    templateHtml += '<div class="hero-abilities"></div>';
    // Generate template by using underscore
    let template = _.template(templateHtml);
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
    // Pepare template
    let templateHtml: string = '<div class="col-xs-12 col-sm-3">';
    templateHtml += '<img src="<%= icon_url %>" alt="<%= localized_name %>" class="img-responsive img-rounded" />';
    templateHtml += '</div>';
    templateHtml += '<div class="col-xs-12 col-sm-9">';
    templateHtml += '<span class="name"><%= localized_name %></span>';
    templateHtml += '</div>';
    templateHtml += '<div class="clearfix"></div>';
    // Generate template by using underscore
    let template = _.template(templateHtml);
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
        // self.$el.parent().find('li.list-group-item.hero-detail').remove();
        // self.$el.parent().prepend(heroDetailView.el);
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
