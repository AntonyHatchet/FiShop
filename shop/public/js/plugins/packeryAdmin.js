    $(document).ready(function() {
        var $container = $('.showcase').packery({
            gutter:0,
            columnWidth: 180,
            rowHeight: 175,
            isInitLayout: false
        });

        var pckry = $container.data('packery');

        // ----- initial sort ----- //

        var sortOrder = []; // global variable for saving order, used later
        var storedSortOrder = localStorage.getItem('sortOrder');
        if ( storedSortOrder ) {
            storedSortOrder = JSON.parse( storedSortOrder );
            // create a hash of items by their tabindex
            var itemsByTabIndex = {};
            var tabIndex;
            for ( var i=0, len = pckry.items.length; i < len; i++ ) {
                var item = pckry.items[i];
                tabIndex = $( item.element ).attr('tabindex');
                itemsByTabIndex[ tabIndex ] = item;
            }
            // overwrite packery item order
            i = 0; len = storedSortOrder.length;
            for (; i < len; i++ ) {
                tabIndex = storedSortOrder[i];
                pckry.items[i] = itemsByTabIndex[ tabIndex ];
            }
        }

        // ----- packery setup ----- //

        // trigger initial layout
        $container.packery();

        var itemElems = $container.packery('getItemElements');
        // for each item element
        $( itemElems ).each( function( i, itemElem ) {
            // make element draggable with Draggabilly
            var draggie = new Draggabilly( itemElem );
            // bind Draggabilly events to Packery
            $container.packery( 'bindDraggabillyEvents', draggie );
        });

        // ----- setup draggabilly events ----- //

        function orderItems() {
            var itemElems = pckry.getItemElements();
            // reset / empty oder array
            sortOrder.length = 0;
            for (var i=0; i< itemElems.length; i++) {
                sortOrder[i] = itemElems[i].getAttribute("tabindex");
            }
            // save tabindex ordering

            localStorage.setItem('sortOrder', JSON.stringify(sortOrder) );
        }
        $("#AddElement").click(function(){
            console.log(storedSortOrder);
            $.post( "/showcase/sortOrder", {sort : storedSortOrder} );
        });
        $container.packery( 'on', 'layoutComplete', orderItems );
        $container.packery( 'on', 'dragItemPositioned', orderItems );

    });
