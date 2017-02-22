/// <reference path='../node_modules/@types/underscore/index.d.ts' />
/// <reference path='../node_modules/@types/backbone/index.d.ts' />
import * as _ from 'underscore';
import * as Backbone from 'backbone';
import { Item } from './item.ts';
import { Items } from './item.ts';

class ItemDetailView extends Backbone.View<Item> {
  constructor(options: any = {}) {
    options.tagName = 'div';
    super(options);
  }

  initialize() {
    this.render();
  }

  render(): Backbone.View<Item> {
    let templateHtml: string = '<div><%= localized_name %></div>';
    templateHtml += '<div><img src="<%= portrait_url %>"/></div>';
    templateHtml += '<div>Cost: <%= cost %> gold</div>';
    let template = _.template(templateHtml);
    this.$el.html(template(this.model.toJSON()));
    return this;
  }
}

class ItemView extends Backbone.View<Item> {
  constructor(options: any = {}) {
    options.tagName = 'li';
    options.className = 'class-item';
    options.events = {
      'click': 'showItemDetail'
    };
    super(options);
    this.render();
  }

  render(): Backbone.View<Item> {
    if (this.model.cost > 0 && this.model.isRecipe === false && this.model.name.search('item_river_painter') === -1) {
      let template = _.template('<img class="img-rounded" src="<%= icon_url %>"/>');
      this.$el.html(template(this.model.toJSON()));
    }
    return this;
  }

  showItemDetail(): void {
    let self = this;
    this.model.fetch({
      data: $.param({
        short_name: this.model.short_name
      }),
      success: function(model, response, options) {
        let itemDetailView = new ItemDetailView({
          model: model
        });
        self.$el.parent().parent().siblings('#col-detail').html(itemDetailView.el);
      }
    });
  }
}

class ItemsView extends Backbone.View<Backbone.Model> {
  constructor(options: any = {}) {
    options.tagName = 'ul';
    options.className = 'class-items list-unstyled';
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
    this.collection.forEach(function(item) {
      let itemView = new ItemView({
        model: item
      });
      self.$el.append(itemView.el);
    });
    return this;
  }
}

export { ItemsView };
