$(document).ready(function() {
    
    $("[data-toggle='modal']").click(function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        
        $('#modal').load(url,function(){
            $('#modal').modal('show');
        });
    });
    
    $(document).on('click', "a", function(e) {
        
        var addId = $(this).attr('addId');
        if (addId) {$.post('/cart/add/' + addId, function(data) {
            $('#cart').html(data);
        });}
     
    });
    
    $(document).on('click', "i", function(e) {
        var remId = $(this).attr('remId');
        if (remId) {$.post('/cart/rem/' + remId, function(data) {
            $('#cart').html(data);
        });}
        e.preventDefault();
        e.stopPropagation();
    });

    $(document).on('click', ".glyphicon", function(e) {
        var quantity = $(".count").val();
        if ($(this).hasClass("glyphicon-minus")){
            if (quantity > 0){
            $(".count").val(parseInt(quantity) -1)}
        }else
        if ($(this).hasClass("glyphicon-plus")){
            $(".count").val(parseInt(quantity) + 1);
        }
        e.preventDefault();
        e.stopPropagation();
    });
});

