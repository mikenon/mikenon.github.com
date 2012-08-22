$(function () {

	function refreshSwatch() {
        var numH = $("#sliderH").slider("value"), numL = $("#sliderL").slider("value"), numF = $("#sliderF").slider("value");
        $("#spanSlideH").html(numH);
        $("#spanSlideL").html(numL);
        $("#spanSlideF").html(numF);
        $("#finHardness").html(numH);
        $("#finLight").html(numL);
        $("#finFriction").html(numF);
    }

    function fileHead(){
        var objToday = new Date(),
            weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
            dayOfWeek = weekday[objToday.getDay()],
            domEnder = new Array( 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ),
            dayOfMonth = (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
            months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
            curMonth = months[objToday.getMonth()],
            curYear = objToday.getFullYear(),
            curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
            curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
            curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
            curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";

        return "## Created on " + curMonth + " " + dayOfMonth + ", " + curYear + ", " + curHour + ":" + curMinute + ":" + curSeconds + curMeridiem + "\n" 
             + "##   at http://mikenon.github.com\n";
    }
    
    function setJsonApiStatus(s, t, h){
    	var $box = $("#jsonapiStatus");
    	if(s=='success') $box.attr('class','alert alert-success');
    	else $box.attr('class','alert alert-error');
    	
    	if(h==true) $box.css('display','none');
    	else $box.css('display','block');
    	
    	$box.html(t);
    }
        
    // make code pretty
    window.prettyPrint && prettyPrint()
    
    $("span.pln").css('color','#005cdf');
    $("span.ymlList").css('font-weight','bold');
    $("span.yml").css('color','#000000');
    
    $('.pops').popover()
    
    $("a[href^='http']").not($("a[href*='mikenon']")).each(function() {
    	if(this.href)
	    $(this).css({
	        background: "url(http://g.etfv.co/" + this.href + ") left center no-repeat",
	        "padding-left": "20px"
	    });
	});
    
    var $dialog = $("#dialog").dialog({
        autoOpen : false,
        modal : true,
        buttons : {
            Close : function() {
                $(this).dialog("close");
            },
        }
    });
    
    var $dialog2 = $("#dialog2").dialog({
        autoOpen : false,
        modal : true,
        buttons : {
            Close : function() {
                $(this).dialog("close");
            },
        }
    });

    $("#recipeHelpShaped").click(function() {
        $dialog.dialog("open");
    });
    $("#recipeHelpUnshaped").click(function() {
        $dialog2.dialog("open");
    });

    $("#sliderH").slider({
        orientation : "horizontal",
        range : "min",
        max : 50,
        value : 1,
        step : 0.1,
        slide : refreshSwatch,
        change : refreshSwatch
    });
    
    $("#sliderL").slider({
        orientation : "horizontal",
        range : "min",
        max : 15,
        value : 1,
        slide : refreshSwatch,
        change : refreshSwatch
    });
    
    $("#sliderF").slider({
        orientation : "horizontal",
        range : "min",
        max : 1.5,
        min : 0.3,
        value : 0.6,
        step : 0.1,
        slide : refreshSwatch,
        change : refreshSwatch
    });

    var $tabs = $('#tabs').tabs();
    var $tabsCmd = $('#tabsCmd').tabs();
    
    $("#inputName").change(function() {
        $("#finName").html(this.value);
    });
    
    $("#inputLink").change(function() {
        $("#finTexture").html("http://"+this.value);
		$("#popLink").attr('data-content','<img src="http://'+this.value+'">');
    });
    
    $("#inputVanilla").change(function() {
        $("#finVanilla").html(this.value);
    });
    
    $("#inputRecipe").change(function() {
        $("#finRecipe").html(this.value);
    });
    
    $("#inputRecipeShapedStr, #inputRecipeShapedCnt").change(function() {
        $("#finRecipe").html("shaped " + $('#inputRecipeShapedStr').val() + " " + $('#inputRecipeShapedCnt').val());
    });
    
    $("#inputRecipeUnshapedStr, #inputRecipeUnshapedCnt").change(function() {
        $("#finRecipe").html("shapeless " + $('#inputRecipeUnshapedStr').val() + " " + $('#inputRecipeUnshapedCnt').val());
    });
    
    $("#inputFurnaceId, #inputFurnaceCnt").change(function() {
        $("#finFurnace").html($('#inputFurnaceId').val() + "," + $('#inputFurnaceCnt').val());
    });
    
    $("#radioClickLeft, #radioClickRight, #radioCmdPlayer, #radioCmdConsole, #inputAction").change(function() {
        $("#finClick").html($('input:radio[name=radioClick]:checked').val());
        $("#finCommand").html($('input:radio[name=radioCmd]:checked').val() + ":" + $('#inputAction').val());
    });
	
	jQuery.fn.reset = function () {
	    $(this).each (function() { this.reset(); });
	}
	
    $("#btnClear").click(function(e) {
    	e.preventDefault();
    	$("#sliderH").slider('value',1);	$("#spanSlideH").html('1');
    	$("#sliderL").slider('value',1);	$("#spanSlideL").html('1');
    	$("#sliderF").slider('value',0.6);	$("#spanSlideF").html('0.6');
		$('#formBlock').each (function(){
			this.reset();
		});
		$('.yml').each(function(i, obj) {
		    $(obj).html('');
		});
		setJsonApiStatus('success','Form Cleared',true);
		return false;
   	});
	
    function fillFile(){ 
        var filetext =           'block:' +
                               '\n    name: '         + $("#finName").html() +
                               '\n    texture: '      + $("#finTexture").html();
        filetext += ($("#finHardness").html() == '') 
                        ? '' : '\n    hardness: '     + $("#finHardness").html();
        filetext += ($("#finLight").html() == '')
                        ? '' : '\n    lightlevel: '   + $("#finLight").html();
        filetext += ($("#finFriction").html() == '')    
                        ? '' : '\n    finFriction: '  + $("#finFriction").html();
        filetext += ($("#finVanilla").html() == '')    
                        ? '' : '\n    vanillablock: ' + $("#finVanilla").html();
        filetext += ($("#finRecipe").html() == '')      
                        ? '' : '\n    recipe: '       + $("#finRecipe").html();
        filetext += ($("#finFurnace").html() == '') 
        				? '' : '\n    furnace: ' 	  + $("#finFurnace").html();
        filetext += ($("#finClick").html() == $("#finCommand").html()) 
                        ? '' : '\n    action:' +
                               '\n        click: '    + $("#finClick").html() +
                               '\n        command: '  + $("#finCommand").html();
        return fileHead() + filetext;
    }

    Downloadify.create('downloadify', {
        filename: function(){
            return $("#finName").html() + ".yml";
        },
        data: function(){
            return fillFile();
        },
        transparent : false,
        swf : '/downloadify/media/downloadify.swf',
        downloadImage : '/img/dlbutton.png',
        width : 80,
        height : 28,
        transparent : true,
        append : false
    });

    var $loginPop = $("#formPop").dialog({
        autoOpen : false,
        width: $("#spanwidth").css('width'),
        modal : true,
        buttons : {
            Close : function() {
                $(this).dialog("close");
            },
        }
    });
    $("#uploadBtn").click(function() {
        $("#inputFilename").val($("#finName").html() + '.yml');
        $loginPop.dialog("open");
    });	
	
//-----------------------------------------------------------------
//-----------------------------------------------------------------
	
	var api = null;
	var $display = $("#output");
	
	function cmd_log(e) {
		$display.val($display.val() + e);
		$display.scrollTop(9999);
		$display.scrollTop($display.scrollTop()*12);
	}
	function hide_status(){
		$display.slideUp();
		$("#formLogin").slideDown();
		$("#formPop").effect('shake',{ percent: 0 },100);
	}
	
	$("#formLogin").submit(function (e) {		
		if($("#inputHostname").val() == ''
			|| $("#inputHostport").val() == ''
			|| $("#inputUsername").val() == ''
			|| $("#inputPassword").val() == ''
			|| $("#inputSalt").val() == ''){
				hide_status();
				setJsonApiStatus('error', 'Please fully enter form', false);
				return false;
		}
		api = new JSONAPI({
			host: $("#inputHostname").val(),
			port: parseInt($("#inputHostport").val()),
			username: $("#inputUsername").val(),
			password: $("#inputPassword").val(),
			salt: $("#inputSalt").val(),
		});
		api.call("getPlayerCount", function (data) {
			if(data.result == "success") {
				$("#formLogin").slideUp();
				$("#formLoginInfo").slideUp();
				$("#action").slideDown();
				setJsonApiStatus('success', 'Logged into server', false);
			}
		});
		return false;
	});
	
	$("#formUpload").submit(function (e) {
		if(api==null){
			hide_status();
			setJsonApiStatus('error', 'Please reload browser', false);
			return false;
		}
		console.log('plugins/YAMP/'+$("#inputFilename").val());
		console.log(fillFile());
		api.call('setFileContents', ['plugins/YAMP/'+$("#inputFilename").val(),fillFile()], function (data) {
			if(data.result == "success") {
				setJsonApiStatus('success', $("#inputFilename").val()+' Uploaded', false);
			} else {
				setJsonApiStatus('error', $("#inputFilename").val()+' Failed to upload', false);
			}
			console.log(data);
		});
		$("#formPop").dialog('close')
		return false;
	});
});