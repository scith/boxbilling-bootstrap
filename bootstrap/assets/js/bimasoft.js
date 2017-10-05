function generatePassword() {
    len = 21;
    var length = (len)?(len):(10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    var numeric = '0123456789';
    var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    var password = "";
    var character = "";
    var crunch = true;
    while( password.length<length ) {
       entity1 = Math.ceil(string.length * Math.random()*Math.random());
       entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
       hold = string.charAt( entity1 );
       hold = (entity1%2==0)?(hold.toUpperCase()):(hold);
       character += hold;
       character += numeric.charAt( entity2 );
       password = character;
    }
    return password;

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

    tinymce.init({
      selector: '#tiny',
      setup: function (editor) {
          editor.on('change', function () {
              editor.save();
          });
      },
      height: 200,
      menubar: false,
      fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
      plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code help'
      ],
      toolbar: ' insert | image | link | styleselect | fontsizeselect bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | removeformat '
    });
    $('#tiny').after(`<p style="margin-top:10px;margin-left:10px;font-size: 12px;"><a href="https://uploadfiles.io" target="uploadfiles.io"><i class='fa fa-upload'> </i> Upload Files</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://dropbox.com" target="uploadfiles.io"><i class='fa fa-dropbox'> </i> Dropbox</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://drive.google.com" target="uploadfiles.io"><i class='fa fa-cloud-upload'> </i> Google Drive</a></p>`);


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
            href = href.replace ('https','http');
            href = href.replace ('http','https');
            $(this).before(`
                    <form id="cwpanel_login" style="float:left;margin-right : 10px" target="cwpanel_window" action="`+ href +`login/index.php" method="post">
                        <input type="hidden" name="username" value="">
                        <input type="hidden" name="password" value="">
                        <input type="hidden" name="commit" value="login">
                        <input type=button class='btn btn-primary' id="cwpanel_login_btn" value="Login to CWPanel">
                    </form><div style="clear:both"></div>`);
            $(this).remove();
            $('#cwpanel_login_btn').click(function(event) {
                window.open("https://client.bimasoft.web.id/wait.html",'cwpanel_window');
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
        if (href.indexOf('/cpanel') !== -1) {
            href = href.replace ('/cpanel',':2083')
            href = href.replace ('https','http');
            href = href.replace ('http','https');
            $(this).before(`
                    <form id="cwpanel_login" style="float:left;margin-right : 10px" target="cwpanel_window" action="`+ href +`/login/" method="post">
                        <input type="hidden" name="user" value="">
                        <input type="hidden" name="pass" value="">
                        <input type="hidden" name="login" value="login">
                        <input type=button class='btn btn-primary' id="cwpanel_login_btn" value="Login to cPanel">
                    </form><div style="clear:both"></div>`);
            $(this).remove();
            $('#cwpanel_login_btn').click(function(event) {
                window.open("https://client.bimasoft.web.id/wait.html",'cwpanel_window');
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
                        $('#cwpanel_login input[name="user"]').val(username);
                        $('#cwpanel_login input[name="pass"]').val(randompass);
                        $('#cwpanel_login').submit();
                    }
                }, 300);
            });
        }
    });

});

