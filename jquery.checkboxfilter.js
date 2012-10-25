 
;(function ( $, window, undefined ) {

  var pluginName = 'CheckboxFilter',
      document = window.document,
      defaults = {
        checkbox: {
          toggleChecked: true
        },
        labelWrapper: ".label-wrapper", 
        caseSensitive: false
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
      var text_value = $(self.element).val();
      
      $(self.options.labelWrapper).find('label').each(function () {
          var label_text = $(this).text(),
              $input_element = $(this).find('input:first'),
              matched;
              
          if (!self.options.caseSensitive) {
            text_value = text_value.toLowerCase();
            label_text = label_text.toLowerCase();
          }
          
          matched = (label_text.indexOf(text_value) >= 0); // true if label contains textbox value

          // Set checked attribute
          if ($input_element.is(':checkbox') && self.options.checkbox.toggleChecked) {
            $input_element.attr('checked', matched);
          }
          // Hide any filters which have not been matched
          $(this).css('display', (matched ? 'block' : 'none'));
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