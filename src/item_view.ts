/// <reference path='../node_modules/@types/underscore/index.d.ts' />
/// <reference path='../node_modules/@types/backbone/index.d.ts' />
import * as _ from 'underscore';
import * as Backbone from 'backbone';
import { Item } from './item.ts';
import { Items } from './item.ts';

class ItemView extends Backbone.View<Item> {
  constructor(options: any = {}) {
    options.tagName = 'li';
    options.className = 'class-item';
    options.events = {
      'click': 'showAlert'
    };
    super(options);
    this.render();
  }

  render(): Backbone.View<Item> {
    if (this.model.cost > 0 && this.model.isRecipe === false && this.model.name.search('item_river_painter') === -1) {
      let template = _.template('<img src="<%= icon_url %>"/>');
      this.$el.html(template(this.model.toJSON()));
    }
    return this;
  }

  showAlert(): void {
    alert(this.model.get('localized_name'));
  }
}

class ItemsView extends Backbone.View<Backbone.Model> {
  constructor(options: any = {}) {
    options.tagName = 'ul';
    options.className = 'class-items';
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
