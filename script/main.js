$(document).ready(function(){
    
    // demo servers
    $server1 = 'process.php'; // regular
    $server2 = 'process.php'; // improved
    
    function sendImage(address, element) {
        
        var $input = $("#demoInputFile");
        var fd = new FormData();

        fd.append('demofile', $input.prop('files')[0]);

        var startTime = new Date();
        
        $.ajax({
            url: address,
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                var endTime = new Date();
                latency = endTime - startTime;
                $(element).html('<div class="demo-latency">'+latency+' ms</div>');
                $items = $.parseJSON(data);
                $items.forEach(function(item, i) {
                    $(element).append('<img class="channel-'+i+'" src="'+item+'">');
                });
                // $(element).html(data);
            }
        });
        
    }
    
    $("#demoForm").on('submit', function(ev){
        ev.preventDefault();
        sendImage($server1, "#demoResult1");
        sendImage($server2, "#demoResult2");
        $('.demo-results').slideDown(500);
    });
    
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        targetedScroll($(this).attr('href').substr(1));
    });

    function targetedScroll(id) {
        var scrollTop = id ? $('#' + id).offset().top : 0;
        $('body,html').animate({ scrollTop: scrollTop }, 500);
    }
    
});
