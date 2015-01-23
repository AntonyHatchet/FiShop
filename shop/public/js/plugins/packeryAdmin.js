    $(document).ready(function() {
        var $container = $('.showcase').packery({
            gutter:0,
            columnWidth: 180,
            rowHeight: 175
        });


        $container.find('li').each( function( i, itemElem ) {
            // make element draggable with Draggabilly
            var draggie = new Draggabilly( itemElem );
            // bind Draggabilly events to Packery
            $container.packery( 'bindDraggabillyEvents', draggie );
        });
        var elementBlock = [];
        function orderItems() {
            var itemElems = $container.packery('getItemElements');
            $( itemElems ).each( function( i, itemElem ) {
                elementBlock.push(itemElem);
                console.log(itemElems)
            });
        }

        $container.packery( 'on', 'layoutComplete', orderItems );
        $container.packery( 'on', 'dragItemPositioned', orderItems );

        $('#AddElement').on( 'click', function() {
            // add and lay out newly appended elements
            $container.packery( 'addItems', elementBlock );
        });

        $('#RemoveElement').on( 'click', function() {
            $container.packery( 'remove', elementBlock);
        });
    });
