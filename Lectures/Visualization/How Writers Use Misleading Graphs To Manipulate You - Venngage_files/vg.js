$(document).ready(function() {
	//TRACKING SIGN UP CLICK
	function redirecter(href, label){
		setTimeout(function (){
			console.log(label);
           document.location = href + "?lv=" + landing_page_version + "&lb=" + label;
         }, 1500);
	}


	function track(x){
		var deferred = $.Deferred();
		return deferred.promise( mixpanel.track("Sign Up",
			{
			"Button Number":  "Button " + x,
			"Page Title": page_title,
			"Page Number" : landing_page_version
			}
		) );
	};

	//SIGN UP BUTTON ON CLICK TRIGGERS
	$(document).on("click",".signup", function(e){
		e.preventDefault();
		var label = $(this).data("signup");
		var href = $(this).attr("href");
		var tracker = track(label);
		tracker.done( redirecter(href, label) ) ;
	});

	/**
	 * Returns query parameter in url using name as identifier
	 * @param {String} url      URL to be searched in
	 * @param {String} name     Parameter to be searched
	 * @return {String}         Query parameter
	 */
	function getUrlParam(url, name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(url);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	// Create VAP cookie if query param is available and cookie does not exist
	if (getUrlParam(document.URL, 'vap') && !$.cookie('vap')) {
		$.cookie(
			'vap',
			getUrlParam(document.URL, 'vap'),
			{ path: '/', domain: '.venngage.com' }
		);
	}

	$(".enterprise input[name='freq_options']").on("change", function(){
		if($(this).val() == 'option_quarterly'){
			$("#ent5").html("$65" + "<span class='per-month'>/mo</span>");
			$("#ent10").html("$124" + "<span class='per-month'>/mo</span>");
			$("#ent20").html("$229" + "<span class='per-month'>/mo</span>");
			$("#ent50").html("$499" + "<span class='per-month'>/mo</span>");
		}else if($(this).val() == 'option_yearly'){
			$("#ent5").html("$59" + "<span class='per-month'>/mo</span>");
			$("#ent10").html("$109" + "<span class='per-month'>/mo</span>");
			$("#ent20").html("$199" + "<span class='per-month'>/mo</span>");
			$("#ent50").html("$429" + "<span class='per-month'>/mo</span>");
		}
	})

	$('.navbar-right .menu-item-has-children').on('mouseover', function() {
		$(this).addClass('open');
	});
	$('.navbar-right .menu-item-has-children').on('mouseout', function() {
		$(this).removeClass('open');
	});
	
	$(".search-icon").on("click", function() { $(this).closest('form').submit(); });
	
	$(".pricing-period-buttons a").on('click', function(e) {
		e.preventDefault();
		if ($(".new-pricing-main-section").eq($(this).index()).size() > 0) {
			$(".pricing-period-buttons a").removeClass("active-period");
			$(this).addClass("active-period");
			$(".new-pricing-main-section").hide();
			$(".new-pricing-main-section").eq($(this).index()).show();
		}
	});
});
