
var notifElem;

$( function() {

    var $container = $('.categories').packery({
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

    $container.packery( 'on', 'dragItemPositioned', function( pckryInstance, draggedItem ) {
        console.log('двигается');
    });

});
