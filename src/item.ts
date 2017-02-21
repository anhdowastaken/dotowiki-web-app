/// <reference path="../node_modules/@types/backbone/index.d.ts" />
import * as Backbone from 'backbone';

// Item model
class Item extends Backbone.Model {
  // Properties of Item model
  url = 'https://dotowiki-service.herokuapp.com/getItem';

  get name(): string { return super.get('name'); }

  get short_name(): string { return super.get('short_name'); }

  get localized_name(): string { return super.get('localized_name'); }

  get icon_url(): string { return super.get('icon_url'); }

  get portrait_url(): string { return super.get('portrait_url'); }

  get cost(): number { return super.get('cost'); }

  get quality(): number { return super.get('quality'); }

  get isRecipe(): boolean { return super.get('isRecipe'); }

  get inSecretShop(): boolean { return super.get('inSecretShop'); }

  get inSideShop(): boolean { return super.get('inSideShop'); }

  get description(): string { return super.get('description'); }

  get attribute(): string { return super.get('attribute'); }

  get manacost(): number { return super.get('manacost'); }

  get cooldown(): number { return super.get('cooldown'); }

  get notes(): string { return super.get('notes'); }

  get lore(): string { return super.get('lore'); }

  private components: Items;
  getComponents() {
    return this.components;
  }

  defaults(): any {
    return {
      name: "",
      short_name: "",
      localized_name: "",
      icon_url: "",
      portrait_url: "",
      cost: 0,
      quality: 0,
      isRecipe: false,
      inSecretShop: false,
      inSideShop: false,
      description: "",
      attribute: "",
      manacost: 0,
      cooldown: 0,
      notes: "",
      lore: "",
      components: new Items()
    }
  }

  parse(response: any, options?: any): any {
    this.components = new Items();
    // Resolve nested model/collection
    if (response.components && response.components.length > 0) {
      this.components.reset(response.components);
    }
    return response;
  }
}

class Items extends Backbone.Collection<Backbone.Model> {
  model = Item;
  url = 'https://dotowiki-service.herokuapp.com/getItemList';
}

export { Item };
export { Items };
