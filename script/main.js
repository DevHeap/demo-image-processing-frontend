$(document).ready(function(){
    
    // demo servers
    var $server1 = 'http://51.15.40.128:8000/image/'; // regular server
    var $server2 = 'image/'; // improved server
    
    function sendImage(data, address, result) {
        
        /* // send form
        var $input = $("#demoInputFile");
        var fd = new FormData();
        fd.append('demofile', $input.prop('files')[0]);
        data = fd; // */
        
        var startTime, endTime;
        
        $.ajax({
            type: 'POST', url: address, data: data,
            processData: false, contentType: false,
            beforeSend: function(){ startTime = new Date(); },
            success: function(response){
                endTime = new Date();
                latency = endTime - startTime;
                $(result).html('<div class="demo-latency">'+latency+' ms</div>');
                
                if($.isPlainObject(response)){ $items = response; }
                else {$items = $.parseJSON(response); }
                
                $.each($items, function(index, value) {
                    code = '<div class="demo-cannel">'+
                    '<img class="channel-'+index+'" src="'+address+value+'">'+
                    '</div>';
                    $(result).append(code);
                });
            },
            error: function(response){
                endTime = new Date();
                latency = endTime - startTime;
                $(result).html('<div class="demo-latency">'+latency+' ms</div>');
                
                code = '<p>Error: '+response.status+'</p>'
                $(result).append(code);
            }
        });
        
    }
    
    $("#demoForm").on('submit', function(event){
        event.preventDefault();
        
        const reader = new FileReader();
        
        file = $("#demoInputFile").prop('files')[0];
        reader.onloadend = function(){
            data = this.result.split(',')[1]
            $content = '{"image":"'+data+'"}';
            sendImage($content, $server1, "#demoResult1");
            sendImage($content, $server2, "#demoResult2");
            $('.demo-results').slideDown(500);
        };
        
        reader.readAsDataURL(file); // reader.readAsBinaryString(file);
    });

    // scroll to #id
    function targetedScroll(id) {
        var scrollTop = id ? $('#' + id).offset().top : 0;
        $('body,html').animate({ scrollTop: scrollTop }, 500);
    }
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        targetedScroll($(this).attr('href').substr(1));
    });
    
});
