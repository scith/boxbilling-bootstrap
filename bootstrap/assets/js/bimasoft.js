function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
    }
    return domain;
}

jQuery(document).ready(function($) {

	$('.dtt').DataTable({
		"initComplete": function(settings, json) {
		    $('.dataTables_filter input[type=search]').prop({
		    	placeholder: 'Enter search term...'
		    });
		  }
	});

    $('.ajaxsubmit').click(function(event) {
        $('#loaderwrapper').show();                                 
    });

    $('body').on('click', '.dtt td', function(event) {
        url = $(this).closest('tr').find('td').eq(0).find('a').prop('href');
        window.location = url;
    });

    $('#optional_manage button[value="Change password"]').click(function(event) {
        $('#loaderwrapper').show();
        var myVar = setInterval(function(){
            if (($(".bootbox").data('bs.modal') || {}).isShown) {
                clearInterval(myVar);
                $('#loaderwrapper').hide();         
            }
        }, 300);
    });

    $('#optional_manage a').each(function(index, el) {
        href = $(this).prop('href');
        if (href.indexOf('2031') !== -1) {
            $(this).before(`
                    <form id="cwpanel_login" target="cwpanel_window" action="`+ href +`login/index.php" method="post">
                        <input type="hidden" name="username" value="">
                        <input type="hidden" name="password" value="">
                        <input type="hidden" name="commit" value="login">
                        <input type=button class='btn btn-primary' id="cwpanel_login_btn" value="Login to CWPanel">
                    </form>`);
            $(this).remove();
            $('#cwpanel_login_btn').click(function(event) {
                window.open(href + 'login/index2.php','cwpanel_window');
                randompass = generatePassword();
                username = $('#tab-details').find('tr').eq(3).find('td').eq(1).text();
                $('#optional_manage input[type="password"][name="password"]').val(randompass);
                $('#optional_manage input[type="password"][name="password_confirm"]').val(randompass);
                $('#optional_manage button[type=submit][value="Change password"]').click();
                var myVar = setInterval(function(){
                    if (($(".bootbox").data('bs.modal') || {}).isShown) {
                        clearInterval(myVar);
                        $('#loaderwrapper').hide();
                        $(".bootbox.modal").modal('hide');
                        $('#cwpanel_login input[name="username"]').val(username);
                        $('#cwpanel_login input[name="password"]').val(randompass);
                        $('#cwpanel_login').submit();
                    }
                }, 300);
            });
        }
    });

});

