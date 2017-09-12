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


});

