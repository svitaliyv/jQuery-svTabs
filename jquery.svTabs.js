$.fn.closestDescendents = function (filter) {
    var $found = $(),
        $currentSet = this; // Current place
    while ($currentSet.length) {
        $found = $currentSet.filter(filter);
        if ($found.length) break;  // At least one match: break loop
        // Get all children of the current set
        $currentSet = $currentSet.children();
    }
    return $found;
}

$.fn.svTabs = function (options) {

    var defaultOptions = {
        tabClassName:'b-tabbed-pane__tab',
        tabClassName_active:'b-tabbed-pane__tab_state_current',
        tabSelector:'.b-tabbed-pane__tab',
        panelSelector:'.b-tabbed-pane__panel',
        panelClassName_active:'b-tabbed-pane__panel_state_current',
        wrapperSelector:'.b-tabbed-pane__wrapper'
    };

    options = $.extend(defaultOptions, options);

    this
        .find(options.tabSelector)
        .bind('click', function (evt) {
            evt.stopPropagation();
            var $tab = $(evt.target);
            var index = $tab.closest(options.tabSelector).index();

            $tab
                .closest(options.wrapperSelector)
                .closestDescendents(options.tabSelector)
                .removeClass(options.tabClassName_active)
            $tab
                .addClass(options.tabClassName_active);

            $tab
                .closest(options.wrapperSelector)
                .closestDescendents(options.panelSelector)
                .removeClass(options.panelClassName_active)
                .eq(index)
                .addClass(options.panelClassName_active)
        });
    return this;
};

