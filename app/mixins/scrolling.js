define(["jquery", "ember", "app/helpers/utilities"], function($, Ember, utilities){
    return Ember.Mixin.create({
        bindScrolling: function() {
            var onScroll, _this = this, opts = {debounce: 100};

            if (opts.debounce) {
                onScroll = utilities.debounce(function(evt) { return _this.scrolled(evt); }, 100);
            } else {
                onScroll = function(){
                    return _this.scrolled(); 
                };
            }
            $(document).bind('touchmove', onScroll);
            $(window).bind('scroll', onScroll);
        },

        unbindScrolling: function() {
            $(document).unbind('touchmove');
            $(window).unbind('scroll');
        }
    });
})

