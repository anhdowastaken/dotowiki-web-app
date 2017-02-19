/// <reference path="../node_modules/@types/backbone/index.d.ts" />
import * as Backbone from 'backbone';

// Item model
class Item extends Backbone.Model {
  // Properties of Item model
  set item_id(value: number) { super.set('item_id', value); }
  get item_id(): number { return super.get('item_id'); }

  set name(value: string) { super.set('name', value); }
  get name(): string { return super.get('name'); }

  set short_name(value: string) { super.set('short_name', value); }
  get short_name(): string { return super.get('short_name'); }

  set localized_name(value: string) { super.set('localized_name', value); }
  get localized_name(): string { return super.get('localized_name'); }

  set icon_url(value: string) { super.set('icon_url', value); }
  get icon_url(): string { return super.get('icon_url'); }

  set portrait_url(value: string) { super.set('portrait_url', value); }
  get portrait_url(): string { return super.get('portrait_url'); }

  set cost(value: number) { super.set('cost', value); }
  get cost(): number { return super.get('cost'); }

  set quality(value: number) { super.set('quality', value); }
  get quality(): number { return super.get('quality'); }

  set isRecipe(value: boolean) { super.set('isRecipe', value); }
  get isRecipe(): boolean { return super.get('isRecipe'); }

  set inSecretShop(value: boolean) { super.set('inSecretShop', value); }
  get inSecretShop(): boolean { return super.get('inSecretShop'); }

  set inSideShop(value: boolean) { super.set('inSideShop', value); }
  get inSideShop(): boolean { return super.get('inSideShop'); }

  set description(value: string) { super.set('description', value); }
  get description(): string { return super.get('description'); }

  set attribute(value: string) { super.set('attribute', value); }
  get attribute(): string { return super.get('attribute'); }

  set manacost(value: number) { super.set('manacost', value); }
  get manacost(): number { return super.get('manacost'); }

  set cooldown(value: number) { super.set('cooldown', value); }
  get cooldown(): number { return super.get('cooldown'); }

  set notes(value: string) { super.set('notes', value); }
  get notes(): string { return super.get('notes'); }

  set lore(value: string) { super.set('lore', value); }
  get lore(): string { return super.get('lore'); }

  set components(value: Items) { super.set('components', value); }
  get components(): Items { return super.get('components'); }

  constructor(jsonData?: any) {
    super();
    jsonData.id ? this.item_id = jsonData.id : this.item_id = 0;
    jsonData.name ? this.name = jsonData.name : this.name = "";
    jsonData.short_name ? this.short_name = jsonData.short_name : this.short_name = "";
    jsonData.localized_name ? this.localized_name = jsonData.localized_name : this.localized_name = "";
    jsonData.icon_url ? this.icon_url = jsonData.icon_url : this.icon_url = "";
    jsonData.portrait_url ? this.portrait_url = jsonData.portrait_url : this.portrait_url = "";
    jsonData.cost ? this.cost = jsonData.cost : this.cost = 0;
    jsonData.quality ? this.quality = jsonData.quality : this.quality = 0;
    jsonData.isRecipe ? this.isRecipe = jsonData.isRecipe : this.isRecipe = false;
    jsonData.inSecretShop ? this.inSecretShop = jsonData.inSecretShop : this.inSecretShop = false;
    jsonData.inSideShop ? this.inSideShop = jsonData.inSideShop : this.inSideShop = false;
    jsonData.description ? this.description = jsonData.description : this.description = "";
    jsonData.attribute ? this.attribute = jsonData.attribute : this.attribute = "";
    jsonData.manacost ? this.manacost = jsonData.manacost : this.manacost = 0;
    jsonData.cooldown ? this.cooldown = jsonData.cooldown : this.cooldown = 0;
    jsonData.notes ? this.notes = jsonData.notes : this.notes = "";
    jsonData.lore ? this.lore = jsonData.lore : this.lore = "";
    this.components = new Items();
    if (jsonData.components && jsonData.components.length > 0) {
      this.components.reset(jsonData.components);
    }
  }
}

class Items extends Backbone.Collection<Backbone.Model> {
  model = Item;
  url = 'https://dotowiki-service.herokuapp.com/getItemList';
}

export { Item };
export { Items };
