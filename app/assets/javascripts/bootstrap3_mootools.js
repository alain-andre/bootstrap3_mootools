/**
 * @copyright Copyright © 2013 - 2014.
 * @author  Alain ANDRE <wordsbybird@gmail.com> https://github.com/alain-andre
 */

/**
 * Actions sur .alert
 */
var Alert = new Class({
  /* @param el L'element alert */
  initialize: function(el){
    this.el = el; var self = this;
    el.getElement('.close').removeEvent('click').addEvent('click', function(){
      var parent = this.get('data-dismiss');
      self.close(this.getParent('.'+parent));
    });
  }
  , close: function(el){
    el.destroy();
  }
});

/**
 * Actions sur .modal
 * @use var modal = new Modal(document.id('modal-exemple')).show();
 */
var Modal = new Class({
  /* @param el L'element alert */
  initialize: function(el){
    this.el = el; var self = this;
    el.getElement('.close').removeEvent('click').addEvent('click', function(){
      var parent = this.get('data-dismiss');
      self.hide(this.getParent('.'+parent));
    });
  }
  , hide: function(el){
    el.removeClass('show');
  }
  , show: function(){
    this.el.addClass('show');
  }
});

/**
 * Actions sur .nav-tabs
 */
var Tabs = new Class({
  /* @param el L'element nav-tabs */
  initialize: function(el){
    var self = this; this.el = el;
    el.getElements('li').each(function(li){
      var link = li.getElement('[data-toggle]'); 
      if(link.get('data-toggle').contains("tab")){
        link.removeEvent('click').addEvent('click', function(){
          var div = this.getParent('.nav-tabs').getParent('div').getElement('.tab-content');
          self.show(div, li, this.get('href').replace('#', ''));
        });
      }
    });
  }
  , show: function(div, liSelected, tabId){
    this.el.getElements('li').each(function(li){
      if(liSelected == li) li.addClass('active');
      else li.removeClass('active');
    });
    div.getElements('.tab-pane').each(function(pane){
      if(pane.get('id') == tabId || pane.hasClass(tabId)) pane.addClass('active');
      else pane.removeClass('active');
    });
  }
});

/**
 * Actions sur .dropdown-toggle
 */
var DropDown = new Class({
  /* @param el L'element dropdown-toggle */
  initialize: function(el){ 
    var self = this, dropDown = el.getParent('li')
    , dropdownMenu = dropDown.getElement('.dropdown-menu');
    el.removeEvent('click').addEvent('click', function(){
      self.clearMenu();
      dropDown.addClass('open');
      dropdownMenu.setStyle('display', 'block')
      .removeEvent('mouseleave').addEvent('mouseleave', function(){
        this.setStyle('display', 'none');
        dropDown.removeClass('open');
      }); 
    });
    document.getElement('body').addEvent('click', function(evt){
      var click = 0;
      document.getElements('[data-toggle="dropdown"]').each(function(el){
        if(evt.target == el) click = 1;
      });
      if(click == 0) self.clearMenu(); // on ferme si pas clic sur un menu
    });
  }
  , clearMenu : function(){
    document.getElements('[data-toggle="dropdown"]').each(function(el){
      var li = el.getParent('li');
      li.removeClass('open').getElement('.dropdown-menu').setStyle('display', 'none');
    });
  }
});


/**
 * Actions sur [data-toggle="tooltip"]
 */
var Tooltip = new Class({
  /* @param el L'element tooltip */
  initialize: function(el, pop){
    if(pop) this.divContainer = document.id(pop); // pour les popover
    else this.divContainer = document.id('tooltip');
    this.el = el , this.placement = this.el.get('data-placement');
    el.set('data-original-title', el.get('title')).set('title', '');
    this.create();
  }
  , create: function(){ 
    var self = this;
    this.el.addEvent('mouseenter', function(){ self.show(); });
    this.el.addEvent('mouseleave', function(){ self.hide(); });
    if(!this.divContainer){
      this.divContainer = new Element('div', { 'id': 'tooltip', 'class': 'tooltip in ', 'style': '' })
        .setStyle('display', 'none')
        .grab(new Element('div', { 'class': 'tooltip-arrow' }))
        .grab(new Element('div', { 'class': 'tooltip-inner' }));
      document.getElement('body').grab( this.divContainer );
    }
  }
  , show: function(){ 
    this.divContainer.setStyle('display', 'block');
    this.setTitle().setPlacement();
  }
  ,setPlacement: function(){
    var actualHeight = this.divContainer.getCoordinates().height
    , actualWidth = this.divContainer.getCoordinates().width
    , coordinates = this.el.getCoordinates();
    switch(this.placement){
      case 'top':
        var styleHash = { top: coordinates.top - actualHeight
          , left: coordinates.left + coordinates.width / 2 - actualWidth / 2 };
        this.divContainer.removeClass('bottom').removeClass('left').removeClass('right').addClass('top');
      break;
      case 'bottom':
        var styleHash = { top: coordinates.top + coordinates.height
          , left: coordinates.left + coordinates.width / 2 - actualWidth / 2 };
        this.divContainer.removeClass('top').removeClass('left').removeClass('right').addClass('bottom');
      break;
      case 'left':
        var styleHash = { top: coordinates.top + coordinates.height / 2 - actualHeight / 2
          , left: coordinates.left - actualWidth };
        this.divContainer.removeClass('bottom').removeClass('top').removeClass('right').addClass('left');
      break;
      case 'right':
        var styleHash = { top: coordinates.top + coordinates.height / 2 - actualHeight / 2
          , left: coordinates.left + coordinates.width };
        this.divContainer.removeClass('bottom').removeClass('left').removeClass('top').addClass('right');
      break;
      default :
        var styleHash = { top: coordinates.top + coordinates.height / 2 - actualHeight / 2
          , left: coordinates.left - actualWidth };
        this.divContainer.removeClass('bottom').removeClass('top').removeClass('right').addClass('left');
      break;
    }
    this.divContainer.setStyles( styleHash );
  }
  , setTitle: function(){
    var title = this.el.get('data-original-title');
    this.divContainer.getElement('.tooltip-inner').set('html', title);
    return this;
  }
  , hide: function(){ 
    this.divContainer.setStyle('display', 'none');
  }
});

/**
 * Actions sur [data-toggle="popover"]
 */
var Popover = new Class({
  Extends: Tooltip
  /* @param el L'element popover */
  , initialize: function(el){ 
    this.parent(el, 'popover');
  }
  , create: function(){ 
    var self = this;
    if(!this.divContainer){
      this.divContainer = new Element('div', { 'id': 'popover', 'class': 'popover in ', 'style': '' })
        .setStyle('display', 'none')
        .grab(new Element('div', { 'class': 'arrow' }))
        .grab(new Element('h3', { 'class': 'popover-title' }))
        .grab(new Element('div', { 'class': 'popover-content' }));
      document.getElement('body').grab( this.divContainer );
    }
    switch(self.el.get('data-fire')){
      case "mouseenter":
        this.el.addEvent('mouseenter', function(){ self.show(); });
        this.el.addEvent('mouseleave', function(){ self.hide(); });
      break;
      default :
        self.el.removeEvent('click').addEvent('click', function(){ 
          if(self.divContainer.getStyle('display') == 'none') self.show(); 
          else self.hide();
        });
      break;
    }
  }
  , show: function(){ 
    this.divContainer.setStyle('display', 'block');
    this.setTitle().setContent().setPlacement();
  }
  , setContent: function(){
    var content = this.el.get('data-content');
    this.divContainer.getElement('.popover-content').set('html', content);
    return this;
  }
  , setTitle: function(){
    var title = this.el.get('data-original-title');
    this.divContainer.getElement('.popover-title').set('html', title);
    return this;
  }
});

/**
 * Chargement des scripts pour le framework bootstrap
 */
window.addEvent('domready', function(){ 
  try{ // dropdown
    document.getElements('.dropdown-toggle').each(function(el){ var dropdown = new DropDown(el); });
  }catch(e){}
  try{ // Alerts
    document.getElements('.alert').each(function(el){ var alert = new Alert(el); });
  }catch(e){}
  try{ // Tabs 
    document.getElements('.nav-tabs').each(function(el){ var tab = new Tabs(el); });
  }catch(e){}
  try{ // Tooltip, Popover
    document.getElements('[data-toggle]').each(function(el){ 
      if(el.get('data-toggle').contains("tooltip")) var tooltip = new Tooltip(el); 
      if(el.get('data-toggle').contains("popover")) var popover = new Popover(el);
    });
  }catch(e){}
});
