import * as _ from 'underscore';
import * as Backbone from 'backbone';
import { Item } from './item.ts';
import { Items } from './item.ts';

class ItemDetailView extends Backbone.View<Item> {
  constructor(options: any = {}) {
    options.tagName = 'div';
    options.id = 'item-detail';
    options.events = {
      'click button.btn-close': 'close'
    };
    super(options);

    this.render();
  }

  render(): Backbone.View<Item> {
    let template = _.template($('#item-detail-template').html());
    this.$el.html(template(this.model.toJSON()));
    return this;
  }

  close(): void {
    // Remove view of current selected item
    this.$el.remove();
    // Hide 'detail' panel
    $('div#detail-panel.panel.panel-default').hide();
    // Show 'main' panel
    $('div#main-panel.panel.panel-default').show();
  }
}

class ItemView extends Backbone.View<Item> {
  constructor(options: any = {}) {
    options.tagName = 'li';
    options.className = 'list-group-item';
    options.events = {
      'click': 'showItemDetail'
    };
    super(options);

    this.render();
  }

  render(): Backbone.View<Item> {
    if (this.model.cost > 0 && this.model.isRecipe === false && this.model.name.search('item_river_painter') === -1) {
      let template = _.template($('#list-group-item-template').html());
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
        $('div#main-panel.panel.panel-default').hide();
        // Replace content of 'detail' panel with information of selected item
        $('div#detail-panel.panel.panel-default').html(itemDetailView.el);
        $('div#detail-panel.panel.panel-default').show();
      }
    });
  }
}

class ItemsView extends Backbone.View<Backbone.Model> {
  private eventBus: any;

  constructor(options: any = {}) {
    options.tagName = 'ul';
    options.className = 'list-group';
    options.id = 'item-list';
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
    this.collection.forEach(function(item) {
      let itemView = new ItemView({
        model: item
      });
      if (itemView.$el.text() !== '') {
        self.$el.append(itemView.el);
      }
    });

    this.$el.hide();

    return this;
  }

  changeSelect(value: any) {
    switch (value) {
      case ('Item'):
        this.$el.show();
        break;
      default:
        this.$el.hide();
        break;
    }
  }
}

export { ItemsView };
