 
;(function ( $, window, undefined ) {

  var pluginName = 'CheckboxFilter',
      document = window.document,
      defaults = {
        checkboxWrapper: ".checkboxes", 
        checkFiltered: true
      };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;

    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype.init = function () {
    
    var self = this;

    $(this.element).keyup(function () {
      var text_value = $(self.element).val();                   // Texbox value
      
      $(self.options.checkboxWrapper).find('input:checkbox').each(function () {
          // Essentially a case insensitive 'string.contains' against the 
          // checkboxes parent label text
          var $label = $(this).closest('label'),                // the parent label
              label_text = $label.text().toLowerCase(),         // label text in lowercase
              checked = (label_text.indexOf(text_value) != -1); // true if label contains textbox value

          // Set checked attribute
          if (self.options.checkFiltered) {
            $(this).attr('checked', checked);
          }
          // Hide any filters which have not been matched
          $label.css('display', (checked ? 'block' : 'none'));
      });
      
    });
    
  };

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  }

}(jQuery, window));