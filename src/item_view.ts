/// <reference path='../node_modules/@types/underscore/index.d.ts' />
/// <reference path='../node_modules/@types/backbone/index.d.ts' />
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
  }

  initialize() {
    this.render();
  }

  render(): Backbone.View<Item> {
    // Prepare template
    let templateHtml: string = '<button type="button" class="btn btn-default btn-close">Close</button>';
    templateHtml += '<div><%= localized_name %></div>';
    templateHtml += '<div><img src="<%= portrait_url %>"/></div>';
    templateHtml += '<div>Cost: <%= cost %> gold</div>';
    // Generate template by using underscore
    let template = _.template(templateHtml);
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
        // self.$el.parent().parent().siblings('#col-detail').html(itemDetailView.el);
        $('div#main-panel.panel.panel-default').hide();
        // Replace content of 'detail' panel with information of selected item
        $('div#detail-panel.panel.panel-default').html(itemDetailView.el);
        $('div#detail-panel.panel.panel-default').show();
      }
    });
  }
}

class ItemsView extends Backbone.View<Backbone.Model> {
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
    this.collection.forEach(function(item) {
      let itemView = new ItemView({
        model: item
      });
      if (itemView.$el.text() !== '') {
        self.$el.append(itemView.el);
      }
    });
    return this;
  }
}

export { ItemsView };
