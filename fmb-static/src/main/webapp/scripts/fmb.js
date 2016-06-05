/** Initializing variables **/
var host = "www.sbfaiz.org";
//var host="localhost:8080";
var context = "/ajf/rest";

var server_url = "http://"+host+context;

/***List of variables that will change depending upon the jamaat and the server where the application is hosted **/
var jamaatName="Anjuman-e-Fakhri, Philadelphia";
var  contactPerson = "M. Adnan bhai Khambaty.";
/******************************************************************************************************************/

/***Variables that will remain same across jamaat ***********************/
//thaali services
var admin_thaali_get_service_url=server_url+"/thaali/getThaaliData";

//admin specific services
var admin_thaali_update_service_url = server_url+"/admin/updateThaaliData";
var add_menu_service_url=server_url+"/admin/addMenu";
var add_region_service_url=server_url+"/admin/addRegion";
var user_feedback_service_url=server_url+"/admin/getFeedback";
var all_user_profile_service_url=server_url+"/admin/getAllUserProfileData";
var profile_create_service_url = server_url+"/admin/createProfile";
var sendEmail_url=server_url+"/sendEmail";

//User specific services
var user_thaali_update_service_url = server_url+"/user/updateThaaliData";
var user_thaali_get_service_url=server_url+"/user/getThaaliData";
var all_user_thaali_get_service_url=server_url+"/user/getAllUserThaaliData";
var profile_get_service_url=server_url+"/profile/getProfile";
var profile_update_service_url=server_url+"/profile/updateProfile";
var submit_feedback_service_url = server_url+"/user/submitFeedback";


//misc services
var get_menu_service_url=server_url+"/misc/getMenu";
var get_cookname_url=server_url+"/misc/getCook";
var get_region_service_url=server_url+"/misc/getRegion";
var thaali_count_service_url=server_url+"/misc/getThaaliCount";

var msg_on_thaali_frozen = "No more Thaali Request's can be made for the particular day. Please contact "+contactPerson;
var on_delete_error_msg = 'You can only edit but not remove any existing thaali day present in the system.'
var server_error_msg = 'An error has occurred while getting the data from the server. Please try again';

var allowed_thaali_status = ["THAALI_PRESENT","THAALI_NOT_PRESENT"];
var allowed_thaali_status_ui = ["Yes","No"];

var user_thaali_status=["REQUESTED_BY_USER","CANCELLED_BY_USER","NOT_REQUESTED_BY_USER"];
var user_thaali_status_ui = ["Yes","No"];

var thaaliStatusMap = [{displayName:"Yes", serverName:"REQUESTED_BY_USER", status:"user_status"},
                       {displayName:"No", serverName:"NOT_REQUESTED_BY_USER", status:"user_status"},
                       {displayName:"Yes (No Rice)", serverName:"REQUESTED_WITH_NO_RICE", status:"user_status"},
                       {displayName:"Yes", serverName:"THAALI_PRESENT", status:"thaali_status"},
                       {displayName:"No", serverName:"THAALI_NOT_PRESENT", status:"thaali_status"}];

var user_thaali_category = ["Small","Medium","Large"];
var num_of_days_to_Advance = 60; //Upper bound on the num of days thaali data that would be visible, if toDate is not specified

var thaaliTblHeaders = {THAALI_MADE_BY:"Thaali <br/> Pakawnaar",MENU:"Menu", INSTRUCTIONS: "Instructions <br/> (If any)", THAALI_STATUS: "Status", THAALI_DATE: "Date", VISIBLE: "Visible <br/> to <br/> Jamaat"};
var userThaaliTblHeaders = {MENU:"Menu", THAALI_STATUS: "Thaali Available for the day", THAALI_DATE: "Thaali <br/> Date", THAALI_CATEGORY: "Category", USER_THAALI_STATUS: "Thaali <br/> Requested"};

var allUserThaaliTblHeaders = {FIRSTNAME:"First <br/> Name", FAMILY_NAME:"Family <br/> Name", LOCATION:"Region"};
var allUserThaaliTblHeadersMobile = {FIRSTNAME:"First <br/> Name", FAMILY_NAME:"Name", LOCATION:"Region"};


var userFeedbackTblHeaders=[{Name:"Creation <br/> Date", Width:"15%"},
                            {Name:"Thaali <br/> date", Width:"15%"}, 
                            {Name:"Menu", Width:"10%"},
                            {Name:"Quality", Width:"10%"}, 
	 						{Name:"Quantity", Width:"10%"},
	 						{Name:"Comments", Width:"20%"}, 
	 						{Name:"First <br/> Name", Width:"10%"}, 
 		 					{Name:"Family <br/> Name", Width:"10%"}];

var userFeedbackTblHeadersMobile=[{Name:"Creation <br/> Date", Width:"15%"},
                                  {Name:"Date", Width:"20%"}, 
                                  {Name:"Menu", Width:"20%"}, 
 		 						  {Name:"Qlty", Width:"10%"}, 
 		 						  {Name:"Qty", Width:"10%"},
 		 						  {Name:"Comments", Width:"30%"},
		 						  {Name:"First <br/> Name", Width:"10%"}, 
		 						  {Name:"Name", Width:"20%"}];


var thaaliCountTblHdr = {THAALI_DATE:"Date",TOTAL_THAALI:"Total", SMALL_THAALI:"Small", MEDIUM_THAALI:"Medium", LARGE_THAALI:"Large", JAMAN_QTY: "Jaman Qty <br/> quarts", RICE_CUPS: "Rice cups <br/> (8oz)"};
var thaaliCountTblHdrMobile = {THAALI_DATE:"Date",TOTAL_THAALI:"Tot", SMALL_THAALI:"Sm", MEDIUM_THAALI:"Med", LARGE_THAALI:"Lg", JAMAN_QTY: "Qty <br/> qts", RICE_CUPS: "Rice cups <br/> (8oz)"};

var miqaatCountTblHdr = {MIQAAT_DATE:"Miqaat Date", MUMINEEN_COUNT:"Mumineen count",APPROX_THAALS:"Approx Thaals", INSTRUCTIONS:"Instructions/ <br/> Guidelines"};
	
var maxRowsAllowedToBeAdded = 60;
var rowLimit = 100; //gets the number of user feedback at one time.
var themeName='fmb';

//User Profile cookie that would be set once login is successful.
var cookieName = "userProfile";

var successMsg = "Successfully updated the Thaali Data.";
var errorMsg = "An error has occurred while updating the Thaali Data. Please try again later.";
var dat_diff_msg = "The difference between from date and to date cannot be more than 7 days.";

//Items that are present on the dashboard.
var userDashboardArr = [["thaaliSignup","thaaliSignup.html"],["userProfile","userProfile.html"],["rotiKhidmat","rotiKhidmat.html"],["submitFeedback","submitFeedback.html"],["notification","notification.html"],["thaaliSchedule","thaaliSchedule.html"],
                        ["listThaaliSignups","listThaaliSignups.html"],["registerNewUser","registerNewUser.html"],["addMenu","addMenu.html"],["thaaliInformation","thaaliSchedule.html"],["viewFeedback","viewFeedback.html"],["thaaliCalendar","thaaliCalendar.html"],
                        ["thaaliCount","thaaliCount.html"],  ["miqaatCount","miqaatCount.html"], ["sendMail","sendFMBMail.html"],["miqaatMail","sendMiqaatMail.html"],["fmbMail","sendFMBMail.html"]];

//Related to the Visible functionality.
var visible_to_users=["Yes","No"];

var defaultCookName = "TBD";
var allowedDiffBetweenDays = 7;

var date_error_msg = "Invalid Date. From Date cannot be greater than To Date.";
var welcomeMessage = "Baad Salam-il Jameel, ";

//Height of the column header.
var columnsHeight= 60;

var mobile_view_screen_size = 992;

var thaaliRequested = "Yes";
var thaaliNotReq = "No";
var requestedButtonTemplate = "success";
var notRequestedButtonTemplate = "warning";
//An array that will hold the date when the user has opted for thaali.
var userThaaliSignupArr = new Array();
var thaaliRequestStateArr = null; //initialized within onLoadThaaliCalendar function

/**
 * A generic method which will do a ajax call depending upon the input params.
 * @param methodType
 * @param reqUrl
 * @param reqData
 * @returns
 */
function handleAjax(methodType,reqUrl,reqData){
	var dataObj = {error:false,jsonData:""};
	 $.ajax({
	    	type: methodType, 	    	
	        contentType: "application/json",
	        dataType:"json",
	        async:false,
	        cache:false,
	         url: reqUrl,
	         data:reqData,
	         success: function(data) {
	           // callback code here
	        	 dataObj.jsonData =  data;
	        	 dataObj.error = data.error;
	          },
	    
	    	error: function (error) {
	    		dataObj.jsonData =  error;
	    		dataObj.error = true;
	    	}
	          
	       });
	 return dataObj;
}


/*********************************************** Login functionality starts **************************************************************/
$('#loginButton').on('click', function () {
   //need to validate the login form.
   //make sure 
	validateLoginForm();
	var isValid = $('#loginForm').valid();
	if(isValid){
		//we need to now submit the form.		
    	var ejamaatId = $('#ejamaatId').val();
    	var password= $('#loginPassword').val();
    	
    	var url = profile_get_service_url+"?ejamaatId="+ejamaatId+"&password="+password;
    	var dataObj = handleAjax("GET",url,""); //since its a get we dont need to pass any data to the ajax call.
    	
    	
    	
    	if(!dataObj.error){
			//Take the user to the dashboard page
    		//$('#loginForm').submit();
    		var userProfile = dataObj.jsonData.dataList[0];
    		userProfile = JSON.stringify(userProfile);
    		//We need to set the user login params in a cookie(ejamaatId and password) before forwarding the user to the dashboard page.

    		// cookies expired in 1 year.
    		/*var expDate = new Date();
    		expDate.setDate(expDate.getDate() + 365);
    		//,{expires: expDate, path: '/', secure:false}*/
    		$.cookie(cookieName,userProfile,{path: '/'});
    		$('#loginForm').submit();
    		
     	}else{
     		//display error popup.
     		 $('#loginErrorCallout').show();
     	}
	}
	return false;
});


validateLoginForm = function(){
	//validating the form using the jquery.validate plugin
	$('#loginForm').validate({
	    rules: {
	    	ejamaatId: {
	            minlength: 8,
	            maxlength: 8,
	            required: true,
	            digits:true
	        },
	        loginPassword: {
	        	maxlength:8,
	            required: true
	        }
	    },
	    
	    highlight: function(element) {
	        $(element).closest('.form-group').removeClass('success').addClass('has-error');
	    },
	    
	    messages: {
	    	ejamaatId: {
	    		minlength: "EJamaat Id must consist of 8 digits",
	    		maxlength: "EJamaat Id must consist of 8 digits",
	    		digits: "EJamaat Id must consist of numbers only.",
	    		required: "Please provide your ITS EJamaat Id."
	    	},
	    	
	    	loginPassword:{
	    		required: "Please provide your password.",
	    		maxlength:"Password cannot be more than 8 characters long."
	    	}    	
		}
	});
}

//This method will remove the cookie that is saved in the session. In short log the user out.
logout = function(){
	//logging out the user.
	$.removeCookie(cookieName,{path: '/'});
	//The above removeCookie method does not work with apache cordova, hence we just change the value of the cookie as null.
	$.cookie(cookieName,null,{path: '/'});
}







/**
 * ******************************** Admin Thaali Functionality starts here    ******************************************   
 * 
 * */

/** 
 *  This method would be invoked onbodyload of the Admin Page. The below method is responsible for getting the data from a RESTful service passing the eJamaatId, password, fromDate and toDate param's.
 *  This method would populate the Thaali Data table so that the Super Admin can make changes to it.
 *  
 **/
onLoadThaaliSchedule = function () {
	        var updatedRecords = {}; //Array that would hold the rowIndex of the records that needs to be sent to the server.
	        
			var offset = $("#jqxAdminThaaliDataGrid").offset();
		    //Initializing a popup window, we would need this to display any success/error messages.
    		$("#thaaliScheduleMsgPopup").jqxWindow({ width: 500, height: 100 ,  autoOpen:false, theme:themeName});
    			        
	        //get the service url
		    var currentDate = new Date();
		    var toDate =  new Date();
		    var yesterday = new Date();
		    var initialRowsLoadedFromDatabase = -1;
		    
		    yesterday.setDate(yesterday.getDate() - 1);
		    toDate.setDate(toDate.getDate() + num_of_days_to_Advance);
            var url = createAdminThaaliDataGetUrl(currentDate, toDate);

            
            
            //source for getting the cook name
            var cooknameUrl = get_cookname_url+"?ejamaatId="+getEjamaatId()+"&password="+getPassword();            
        	var dataObj = handleAjax("GET",cooknameUrl,""); //since its a get we dont need to pass any data to the ajax call.        	
        	var cookNameArr =  dataObj.jsonData.dataList; //get the list of cooks.
        	var cooks = new Array();
        	
    		for(var i=0;i<cookNameArr.length;i++){
    			var cookObj = cookNameArr[i];
    			cooks.push(cookObj.cookName);
    		}
    		
    		
    		//source for getting the menu name
            var menuUrl = get_menu_service_url+"?ejamaatId="+getEjamaatId()+"&password="+getPassword();            
        	var dataObj = handleAjax("GET",menuUrl,""); //since its a get we dont need to pass any data to the ajax call.        	
        	var menuArr =  dataObj.jsonData.dataList; //get the list of cooks.
        	var menus = new Array();
        	
    		for(var i=0;i<menuArr.length;i++){
    			var menuObj = menuArr[i];
    			menus.push(menuObj.menu);
    		}
        	
            /*var cooknameSource = {
                    datatype: "json",
                    datafields: [
                        { name: 'cookName', type: 'string' },
                    ],
                    url: cooknameUrl
            };
            var cookAdapter = new $.jqx.dataAdapter(cooknameSource);
            
            //source for getting the menu
            var menuUrl = get_menu_service_url+"?ejamaatId="+getEjamaatId()+"&password="+getPassword();
            var menuSource = {
                    datatype: "json",
                    datafields: [
                        { name: 'menu', type: 'string' },
                    ],
                    url: menuUrl
            };
            var menuAdapter = new $.jqx.dataAdapter(menuSource);
            */
            
            // prepare the data
            var source =
            {
                //json/xml doesn't matter
                datatype: "json",
                datafields: [
                    { name: 'cookName', type: 'string' },
                    { name: 'menu', type: 'string' },
                    { name: 'instructions', type: 'string' },
                    { name: 'status', type: 'string' },
                    { name: 'thaaliDateEntered', type: 'date', format: 'yyyy-MM-dd'},
                    {name: 'adminName', type:'string'},
                    { name: 'visible', type: 'bool' }
                    
                ],
                url: url,  
                sortcolumn: 'thaaliDateEntered',
                sortdirection: 'asc'
            };
            
            
            
            var dataAdapter = new $.jqx.dataAdapter(source,{
            	loadError: function(jqXHR, status, error){
            		$("#thaaliScheduleMsgContent").html(server_error_msg);
                	$("#thaaliScheduleMsgPopup").jqxWindow('open');
            	},
            	//This method will get invoked when the data is returned from the server.
            	downloadComplete: function (edata, textStatus, jqXHR){
            		if(edata.error == true){
            			//An error has occurred.
            			$("#thaaliScheduleMsgContent").html(server_error_msg + edata.message);
                    	$("#thaaliScheduleMsgPopup").jqxWindow('open');
            		}
            	},
            	
            	beforeLoadComplete: function (records){
            		var data = new Array();
            		if(records != null && records.length > 0){
                		for (var i = 0; i < records.length; i++) {
                			var record = records[i]; 
                			var visible = record.visible;
                			if(visible != null){
                				//This is done to show user a more use friendly message to the user.
                    			if(visible == true){
                    				//means thaali is present
                    				record.visible = "Yes";
                    			}else{
                    				record.visible = "No";
                    			}
                    			                    			
                    			data.push(record);
                			}
                		}
            		}
            		return data;
            	}            	
            });
            
            
            //Need to align the column heading  in the center
            var columnsrenderer = function (value) {
            	return '<div style="text-align: center; margin-top: 5px;">' + value + '</div>';
            }
                       
                      
            $("#jqxAdminThaaliDataGrid").jqxGrid(
            {	
            	theme: themeName,
            	autorowheight:true,
            	altrows: true,
            	width: '100%',
                height: getHeight(),
                source: dataAdapter,
                pageable: true,
                rowsheight: 40,
                columnsheight: columnsHeight,
                columnsresize:true,  
                pagesize: getPageSize(),
                editable: true,
                columns: [
                    { text: thaaliTblHeaders.THAALI_DATE, datafield: 'thaaliDateEntered', renderer: columnsrenderer, cellsalign: 'center', editable: false, cellsformat: 'D',
                    	width: (function(){
                        	if(isMobileView()){
                        		return '30%';
                        	}
                        	return '20%';
                        })()
                    },                    
                    { text: thaaliTblHeaders.MENU, datafield: 'menu', renderer: columnsrenderer, cellsalign: 'center', columntype: 'combobox',
                        createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                            // assign a new data source to the combobox.
                            editor.jqxComboBox({theme:themeName, source:menus,displayMember: "menu", valueMember: "menu", autoDropDownHeight: true, promptText: "Please Choose a Menu or Enter one:", enableBrowserBoundsDetection:true });
                            editor.jqxComboBox('selectItem',cellvalue);
                        },
                        // update the editor's value before saving it.
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            // return the old value, if the new value is empty.
                            if (newvalue == "") return oldvalue;
                        },
                        width: (function(){
                        	if(isMobileView()){
                        		return '50%';
                        	}
                        	return '20%';
                        })()
                        
                    },
                    { text: thaaliTblHeaders.THAALI_MADE_BY, datafield: 'cookName', renderer: columnsrenderer,  cellsalign: 'center', width: '15%', columntype: 'combobox', 
                        createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                            // assign a new data source to the combobox.
                            editor.jqxComboBox({theme:themeName, source:cooks,displayMember: "cookName", valueMember: "cookName", autoDropDownHeight: true, promptText: "Please Choose a Thaali Pakawanaar or Enter one:", enableBrowserBoundsDetection:true});
                            editor.jqxComboBox('selectItem',cellvalue);
                        },
                        // update the editor's value before saving it.
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            // return the old value, if the new value is empty.
                            if (newvalue == "") return oldvalue;
                        },
                        
                        //hide the column for mobile views.
                        hidden: isMobileView()
                        
                        
                    },                    
                    { text: thaaliTblHeaders.THAALI_STATUS, datafield: 'status', renderer: columnsrenderer, cellsalign: 'center',  width: '15%', columntype: 'dropdownlist',
                        createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                            // assign a new data source to the dropdownlist.
                            var list = allowed_thaali_status;
                            editor.jqxDropDownList({ theme:themeName, autoDropDownHeight: true, source: list,autoOpen:true,enableBrowserBoundsDetection:true });
                        },
                        // update the editor's value before saving it.
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            // return the old value, if the new value is empty.
                            if (newvalue == "") return oldvalue;
                        },
                        
                        //hide the column for mobile views.
                        hidden: isMobileView()
                    },                    
                    { text: thaaliTblHeaders.VISIBLE, datafield: 'visible', renderer: columnsrenderer, cellsalign: 'center', columntype: 'dropdownlist',
                        createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                            // assign a new data source to the dropdownlist.
                            var list = visible_to_users;
                            editor.jqxDropDownList({ theme:themeName, autoDropDownHeight: true, source: list,autoOpen:true,enableBrowserBoundsDetection:true });
                        },
                        // update the editor's value before saving it.
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            // return the old value, if the new value is empty.
                            if (newvalue == "") return oldvalue;
                        },
                        width: (function(){
                        	if(isMobileView()){
                        		return '20%';
                        	}
                        	return '10%';
                        })()
                    },
                    { text:  thaaliTblHeaders.INSTRUCTIONS, datafield: 'instructions', renderer: columnsrenderer, cellsalign: 'center',  width: '20%',hidden: isMobileView() }
                ]
            });
            
          
           
            
            //Defining the fromDate field
            //$("#fromDate").jqxDateTimeInput({width: '250px', height: '25px', formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
            
            //Defining the toDate field
            //$("#toDate").jqxDateTimeInput({width: '250px', height: '25px', value: toDate, formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
            
          //From date
            $("#fromDate").datepicker({"format": "mm/dd/yyyy"});
            $("#fromDate").attr("value",getFormattedDate(new Date()));
         	 
            //To date
            $("#toDate").datepicker({"format": "mm/dd/yyyy"});   
            $("#toDate").attr("value",getFormattedDate(toDate));

            $('#fromDate').datepicker()
           	.on('changeDate', function(e){
           		//hide the datepicker
           		$("#fromDate").datepicker('hide');
            });
           
            $('#toDate').datepicker()
          	.on('changeDate', function(e){
          		//hide the datepicker
          		$("#toDate").datepicker('hide');
            });
            
            //Defining a custom validator for the date field's
            $('#adminDateFieldForm').jqxValidator({
            	hintType: 'label',
            	onSuccess: function () {
            		//var fromDate = $('#fromDate').jqxDateTimeInput('value');
                    //var toDate = $('#toDate').jqxDateTimeInput('value');
            		
            		 var fromDate = new Date($('#fromDate').val());           
                     var toDate = new Date($('#toDate').val());
                     
                	//On success we need to refresh the thaali data.
            		source.url =  createAdminThaaliDataGetUrl(fromDate, toDate);
                    $("#jqxAdminThaaliDataGrid").jqxGrid('updatebounddata');
            		
            	},
            	rules: [            
                { 
                	input: '#fromDate', message: 'Invalid Date. From Date cannot be greater than To Date.', action: 'valuechanged', rule:  function (input, commit){
                    //var fromDate = $('#fromDate').jqxDateTimeInput('value');
                    //var toDate = $('#toDate').jqxDateTimeInput('value');
                	var fromDate = new Date($('#fromDate').val());           
                    var toDate = new Date($('#toDate').val());
                    
                    if(fromDate != null && toDate != null){
                    	if(fromDate.getTime() > toDate.getTime()){
                    		return false;
                    	}
                    }else{
                    	return false;
                    }
                    return true;            	
                } 
                },                                   
                
                { input: '#toDate', message: 'Invalid Date. To Date cannot be smaller than From Date.', action: 'valuechanged', rule:  function (input, commit){
                    //var fromDate = $('#fromDate').jqxDateTimeInput('value');
                    //var toDate = $('#toDate').jqxDateTimeInput('value');
                	var fromDate = new Date($('#fromDate').val());           
                    var toDate = new Date($('#toDate').val());
                    
                    if(fromDate != null && toDate != null){
                    	if(fromDate.getTime() > toDate.getTime()){
                    		return false;
                    	}
                    }else{
                    	return false;
                    }
                    return true;            	
                }  
                }]                            
            });
            
            //We would need to validate the form (one with fromDate and toDate, before refreshing data from the server)
            $('#refreshAdminDataButton').on('click', function () {
                $('#adminDateFieldForm').jqxValidator('validate');                                
            });

            /************* Add ROW Functionality starts ************************************************/
            
            var generateRow  = function(dateObj){
            	var row = {};
            	var newDate = new Date();
            	newDate.setTime(dateObj.getTime());
            	row["cookName"] = defaultCookName;
            	row["menu"] = "TBD";
            	row["instructions"] = ""; //Nothing by default
            	row["status"] = allowed_thaali_status[0]; //THAALI_PRESENT by default
            	row["thaaliDateEntered"] = newDate;
            	row["visible"] = "No";
            	//For new rows adding the user name
            	row["adminName"] = getFirstName();
            	row["type"] = "new"; //identifier to denote that this is a new row added.
            	
            	
            	return row;
            	
            }
            
            $('#addrowbutton').click(function () {
            	
            	//Need to place the window close to the Add Row button.
            	var x = $("#addrowbutton").position().left + 60;
            	var y = $("#addrowbutton").position().top - 150;
            	
            	var rowData = $('#jqxAdminThaaliDataGrid').jqxGrid('getdisplayrows');
            	var maxDate = new Date(); //current date
            	if(rowData != null && rowData.length > 0){
            		var row = rowData[rowData.length - 1]; //Need the last row;                	
                	maxDate.setTime(row.thaaliDateEntered.getTime());
                	maxDate.setDate(row.thaaliDateEntered.getDate()+1);//advancing it by one day.
            	}            	
            	
            	var minDate = new Date();
            	minDate.setTime(maxDate.getTime());
            	
            	

            	$("#newFromDate").jqxDateTimeInput({width: '250px', height: '25px', min:minDate, value: maxDate, formatString: "dddd, MMMM dd, yyyy"});
            	$("#numOfDays").jqxNumberInput({ width: '250px', height: '25px', digits: 3, decimalDigits: 0, inputMode: 'simple'});
            	$('#numOfDays').jqxNumberInput('val', 1);//setting the default value to 1.
            	$("#numOfDays").jqxNumberInput({ min:1, max: maxRowsAllowedToBeAdded });
            	$("#addRowsWindow").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60},  theme:themeName, height: 250 });
                $('#addRowsWindow').jqxWindow('open');
            });
            
            //We would need to validate the addRow form when the user clicks on Add Rows.
            $('#submitRowButton').on('click', function () {
                $('#addRowsForm').jqxValidator('validate');                                
            });
            
			
			//Defining the window/popup for the Add Row;s functionality.
            $("#addRowsWindow").jqxWindow({width: 450, height: 150, autoOpen:false});
            
            //Defining the validator that will be used for validating the Add Row form.
            $('#addRowsForm').jqxValidator({
            	hintType: 'label',
            	//If the validation is successful we need to insert rows to the existing table.
            	onSuccess: function () {
            		$('#addRowsWindow').jqxWindow('close');
            		//We need to get the count of rows before adding new row to the grid. It will be useful to know how many rows were loaded from the DB initially.
            		if(initialRowsLoadedFromDatabase < 0){
            			//Getting the num of rows only once.
            			initialRowsLoadedFromDatabase = $("#jqxAdminThaaliDataGrid").jqxGrid('getdatainformation').rowscount;            			
            		} 
            			
            		var startDate = $('#newFromDate').jqxDateTimeInput('getDate');
            		var numOfDays = $("#numOfDays").jqxNumberInput('val');
            		
            		 $("#jqxAdminThaaliDataGrid").jqxGrid('beginupdate');
                     for (var i = 0; i < numOfDays; i++) {
                    	 //var dateStr = getFormattedDate(startDate);                    	 
                         var datarow = generateRow(startDate);                          
                         $("#jqxAdminThaaliDataGrid").jqxGrid('addrow', null, datarow);
                         startDate.setDate(startDate.getDate() + 1);
                     }
                     $("#jqxAdminThaaliDataGrid").jqxGrid('endupdate');
            		
                    
            		
            	},
            	rules: [            
                { 
                	input: '#newFromDate', message: 'Date cannot be left blank or less than max date', action: 'valuechanged', rule:  function (input, commit){
                    var fromDate = $('#newFromDate').jqxDateTimeInput('value');
                                        
                    if(fromDate != null ){
                    	if(fromDate.getTime() < yesterday.getTime()){
                    		return false;
                    	}
                    }else{
                    	return false;
                    }
                    return true;            	
                   }
                },
                {
                	input: '#numOfDays', message: 'Num of Days has to be greater than 1 and less than '+maxRowsAllowedToBeAdded, action: 'valuechanged', rule: function(input, commit){
                		
                		var numOfDays = $("#numOfDays").jqxNumberInput('val');
                		if(numOfDays < 1 || numOfDays > maxRowsAllowedToBeAdded){
                			return false;                			
                		}else{
                			return true;
                		}
                	}
                }
                ]
            });
            
            /************* Add Row functionality ends **************************/
            
            
            /** Delete row functionality starts **********************/
            
            // delete row.
            $("#deleterowbutton").on('click', function () {            	
            	// @param row index.
            	var data = $('#jqxAdminThaaliDataGrid').jqxGrid('getrowdata');
                var selectedrowindexArr = $("#jqxAdminThaaliDataGrid").jqxGrid('getselectedrowindexes');
                if(selectedrowindexArr != null && selectedrowindexArr.length > 0){
                	if(initialRowsLoadedFromDatabase < 0){
                		//Means no rows have been added till now. This means user is trying to delete a row that is coming from the DB, this is not allowed.
                		$("#thaaliScheduleMsgContent").html(on_delete_error_msg);
                    	$("#thaaliScheduleMsgPopup").jqxWindow('open');
                	}else{                		
                		for(var i=0;i<selectedrowindexArr.length;i++){
                        	var selectedrowindex = selectedrowindexArr[i];
                        	if(selectedrowindex >= initialRowsLoadedFromDatabase){ // we are doing >= because array index is from 0 and row count would return the length.
                        		 var rowscount = $("#jqxAdminThaaliDataGrid").jqxGrid('getdatainformation').rowscount;
                        		 var id = $("#jqxAdminThaaliDataGrid").jqxGrid('getrowid', selectedrowindex);
                                 var commit = $("#jqxAdminThaaliDataGrid").jqxGrid('deleterow', id);
                        	}else{
                        		//Means user is trying to delete a row which was loaded earlier from db.
                        		$("#thaaliScheduleMsgContent").html(on_delete_error_msg);
                            	$("#thaaliScheduleMsgPopup").jqxWindow('open');
                        		break;
                        	}
                        	
                        }
                	}
                	
                }else{
                	$("#thaaliScheduleMsgContent").html("Please select a row first in order to remove it.");
                	$("#thaaliScheduleMsgPopup").jqxWindow('open');
                }     
            });
            
            /**************** Delete row functionality ends **************************************************/
            
            //This method is invoked whenever the admin tries to modify a particular row. 
            $("#jqxAdminThaaliDataGrid").bind('cellendedit', function (event) {		
            	var args = event.args;
                var columnDataField = args.datafield;
                var rowIndex = args.rowindex;
                var cellValue = args.value;
                var oldValue = args.oldvalue;
                
                if(oldValue != cellValue){
                	//Means the cell has been updated with new data..
                	updatedRecords[rowIndex] = true;
                }
               

             });
            
            /************ Insert in DB *******************************************/
            
            
            
            $("#submitAdminDataButton").on('click', function () {
            	var rowscount = $("#jqxAdminThaaliDataGrid").jqxGrid('getdatainformation').rowscount;            	
            	if(rowscount > 0){
            		//Updating DB only when there is something to update.
            		var url=admin_thaali_update_service_url;
            		var jsonData = new Object(); 
            		var rows = $('#jqxAdminThaaliDataGrid').jqxGrid('getrows');
            		//Populating the json object..
            		var mRowArr =  new Array();
            		jsonData.eJamaatId = getEjamaatId();
            		jsonData.password = getPassword();
            		
            		for(var i=0;i<rows.length;i++){
            			var mRow = new Object();
            			if(updatedRecords[i] == true || rows[i]["type"] == "new"){
            				//This means that either the contents of the row has been updated by the admin or its a new row and only then we need to save this in the db...
            				mRow.cookName = rows[i].cookName;
                			mRow.menu = rows[i].menu;
                			mRow.instructions = rows[i].instructions;
                			mRow.status = rows[i].status;
                			if(rows[i].visible == "Yes"){
                				mRow.visible = true;
                			}else{
                				mRow.visible = false;
                			}

                			mRow.adminName = rows[i].adminName;
                			var dateObj = rows[i].thaaliDateEntered;
                			mRow.thaaliDateEntered = getFormattedDate(dateObj); //we need to convert the format of date to a suitable format understood by the server.
                			mRowArr.push(mRow);
            			}
            			
            		}
            		jsonData.dataList = mRowArr;
            		jsonData = JSON.stringify(jsonData);//we"ll have to stringify the object before sending it over the wire.
            		$.ajax({
            			url:url,
            			dataType:'json',
            			data: jsonData,
            			contentType: "application/json",
            			type:'POST',
            			success:function(){
            				
            				$("#thaaliScheduleMsgContent").html(successMsg);
                        	$("#thaaliScheduleMsgPopup").jqxWindow('open');
                        	updatedRecords = {}; //Lets reset the state of the updated records.
            			},
            			error: function(){
            				$("#thaaliScheduleMsgContent").html(errorMsg);
                        	$("#thaaliScheduleMsgPopup").jqxWindow('open');
            			}
            			
            		});
            	}

            });
}


/***********************         User Thaali Signup Functionality starts                   ********************************/

/**
 * This method would be invoked by the onload method on the user thaali page.
 * @deprecated - see onLoadThaaliCalendar
 */
onLoadUserThaaliView = function(){
	
	var updatedRecords = {'updated':false}; //Array that would hold the records that needs to be sent to the server.
	
	
	 //Initializing a popup window, we would need this to display any success/error messages.
	$("#thaaliViewMsgPopup").jqxWindow({ width: '20%', height: '10%' , autoOpen:false, theme:themeName});
	
    //Will have to check the isError attribute on the response object returned before proceeding any further.
    
    //get the service url
    var currentDate = new Date();
    var toDate =  new Date();
    var yesterday = new Date();
    var initialRowsLoadedFromDatabase = -1;
    
    yesterday.setDate(yesterday.getDate() - 1);
    toDate.setDate(toDate.getDate() + num_of_days_to_Advance);
    
    // prepare the data
    var source =
    {
        //json/xml doesn't matter
        datatype: "json",
        datafields: [
            { name: 'menu', type: 'string' },         
            { name: 'thaaliDate', type: 'date', format: 'yyyy-MM-dd'},    
            { name: 'userThaaliStatus', type:'string'},
            { name: 'thaaliStatus', type: 'string' },
            { name: 'userThaaliCategory', type: 'string' },
            { name: 'locked', type: 'bool' },
            { name: 'thaaliInstructions', type: 'string' }            
        ],
        url: createUserThaaliDataGetUrl(currentDate, toDate),  
        sortcolumn: 'thaaliDate',
        sortdirection: 'asc'
    };
    
    
    /**
     * Method that will provide the Data Adapter to be used for screen sizes >= 992 (anything but mobile)
     * @param source
     * @returns {$.jqx.dataAdapter}
     */
    getDataAdapter = function(source){
    	var dataAdapter = new $.jqx.dataAdapter(source,{
        	loadError: function(jqXHR, status, error){
        		display(server_error_msg);
        	},
        	//This method will get invoked when the data is returned from the server.
        	downloadComplete: function (edata, textStatus, jqXHR){
        		if(edata.error == true){
        			//An error has occurred.
        			display(server_error_msg);        			
        		}
        	},
        	beforeLoadComplete: function (records){
        		var data = new Array();
        		if(records != null && records.length > 0){
               		for (var i = 0; i < records.length; i++) {
            			var record = records[i]; 
            			var status = record.thaaliStatus;            			
            			var userStatus = record.userThaaliStatus;
            			
            			if(status != null){
                			//This is done to show user a more use friendly thaali status rather than showing
                			for(var mapCnt=0;mapCnt<thaaliStatusMap.length;mapCnt++){
                				if(thaaliStatusMap[mapCnt].serverName == userStatus){
                					record.userThaaliStatusUI = thaaliStatusMap[mapCnt].displayName;
                				}
                				if(thaaliStatusMap[mapCnt].serverName == status){
                    				record.thaaliStatusUI = thaaliStatusMap[mapCnt].displayName;
                    			}
                			}
                			                			               			
                			if(record.thaaliStatusUI == "No" ){
                				//This is done when there is no thaali present for a particular day. in that case user's thaali request should be automatically marked as No.
                				record.userThaaliStatusUI = "No";
                			}                			
                			data.push(record);
            			}
            		}
        		}
         		return data;
        	}        	
        	
        });
    	return dataAdapter;
    };
    
    
    
    
    //Need to align the column heading  in the center
    var columnsrenderer = function (value) {
    	return '<div style="text-align: center; margin-top: 5px;">' + value + '</div>';
    }
    
    
    determineColumnType = function(){
    	var rowData  = $("#jqxUserThaaliDataGrid").jqxGrid('getrowdata', row);        
        var thaaliNotAvailable = false;
        var isLocked = rowData.locked;
    };
    /**
     * Method that will get the number of columns that would be displayed on the screen.
     * @returns {Array}
     */
    getColumns = function(){  		
    	var columnArr = null;

		var cellWidth = '25%'; //default for a 4 column layout
		if(isMobileView()){
			cellWidth = 100/3 + '%';
		}
		
		columnArr = [
		 { text: userThaaliTblHeaders.THAALI_DATE, datafield: 'thaaliDate', renderer: columnsrenderer, cellsalign: 'center', editable: false, cellsformat: 'D',
			 width: (function(){
                 if(isMobileView()){
                         return '30%';
                 }
                 return cellWidth;
         })()},         
         { text: userThaaliTblHeaders.MENU, datafield: 'menu', renderer: columnsrenderer, cellsalign: 'center', editable: false,
        	 width: (function(){
                 if(isMobileView()){
                         return '35%';
                 }
                 return cellWidth;
         })()},                    
         { text: userThaaliTblHeaders.USER_THAALI_STATUS, datafield: 'userThaaliStatusUI', renderer: columnsrenderer, cellsalign: 'center', columntype: 'dropdownlist',
        	 width: (function(){
                 if(isMobileView()){
                         return '35%';
                 }
                 return cellWidth;
        	 })(),
         	cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
         		// condition follows
         		var rowData  = $("#jqxUserThaaliDataGrid").jqxGrid('getrowdata', row);        
                var thaaliNotAvailable = false;
                var isLocked = rowData.locked;
                
                if(rowData.thaaliStatusUI == "No"){
                	 //In case if Thaali is not present for the day, we still need to disable the said columns and also thaali requested field should be automatically marked as NO.            
                	thaaliNotAvailable = true;                    	
                }                 		
        		if(isLocked == true || thaaliNotAvailable == true){
        			var id = "statusToolTip"+row;
        			var cell = '<div id="'+id+'">'+defaulthtml+'</div>';                   		    
        			return cell;
        		}
         		return defaulthtml;
             },             	
             createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {                	
                 // assign a new data source to the dropdownlist.
            	 var list = [];
            	 for(var i=0;i<thaaliStatusMap.length;i++){
            		 if(thaaliStatusMap[i].status == "user_status"){
            			 list.push(thaaliStatusMap[i].displayName);
            		 }            		  
            	 }
                 
                 editor.jqxDropDownList({theme:themeName,autoDropDownHeight: true, source: list,autoOpen:true,enableBrowserBoundsDetection:true });				 
			},
             // update the editor's value before saving it.
             cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                 // return the old value, if the new value is empty.
            	 //$("#jqxUserThaaliDataGrid").jqxGrid('selectrow', row);
                 if (newvalue == "") return oldvalue;
             }
         },
         { text: userThaaliTblHeaders.THAALI_CATEGORY, datafield: 'userThaaliCategory', renderer: columnsrenderer, cellsalign: 'center',   width: cellWidth, columntype: 'dropdownlist',
         	cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
         		var rowData  = $("#jqxUserThaaliDataGrid").jqxGrid('getrowdata', row);        
                var thaaliNotAvailable = false;
                var isLocked = rowData.locked;

                if(rowData.thaaliStatusUI == "No"){
                	 //In case if Thaali is not present for the day, we still need to disable the said columns and also thaali requested field should be automatically marked as NO.            
                	thaaliNotAvailable = true;                    	
                }
                
        		if(isLocked == true || thaaliNotAvailable == true){            			
        			var id = "thaaliCategoryToolTip"+row;
           		    var cell = '<div id="'+id+'">'+defaulthtml+'</div>';
           		    return cell;
        		}         		
         		return defaulthtml;                    
             },
             
             createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                 // assign a new data source to the dropdownlist.
                 var list = user_thaali_category;
                 editor.jqxDropDownList({ theme:themeName,autoDropDownHeight: true, source: list,autoOpen:true,enableBrowserBoundsDetection:true});
             },
             // update the editor's value before saving it.
             cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                 // return the old value, if the new value is empty.
                 if (newvalue == "") return oldvalue;
             },
             
             //hide the column for mobile views.
             hidden: isMobileView()
         },
         { text: '', datafield: 'locked', editable: false , hidden:true},
         { text: '', datafield: 'thaaliInstructions', editable: false , hidden:true}             
     ]
	
    	return columnArr;
    }
    
    
           
    $("#jqxUserThaaliDataGrid").jqxGrid(
    {	
    	source: getDataAdapter(source),
    	theme: themeName,
    	altrows: true,
    	width: '100%',
        height: getHeight(),
        pageable: true,
        rowsheight: 40,
        columnsresize:false,
        columnsheight: columnsHeight,
        editable: true,
        autorowheight:true,
        pagesize: getPageSize(),      
        columns: getColumns()
    });
    
    //TODO check if cellclick pevent precedes cellbeginedit event. also if bind event doesn't work try "bind"
    $("#jqxUserThaaliDataGrid").on("cellclick", function (event) 
	{
	    var currentRow = event.args.rowindex;
		var column = event.args.datafield;
		//Check if the column being edited is the userThaaliStatusUI column and check if the row has been selected or not..
		if(isMobileView() && column == "userThaaliStatusUI"){
			var selectedRowIndex = $('#jqxUserThaaliDataGrid').jqxGrid('getselectedrowindex');
			if(selectedRowIndex < 0 || currentRow != selectedRowIndex){
				//Means row is not selected we need to select it for the first time.
				//Remember this is done since there is an issue in iPhone 5,6, iPad etc where the user status dropdown was acting very strange. It would open and 
				//close instantly and wouldn't let the user make any selection. The only fix for this was to select the row before clicking on the dropdownlist.
				$("#jqxUserThaaliDataGrid").jqxGrid('selectrow', currentRow);				
			}
		}
	});
		
    
        
    //This method would make sure we dont let the user edit any fields if the Thaali Data is frozen for that day.
    $("#jqxUserThaaliDataGrid").bind('cellbeginedit', function (event) {		
    	var rowData =  $("#jqxUserThaaliDataGrid").jqxGrid('getrowdata', args.rowindex);
    	var isLocked = rowData.locked;
        var column = args.datafield;
        var row = args.rowindex;
        var value = args.value;
        var msg = msg_on_thaali_frozen;        
        var showMessage= false;
		
        
        //Check if user had already signed up for the thaali or not, 
        //if the user has already signed up and isLocked is true then he/she should be given an option to modify or cancel.
        //If not signed up earlier show message and no modifications should be allowed...
         
        if(rowData.thaaliStatusUI == "No"){
        	msg = rowData.thaaliInstructions;        	 //In case if Thaali is not present for the day, we still need to disable the said columns and also thaali requested field should be automatically marked as NO.            
        	showMessage = true;
        }
        
        if(isLocked == true){
        	if(rowData.userThaaliStatusUI == "No"){
        		//Means the thaali date has been frozen...no more modifications allowed at this time.
            	showMessage = true; 
        	}else{
        		//What if the date has been passed, this means user cannot update the record anymore.
        		// make sure the thaali date is a future date and not a past date.
        		var today = new Date();
        		//reset todays date
        		today.setHours(0);
        		today.setMinutes(0);
        		today.setSeconds(0);
        		today.setMilliseconds(0);

        		if(rowData.thaaliDate < today){
        			msg = "Thaali Date has already been passed. No more changes are allowed.";
        			showMessage = true;
        		}
        	}        	       
        }
        
        if(showMessage){
    		$("#jqxUserThaaliDataGrid").jqxGrid('endcelledit', row, column, true);
    		 if(column ==  "userThaaliStatusUI"){            	 
        		 var id = "#statusToolTip"+row;            	 
            	 $(id).jqxTooltip({position:'top', content: msg, theme: themeName });
            	
             }
             else if(column == "userThaaliCategory"){
            	 var id = "#thaaliCategoryToolTip"+row;
            	 $(id).jqxTooltip({position:'top', content: msg, theme: themeName });
             }
        }else{
        	//Means everything is fine, user is allowed to modify the data.
        	// update the index of dirty records to be sent to server for updation.
        	updatedRecords[row] = row;
        	updatedRecords['updated'] = true
        }
     });
    
   
    
    //Defining the fromDate field
    $("#fromDate").jqxDateTimeInput({width: '250px', height: '25px', formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
    
    //Defining the toDate field
    $("#toDate").jqxDateTimeInput({width: '250px', height: '25px', value: toDate, formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
    
    //Defining a custom validator for the date field's
    $('#userDateFieldForm').jqxValidator({
    	hintType: 'label',
    	onSuccess: function () {
    		//var fromDate = $('#fromDate').jqxDateTimeInput('value');
    		currentDate = $('#fromDate').jqxDateTimeInput('value');
            toDate = $('#toDate').jqxDateTimeInput('value');
        	//On success we need to refresh the thaali data.
            source.url = createUserThaaliDataGetUrl(currentDate, toDate);            
            $("#jqxUserThaaliDataGrid").jqxGrid('updatebounddata');
           
    		
    	},
    	rules: [            
        { 
        	input: '#fromDate', message: 'Invalid Date. From Date cannot be greater than To Date.', action: 'valuechanged', rule:  function (input, commit){
            var fromDate = $('#fromDate').jqxDateTimeInput('value');
            var toDate = $('#toDate').jqxDateTimeInput('value');
            
            if(fromDate != null && toDate != null){
            	if(fromDate.getTime() > toDate.getTime()){
            		return false;
            	}
            }else{
            	return false;
            }
            return true;            	
        } 
        },                                   
        
        { input: '#toDate', message: 'Invalid Date. To Date cannot be smaller than From Date.', action: 'valuechanged', rule:  function (input, commit){
            var fromDate = $('#fromDate').jqxDateTimeInput('value');
            var toDate = $('#toDate').jqxDateTimeInput('value');
            
            if(fromDate != null && toDate != null){
            	if(fromDate.getTime() > toDate.getTime()){
            		return false;
            	}
            }else{
            	return false;
            }
            return true;            	
        }  
        }]                            
    });
    
    //We would need to validate the form (one with fromDate and toDate, before refreshing data from the server)
    $('#refreshUserDataButton').on('click', function () {
        $('#userDateFieldForm').jqxValidator('validate');                                
    });

    
    
	
	
    
    /************ Insert in DB *******************************************/
    
    $("#submitUserDataButton").on('click', function () {    	
    	var rowscount = $("#jqxUserThaaliDataGrid").jqxGrid('getdatainformation').rowscount;         	
    	if(rowscount > 0 && updatedRecords['updated']){
    		//Updating DB only when there is something to update.
    		var url=user_thaali_update_service_url;
    		var jsonData = new Object(); 
    		//Rows retrriedved from the grid.
    		var rows = $('#jqxUserThaaliDataGrid').jqxGrid('getrows');
    		//Populating the json object..
    		var mRowArr =  new Array();
    		jsonData.eJamaatId = getEjamaatId();
    		jsonData.password = getPassword();
    		
    		for(var i=0;i<rows.length;i++){
    			
    			if(updatedRecords[i] == i){
    				//Means record is dirty we need to update the server.
    				
    				var record = rows[i];
        			//Creating a new user thaali data object.
        			var userRecord = new Object();    			
        			
        			//This is done to show user a more use friendly thaali status rather than showing
        			var mUserThaaliStatus = record.userThaaliStatusUI; //Thaali Status that might have been modified by the User
        			
        			
        			//This is done to show user a more use friendly thaali status rather than showing
        			for(var mapCnt=0;mapCnt<thaaliStatusMap.length;mapCnt++){
        				if(thaaliStatusMap[mapCnt].status == "user_status" && thaaliStatusMap[mapCnt].displayName == mUserThaaliStatus){
        					userRecord.userThaaliStatus = thaaliStatusMap[mapCnt].serverName;
        				}    				
        			}    			
        			    			
        			userRecord.thaaliDate = record.thaaliDate;
        			userRecord.thaaliCategory = record.userThaaliCategory;    			
        			userRecord.userThaaliDate = getFormattedDate(record.thaaliDate); //formatting the date before sending it out..    			
        			mRowArr.push(userRecord);
    			}

    		}
    		jsonData.dataList = mRowArr;
    		jsonData = JSON.stringify(jsonData);//we"ll have to stringify the object before sending it over the wire.
    		$.ajax({
    			url:url,
    			dataType:'json',
    			data: jsonData,
    			contentType: "application/json",
    			type:'POST',
    			success:function(){
    				display(successMsg);
    			},
    			error: function(){
    				display(errorMsg);    				
    			}
    		});
    	}
    	updatedRecords = {'updated':false}; //reset it to blank once everything is updated in the database.
    });
	
}




/****************************** Thaali Count functionality starts here *************************************************************************/

onLoadThaaliCount = function(){ 

	var gridName = "#jqxThaaliCountGrid";
	var num_of_days_to_Advance = 30; //user thaali count 
	 //Initializing a popup window, we would need this to display any success/error messages.
	$("#thaaliCountMsgPopup").jqxWindow({ width: 500, height: 100 , autoOpen:false, theme:themeName});
	
   //Will have to check the isError attribute on the response object returned before proceeding any further.
   
   //get the service url
   var currentDate = new Date();
   var toDate =  new Date();
   var yesterday = new Date();	
   var initialRowsLoadedFromDatabase = -1; 
   
   yesterday.setDate(yesterday.getDate() - 1);
   toDate.setDate(toDate.getDate() + num_of_days_to_Advance);
   
   //From date
   $("#fromDate").datepicker({"format": "mm/dd/yyyy"});
   $("#fromDate").attr("value",getFormattedDate(new Date()));
	 
   //To date
   $("#toDate").datepicker({"format": "mm/dd/yyyy"});   
   $("#toDate").attr("value",getFormattedDate(toDate));

   $('#fromDate').datepicker()
  	.on('changeDate', function(e){
  		//hide the datepicker
  		$("#fromDate").datepicker('hide');
   });
  
   $('#toDate').datepicker()
 	.on('changeDate', function(e){
 		//hide the datepicker
 		$("#toDate").datepicker('hide');
   });
  
   // prepare the data
   var source =
   {
       //json/xml doesn't matter
       datatype: "json",
       datafields: [         
           { name: 'thaaliDate', type: 'date', format: 'yyyy-MM-dd'},
           { name: 'totalNumOfThaalis', type:'string'},           
           { name: 'numOfSmallThaalis', type:'string'},
           { name: 'numOfMediumThaalis', type: 'string' },
           { name: 'numOfLargeThaalis', type: 'string' },
           { name: 'jamanQty', type: 'string' },
           { name: 'numOfRiceCups', type: 'string' }            
       ],
       url: createThaaliCountGetUrl(currentDate, toDate),  
       sortcolumn: 'thaaliDate',
       sortdirection: 'asc'
   };
   
   getDataAdapter = function(source){
   	var dataAdapter = new $.jqx.dataAdapter(source,{
       	loadError: function(jqXHR, status, error){
       		display(server_error_msg);
       	},
       	//This method will get invoked when the data is returned from the server.
       	downloadComplete: function (edata, textStatus, jqXHR){
       		if(edata.error == true){
       			//An error has occurred.
       			display(server_error_msg);
       		}
       	}   	
       	
       });
   	return dataAdapter;
   };
   

   //Need to align the column heading  in the center
   var columnsrenderer = function (value) {
   	return '<div style="text-align: center; margin-top: 5px;">' + value + '</div>';
   }
    
   getThaaliCountTblHdr = function(){
	   if(isMobileView()){
		   return thaaliCountTblHdrMobile;
	   }
	   return thaaliCountTblHdr;
   }
             
   $(gridName).jqxGrid(
   {	
   	   source: getDataAdapter(source),
   	   theme: themeName,
   	   autorowheight:true,
   	   altrows: true,
   	   width: '100%',
   	   autorowheight:true,
       height: getHeight(),
       pageable: true,
       rowsheight: 40,
       columnsresize:true, 
       columnsheight: columnsHeight,
       editable: true,
       pagesize: getPageSize(),
       columns: [
           { text: getThaaliCountTblHdr().THAALI_DATE, datafield: 'thaaliDate', renderer: columnsrenderer, width: '23%', cellsalign: 'center', editable: false, cellsformat: 'D'}, 
           { text: getThaaliCountTblHdr().TOTAL_THAALI, datafield: 'totalNumOfThaalis', renderer: columnsrenderer, cellsalign: 'center',   width: '12%', editable: false },
           { text: getThaaliCountTblHdr().SMALL_THAALI, datafield: 'numOfSmallThaalis', renderer: columnsrenderer, cellsalign: 'center',   width: '13%', editable: false },
           { text: getThaaliCountTblHdr().MEDIUM_THAALI, datafield: 'numOfMediumThaalis', renderer: columnsrenderer, cellsalign: 'center',   width: '13%', editable: false },
           { text: getThaaliCountTblHdr().LARGE_THAALI, datafield: 'numOfLargeThaalis', renderer: columnsrenderer, cellsalign: 'center',   width: '13%', editable: false },
           { text: getThaaliCountTblHdr().JAMAN_QTY, datafield: 'jamanQty', renderer: columnsrenderer, cellsalign: 'center',   width: '13%', editable: false },
           { text: getThaaliCountTblHdr().RICE_CUPS, datafield: 'numOfRiceCups', renderer: columnsrenderer, cellsalign: 'center',   width: '13%', editable: false }         
           
       ]
   });
   
   
   //Defining the fromDate field
  // $("#fromDate").jqxDateTimeInput({width: '250px', height: '25px', formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
   
   
   //Defining the toDate field
   //$("#toDate").jqxDateTimeInput({width: '250px', height: '25px', value: toDate, formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
     
   
   
   
   //Defining a custom validator for the date field's
   $('#thaaliCountForm').jqxValidator({
	   hintType: 'label',
   	onSuccess: function () {
   		//var fromDate = $('#fromDate').jqxDateTimeInput('value');
   		//currentDate = $('#fromDate').jqxDateTimeInput('value');
        //toDate = $('#toDate').jqxDateTimeInput('value');
        
   		currentDate = new Date($('#fromDate').val());
   		toDate = new Date($('#toDate').val());
        
       	//On success we need to refresh the thaali data.
        source.url = createThaaliCountGetUrl(currentDate, toDate);
        $(gridName).jqxGrid('updatebounddata');         
   		
   	},
   	rules: [            
       { 
       	input: '#fromDate', message: 'Invalid Date. From Date cannot be greater than To Date.', action: 'valuechanged', rule:  function (input, commit){
           //var fromDate = $('#fromDate').jqxDateTimeInput('value');
           //var toDate = $('#toDate').jqxDateTimeInput('value');
           
           var fromDate = new Date($('#fromDate').val());           
           var toDate = new Date($('#toDate').val());
           
           if(fromDate != null && toDate != null){
           	if(fromDate.getTime() > toDate.getTime()){
           		return false;
           	}
           }else{
           	return false;
           }
           return true;            	
       } 
       },                                   
       
       { input: '#toDate', message: 'Invalid Date. To Date cannot be smaller than From Date.', action: 'valuechanged', rule:  function (input, commit){
           //var fromDate = $('#fromDate').jqxDateTimeInput('value');
           //var toDate = $('#toDate').jqxDateTimeInput('value');
    	   
    	   var fromDate = new Date($('#fromDate').val());
           var toDate = new Date($('#toDate').val());
           
           if(fromDate != null && toDate != null){
           	if(fromDate.getTime() > toDate.getTime()){
           		return false;
           	}
           }else{
           	return false;
           }
           return true;            	
       }  
       }]                            
   });
   
   //We would need to validate the form (one with fromDate and toDate, before refreshing data from the server)
   $('#refreshThaaliCountButton').on('click', function () {
       $('#thaaliCountForm').jqxValidator('validate');                                
   });
   
}



/******************** Functionality for thaali khidmatguzaars to view the thaali for particular day starts here *********************************/


onLoadViewThaaliAll = function(){

	
	 //Initializing a popup window, we would need this to display any success/error messages.
	$("#thaaliViewMsgPopup").jqxWindow({ width: 500, height: 100 , autoOpen:false, theme:themeName});
	
   //Will have to check the isError attribute on the response object returned before proceeding any further.
   
   //get the service url
   var currentDate = new Date();
   var toDate =  new Date();
   
   if(isMobileView()){
	   //in case of mobile we will display only 2 columns.
	   toDate.setDate(toDate.getDate() + 1); //advancing one day ahead from currentdate.
   }else{
	   toDate.setDate(toDate.getDate() + 7); //advancing seven day ahead from currentdate.
   }
   
   var columnNames = null;
   
   // prepare the data
   var source =
   {
       //json/xml doesn't matter
       datatype: "json",
       datafields: [
           {name: 'firstName', type: 'string'},         
           { name: 'familyName', type: 'string' },  
           { name: 'location', type: 'string' }
       ],       
       url: createAllUserThaaliDataGetUrl(currentDate, toDate)
   };
   
   getAllUserThaaliTblHeaders = function(){
	   if(isMobileView()){
		   return allUserThaaliTblHeadersMobile;
	   }
	   return allUserThaaliTblHeaders;
   }
   
   createDynamicColumns = function(){
	   var columns = new Array();
	   var numOfdynamicCols = columnNames.length; 
	   
		   
	   var location =  { text: getAllUserThaaliTblHeaders().LOCATION, datafield: 'location', renderer: columnsrenderer, cellsalign: 'center',   width: '20%', editable: false };	  
	   var familyName =  { text: getAllUserThaaliTblHeaders().FAMILY_NAME, datafield: 'familyName', renderer: columnsrenderer, cellsalign: 'center',   width: '30%', editable: false };
	   
	   columns.push(location);
	   //columns.push(fName); //No need to have the first name if the family name is unique.
	   columns.push(familyName);
	   
	   var defWidth = 50/numOfdynamicCols + '%'; //60% width is remaining if you remove the above 2 columns.
	   for(var i=0;i<columnNames.length;i++){
		   var colObj = columnNames[i];
		   var colName = colObj.date + '<br/>' + colObj.menu;
		   var obj = {text: colName, datafield: colObj.date, renderer: columnsrenderer, cellsalign: 'center',   width: defWidth, editable: false};
		   columns.push(obj);
	   }
	   
	   return columns;
	   
   };
   

   
   var dataAdapter = new $.jqx.dataAdapter(source,{
      	loadError: function(jqXHR, status, error){
      		$("#msgContent").html(server_error_msg);
          	$("#thaaliViewMsgPopup").jqxWindow('open');
      	},
      	//This method will get invoked when the data is returned from the server.
      	downloadComplete: function (edata, textStatus, jqXHR){
      		if(edata.error == true ){
      			//An error has occurred.
      			$("#msgContent").html(server_error_msg);
              	$("#thaaliViewMsgPopup").jqxWindow('open');
      		}
      	},
      	beforeLoadComplete: function (records,oData){
      		columnNames = new Array();      		      	
      		if(oData != null && oData.dataList != null){
      			records = oData.dataList;
          		for (var i = 0; i < records.length; i++) {
          			var record = records[i];
          			if(record.familyGroupId){
          				//Just making sure that the record is valid and it is not some junk.
          			    var thaaliDataArr = record.userThaaliDayWiseData;
          			    //We need to get the column names which would be the thaali dates.       			              			
              			if(thaaliDataArr != null && thaaliDataArr.length > 0){         				
                  			for(var j=0;j<thaaliDataArr.length;j++){
                  				var thaaliDataDayWise = thaaliDataArr[j];
                  				var thaaliDate = thaaliDataDayWise.thaaliDate; 
                  				var menu = thaaliDataDayWise.menu;
                  			  //populating the column name only the first time.
                  				if(i == 0){
                  					columnNames.push({date: thaaliDate, menu: menu}); //format would be yyyy-mm-dd 
                  				}                  				
                  				if(thaaliDataDayWise.userThaaliStatus == "REQUESTED_BY_USER"){
                  					if(thaaliDataDayWise.rice == "No"){
                  						records[i][thaaliDate] = thaaliDataDayWise.thaaliCategory+" "+"<sub>No Rice</sub>";     
                  					}else{
                  						records[i][thaaliDate] = thaaliDataDayWise.thaaliCategory;
                  					}                  					     				
                  				}else{
                  					records[i][thaaliDate] = "No";
                  				}
                  			}
              			}           			           			
          			}       			
          		}

      		}
      		return records;
      	}       		      	       	
     });
   
   
   
   $('#jqxAllUserThaaliDataGrid').on('bindingcomplete', function (event) {
	      $("#jqxAllUserThaaliDataGrid").jqxGrid({ columns: createDynamicColumns() }); //need to update the  num of columns.
	      //ALso we need to expand the group.
	      $('#jqxAllUserThaaliDataGrid').jqxGrid({groups: ['location']});
	      $('#jqxAllUserThaaliDataGrid').jqxGrid('expandallgroups');
	      
	 });
   
    
   
   
   //Need to align the column heading  in the center
   var columnsrenderer = function (value) {
   	return '<div style="text-align: center; margin-top: 5px;">' + value + '</div>';
   }

   
   
   $("#jqxAllUserThaaliDataGrid").jqxGrid(
   {	
   	source: dataAdapter,
   	theme: themeName,
   	altrows: true,
   	width: '100%',
   	autorowheight:true,
    height: getHeight(),
    pageable: true,
    rowsheight: 40,
    columnsresize:true,
    columnsheight: columnsHeight,
    editable: true,
    pagesize: getPageSize(),
    columns:  [],
    groupable:true,
    groups: ['location']
   });
   
  
  
  //Exporing the grid as excel for better viewing.
   $("#excelExport").click(function () {
       $("#jqxAllUserThaaliDataGrid").jqxGrid('exportdata', 'html', 'thaaliSignup');
    });
      
   //Defining the fromDate field
   //$("#fromDate").jqxDateTimeInput({width: '250px', height: '25px', formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
   
   //Defining the toDate field
  // $("#toDate").jqxDateTimeInput({width: '250px', height: '25px', value: toDate, formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
   
   //From date
   $("#fromDate").datepicker({"format": "mm/dd/yyyy"});
   $("#fromDate").attr("value",getFormattedDate(new Date()));
	 
   //To date
   $("#toDate").datepicker({"format": "mm/dd/yyyy"});   
   $("#toDate").attr("value",getFormattedDate(toDate));

   $('#fromDate').datepicker()
  	.on('changeDate', function(e){
  		//hide the datepicker
  		$("#fromDate").datepicker('hide');
   });
  
   $('#toDate').datepicker()
 	.on('changeDate', function(e){
 		//hide the datepicker
 		$("#toDate").datepicker('hide');
   });
   
   //Defining a custom validator for the date field's
   $('#userDateFieldForm').jqxValidator({
	hintType: 'label',
   	onSuccess: function () {
   		//var fromDate = $('#fromDate').jqxDateTimeInput('value');
   		//currentDate = $('#fromDate').jqxDateTimeInput('value');
       //toDate = $('#toDate').jqxDateTimeInput('value');
        
        currentDate = new Date($('#fromDate').val());           
        toDate = new Date($('#toDate').val());
        
       	//On success we need to refresh the thaali data.
         source.url = createAllUserThaaliDataGetUrl(currentDate, toDate);            
         $("#jqxAllUserThaaliDataGrid").jqxGrid('updatebounddata');   		
   	},
   	rules: [            
       { 
       	input: '#fromDate', message: date_error_msg, action: 'valuechanged', rule:  function (input, commit){
           //var fromDate = $('#fromDate').jqxDateTimeInput('value');
           //var toDate = $('#toDate').jqxDateTimeInput('value');
           
           var fromDate = new Date($('#fromDate').val());           
           var toDate = new Date($('#toDate').val());
           
           if(fromDate != null && toDate != null){
           	if(fromDate.getTime() > toDate.getTime()){
           		return false;
           	}
           }else{
           	return false;
           }
           return true;            	
        } 
       }, 
       { 
          	input: '#fromDate', message: dat_diff_msg, action: 'valuechanged', rule:  function (input, commit){
              //var fromDate = $('#fromDate').jqxDateTimeInput('value');
             // var toDate = $('#toDate').jqxDateTimeInput('value');
          		var fromDate = new Date($('#fromDate').val());           
                var toDate = new Date($('#toDate').val());
              
              var timeDiff = Math.abs(fromDate.getTime() - toDate.getTime());
        		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        		if(diffDays > allowedDiffBetweenDays){
        			return false;
        		}        		
        		return true;          	
          } 
       },
          
       
       { input: '#toDate', message: date_error_msg, action: 'valuechanged', rule:  function (input, commit){
           //var fromDate = $('#fromDate').jqxDateTimeInput('value');
           //var toDate = $('#toDate').jqxDateTimeInput('value');
           
           var fromDate = new Date($('#fromDate').val());           
           var toDate = new Date($('#toDate').val());
           
           if(fromDate != null && toDate != null){
           	if(fromDate.getTime() > toDate.getTime()){
           		return false;
           	}
           }else{
           	return false;
           }
           return true;
       }
       },
       
       { input: '#toDate', message: dat_diff_msg, action: 'valuechanged', rule:  function (input, commit){
           //var fromDate = $('#fromDate').jqxDateTimeInput('value');
           //var toDate = $('#toDate').jqxDateTimeInput('value');
           
           var fromDate = new Date($('#fromDate').val());           
           var toDate = new Date($('#toDate').val());
           
           //the difference of days should not be more than 5 calendar days.
      		var timeDiff = Math.abs(fromDate.getTime() - toDate.getTime());
      		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      		if(diffDays > allowedDiffBetweenDays){      			
      			return false;
      		}
      		
      		return true;
       }
       }
       ]                            
   });
   
   //We would need to validate the form (one with fromDate and toDate, before refreshing data from the server)
   $('#refreshUserDataButton').on('click', function () {
       $('#userDateFieldForm').jqxValidator('validate');                                
   });


	

}

/********************************************* Register new user functionality starts here ***********************************************************************************/
validateRegisterUserForm = function(){
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z," "]+$/i.test(value);
	}, "Name cannot contain numbers.");
	
	jQuery.validator.addMethod("multiemails", function(value, element) {
		if (this.optional(element)) // return true on optional element
			return true;
		var emails = value.split(/[,]+/); // split element by ,
		valid = true;
		for ( var i in emails) {
			value = emails[i];
			valid = valid
					&& jQuery.validator.methods.email.call(this, $.trim(value),
							element);
		}
		return valid;
	}, jQuery.validator.messages.multiemails);
	
	// validating the form using the jquery.validate plugin
	$('#registerNewUserForm').validate({
	    rules: {
	    	ejamaatId: {
	            minlength: 8,
	            maxlength: 8,
	            required: true,
	            digits:true
	        },	        
	        hofEjamaatId: {
	            minlength: 8,
	            maxlength: 8,
	            digits:true
	        },	        
	        firstName: {
	            required:true,
	            lettersonly:true
	        },
	        emailAdd: {
	            multiemails:true
	        },   	        
	        familyName:{
	        	required:{
	        		depends:function(element){
	        			return $('#radioNewFamily').is(':checked');
	        		}
	        	},
	        	lettersonly:true
	        },	        
	        familyGroupId:{
	        	required:function(element) {
	        		return $('#radioExistingFamily').is(':checked');
                }
	        }
	    },
	    
	    highlight: function(element) {
	        $(element).closest('.form-group').removeClass('success').addClass('has-error');
	    },
	    
	    messages: {
	    	ejamaatId: {
	    		minlength: "EJamaat Id must consist of 8 digits",
	    		maxlength: "EJamaat Id must consist of 8 digits",
	    		digits: "EJamaat Id must consist of numbers only.",
	    		required: "Please provide your ITS EJamaat Id."
	    	},
	    	
	    	hofEjamaatId: {
	    		minlength: "EJamaat Id must consist of 8 digits",
	    		maxlength: "EJamaat Id must consist of 8 digits",
	    		digits: "EJamaat Id must consist of numbers only."
	    	}, 
	    	
	    	firstName:{
	    		required:"Please enter the name of the user."	    		
	    	},
	    	
	    	familyName:{
	    		required:"To register user with a new family, please provide a family name."
	    	},
	    	familyGroupId:{
	        	required:"Please select a family for the user."
	        },
	    	emailAdd:{
	    		multiemails:"Please enter a valid email address. Multiple email address can be separated by a comma."
	    	}
		}
	});
}

onLoadRegisterNewUser = function(){
	
	$('#newFamily').show();
	$('#registerUserErrorCallout').hide();
	$('#registerUserSuccessCallout').hide();
	
		
	isError=function(dataObj){
		   if(dataObj.error){
			   $('#registerUserErrorCallout').show();
			   $('#registerUserSuccessCallout').hide();
			   $('#registerNewUser').attr('disabled','disabled');
			   return true;
		   }else{
			   return false;
		   }
	};
	
	var url = get_region_service_url+"?ejamaatId="+getEjamaatId()+"&password="+getPassword();
	var dataObj = handleAjax("GET",url,""); //since its a get we dont need to pass any data to the ajax call.
	
	if(!isError(dataObj)){
		var regionArr =  dataObj.jsonData.dataList; //get the list of regions.
		for(var i=0;i<regionArr.length;i++){
			var region = regionArr[i];
			$('#tDelivery').append('<option>'+region.regionName+'</option>');
		}				
	}
	
	$('#radioExistingFamily').on('click', function () {
		
		$('#existingFamily').show();
		$('#newFamily').hide();
		
		//Means the admin wants to register the user with an existing family. we need to get the family details from the db and update the dropdown.
		
		var url = all_user_profile_service_url+"?ejamaatId="+getEjamaatId()+"&password="+getPassword();
		var dataObj = handleAjax("GET",url,""); //since its a get we dont need to pass any data to the ajax call.
		
		if(!isError(dataObj)){
			var userProfilesArr =  dataObj.jsonData.dataList; //get the list of user profiles.
			for(var i=0;i<userProfilesArr.length;i++){
				var userProfile = userProfilesArr[i];
				$('#familyGroupId').append('<option value='+userProfile.familyGroupId+'>'+userProfile.familyName+'</option>');
			}				
		}
	});
	
	$('#radioNewFamily').on('click', function () {
		$('#existingFamily').hide();
		$('#newFamily').show();
	});
	
	
	   //We need to save the changes in the database, once the user decides to save the changes.
	   $('#registerNewUserButton').on('click', function () {
		    validateRegisterUserForm(); //validate the for
		    var isSuccess = $('#registerNewUserForm').valid();
		    if(isSuccess){
		    	//reset the error classes..
				$('div').removeClass('has-error');
				
		    	var familyName = "";
			    var ejamaatId = $('#ejamaatId').val();
				var hofEjmaatId = $('#hofEjamaatId').val();
				var firstName = $('#firstName').val();			
				var tCategory = $('#tCategory').val();
				var tDelivery = $('#tDelivery').val();
				var userRole = $('#userRole').val();
				var emailAddress = $('#emailAdd').val();
				var emailDelivery = $('#tEmailType').val();
				var familyGroupId = 0;
				
				if($('#radioNewFamily').is(':checked')){
					//means we are registering user for a new family, in this case the 
					familyGroupId = -1;
					familyName = $('#familyName').val();
				}else{
					familyGroupId = $('#familyGroupId').val();
					familyName = $( "#familyGroupId option:selected" ).text();
				}
				
				
		       //Need to call the ajax service to update the data.  
			   var userProfileObj = {
				   "userCredentials":{"eJamaatId":ejamaatId,"password":ejamaatId},
				   "hofEJamaatId":hofEjmaatId,
				   "familyName":familyName,
				   "firstName":firstName,
				   "location":tDelivery,
				   "thaaliCategory":tCategory,
				   "userRole":userRole,
				   "familyGroupId":familyGroupId,
				   "emailAddresses":emailAddress,
				   "emailType":emailDelivery
			    };
			   
			   var userProfileArr = new Array();
			   userProfileArr.push(userProfileObj);
			   
			   var jsonData = {};
			   jsonData.eJamaatId = getEjamaatId(); 
			   jsonData.password = getPassword();											   
			   jsonData.dataList = userProfileArr;
			   
			   var jsonStr = JSON.stringify(jsonData);			   
			   var url = profile_create_service_url;
			   dataObj = handleAjax("POST",url,jsonStr); 
			   if(!isError(dataObj)){
				   //display success popup..
				   $('#registerUserErrorCallout').hide();
				   $('#registerUserSuccessCallout').show();
			   }
		    }		    
		   return false;//need to always return false.
	   });
	   
	
}


/********************************************   User Profile Functionality starts here ***************************************************************************************/


validateUserProfileForm = function(){

	$('#userProfileForm').validate({
	    rules: {
	    	familyMemberCount: {
	            maxlength: 1,
	            required: true,
	            digits:true
	        },
	    	emailIp: {
                multiemails: true
            }         
	    },
	    
	    highlight: function(element) {
	        $(element).closest('.form-group').removeClass('success').addClass('has-error');
	    },
	    
	    messages: {
	    	emailIp: {
	    		multiemails: "Please enter a valid email address"
	    	},
	    	familyMemberCount: {
	    		digits: "Please enter a valid number between 1-9",
	    		required: "Please enter a valid number between 1-9"	    		
	    	}
		}
	});
}

onLoadUserProfile = function(){
	
	//We need to get the user profile data and populate it in the UserProfileForm.
	var url = profile_get_service_url+"?ejamaatId="+getEjamaatId()+"&password="+getPassword();
	var dataObj = handleAjax("GET",url,""); //since its a get we dont need to pass any data to the ajax call.
	
	$('#profileErrorCallout').hide();
	$('#profileSuccessCallout').hide();
	
	 isError=function(dataObj){
		   if(dataObj.error){
			   $('#profileErrorCallout').show();
			   $('#profileSuccessCallout').hide();
			   $('#userProfileSubmit').attr('disabled','disabled');
			   return true;
		   }else{
			   return false;
		   }
	};
	   
	if(!isError(dataObj)){
		var userProfileObj =  dataObj.jsonData.dataList[0]; 
		if(userProfileObj != null){
			//we also need to get the list of regions from the database.
			var url = get_region_service_url+"?ejamaatId="+getEjamaatId()+"&password="+getPassword();
			var dataObj = handleAjax("GET",url,""); //since its a get we dont need to pass any data to the ajax call.
			
			if(!isError(dataObj)){
				var regionArr =  dataObj.jsonData.dataList; //get the list of regions.
				for(var i=0;i<regionArr.length;i++){
					var region = regionArr[i];
					$('#tDelivery').append('<option>'+region.regionName+'</option>');
				}				
			}
			
			$('#ejamaatId').val(userProfileObj.userCredentials.eJamaatId);
			$('#hofEjamaatId').val(userProfileObj.hofEJamaatId);
			$('#firstName').val(userProfileObj.firstName);
			$('#familyName').val(userProfileObj.familyName);
			$('#tCategory').val(userProfileObj.thaaliCategory);
			$('#tRice').val(userProfileObj.rice);
			$('#tDelivery').val(userProfileObj.location);
			$('#tFamilyCountLabel').val(userProfileObj.numOfFamilyMembers);
			$('#userRole').val(userProfileObj.userRole);
			$('#emailIp').val(userProfileObj.emailAddresses);
			
			
		}else{
			dataObj.error = true;
			isError(dataObj);
		}		
	}
	
	   //We need to save the changes in the database, once the user decides to save the changes.
	   $('#userProfileSubmit').on('click', function() {
		// We need to validate the feedback form before submitting it.
		validateUserProfileForm();

		var isValid = $('#userProfileForm').valid();
		if (isValid) {
			// reset the error classes..
			$('div').removeClass('has-error');

			var ejamaatId = $('#ejamaatId').val();
			var hofEjmaatId = $('#hofEjamaatId').val();
			var firstName = $('#firstName').val();
			var familyName = $('#familyName').val();
			var tCategory = $('#tCategory').val();
			var tRice = $('#tRice').val();
			var tDelivery = $('#tDelivery').val();
			var userRole = $('#userRole').val();
			var emailAddress = $('#emailIp').val();
			var familyMemberCount = $('#tFamilyCountLabel').val();

			// Need to call the ajax service to update the data.
			var userProfileUpdatedObj = {
				"userCredentials" : {
					"eJamaatId" : ejamaatId,
					"password" : getPassword()
				},
				"hofEJamaatId" : hofEjmaatId,
				"familyName" : familyName,
				"firstName" : firstName,
				"location" : tDelivery,
				"thaaliCategory" : tCategory,
				"rice":tRice,
				"userRole" : userRole,
				"emailAddresses":emailAddress,
				"numOfFamilyMembers": familyMemberCount
				};

			var jsonStr = JSON.stringify(userProfileUpdatedObj);

			var updateUrl = profile_update_service_url;
			dataObj = handleAjax("POST", updateUrl, jsonStr);
			if (!isError(dataObj)) {
				// display success popup..
				$('#profileSuccessCallout').show();
				$('#profileErrorCallout').hide();
			}
		}
		return false;// need to always return false.
	});
	   
	  

}




/***********************         User Feedback Functionality starts                   ********************************/

/**
 * This method would be invoked by the onload method on the user thaali page.
 */
onLoadUserFeedback = function(){
	
	 //Initializing a popup window, we would need this to display any success/error messages.
	$("#feedbackMsgPopup").jqxWindow({ width: 500, height: 100 , autoOpen:false, theme:themeName});
	
    //Will have to check the isError attribute on the response object returned before proceeding any further.
    
    var initialRowsLoadedFromDatabase = -1;
    
    // prepare the data
    var source =
    {
        //json/xml doesn't matter
        datatype: "json",
        datafields: [
            { name: 'feedbackCreationDate', type: 'date', format: 'yyyy-MM-dd'},  
            { name: 'thaaliDate', type: 'date', format: 'yyyy-MM-dd'},   
            { name:'thaaliMenu', type: 'string'},
            { name:'qualityRating', type: 'string'},
            { name:'quantityRating', type: 'string'},
            { name:'thaaliFeedback', type: 'string'},
            { name:'firstName', type: 'string'},
            { name:'familyName', type: 'string'}          
        ],
        url: createUserFeedbackUrl()
    };
    
    getDataAdapter = function(source){
    	var dataAdapter = new $.jqx.dataAdapter(source,{
        	loadError: function(jqXHR, status, error){
        		$("#feedbackMsgContent").html(server_error_msg);
            	$("#feedbackMsgPopup").jqxWindow('open');
        	},
        	//This method will get invoked when the data is returned from the server.
        	downloadComplete: function (edata, textStatus, jqXHR){
        		if(edata.error == true){
        			//An error has occurred.
        			$("#feedbackMsgContent").html(server_error_msg);
                	$("#feedbackMsgPopup").jqxWindow('open');
        		}
        	}        	     	
        	
        });
    	return dataAdapter;
    };
    
    
    
    
    //Need to align the column heading  in the center
    var columnsrenderer = function (value) {
    	return '<div style="text-align: center; margin-top: 5px;">' + value + '</div>';
    }
    
    getTableHeader  = function(){
    	if(isMobileView()){
    		return userFeedbackTblHeadersMobile;
    	}
    	return userFeedbackTblHeaders;
    }
    
    $("#jqxUserFeedbackGrid").jqxGrid(
    {	
    	source: getDataAdapter(source),
    	theme: themeName,
    	altrows: true,
    	autorowheight:true,
    	width: '100%',
        columnsresize:true,
        height: getHeight(),
        pageable: true,
        rowsheight: 40,
        columnsresize:true,
        columnsheight: columnsHeight,
        editable: true,
        pagesize: getPageSize(),         
        columns: [
            { text: getTableHeader()[0].Name, datafield: 'feedbackCreationDate', renderer: columnsrenderer, cellsalign: 'center',   width: getTableHeader()[0].Width, editable: false,cellsformat: 'D', hidden: isMobileView() },
            { text: getTableHeader()[1].Name, datafield: 'thaaliDate', renderer: columnsrenderer, width: getTableHeader()[1].Width, cellsalign: 'center', editable: false, cellsformat: 'D'}, 
            { text: getTableHeader()[2].Name, datafield: 'thaaliMenu', renderer: columnsrenderer, cellsalign: 'center',  width: getTableHeader()[2].Width, editable: false },
            { text: getTableHeader()[3].Name, datafield: 'qualityRating', renderer: columnsrenderer, cellsalign: 'center',  width: getTableHeader()[3].Width, editable: false },
            { text: getTableHeader()[4].Name, datafield: 'quantityRating', renderer: columnsrenderer, cellsalign: 'center',  width: getTableHeader()[4].Width, editable: false, hidden: isMobileView() },
            { text: getTableHeader()[5].Name, datafield: 'thaaliFeedback', renderer: columnsrenderer, cellsalign: 'center',  width: getTableHeader()[5].Width, editable: false },
            { text: getTableHeader()[6].Name, datafield: 'firstName', renderer: columnsrenderer, cellsalign: 'center',  width: getTableHeader()[6].Width, editable: false, hidden: isMobileView() },
            { text: getTableHeader()[7].Name, datafield: 'familyName', renderer: columnsrenderer, cellsalign: 'center',  width: getTableHeader()[7].Width, editable: false }
        ]
    });
       	
}



/**
 * Determines the number of records to be displayed in a page depending upon the size of the screen.
 * @returns {Number}
 */
getPageSize = function(){
	if(isMobileView()){
		return 4;
	}
	return 7;
}

/**
 * Utility function to create the thaali url to get the ThaaliData for the Admin to view/update.
 */
createAdminThaaliDataGetUrl = function(fromDateObj, toDateObj){
	var fromDate = getFormattedDate(fromDateObj);
	var toDate = getFormattedDate(toDateObj); 
	var isVisible = true;
	return admin_thaali_get_service_url +"?ejamaatId="+getEjamaatId()+"&fromDate="+fromDate+"&password="+getPassword()+"&toDate="+toDate;	
}

createUserFeedbackUrl = function(){
	return user_feedback_service_url +"?ejamaatId="+getEjamaatId()+"&password="+getPassword()+"&limit="+rowLimit;
}

/** Date utility method **/
getUTCDate = function(dateStr){
	var date = new Date(dateStr);
	var utc = date.getTime() + (date.getTimezoneOffset() * 60000); //converting it to utc timezone since the date that we get from the db is just a string.
	date = new Date(utc); 
	return date;
}

/**
 * Utility function to create the thaali url to get the ThaaliData for the Admin to view/update.
 */
createUserThaaliDataGetUrl = function(fromDateObj, toDateObj){
	var fromDate = getFormattedDate(fromDateObj);
	var toDate = getFormattedDate(toDateObj); 
	var isVisible = true;
	return user_thaali_get_service_url +"?ejamaatId="+getEjamaatId()+"&fromDate="+fromDate+"&password="+getPassword()+"&toDate="+toDate;	
}

createAllUserThaaliDataGetUrl = function(fromDateObj, toDateObj){
	var fromDate = getFormattedDate(fromDateObj);
	var toDate = getFormattedDate(toDateObj); 
	var toDateString = "&toDate="+toDate;
	if(fromDate == toDate){
		toDateString = "";
	}
	var isVisible = true;
	return all_user_thaali_get_service_url +"?ejamaatId="+getEjamaatId()+"&fromDate="+fromDate+"&password="+getPassword()+toDateString;	
}

createThaaliCountGetUrl = function(fromDateObj, toDateObj){
	var fromDate = getFormattedDate(fromDateObj);
	var toDate = getFormattedDate(toDateObj); 
	return thaali_count_service_url +"?ejamaatId="+getEjamaatId()+"&password="+getPassword()+"&fromDate="+fromDate+"&toDate="+toDate;	
}



/**
 * Utility method to convert the date object from any format to the format MM/dd/yyyy
 */
getFormattedDate = function(dateObj){
	var dd = dateObj.getDate();
	var mm = dateObj.getMonth() + 1;
	var year = dateObj.getFullYear();
	
	return mm+"/"+dd+"/"+year;	
}

getFormattedDateServer = function(dateObj){
	var dd = dateObj.getDate();
	var mm = dateObj.getMonth() + 1;
	var year = dateObj.getFullYear();
	
	return year+"-"+mm+"-"+dd;	
}

/**
 * This method is used to load the external HTML pages within the dashboard page
 *
 */
loadExternalHTML = function(){	
	$('#leftCol').load('menu.html'); //load the right column
	$('#rightCol').load('userThaaliView.html'); //load the right column
}


$('#refreshButton').on('click', function () {
    $('#dateFieldForm').jqxValidator('validate');                                
});

/**
  Method used to toggle between different dashboard items.
**/
toggle = function(activeId){
	//get the id of the object that is currently active.
	
	for(var i=0;i<userDashboardArr.length;i++){
		var item = userDashboardArr[i][0];	
		var classes = $('#'+item).attr('class');		
		
		if(item == activeId){
			var page = userDashboardArr[i][1];
			//Change the class of the parent to be active and make the other's inactive.
			$("#rightCol").html(""); //Lets first unload the content of the rightCol and then load with the correct data.
			$('#rightCol').load(page); //load the right column

			if(classes == null || classes == undefined){
				classes = "";
			}
			
			if(classes.indexOf("active") < 0){
				classes = classes + ' active';
				$('#'+item).attr('class',classes);
			}							
		}else{
			//toggle, change the class
			if(classes != null){
				classes = classes.replace('active','');
				$('#'+item).attr('class',classes);
			}
		}
	}
	//If the user is an admin, we need to display the adminDashboard items as well.
	var userRole = getUserRole();
	
	//TODO superUserDashboardArr and adminDashboardArr
	if(userRole == 'SUPER_USER'){
		$('#thaaliInformation').attr('style','display: block; ');
		$('#listThaaliSignups').attr('style','display: block; ');
		$('#thaaliCount').attr('style','display: block; ');
	}else if(userRole == "ADMIN"){
		$('#thaaliInformation').attr('style','display: none; ');
		$('#listThaaliSignups').attr('style','display: block; ');
		$('#thaaliCount').attr('style','display: block; ');
	}else if(userRole == "COOK"){
		$('#thaaliCount').attr('style','display: block; ');		
	}
	
	//If window is small enough, we need to disable the sidebar menu.
	
	if ($(window).width() <= mobile_view_screen_size) {
    	$('.row-offcanvas').removeClass('active');
        $('.row-offcanvas').removeClass("relative");
        //In case of smaller screens we need to show the userProfileSection back once the user selects a menu item from the dropdown.
        $('#userProfileSection').show();
	}   
	
}

//Methods to get the User Profile details. (users demographic details) 
/**
 *  Method to determine whether the user who is logged in is an admin or not. Need to get it from a cookie.
 *  TODO
 **/
getUserRole = function(){
	var userProfile = getCookie();
	var userRole = userProfile.userRole;
	return userRole;
}


getFamilyName = function(){
	var userProfile = getCookie();
	var familyName = userProfile.familyName;
	return familyName;
}

getFirstName = function(){
	var userProfile = getCookie();
	var userName = userProfile.firstName;
	return userName;
}

getUserName = function(){
	var userProfile = getCookie();
	var userName = userProfile.firstName+" " + userProfile.familyName;
	return userName;
}


getPassword = function(){
	var userProfile = getCookie();
	var password = userProfile.userCredentials.password;
	return password;
}

getEjamaatId = function(){
	var userProfile = getCookie();
	var ejamaatId = userProfile.userCredentials.eJamaatId;
	return ejamaatId;
}

getFamilyGroupId = function(){
	var userProfile = getCookie();
	var groupId = userProfile.familyGroupId;
	return groupId;
}

getThaaliCategory = function(){
	var userProfile = getCookie();
	var thaaliCategory = userProfile.thaaliCategory;
	return thaaliCategory;
}

getCookie = function(){
	var cookieJsonObj = null;
	var value = $.cookie(cookieName);
	if(value != null){
		cookieJsonObj =JSON.parse(value);
	}
	
	return cookieJsonObj;
}

function display(msg){
	// We need to do this only on bigger screens....
	if(isMobileView()){
		alert(msg);
	}else{
		$("#thaaliViewMsgContent").html(msg);
		$("#thaaliViewMsgPopup").jqxWindow('open');
	}	
}

/**
 * Utility method to check if the screen size is for smaller screens (mobile esp).
 * @returns {Boolean}
 */
function isMobileView(){
	var mobileTabletWidth = 992;
	var mobileWidth = 500;
	if ($(window).width() <= mobileWidth) {
        return true;
    }else{
    	return false;
    }
}

/**
 * Utility method that returns the height of the table.
 * 
 * @returns {String}
 */
function getHeight(){
	//TODO depending upon the device and the screen size the height should change.
	/*Also this value was earlier set to '100%' but there was an issue in Chrome/IE/FIrefox only on WIndows 8 where the height of the table was getting set to 0px. 
	It seemed as a bug in jqxWIdgets framework code and hence i thought of hardcoding the pixel size to fix that.
	The code that calculates the height based on the percentage was not behaving the way it shud have (thats a guess)*/
	return '400px';
}

/**
 * Method which would be invoked on load of dashboard page.
 */
init = function(){
	//Be default always the user thaali view should be in view.
	if(getCookie() != null){
		toggle('thaaliCalendar');
		var userName = welcomeMessage+getUserName();
		//setting the user name on the screen.
		$('#userName').html(userName);
	}else{
		//TODO
		//send user back to login page...
	}
	
}

/**
 * Method which would be invoked when the user access'es the login page.
 */
initLogin = function(){
	$('#jamaatName').html(jamaatName);
	//In case if the cookie is still saved in session, we can redirect the user directly to the dashboard page without asking him/her to login again.
	if(getCookie() != null){
		$('#loginForm').submit();
	}
	
}



validateFeedbackForm = function(){
	
    $('#thaaliFeedbackForm').validate({
	    rules: {
	    	thaaliQuality: {
                required: true
            },
            thaaliQuantity: {
                required: true   
            },
            
            thaaliFeedback:{
            	required:function(element) {
                	if( $("#thaaliFeedback").val() != null){
                		return $("#thaaliFeedback").val().trim().length == 0;
                	}
                    return true;//not valid.
                }
            }
	    },
	    
	    highlight: function(element) {
	        $(element).closest('.form-group').removeClass('success').addClass('has-error');
	    },
	    
	    messages: {
	    	thaaliQuality: {
	    		required: "Please select a value for Thaali Quality"
	    	},
	    	
	    	thaaliQuantity: {
	    		required: "Please select a value for Thaali Quantity"
	    	},
	    	
	    	thaaliFeedback:{
	    		required: "Please enter some valuable comments."
	    	}
		}
	});
}

//Functionality for submitting thaali feedback..
onLoadThaliFeedback = function(){
	//Datemask2 mm/dd/yyyy
    $("#thaaliDate").datepicker({"format": "mm/dd/yyyy"});
    
    $('#feedbackErrorCallout').hide();
	$('#feedbackSuccessCallout').hide();
	   
	$('#submitFeedbackBtn').on('click',function(){
		
		
		//We need to validate the feedback form before submitting it.
		validateFeedbackForm();
		
		var isValid = $('#thaaliFeedbackForm').valid();
		if(isValid){
			//reset the error classes..
			$('div').removeClass('has-error');
			
			var date = $('#thaaliDate').val();
			
			var menu = $('#thaaliMenu').val();
			var qty = $('#thaaliQuality').val();
			var quality = $('#thaaliQuantity').val();
			var feedback = $('#thaaliFeedback').val();
		
			//Need to send the data over the wire to be saved in the db.
			var jsonData = {};
			jsonData.eJamaatId = getEjamaatId(); 
			jsonData.password = getPassword();
			
			var feedback = {eJamaatId:getEjamaatId(),firstName:getFirstName(),familyName:getFamilyName(),familyGroupId:getFamilyGroupId(),thaaliCategory:getThaaliCategory(),
					         thaaliFeedback:feedback,thaaliDateEntered:date,thaaliMenu:menu,qualityRating:quality,quantityRating:qty,};
			
			//Creating an array of feedback, since the server accepts the data as a list.
			var feedbackArr =  new Array();
			feedbackArr.push(feedback);
			
			jsonData.dataList = feedbackArr;
			var jsonStr = JSON.stringify(jsonData);
			
			 var url = submit_feedback_service_url;
			 var dataObj = handleAjax("POST",url,jsonStr); 
			   if(!dataObj.error){
				   //display success popup..
				   $('#feedbackErrorCallout').hide();
				   $('#feedbackSuccessCallout').show();
				   
			   }else{
				   $('#feedbackErrorCallout').show();
				   $('#feedbackSuccessCallout').hide();
			   }
		}
		
		return false;//need to always return false.		
	   }
	);
}

//wrapper for Miscellaneous functionalities.
onLoadMiscellaneous = function(){
	
	//method which will add the textbox to add more menu items.
	addMoreMenuItem = function(id){
		var newVal = id.replace("menuItem-","");
		newVal = parseInt(newVal) +1;
		var menuItem = "menuItem-"+newVal;
	    var data = "<div class=\"input-group\"><input class=\"form-control\" placeholder=\"Add one menu item at a time ...\" id=\""+menuItem+"\"/><div class=\"input-group-btn\"><button onclick=\"addMoreMenuItem('"+menuItem+"');return false;\" class=\"btn btn-success\">Add</button></div></div>";

		$('#addMenuItems').append($(data));	
	}
	
	//method which will add the textbox to add more regions.
	addMoreRegion = function(id){
		var newVal = id.replace("region-","");
		newVal = parseInt(newVal) +1;
		var regionItem = "region-"+newVal;
	    var data = "<div class=\"input-group\"><input class=\"form-control\" placeholder=\"Add one region at a time ...\" id=\""+regionItem+"\"/><div class=\"input-group-btn\"><button onclick=\"addMoreRegion('"+regionItem+"');return false;\" class=\"btn btn-success\">Add</button></div></div>";

		$('#addRegions').append($(data));	
	}
	
	//method to would add the menu items in the database.
	$('#submitMenuItems').on('click', function(){
		// gets all the input elements.
		var menuItems = $("input[id^='menuItem']");
		var isMenuAdded = false;
		var menuArr = new Array();
		for(var i=0;i<menuItems.length;i++){
			var menuItem = menuItems[i].value; // gets the menu.
			if(menuItem !=null &&  menuItem.trim().length > 0){
				var menu = {menu:menuItem,userName:getFirstName()};
				menuArr.push(menu);				
			}
		}
		
		if(menuArr.length > 0){
			//This means user has added atleast a single menu item.
			//Need to send the data over the wire to be saved in the db.
			var jsonData = {};
			jsonData.eJamaatId = getEjamaatId(); 
			jsonData.password = getPassword();								
			
			jsonData.dataList = menuArr;
			var jsonStr = JSON.stringify(jsonData);
			
			 var url = add_menu_service_url;
			 var dataObj = handleAjax("POST",url,jsonStr); 
			   if(!dataObj.error){
				   //display success popup..
				   $('#menuErrorCallout').hide();
				   $('#menuSuccessCallout').show();
				   
			   }else{
				   $('#menuErrorCallout').html("<h4>An error has occurred!</h4><p>"+dataObj.jsonData.message+"</p>");
				   $('#menuErrorCallout').show();
				   $('#menuSuccessCallout').hide();
			   }
		  }else{
			  $('#menuErrorCallout').html("<h4>An error has occurred!</h4><p>Please add menu items before submitting.</p>");
			  $('#menuErrorCallout').show()
			  $('#menuSuccessCallout').hide();
		  }
		
		return false;
    });
	
	
	//method that would add the regions in the database.
	$('#submitRegions').on('click', function(){
		// gets all the input elements.
		var regions = $("input[id^='region']");
		var regionsArr = new Array();
		for(var i=0;i<regions.length;i++){
			var region = regions[i].value; // gets the menu.
			if(region !=null &&  region.trim().length > 0){
				var regionObj = {regionName:region,description:"Added by "+getFirstName()};
				regionsArr.push(regionObj);				
			}
		}
		
		if(regionsArr.length > 0){
			//This means user has added atleast a single menu item.
			//Need to send the data over the wire to be saved in the db.
			var jsonData = {};
			jsonData.eJamaatId = getEjamaatId(); 
			jsonData.password = getPassword();								
			
			jsonData.dataList = regionsArr;
			var jsonStr = JSON.stringify(jsonData);
			
			 var url = add_region_service_url;
			 var dataObj = handleAjax("POST",url,jsonStr); 
			   if(!dataObj.error){
				   //display success popup..
				   $('#regionErrorCallout').hide();
				   $('#regionSuccessCallout').show();
				   
			   }else{
				   $('#regionErrorCallout').html("<h4>An error has occurred!</h4><p>"+dataObj.jsonData.message+"</p>");
				   $('#regionErrorCallout').show();
				   $('#regionSuccessCallout').hide();
			   }
		  }else{
			  $('#regionErrorCallout').html("<h4>An error has occurred!</h4><p>Please add regions before submitting.</p>");
			  $('#regionErrorCallout').show();
			  $('#regionSuccessCallout').hide();
		  }
		
		return false;
    });

}



//Functionality to display the thaali calendar.
onLoadThaaliCalendar = function(){
	//full calendar functionality
	//step 1 : get thaali data from (by default will return data for 30 days from current date.)
	//step 2 : if the data returned from above is not null and not empty, create events for each row of thaali data.
	//step 3 : enable users to navigate only till the month for which thaali data is available. i.e disable user from navigating too far.


        /*
 	*  Display the signup button only if thaali is present and if modifications are allowed.
 	*  In case of mobile view, dont display the message that the thaali cannot be selected. 
 	*  save the id of the button, the current state and the next state for each button.
 	*  if possible - thaalis not requested should be orange and once requested should change to green.
        */
	//this will hold the state of the user's thaali request. this is needed since on window resize the state of the thaali request is lost.
	thaaliRequestStateArr = new Array();
	//get the service url
    var currentDate = new Date();
    currentDate.setDate(1); //always starting from 1st day of the month...
    var toDate =  new Date();
    toDate.setDate(toDate.getDate() + num_of_days_to_Advance);
    
	
	var url = createUserThaaliDataGetUrl(currentDate, toDate);
	var dataObj = handleAjax("GET",url,""); //getting the thaali data. 
	var background = "#d9edf7"; //#00a65a - green //#d9edf7 - blue //#ffffff
	var redBg = "#f56954";
	var yellowBg = "#f39c12";

	//Initializing a popup window, we would need this to display any success/error messages.
	$("#thaaliViewMsgPopup").jqxWindow({ width: '20%', height: '10%' , autoOpen:false, theme:themeName});
	
	/* We would need a way to create toggle buttons each button would be for a pacrticular day. Also, the below array will hold an array of objects.*/
	var jqxButtonArr =  new Array();
	if(!dataObj.error){
		$('#thaaliCalendarErrorCallout').hide();
		//We need to initialize the calendar and populate the events array.
		//creating the events array.
		var thaaliList = dataObj.jsonData.dataList;
		var startDate = null;
		var endDate = null;
		var eventsArr =  new Array();
		var cssClass = "eventClass";
		
       
		
		for (var i = 0; i < thaaliList.length; i++) {
			var thaaliData = thaaliList[i];
			var isLocked = thaaliData.locked;
			var bg = background;
			var title = "";
			//check for first record.
			if (i == 0) {
				startDate = thaaliData.thaaliDate;
			}

			/* object that will hold the event details that correspond to the full calendar.*/
			var event = {};
			
			var eventDate = getUTCDate(thaaliData.thaaliDate);
			/*Every event will have a date*/
			event.start = eventDate;

			/* This will determine if the admin has stored any instructions for the particular thaali day.*/
			if (thaaliData.thaaliInstructions == null || thaaliData.thaaliInstructions.trim().length == 0) {
				thaaliData.thaaliInstructions == "";
			}

			if (thaaliData.thaaliStatus == allowed_thaali_status[1]) {
				//means thaali is not present on this day.we need to change the title and display instructions if any.
				title = "<center><b><i><h4>No Thaali <br/><small>" + thaaliData.thaaliInstructions + "</small></h4></i></b></center>";
				bg = redBg;
			} else {
				//Means thaali is present for this day..
				/* Object that would hold the details about the jqx toggle button that we need to create only when thaali is present*/
				var jqxButtonObj = {};
				//For each jqxButton we would need to store the following information.
				var userStatus = "";
				var buttonTemplate = "";
				var displayMsg = "";
				var buttonId = "jqxButton"+i;
				var disabled = false;
				var thaaliDate = eventDate;
				var miqaat = false;
				var content = "";
				if (thaaliData.thaaliInstructions.toLowerCase().indexOf("open") >= 0) {
					//no thaali pakawnaar for this day, we need to highlight it..
					content = "<small> Thaali Pakawanaar Needed </small>";
					bg = yellowBg;
				} else if (thaaliData.thaaliInstructions.toLowerCase().indexOf("miqaat") >= 0){
					content = "<small> Will you be attending Miqaat? If yes, please enter how many ?</small>";
					miqaat = true;
					//bg = background;
					bg = "#f9f9f9"; //grey background
				} else {
					content = "<small>" + thaaliData.thaaliInstructions + "</small>";
					//bg = background;
					bg = "#f9f9f9"; //grey background
				}
				/* We know for sure that Thaali is present for this day, but we need to determine is the user allowed to make any modifications*/
				
				//Check if user had already signed up for the thaali or not,
				//if the user has already signed up and isLocked is true then he/she should be given an option to modify or cancel.
				//If not signed up earlier show message and no modifications should be allowed...			
				
				if (thaaliData.userThaaliStatus == "NOT_REQUESTED_BY_USER") {
				 //User is allowed to select thaali...
				  userStatus = thaaliNotReq;
				  buttonTemplate = notRequestedButtonTemplate;
				}else{
				  userStatus = thaaliRequested;
				  buttonTemplate = requestedButtonTemplate;
				}
				
				
				if (isLocked == true) {
					if (thaaliData.userThaaliStatus == "NOT_REQUESTED_BY_USER") {
						//Means the thaali date has been frozen...no more modifications allowed at this time.
						disabled = true;
						displayMsg = msg_on_thaali_frozen
					} else {
						//What if the date has been passed, this means user cannot update the record anymore.
						// make sure the thaali date is a future date and not a past date.
						var today = new Date();
						//reset todays date
						today.setHours(0);
						today.setMinutes(0);
						today.setSeconds(0);
						today.setMilliseconds(0);

						if (thaaliData.thaaliDate < today) {
							displayMsg = "Thaali Date has already been passed. No more changes are allowed.";
							disabled = true;
						}
					}
				}

				
				
				
				/** Introducing the functionality to add a number input - only for miqaats **/
				if(miqaat == true){
					var numberInputId = buttonId +"NumberInput";
					var numberInputHtml = "<div id=\""+numberInputId+"\"><input type=\"text\" /><div></div></div> <br/><br/>";
					jqxButtonObj.numberInputId = numberInputId; //only for miqaat
				}
				
				var buttonHtml = "<div id=\""+buttonId+"toolTip\"><input type=\"button\" class=\"thaaliSignupToggleButton\" value=\"" + userStatus + "\" id=\"" + buttonId + "\" isDisabled = "+disabled+" message=\""+displayMsg+"\" thaaliDate=\""+thaaliDate+"\" category=\""+thaaliData.userThaaliCategory+"\"  miqaat=\""+miqaat+"\"   /></div>";
				
				
				if (isMobileView()) {
					if(miqaat == true){
						title = "<center><b><i>" + thaaliData.menu + "<br/><br/>" + content + "<br/><br/>" + numberInputHtml + "<br/>" + buttonHtml + "</i></b></center>";
						
					}else{
						title = "<center><b><i>" + thaaliData.menu + "<br/><br/>" + buttonHtml + "<br/>" + content + "</i></b></center>";
					}

				} else {
					if(miqaat == true){
						title = "<center><b><i><h4>" + thaaliData.menu  + "<br/><br/>" + content  + "<br/><br/>" + numberInputHtml + "<br/>" + buttonHtml + "</h4></i></b></center>";
					}else{
						title = "<center><b><i><h4>" + thaaliData.menu  + "<br/><br/>" + buttonHtml  + "<br/>" + content + "</h4></i></b></center>";
					}
				}
				//pushing the jqxButtonObj to the buttton array which would be used later..

				jqxButtonObj.userStatus = userStatus;
				jqxButtonObj.buttonTemplate = buttonTemplate;
				jqxButtonObj.displayMsg = displayMsg;
				jqxButtonObj.buttonId = buttonId;				
				jqxButtonObj.disabled = disabled;
				jqxButtonObj.miqaat = miqaat;
				jqxButtonObj.numOfPpl = thaaliData.numOfFamilyMembers;
				
				
				jqxButtonArr.push(jqxButtonObj);
				
			}
			event.title = title;
			event.backgroundColor = bg;
			event.borderColor = bg;
			event.className = cssClass;
			event.textColor = '#606060'; //dark grey color.

			//var hijriCalendar = $.calendars.instance("islamic");

			//check if it is last record.
			if (i + 1 == thaaliList.length) {
				//means last record..we need the end date.
				endDate = event.start;
			}
			event.buttonObj = jqxButtonObj;
			eventsArr.push(event); //pushing the event.
		}
		
		
		
        $('#thaaliCalendarDisplay').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            buttonText: {//This is to add icons to the visible buttons
            	prev: "<span class='fa fa-caret-left'></span>",
                next: "<span class='fa fa-caret-right'></span>",
                today: 'today',
                month: 'month',
                week: 'week',
                day: 'day'
            },
            //Random default events
            events: eventsArr,
            editable: false,
            droppable: false,
            eventRender: function(event, element) {             	
            	 element.find('span.fc-event-title').html(element.find('span.fc-event-title').text());
            },
            
            /* This method gets triggered after all events have rendered completely . */
            eventAfterAllRender: function(view){
            	/*if ($(window).width() <= 768){
            		//Means mobile view...we need to reduce the text size within the button.
            		$(".thaaliSignupToggleButton").css({"font-size": "30%"});
            		
            	}*/
            	//Adding an onclick event handler
                  $(".thaaliSignupToggleButton").on('click', function(){
                        toggleButtonOnClick(this);
                  });
            },
            
            /* This method gets invoked after the eventRender function above. */
            eventAfterRender: function( event, element, view ) { 
              var jqxButtonObj  = event.buttonObj;
              var buttonId = "#"+jqxButtonObj.buttonId;
              var width = '85%';
              if ($(window).width() <= 768){
          		//Means mobile view...we need to reduce the width of the button.
            	  width = '70%';          		
          	  }
      		  $(buttonId).jqxToggleButton({ width: width, height: '50%', toggled: true, disabled: jqxButtonObj.disabled, roundedCorners: 'all', template: jqxButtonObj.buttonTemplate});
      		  
      		  /****** miqaat functionality starts ********/
      		  if(jqxButtonObj.miqaat == true){
      			var numberInputId = "#"+jqxButtonObj.numberInputId;
      			if(isMobileView()){
      				$(numberInputId).jqxFormattedInput({ width: '50%', height: '50%',radix: "decimal", spinButtons: false, value:jqxButtonObj.numOfPpl});
      			}else{
      				$(numberInputId).jqxFormattedInput({ width: '50%', height: '50%',radix: "decimal", spinButtons: true, spinButtonsStep: 1, value:jqxButtonObj.numOfPpl});
      			}
      		  }
      		  
      		  /*********** ends **********************************/
      		  
      		  //We need to save the state of the user thaali request.. this is needed because on window resize, fullCalendar does not save the dom that we modifief on button click.
      		  var btnValue = thaaliRequestStateArr[buttonId];
			
      		  if(btnValue != null && btnValue.trim().length > 0){      			
      			if(btnValue === thaaliNotReq){
    				$(buttonId)[0].value = thaaliNotReq;
    				$(buttonId).jqxToggleButton({template:notRequestedButtonTemplate});    				
    			}else{
    				$(buttonId)[0].value = thaaliRequested;	
    				$(buttonId).jqxToggleButton({template:requestedButtonTemplate});
    			}
      		  }
      		  
      		 
      		  
      		  var isDisabled = $(buttonId).attr('isDisabled');
      		  if(isDisabled === "true"){
      			//Depending upon the screen size we also need to display the message why it is disabled..
      			var msg = $(buttonId).attr('message');
      			var toolTipId = buttonId+"toolTip";
      			$(toolTipId).jqxTooltip({
      				position : 'top',
      				content : msg,
      				theme : themeName
      			});
      		  }
            }

        });
        
   
    	$("#submitUserThaaliDataButton").on('click', function () {    	
    		if(userThaaliSignupArr.length > 0){
    			//Updating DB only when there is something to update.
    			var url=user_thaali_update_service_url;
    			var jsonData = new Object(); 
    			//Populating the json object..
    			var mRowArr =  new Array();
    			jsonData.eJamaatId = getEjamaatId();
    			jsonData.password = getPassword();
    			
    			jsonData.dataList = userThaaliSignupArr;
    			jsonData = JSON.stringify(jsonData);//we"ll have to stringify the object before sending it over the wire.
    			$.ajax({
    				url:url,
    				dataType:'json',
    				data: jsonData,
    				contentType: "application/json",
    				type:'POST',
    				success:function(){
    					display(successMsg);
    				},
    				error: function(){
    					display(errorMsg);    				
    				}
    			});
    		}
    		userThaaliSignupArr = new Array(); //reset it to blank once everything is updated in the database.
    	});

		
	}else{
		$('#thaaliCalendarErrorCallout').html("<h4>An error has occurred!</h4><p>Service is unavailable at this time. Please try again later</p>");
		$('#thaaliCalendarErrorCallout').show();
	}
	
	
}


/**
 * Event handler triggered on click.
 * @param obj
 */
toggleButtonOnClick = function(obj){
	var isDisabled = $(obj).attr('isDisabled');
	var miqaat = $(obj).attr('miqaat');
	var buttonId = "#" + $(obj).attr('id');
	var numberInputId = buttonId + "NumberInput"; //Used only for miqaats
	if(isDisabled === "false"){
		var thaaliDataObj = {};
		var thaaliDate =  $(obj).attr('thaaliDate');
		
		var btnValue =  $(buttonId)[0].value;
		//we need to toggle the button values..
		if(btnValue === thaaliNotReq){
			$(buttonId)[0].value = thaaliRequested; //user friendly message
			$(buttonId).jqxToggleButton({template:requestedButtonTemplate}); //apply a suitable template based on the user request
			thaaliDataObj.userThaaliStatus = "REQUESTED_BY_USER"; //save the status to be upated server side.
			thaaliRequestStateArr[buttonId] = thaaliRequested; //save the thaali state for later use.
			if(miqaat === "true"){
				thaaliDataObj.numOfPplAttending = $(numberInputId).jqxFormattedInput('value');
				
			}else{
				thaaliDataObj.numOfPplAttending = 0;
			}
		}else{
			$(buttonId)[0].value = thaaliNotReq;	
			$(buttonId).jqxToggleButton({template:notRequestedButtonTemplate});
			thaaliDataObj.userThaaliStatus = "NOT_REQUESTED_BY_USER";
			thaaliRequestStateArr[buttonId] = thaaliNotReq;
			thaaliDataObj.numOfPplAttending=0;
		}
		thaaliDataObj.thaaliDate = new Date(thaaliDate);
		thaaliDataObj.userThaaliDate = getFormattedDate(new Date(thaaliDate)); //since the date coming back is a string.
		thaaliDataObj.thaaliCategory = $(obj).attr('category');
		
		//Updating the array of thaali data objects.
		//userThaaliSignupArr.push(thaaliDataObj);
		//We will now save individual rows instead of a big-bang
		
		updateUserThaaliData(thaaliDataObj);
	}else{
		//Depending upon the screen size we also need to display the message why it is disabled..
		var msg = $(obj).attr('message');
		var toolTipId = buttonId+"toolTip";
		$(toolTipId).jqxTooltip({
			position : 'top',
			content : msg,
			theme : themeName
		});
	}
}


toggleUserThaaliStatus = function(jqxButtonArr){
  if(jqxButtonArr != null && jqxButtonArr.length > 0){
	  for(var i =0;i<jqxButtonArr.length;i++){
		  var jqxButtonObj = jqxButtonArr[i];
		  $("#"+jqxButtonObj.buttonId).jqxToggleButton({ width: '85%', height: '50%', toggled: true, disabled: jqxButtonObj.disabled, roundedCorners: 'all', template: jqxButtonObj.buttonTemplate});
		  //$("#"+jqxButtonObj.buttonId).jqxSwitchButton({ width: '75%', height: '40%',  theme: themeName, disabled: jqxButtonObj.isDisabled, onLabel: jqxButtonObj.userStatus});
	  }	  
  }
  
  	
}

/**
 * Method that will be used to update the user thaali data.
 * @param userThaaliDataObj
 */
updateUserThaaliData = function(userThaaliDataObj){	
	var userThaaliSignupArr = new Array();
	userThaaliSignupArr.push(userThaaliDataObj);
	//Updating DB only when there is something to update.
	var url=user_thaali_update_service_url;
	var jsonData = new Object(); 
	//Populating the json object..
	var mRowArr =  new Array();
	jsonData.eJamaatId = getEjamaatId();
	jsonData.password = getPassword();
	
	jsonData.dataList = userThaaliSignupArr;
	jsonData = JSON.stringify(jsonData);//we"ll have to stringify the object before sending it over the wire.
	$.ajax({
		url:url,
		dataType:'json',
		data: jsonData,
		contentType: "application/json",
		type:'POST',		
		error: function(){
			display(errorMsg);    				
		}
	});
}

/****************** Email functionality ****************************/

validateEmailForm = function(){
	
    $('#emailForm').validate({
	    rules: {
	    	subject: {
                required: true
            },
            messageBody: {
                required: true
            },
            mailToType: {
            	required: true
            }
	    },
	    
	    highlight: function(element) {
	        $(element).closest('.form-group').removeClass('success').addClass('has-error');
	    },
	    
	    messages: {
	    	subject: {
	    		required: "Please enter a Subject for the email."
	    	},	    	
	    	messageBody: {
	    		required: "Message body cannot be blank."
	    	},
	    	mailToType: {
	    		required: "Please select an email recipient."
	    	}
		}
	});
}

sendEmail = function(emailTemplateName) {
	$('#jamaatName').html(jamaatName);
	if(emailTemplateName == "FMB"){
		$('#subject').val("[Faiz-Al-Mawaid Al-Burhaniyah, "+jamaatName+ "]");		
		//default this should be enabled.
		$('#msgBodyDiv').html("");
		$('#msgBodyDiv').load("thaaliReminderContent.html");		
	}else{
		$('#subject').val("[" + jamaatName+ "]");
	}
	
	
	//we need to decide which text-area to enable based on the radio button clicked.
	$('#thaaliReminder').on('click', function () {
		$('#msgBodyDiv').html("");
		$('#msgBodyDiv').load("thaaliReminderContent.html");
	});
	
	$('#rotiReminder').on('click', function () {
		$('#msgBodyDiv').html("");
		$('#msgBodyDiv').load("rotiReminderContent.html");
	});
	
	$('#general').on('click', function () {
		$('#msgBodyDiv').html("");
		$('#msgBodyDiv').load("generalContent.html");
	});
	
	$('#sendEmail').on('click', function() {
		// We need to validate the feedback form before submitting it.
		validateEmailForm();

		var isValid = $('#emailForm').valid();
		if (isValid) {
			// reset the error classes..
			$('div').removeClass('has-error');

			var subject = $('#subject').val();
			var message = $('#messageBody').val();
			var mailToType = $('#mailToType').val();

			// Need to send the data over the wire to be saved in the db.
			var jsonData = {};
			jsonData.eJamaatId = getEjamaatId();
			jsonData.password = getPassword();

			var email = {
				body : message,
				bodyContentType : $('#imgLoc').val(), //"text/html", 
				subject : subject,
				mailTo : mailToType,
				emailType: emailTemplateName
			};

			// Creating an array of email, since the server accepts the data
			// as a
			// list.
			var emails = new Array();
			emails.push(email);

			jsonData.dataList = emails;
			var jsonStr = JSON.stringify(jsonData);

			var url = sendEmail_url;
			var dataObj = handleAjax("POST", url, jsonStr);
			if (!dataObj.error) {
				// display success popup..
				$('#emailErrorCallout').hide();
				$('#emailSuccessCallout').show();

			} else {
				$('#emailErrorCallout').show();
				$('#emailSuccessCallout').hide();
			}
		}

		return false;// need to always return false.
	});
}


/****************************** Miqaat Count functionality starts here *************************************************************************/

onLoadMiqaatCount = function(){ 

	var gridName = "#jqxMiqaatCountGrid";
	var num_of_days_to_Advance = 30; //user thaali count 
	 //Initializing a popup window, we would need this to display any success/error messages.
	$("#miqaatCountMsgPopup").jqxWindow({ width: 500, height: 100 , autoOpen:false, theme:themeName});
	
   //Will have to check the isError attribute on the response object returned before proceeding any further.
   
   //get the service url
   var currentDate = new Date();
   var toDate =  new Date();
   var yesterday = new Date();	
   var initialRowsLoadedFromDatabase = -1; 
   
   yesterday.setDate(yesterday.getDate() - 1);
   toDate.setDate(toDate.getDate() + num_of_days_to_Advance);
   
   //From date
   $("#fromDate").datepicker({"format": "mm/dd/yyyy"});
   $("#fromDate").attr("value",getFormattedDate(new Date()));
	 
   //To date
   $("#toDate").datepicker({"format": "mm/dd/yyyy"});   
   $("#toDate").attr("value",getFormattedDate(toDate));

   $('#fromDate').datepicker()
  	.on('changeDate', function(e){
  		//hide the datepicker
  		$("#fromDate").datepicker('hide');
   });
  
   $('#toDate').datepicker()
 	.on('changeDate', function(e){
 		//hide the datepicker
 		$("#toDate").datepicker('hide');
   });
  
   // prepare the data
   var source =
   {
       //json/xml doesn't matter
       datatype: "json",
       datafields: [         
           { name: 'thaaliDate', type: 'date', format: 'yyyy-MM-dd'},
           { name: 'numOfPpl', type:'string'},           
           { name: 'approxNumOfThaals', type:'string'},
           { name: 'miqaatInstructions', type: 'string' }          
       ],
       url: createThaaliCountGetUrl(currentDate, toDate),  
       sortcolumn: 'thaaliDate',
       sortdirection: 'asc'
   };
   
   getDataAdapter = function(source){
   	var dataAdapter = new $.jqx.dataAdapter(source,{
       	loadError: function(jqXHR, status, error){
       		display(server_error_msg);
       	},
       	//This method will get invoked when the data is returned from the server.
       	downloadComplete: function (edata, textStatus, jqXHR){
       		if(edata.error == true){
       			//An error has occurred.
       			display(server_error_msg);
       		}
       	}   	
       	
       });
   	return dataAdapter;
   };
   

   //Need to align the column heading  in the center
   var columnsrenderer = function (value) {
   	return '<div style="text-align: center; margin-top: 5px;">' + value + '</div>';
   }
    
   getMiqaatCountTblHdr = function(){	  
	   return miqaatCountTblHdr;
   }
             
   $(gridName).jqxGrid(
   {	
   	   source: getDataAdapter(source),
   	   theme: themeName,
   	   autorowheight:true,
   	   altrows: true,
   	   width: '100%',
   	   autorowheight:true,
       height: getHeight(),
       pageable: true,
       rowsheight: 40,
       columnsresize:true, 
       columnsheight: columnsHeight,
       editable: true,
       pagesize: getPageSize(),
       columns: [
           { text: getMiqaatCountTblHdr().MIQAAT_DATE, datafield: 'thaaliDate', renderer: columnsrenderer, width: '30%', cellsalign: 'center', editable: false, cellsformat: 'D'}, 
           { text: getMiqaatCountTblHdr().MUMINEEN_COUNT, datafield: 'numOfPpl', renderer: columnsrenderer, cellsalign: 'center',   width: '15%', editable: false },
           { text: getMiqaatCountTblHdr().APPROX_THAALS, datafield: 'approxNumOfThaals', renderer: columnsrenderer, cellsalign: 'center',   width: '15%', editable: false },       
           { text: getMiqaatCountTblHdr().INSTRUCTIONS, datafield: 'miqaatInstructions', renderer: columnsrenderer, cellsalign: 'center',   width: '40%', editable: false }        
           
       ]
   });
   
   
   //Defining the fromDate field
  // $("#fromDate").jqxDateTimeInput({width: '250px', height: '25px', formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
   
   
   //Defining the toDate field
   //$("#toDate").jqxDateTimeInput({width: '250px', height: '25px', value: toDate, formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
     
   
   
   
   //Defining a custom validator for the date field's
   $('#miqaatCountForm').jqxValidator({
	   hintType: 'label',
   	onSuccess: function () {
   		//var fromDate = $('#fromDate').jqxDateTimeInput('value');
   		//currentDate = $('#fromDate').jqxDateTimeInput('value');
        //toDate = $('#toDate').jqxDateTimeInput('value');
        
   		currentDate = new Date($('#fromDate').val());
   		toDate = new Date($('#toDate').val());
        
       	//On success we need to refresh the thaali data.
        source.url = createThaaliCountGetUrl(currentDate, toDate);
        $(gridName).jqxGrid('updatebounddata');         
   		
   	},
   	rules: [            
       { 
       	input: '#fromDate', message: 'Invalid Date. From Date cannot be greater than To Date.', action: 'valuechanged', rule:  function (input, commit){
           //var fromDate = $('#fromDate').jqxDateTimeInput('value');
           //var toDate = $('#toDate').jqxDateTimeInput('value');
           
           var fromDate = new Date($('#fromDate').val());           
           var toDate = new Date($('#toDate').val());
           
           if(fromDate != null && toDate != null){
           	if(fromDate.getTime() > toDate.getTime()){
           		return false;
           	}
           }else{
           	return false;
           }
           return true;            	
       } 
       },                                   
       
       { input: '#toDate', message: 'Invalid Date. To Date cannot be smaller than From Date.', action: 'valuechanged', rule:  function (input, commit){
           //var fromDate = $('#fromDate').jqxDateTimeInput('value');
           //var toDate = $('#toDate').jqxDateTimeInput('value');
    	   
    	   var fromDate = new Date($('#fromDate').val());
           var toDate = new Date($('#toDate').val());
           
           if(fromDate != null && toDate != null){
           	if(fromDate.getTime() > toDate.getTime()){
           		return false;
           	}
           }else{
           	return false;
           }
           return true;            	
       }  
       }]                            
   });
   
   //We would need to validate the form (one with fromDate and toDate, before refreshing data from the server)
   $('#refreshMiqaatCountButton').on('click', function () {
       $('#miqaatCountForm').jqxValidator('validate');                                
   });
   
}
/*
 * beforeLoadComplete: function (records,oData){ var pivotTable = new Array();
 * //We need to pivot the table based on the size of the window. if(oData !=
 * null && oData.dataList != null){ records = oData.dataList; for (var i = 0; i <
 * records.length; i++) { var oRecord = records[i]; //Each record needs to be
 * pivoted into the below records. var pivotRecords =
 * [{columnName:"Menu",columnValue:''}, {columnName:"Thaali
 * Date",columnValue:''}, {columnName:"Thaali Requested",columnValue:''}
 * {columnName:"Category",columnValue:''}]; //We need to convert this one record
 * into multiple records. Since we need to pivot the table.
 * pivotRecords[0].columnValue = oRecord.menu; pivotRecords[1].columnValue =
 * oRecord.thaaliDate;
 * 
 * //This is done to show user a more use friendly thaali status rather than
 * showing var userStatus = oRecord.userThaaliStatus; if(userStatus ==
 * user_thaali_status[0]){ //requested by user userStatus =
 * user_thaali_status_ui[0]; }else{ //not requested by user userStatus =
 * user_thaali_status_ui[1]; } pivotRecords[2].columnValue = userStatus;
 * pivotRecords[3].columnValue = userThaaliCategory; //Adding all together.
 * pivotTable = pivotTable.concat(pivotRecords); }
 *  } return pivotTable; }
 */
