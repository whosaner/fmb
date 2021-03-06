/** Initializing variables **/
//var userProfile = {ejamaatId:"30308654",password:"test1234", firstName: 'Hussain', userRole: "SUPER_USER"};
var server_url = "http://localhost:8080/ajf/rest";

//thaali services
var admin_thaali_get_service_url=server_url+"/thaali/getThaaliData";

//admin specific services
var admin_thaali_update_service_url = server_url+"/admin/updateThaaliData";
var add_menu_service_url=server_url+"/admin/addMenu";
var add_region_service_url=server_url+"/admin/addRegion";
var user_feedback_service_url=server_url+"/admin/getFeedback";
var all_user_profile_service_url=server_url+"/admin/getAllUserProfileData";
var profile_create_service_url = server_url+"/admin/createProfile";

//User specific services
var user_thaali_update_service_url = server_url+"/user/updateThaaliData";
var user_thaali_get_service_url=server_url+"/user/getThaaliData";
var all_user_thaali_get_service_url=server_url+"/user/getAllUserThaaliData";
var profile_get_service_url=server_url+"/profile/getProfile";
var profile_update_service_url=server_url+"/profile/updateProfile";
var submit_feedback_service_url = server_url+"/user/submitFeedback";


//misc services
var get_menu_service_url=server_url+"/misc/getMenu";
var get_region_service_url=server_url+"/misc/getRegion";
var thaali_count_service_url=server_url+"/misc/getThaaliCount";

var msg_on_thaali_frozen = "No more Thaali Request's can be made for the particular day. Please contact M. Adnan bhai Khambaty.";
var on_delete_error_msg = 'You can only edit but not remove any existing thaali day present in the system.'
var server_error_msg = 'An error has occurred while getting the data from the server. The error returned from the server is :';

var allowed_thaali_status = ["THAALI_PRESENT","THAALI_NOT_PRESENT"];
var allowed_thaali_status_ui = ["Yes","No"];

var user_thaali_status=["REQUESTED_BY_USER","CANCELLED_BY_USER","NOT_REQUESTED_BY_USER"];
var user_thaali_status_ui = ["Yes","No"];
var user_thaali_category = ["Small","Medium","Large"];
var num_of_days_to_Advance = 21; //Upper bound on the num of days thaali data that would be visible, if toDate is not specified

var thaaliTblHeaders = {THAALI_MADE_BY:"Thaali Pakawnaar",MENU:"Menu", INSTRUCTIONS: "Instructions (If any)", THAALI_STATUS: "Status", THAALI_DATE: "Date", VISIBLE: "Visible to Jamaat"};
var userThaaliTblHeaders = {MENU:"Menu", THAALI_STATUS: "Thaali Available for the day", THAALI_DATE: "Thaali Date", THAALI_CATEGORY: "Category", USER_THAALI_STATUS: "Thaali Requested"};
var allUserThaaliTblHeaders = {FIRSTNAME:"First Name", FAMILY_NAME:"Family Name", LOCATION:"Region"};
var userFeedbackTblHeaders={THAALI_DATE:"Thaali date",FEEDBACK_CREATION_DATE:"Creation Date", FIRSTNAME:"First Name", FAMILYNAME:"Family Name",FEEDBACK_COMMENTS:"Comments", THAALI_MENU:"Thaali Menu", THAALI_QLTY:"Quality", THAALI_QTY:"Quantity",THAALI_CATEGORY:"Category"};
var thaaliCountTblHdr = {THAALI_DATE:"Date",SMALL_THAALI:"Small Thaali Count", MEDIUM_THAALI:"Medium Thaali Count", LARGE_THAALI:"Large Thaali Count", JAMAN_QTY: "Jaman Qty in quarts", RICE_CUPS: "Num Of Rice cups (8oz)"};

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
                        ["listThaaliSignups","listThaaliSignups.html"],["registerNewUser","registerNewUser.html"],["addMenu","addMenu.html"],["thaaliInformation","thaaliSchedule.html"],["viewFeedback","viewFeedback.html"],["thaaliCalendar","thaaliCalendar.html"],["thaaliCount","thaaliCount.html"]];

//Related to the Visible functionality.
var visible_to_users=["Yes","No"];

var defaultCookName = "TBD";
var allowedDiffBetweenDays = 7;

var date_error_msg = "Invalid Date. From Date cannot be greater than To Date.";
var welcomeMessage = "Baad Salam-il Jameel ";

var thaali_pakawnaar = ["Taher bhai Adenwala","Khadija Behen Rangwala","Durriya ben Chinwala", "Zainab ben Contractor", "Umema ben Kothari", "Tasneem ben Mithaiwala", "Zainab ben Dohadwala", "Farzana ben(Caterer)", "Jumana ben Shakir"];

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
    		$.cookie(cookieName,userProfile);
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
	$.removeCookie(cookieName);
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
			var offset = $("#jqxAdminThaaliDataGrid").offset();
		    //Initializing a popup window, we would need this to display any success/error messages.
    		$("#thaaliScheduleMsgPopup").jqxWindow({ width: 500, height: 100 ,  autoOpen:false, theme:themeName});
    		//$("#thaaliScheduleMsgPopup").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60},  theme:themeName });
	        //Will have to check the isError attribute on the response object returned before proceeding any further.
	        
	        //get the service url
		    var currentDate = new Date();
		    var toDate =  new Date();
		    var yesterday = new Date();
		    var initialRowsLoadedFromDatabase = -1;
		    
		    yesterday.setDate(yesterday.getDate() - 1);
		    toDate.setDate(toDate.getDate() + num_of_days_to_Advance);
            var url = createAdminThaaliDataGetUrl(currentDate, toDate);

            //source for getting the menu
            var menuUrl = get_menu_service_url+"?ejamaatId="+getEjamaatId()+"&password="+getPassword();
            var menuSource = {
                    datatype: "json",
                    datafields: [
                        { name: 'menu', type: 'string' },
                    ],
                    url: menuUrl
            };
            // prepare the data
            var source =
            {
                //json/xml doesn't matter
                datatype: "json",
                datafields: [
                    { name: 'coookName', type: 'string' },
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
            
            var menuAdapter = new $.jqx.dataAdapter(menuSource);
            
            var dataAdapter = new $.jqx.dataAdapter(source,{
            	loadError: function(jqXHR, status, error){
            		$("#thaaliScheduleMsgContent").html(server_error_msg + error);
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
            	altrows: true,
            	width: '100%',
                height: '60%',
                source: dataAdapter,
                pageable: true,
                rowsheight: 35,  
                pagesize: 7,
                editable: true,
                columns: [
                    { text: thaaliTblHeaders.THAALI_MADE_BY, datafield: 'coookName', renderer: columnsrenderer,  cellsalign: 'center', width: '15%', columntype: 'combobox',
                        createeditor: function (row, column, editor) {
                            // assign a new data source to the combobox.
                            editor.jqxComboBox({source:thaali_pakawnaar,displayMember: "coookName", valueMember: "coookName", autoDropDownHeight: true, promptText: "Please Choose a Thaali Pakawanaar or Enter one:" });
                        },
                        // update the editor's value before saving it.
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            // return the old value, if the new value is empty.
                            if (newvalue == "") return oldvalue;
                        } 
                    },
                    { text: thaaliTblHeaders.MENU, datafield: 'menu', renderer: columnsrenderer, cellsalign: 'center',   width: '20%', columntype: 'combobox',
                        createeditor: function (row, column, editor) {
                            // assign a new data source to the combobox.
                            editor.jqxComboBox({source:menuAdapter,displayMember: "menu", valueMember: "menu", autoDropDownHeight: true, promptText: "Please Choose a Menu or Enter one:" });
                        },
                        // update the editor's value before saving it.
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            // return the old value, if the new value is empty.
                            if (newvalue == "") return oldvalue;
                        }
                        
                    },
                    { text:  thaaliTblHeaders.INSTRUCTIONS, datafield: 'instructions', renderer: columnsrenderer, cellsalign: 'center',  width: '20%' },
                    { text: thaaliTblHeaders.THAALI_STATUS, datafield: 'status', renderer: columnsrenderer, cellsalign: 'center',  width: '15%', columntype: 'dropdownlist',
                        createeditor: function (row, column, editor) {
                            // assign a new data source to the dropdownlist.
                            var list = allowed_thaali_status;
                            editor.jqxDropDownList({ autoDropDownHeight: true, source: list });
                        },
                        // update the editor's value before saving it.
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            // return the old value, if the new value is empty.
                            if (newvalue == "") return oldvalue;
                        }
                    },
                    { text: thaaliTblHeaders.THAALI_DATE, datafield: 'thaaliDateEntered', renderer: columnsrenderer, width: '20%', cellsalign: 'center', editable: false, cellsformat: 'D'},
                    { text: thaaliTblHeaders.VISIBLE, datafield: 'visible', renderer: columnsrenderer, cellsalign: 'center',   width: '10%', columntype: 'dropdownlist',
                        createeditor: function (row, column, editor) {
                            // assign a new data source to the dropdownlist.
                            var list = visible_to_users;
                            editor.jqxDropDownList({ autoDropDownHeight: true, source: list });
                        },
                        // update the editor's value before saving it.
                        cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            // return the old value, if the new value is empty.
                            if (newvalue == "") return oldvalue;
                        }
                    }
                ]
            });
            
          
           
            
            //Defining the fromDate field
            $("#fromDate").jqxDateTimeInput({width: '250px', height: '25px', formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
            
            //Defining the toDate field
            $("#toDate").jqxDateTimeInput({width: '250px', height: '25px', value: toDate, formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
            
            //Defining a custom validator for the date field's
            $('#adminDateFieldForm').jqxValidator({
            	hintType: 'label',
            	onSuccess: function () {
            		var fromDate = $('#fromDate').jqxDateTimeInput('value');
                    var toDate = $('#toDate').jqxDateTimeInput('value');
                	//On success we need to refresh the thaali data.
            		source.url =  createAdminThaaliDataGetUrl(fromDate, toDate);
                    $("#jqxAdminThaaliDataGrid").jqxGrid('updatebounddata');
            		
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
            $('#refreshAdminDataButton').on('click', function () {
                $('#adminDateFieldForm').jqxValidator('validate');                                
            });

            /************* Add ROW Functionality starts ************************************************/
            
            var generateRow  = function(dateObj){
            	var row = {};
            	var newDate = new Date();
            	newDate.setTime(dateObj.getTime());
            	row["coookName"] = defaultCookName;
            	row["menu"] = "TBD";
            	row["instructions"] = ""; //Nothing by default
            	row["status"] = allowed_thaali_status[0]; //THAALI_PRESENT by default
            	row["thaaliDateEntered"] = newDate;
            	row["visible"] = "No";
            	//For new rows adding the user name
            	row["adminName"] = getFirstName();
            	
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
            			mRow.coookName = rows[i].coookName;
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
 */
onLoadUserThaaliView = function(){
	
	 //Initializing a popup window, we would need this to display any success/error messages.
	$("#thaaliViewMsgPopup").jqxWindow({ width: 500, height: 100 , autoOpen:false, theme:themeName});
	
    //Will have to check the isError attribute on the response object returned before proceeding any further.
    
    //get the service url
    var currentDate = new Date();
    var toDate =  new Date();
    var yesterday = new Date();
    var initialRowsLoadedFromDatabase = -1;
    
    yesterday.setDate(yesterday.getDate() - 1);
    toDate.setDate(toDate.getDate() + num_of_days_to_Advance);
    
    //var url = createUserThaaliDataGetUrl(currentDate, toDate);

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
    
    getDataAdapter = function(source){
    	var dataAdapter = new $.jqx.dataAdapter(source,{
        	loadError: function(jqXHR, status, error){
        		$("#thaaliViewMsgContent").html(server_error_msg + error);
            	$("#thaaliViewMsgPopup").jqxWindow('open');
        	},
        	//This method will get invoked when the data is returned from the server.
        	downloadComplete: function (edata, textStatus, jqXHR){
        		if(edata.error == true){
        			//An error has occurred.
        			$("#thaaliViewMsgContent").html(server_error_msg + edata.message);
                	$("#thaaliViewMsgPopup").jqxWindow('open');
        		}
        	},
        	beforeLoadComplete: function (records){
        		var data = new Array();
        		if(records != null && records.length > 0){
               		for (var i = 0; i < records.length; i++) {
            			var record = records[i]; 
            			var status = record.thaaliStatus;
            			if(status != null){
            				//This is done to show user a more use friendly thaali status rather than showing THAALI_PRESENT and THAALI_NOT_PRESENT
                			if(status == allowed_thaali_status[0]){
                				//means thaali is present
                				record.thaaliStatusUI = allowed_thaali_status_ui[0];
                			}else{
                				record.thaaliStatusUI = allowed_thaali_status_ui[1];
                			}
                			
                			//This is done to show user a more use friendly thaali status rather than showing
                			var userStatus = record.userThaaliStatus;    			
                			if(userStatus == user_thaali_status[0]){
                				//requested by user
                				record.userThaaliStatusUI = user_thaali_status_ui[0];
                			}else{
                				//not requested by user
                				record.userThaaliStatusUI = user_thaali_status_ui[1];
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
    
    
    
              
    $("#jqxUserThaaliDataGrid").jqxGrid(
    {	
    	source: getDataAdapter(source),
    	theme: themeName,
    	altrows: true,
    	width: '100%',
        height: '100%',
        pageable: true,
        rowsheight: 35, 
        columnsheight: 40,
        editable: true,
        pagesize: 7,
        columns: [
            { text: userThaaliTblHeaders.MENU, datafield: 'menu', renderer: columnsrenderer, cellsalign: 'center',   width: '25%', editable: false },
            { text: userThaaliTblHeaders.THAALI_DATE, datafield: 'thaaliDate', renderer: columnsrenderer, width: '25%', cellsalign: 'center', editable: false, cellsformat: 'D'},            
            { text: userThaaliTblHeaders.THAALI_STATUS, datafield: 'thaaliStatusUI', renderer: columnsrenderer, cellsalign: 'center',  width: '15%', editable: false },
            { text: userThaaliTblHeaders.USER_THAALI_STATUS, datafield: 'userThaaliStatusUI', renderer: columnsrenderer, cellsalign: 'center',  width: '15%', columntype: 'dropdownlist',
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
               		    /*Below code will provide a background
               		     * var element = $(cell);
               		    element.css({ 'background-color': 'LightGray', 'width': '100%', 'height': '100%', 'margin': '0px' });
                        return element[0].outerHTML;*/
               		    return cell;
            		}
            		return defaulthtml;
            		
                },
            	
                createeditor: function (row, column, editor) {                	
                    // assign a new data source to the dropdownlist.
                    var list = user_thaali_status_ui;
                    editor.jqxDropDownList({ autoDropDownHeight: true, source: list });
                },
                // update the editor's value before saving it.
                cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                    // return the old value, if the new value is empty.
                    if (newvalue == "") return oldvalue;
                }
            },
            { text: userThaaliTblHeaders.THAALI_CATEGORY, datafield: 'userThaaliCategory', renderer: columnsrenderer, cellsalign: 'center',   width: '20%', columntype: 'dropdownlist',
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
               		    /*var element = $(cell);
               		    element.css({ 'background-color': 'LightGray', 'width': '100%', 'height': '100%', 'margin': '0px' });
                        return element[0].outerHTML;*/
               		    return cell;
            		}
            		return defaulthtml;
                    
                },
                
                createeditor: function (row, column, editor) {
                    // assign a new data source to the dropdownlist.
                    var list = user_thaali_category;
                    editor.jqxDropDownList({ autoDropDownHeight: true, source: list });
                },
                // update the editor's value before saving it.
                cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                    // return the old value, if the new value is empty.
                    if (newvalue == "") return oldvalue;
                }
            },
            { text: '', datafield: 'locked', editable: false , hidden:true},
            { text: '', datafield: 'thaaliInstructions', editable: false , hidden:true}
            
        ]
    });
    
    //This method would make sure we dont let the user edit any fields if the Thaali Data is frozen for that day.
    $("#jqxUserThaaliDataGrid").bind('cellbeginedit', function (event) {
    	var rowData =  $("#jqxUserThaaliDataGrid").jqxGrid('getrowdata', args.rowindex);
    	var isLocked = rowData.locked;
        var column = args.datafield;
        var row = args.rowindex;
        var value = args.value;
        var msg = msg_on_thaali_frozen;
        var thaaliNotAvailable = false; //by default thaali will always be avilable for the day unless marked as NO.
        // condition follows
        
   	
        if(rowData.thaaliStatusUI == "No"){
        	 //In case if Thaali is not present for the day, we still need to disable the said columns and also thaali requested field should be automatically marked as NO.            
        	thaaliNotAvailable = true;
        	msg = rowData.thaaliInstructions;
        }
        if (isLocked == true || thaaliNotAvailable == true) {
             $("#jqxUserThaaliDataGrid").jqxGrid('endcelledit', row, column, true);
             if(column ==  "userThaaliStatusUI"){
            	 var id = "#statusToolTip"+row;            	 
            	 $(id).jqxTooltip({position:'top', content: msg, theme: themeName });
             }
             else if(column == "userThaaliCategory"){
            	 var id = "#thaaliCategoryToolTip"+row;
            	 $(id).jqxTooltip({position:'top', content: msg, theme: themeName });
             }
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
    	if(rowscount > 0){
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
    			var record = rows[i];
    			//Creating a new user thaali data object.
    			var userRecord = new Object();    			
    			
    			//This is done to show user a more use friendly thaali status rather than showing
    			var mUserThaaliStatus = record.userThaaliStatusUI; //Thaali Status that might have been modified by the User
    			
    			if(mUserThaaliStatus == user_thaali_status_ui[0]){
    				//Means User has selected thaali for that particular date.
    				userRecord.userThaaliStatus = user_thaali_status[0];
    			}
    			else {
    				//Means user has not requested thaali's
    				userRecord.userThaaliStatus = user_thaali_status[2];
    			}
    			
    			userRecord.thaaliDate = record.thaaliDate;
    			userRecord.thaaliCategory = record.userThaaliCategory;
    			
    			mRowArr.push(userRecord);
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
    				$("#thaaliViewMsgContent").html(successMsg);
                	$("#thaaliViewMsgPopup").jqxWindow('open');
    			},
    			error: function(){
    				$("#thaaliViewMsgContent").html(errorMsg);
                	$("#thaaliViewMsgPopup").jqxWindow('open');
    			}
    			
    		});
    	}

    });
	
}




/****************************** Thaali Count functionality starts here *************************************************************************/

onLoadThaaliCount = function(){

	var gridName = "#jqxThaaliCountGrid";
	var num_of_days_to_Advance = 7; //user thaali count by default to display only 7 days.
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
   
   //var url = createUserThaaliDataGetUrl(currentDate, toDate);

   // prepare the data
   var source =
   {
       //json/xml doesn't matter
       datatype: "json",
       datafields: [         
           { name: 'thaaliDate', type: 'date', format: 'yyyy-MM-dd'},    
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
       		$("#thaaliCountMsgContent").html(server_error_msg + error);
           	$("#thaaliCountMsgPopup").jqxWindow('open');
       	},
       	//This method will get invoked when the data is returned from the server.
       	downloadComplete: function (edata, textStatus, jqXHR){
       		if(edata.error == true){
       			//An error has occurred.
       			$("#thaaliCountMsgContent").html(server_error_msg + edata.message);
               	$("#thaaliCountMsgPopup").jqxWindow('open');
       		}
       	}   	
       	
       });
   	return dataAdapter;
   };
   

   //Need to align the column heading  in the center
   var columnsrenderer = function (value) {
   	return '<div style="text-align: center; margin-top: 5px;">' + value + '</div>';
   }
      
             
   $(gridName).jqxGrid(
   {	
   	source: getDataAdapter(source),
   	theme: themeName,
   	altrows: true,
   	width: '100%',
       height: '100%',
       pageable: true,
       rowsheight: 35, 
       columnsheight: 40,
       editable: true,
       pagesize: 7,
       columns: [
           { text: thaaliCountTblHdr.THAALI_DATE, datafield: 'thaaliDate', renderer: columnsrenderer, width: '25%', cellsalign: 'center', editable: false, cellsformat: 'D'},       
           { text: thaaliCountTblHdr.SMALL_THAALI, datafield: 'numOfSmallThaalis', renderer: columnsrenderer, cellsalign: 'center',   width: '15%', editable: false },
           { text: thaaliCountTblHdr.MEDIUM_THAALI, datafield: 'numOfMediumThaalis', renderer: columnsrenderer, cellsalign: 'center',   width: '15%', editable: false },
           { text: thaaliCountTblHdr.LARGE_THAALI, datafield: 'numOfLargeThaalis', renderer: columnsrenderer, cellsalign: 'center',   width: '15%', editable: false },
           { text: thaaliCountTblHdr.JAMAN_QTY, datafield: 'jamanQty', renderer: columnsrenderer, cellsalign: 'center',   width: '15%', editable: false },
           { text: thaaliCountTblHdr.RICE_CUPS, datafield: 'numOfRiceCups', renderer: columnsrenderer, cellsalign: 'center',   width: '15%', editable: false }         
           
       ]
   });
   
   
   //Defining the fromDate field
   $("#fromDate").jqxDateTimeInput({width: '250px', height: '25px', formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
   
   //Defining the toDate field
   $("#toDate").jqxDateTimeInput({width: '250px', height: '25px', value: toDate, formatString: "dddd, MMMM dd, yyyy", enableBrowserBoundsDetection: true, theme:themeName});
   
   //Defining a custom validator for the date field's
   $('#thaaliCountForm').jqxValidator({
	   hintType: 'label',
   	onSuccess: function () {
   		//var fromDate = $('#fromDate').jqxDateTimeInput('value');
   		currentDate = $('#fromDate').jqxDateTimeInput('value');
        toDate = $('#toDate').jqxDateTimeInput('value');
       	//On success we need to refresh the thaali data.
        source.url = createThaaliCountGetUrl(currentDate, toDate);            
        $(gridName).jqxGrid('updatebounddata');         
   		
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
   toDate.setDate(toDate.getDate() + 1); //advancing one day ahead from currentdate.
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
   
   createDynamicColumns = function(){
	   var columns = new Array();
	   var numOfdynamicCols = columnNames.length; 
	   
	   var defWidth = "";
	   if(numOfdynamicCols == 0){
		   defWidth = 100/3 +'%';
	   }else{
		   defWidth = "20%"; //always 20%.
	   }
		   
	   var location =  { text: allUserThaaliTblHeaders.LOCATION, datafield: 'location', renderer: columnsrenderer, cellsalign: 'center',   width: defWidth, editable: false };
	   var fName =  { text: allUserThaaliTblHeaders.FIRSTNAME, datafield: 'firstName', renderer: columnsrenderer, cellsalign: 'center',   width: defWidth, editable: false };
	   var familyName =  { text: allUserThaaliTblHeaders.FAMILY_NAME, datafield: 'familyName', renderer: columnsrenderer, cellsalign: 'center',   width: defWidth, editable: false };
	   
	   columns.push(location);
	   columns.push(fName);
	   columns.push(familyName);
	   
	   defWidth = 40/numOfdynamicCols + '%'; //40% width is remaining if you remove the above 3 columns.
	   for(var i=0;i<columnNames.length;i++){
		   var colName = columnNames[i];
		   var obj = {text: colName, datafield: colName, renderer: columnsrenderer, cellsalign: 'center',   width: defWidth, editable: false };
		   columns.push(obj);
	   }
	   
	   return columns;
	   
   };
   

   
   var dataAdapter = new $.jqx.dataAdapter(source,{
      	loadError: function(jqXHR, status, error){
      		$("#msgContent").html(server_error_msg + error);
          	$("#thaaliViewMsgPopup").jqxWindow('open');
      	},
      	//This method will get invoked when the data is returned from the server.
      	downloadComplete: function (edata, textStatus, jqXHR){
      		if(edata.error == true ){
      			//An error has occurred.
      			$("#msgContent").html(server_error_msg + edata.message);
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
                  			  //populating the column name only the first time.
                  				if(i == 0){
                  					columnNames.push(thaaliDate); //format would be yyyy-mm-dd 
                  				}
                  				if(thaaliDataDayWise.userThaaliStatus == "REQUESTED_BY_USER"){
                  					records[i][thaaliDate] = thaaliDataDayWise.thaaliCategory;               					
                  				}else{
                  					records[i][thaaliDate] = "NO";
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
       height: '100%',
       pageable: true,
       rowsheight: 35, 
       columnsheight: 40,
       editable: true,
       pagesize: 7,
       columns:  [],
       groupable:true,
       groups: ['location']
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
           source.url = createAllUserThaaliDataGetUrl(currentDate, toDate);            
           $("#jqxAllUserThaaliDataGrid").jqxGrid('updatebounddata');   		
   	},
   	rules: [            
       { 
       	input: '#fromDate', message: date_error_msg, action: 'valuechanged', rule:  function (input, commit){
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
       { 
          	input: '#fromDate', message: dat_diff_msg, action: 'valuechanged', rule:  function (input, commit){
              var fromDate = $('#fromDate').jqxDateTimeInput('value');
              var toDate = $('#toDate').jqxDateTimeInput('value');
              
              var timeDiff = Math.abs(fromDate.getTime() - toDate.getTime());
        		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        		if(diffDays > allowedDiffBetweenDays){
        			return false;
        		}        		
        		return true;          	
          } 
       },
          
       
       { input: '#toDate', message: date_error_msg, action: 'valuechanged', rule:  function (input, commit){
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
       
       { input: '#toDate', message: dat_diff_msg, action: 'valuechanged', rule:  function (input, commit){
           var fromDate = $('#fromDate').jqxDateTimeInput('value');
           var toDate = $('#toDate').jqxDateTimeInput('value');
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
				   "familyGroupId":familyGroupId
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
			$('#tDelivery').val(userProfileObj.location);
			$('#userRole').val(userProfileObj.userRole);
		}else{
			dataObj.error = true;
			isError(dataObj);
		}		
	}
	
	   //We need to save the changes in the database, once the user decides to save the changes.
	   $('#userProfileSubmit').on('click', function () {
		    var ejamaatId = $('#ejamaatId').val();
			var hofEjmaatId = $('#hofEjamaatId').val();
			var firstName = $('#firstName').val();
			var familyName = $('#familyName').val();
			var tCategory = $('#tCategory').val();
			var tDelivery = $('#tDelivery').val();
			var userRole = $('#userRole').val();
			
	       //Need to call the ajax service to update the data.  
		   var userProfileUpdatedObj = {
			   "userCredentials":{"eJamaatId":ejamaatId,"password":getPassword()},
			   "hofEJamaatId":hofEjmaatId,
			   "familyName":familyName,
			   "firstName":firstName,
			   "location":tDelivery,
			   "thaaliCategory":tCategory,
			   "userRole":userRole
		    };
		   
		   var jsonStr = JSON.stringify(userProfileUpdatedObj);
		   
		   var updateUrl = profile_update_service_url;
		   dataObj = handleAjax("POST",updateUrl,jsonStr); 
		   if(!isError(dataObj)){
			   //display success popup..
			   $('#profileSuccessCallout').show();	
			   $('#profileErrorCallout').hide();
		   }
		   return false;//need to always return false.
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
        		$("#feedbackMsgContent").html(server_error_msg + error);
            	$("#feedbackMsgPopup").jqxWindow('open');
        	},
        	//This method will get invoked when the data is returned from the server.
        	downloadComplete: function (edata, textStatus, jqXHR){
        		if(edata.error == true){
        			//An error has occurred.
        			$("#feedbackMsgContent").html(server_error_msg + edata.message);
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
    
              
    $("#jqxUserFeedbackGrid").jqxGrid(
    {	
    	source: getDataAdapter(source),
    	theme: themeName,
    	altrows: true,
    	width: '100%',
        height: '100%',
        pageable: true,
        rowsheight: 35, 
        columnsheight: 40,
        editable: true,
        pagesize: 7,
        columns: [
            { text: userFeedbackTblHeaders.FEEDBACK_CREATION_DATE, datafield: 'feedbackCreationDate', renderer: columnsrenderer, cellsalign: 'center',   width: '15%', editable: false,cellsformat: 'D' },
            { text: userFeedbackTblHeaders.THAALI_DATE, datafield: 'thaaliDate', renderer: columnsrenderer, width: '15%', cellsalign: 'center', editable: false, cellsformat: 'D'}, 
            { text: userFeedbackTblHeaders.THAALI_MENU, datafield: 'thaaliMenu', renderer: columnsrenderer, cellsalign: 'center',  width: '10%', editable: false },
            { text: userFeedbackTblHeaders.THAALI_QLTY, datafield: 'qualityRating', renderer: columnsrenderer, cellsalign: 'center',  width: '10%', editable: false },
            { text: userFeedbackTblHeaders.THAALI_QTY, datafield: 'quantityRating', renderer: columnsrenderer, cellsalign: 'center',  width: '10%', editable: false },
            { text: userFeedbackTblHeaders.FEEDBACK_COMMENTS, datafield: 'thaaliFeedback', renderer: columnsrenderer, cellsalign: 'center',  width: '20%', editable: false },
            { text: userFeedbackTblHeaders.FIRSTNAME, datafield: 'firstName', renderer: columnsrenderer, cellsalign: 'center',  width: '10%', editable: false },
            { text: userFeedbackTblHeaders.FAMILYNAME, datafield: 'familyName', renderer: columnsrenderer, cellsalign: 'center',  width: '10%', editable: false }
        ]
    });
       	
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
	}else if(userRole == "ADMIN"){
		$('#thaaliInformation').attr('style','display: none; ');
		$('#listThaaliSignups').attr('style','display: block; ');
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
	var value = $.cookie(cookieName);
	var cookieJsonObj =JSON.parse(value);
	return cookieJsonObj;
}


init = function(){
	//Be default always the user thaali view should be in view.
	toggle('thaaliSignup');
	var userName = welcomeMessage+getUserName();
	//setting the user name on the screen.
	$('#userName').html(userName);
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
	   
	$('#submitFeedback').on('click',function(){
		
		
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
	
	var url = admin_thaali_get_service_url+"?ejamaatId="+getEjamaatId()+"&password="+getPassword()+"&isVisible=true";
	var dataObj = handleAjax("GET",url,""); //getting the thaali data. 
	var background = "#d9edf7"; //#00a65a - green //#d9edf7 - blue //#ffffff
	var redBg = "#f56954";
	var yellowBg = "#f39c12";
	
	if(!dataObj.error){
		$('#thaaliCalendarErrorCallout').hide();
		//We need to initialize the calendar and populate the events array.
		//creating the events array.
		var thaaliList = dataObj.jsonData.dataList;
		var startDate = null;
		var endDate = null;
		var eventsArr =  new Array();
		var cssClass = "eventClass";
		
		for(var i=0;i<thaaliList.length;i++){
			var thaaliData = thaaliList[i];
			var bg = background;
			var title = "";
			//check for first record.
			if(i == 0){
				startDate = thaaliData.thaaliDate;
			}
			
			var event = {};
			
			var eventDate = getUTCDate(thaaliData.thaaliDate);
			event.start  = eventDate;
			
			if(thaaliData.instructions == null || thaaliData.instructions.trim().length == 0){
				thaaliData.instructions == "";
			}
			
			if(thaaliData.status == allowed_thaali_status[1]){
				//means thaali is not present on this day.we need to change the title.				
				title = "<i>No Thaali <br/><small>" + thaaliData.instructions+"</small></i>";
				bg = redBg;				
			}else{
				if(thaaliData.instructions.toLowerCase().indexOf("open") >= 0 ){
					//no thaali pakawnaar for this day, we need to highlight it..
					title = "<i>Need Thaali Karnaar</i>";
					bg = yellowBg;					
				}else{
					title ="<i>"+thaaliData.menu +"<br/><small>"+ thaaliData.instructions +"</small></i>";
					bg = background;
				}
			}
			event.title = title;
			event.backgroundColor = bg;
			event.borderColor = bg;
			event.className= cssClass;
			event.textColor='#606060'; //dark grey color.
			
			//check if it is last record.
			if(i+1 == thaaliList.length){
				//means last record..we need the end date.
				endDate = event.start;
			}
			
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
        });
		
	}else{
		$('#thaaliCalendarErrorCallout').html("<h4>An error has occurred!</h4><p>Service is unavailable at this time. Please try again later</p>");
		$('#thaaliCalendarErrorCallout').show();
	}
	
}











	

