var loggedUserID;

$(document).ready(function () 
{
	//loggedID = window.localStorage.getItem('loggedID');
    //loggedType = window.localStorage.getItem('loggedType');
    
    getUserID();


    $('#formPI').validate({ 
        rules: {
            PIName: {
                required: true,
            },
            PIMobile: {
                required: true,
            },
            PIdateOfBirth: {
                required: true,
            },
            PIAddress: {
                required: true,
            },
            PIMail: {
                required: true,
                email: true
            },
            PIgenderRadio: {
                required: true,
            },
            PINationality: {
                required: true,
            }
        }
    });


});

function getUserID()
{
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/getUserID",
        async: false,
	    cache: true,
        data: {},
                
        success:function(data)
        {
        	window.sessionStorage.setItem('userID', data);
        	loggedUserID = data;
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});
}

function getPIData() 
{
	var Name = document.getElementById('PIName').value;
	var Mobile = document.getElementById('PIMobile').value;
	var Fax = document.getElementById('PIFax').value;
	var DateOfBirth = document.getElementById('PIdateOfBirth').value;
	var Address = document.getElementById('PIAddress').value;
	var Mail = document.getElementById('PIMail').value;
	var Gender;
	var Nationality = document.getElementById('PINationality').value;

	var radios = document.getElementsByName('PIgenderRadio');
	for (var i = 0, length = radios.length; i < length; i++) 
	{
    	if (radios[i].checked) 
    	{
        	Gender = radios[i].value;
	        break;
    	}
    }

	//Photo

	if(Name && Mobile && DateOfBirth && Address && Mail && Gender && Nationality)
		sendPI(Name, Mobile, Fax, DateOfBirth, Address, Mail, Gender, Nationality);
	else
	{
		document.getElementById('errorAlert').style.visibility='visible';
	}

}


function sendPI(Name, Mobile, Fax, DateOfBirth, Address, Mail, Gender, Nationality)
{
	//save Personal Inforamtion
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/setPI",
        async: false,
	    cache: true,
        data: {Name: Name, Mobile: Mobile, Fax: Fax, DateOfBirth: DateOfBirth, Address: Address, Mail: Mail, Gender: Gender, Nationality: Nationality, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
        		sendImage();
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}



document.getElementById('userImage').addEventListener('change', handleFileSelect, false);


function handleFileSelect(evt) 
{
	var files = evt.target.files;

	for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          document.getElementById('selectedImageBase64').src = e.target.result;
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }

}

function sendImage()
{

	var image = document.getElementById('selectedImageBase64').src;

	passImge(image);

}

function passImge(image)
{

	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/setImage",
        async: false,
	    cache: true,
        data: {image: image, userID: loggedUserID},
                
        success:function(data)
        {
        	openPGI();
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}


/////////////////////



function openPGI()
{

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Postgraduate Information</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Starting Date:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PGIstartingDate" placeholder="StartingDate">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Ending Date:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PGIendingDate" placeholder="Ending Date">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Title of qualification awarded:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PGIqualificationAwarded" placeholder="Title of qualification awarded">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Principal subjects or occupational skills covered:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PGIoccupationalSkills" placeholder="Principal subjects or occupational skills covered">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Name and Type of organization providing education and training:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PGIorganizationProvidingEduction" placeholder="Name and Type of organization providing education and training">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Level in national or international classification:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="mail" class="form-control" id="PGIlevelOfNationalClassification" placeholder="Level in national or international classification">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getPI();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="getPGIData()">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;

}


//////////////


function getPI()
{
	//get Personal Information
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/getData",
        data: {userID: loggedUserID},
                
        success:function(data)
        {
        	drawPI(data);
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}

function drawPI(data)
{
	var parsed = JSON.parse(data);

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Personal Information</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Name:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PIName" placeholder="Name" value="'+ parsed.name +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Mobile:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PIMobile" placeholder="Mobile" value="'+ parsed.mobile +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Fax:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PIFax" placeholder="Fax" value="'+ parsed.fax +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Date Of Birth:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PIdateOfBirth" placeholder="Date Of Birth" value="'+ parsed.dateOfBirth +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Address:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PIAddress" placeholder="Address" value="'+ parsed.address +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Mail:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="mail" class="form-control" id="PIMail" placeholder="Mail" value="'+ parsed.mail +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Gender:</label>';
	html += '<div class="col-sm-8">';
	html += '<div class="radio">';

	if(parsed.gender.toLowerCase() == 'male')
		html += '<label><input type="radio" name="PIgenderRadio" value="Male" checked="checked">Male</label>';
	else
		html += '<label><input type="radio" name="PIgenderRadio" value="Male">Male</label>';

	html += '</div>';
	html += '<div class="radio">';

	if(parsed.gender.toLowerCase() == 'female')
		html += '<label><input type="radio" name="PIgenderRadio" value="Female" checked="checked">Female</label>';
	else
		html += '<label><input type="radio" name="PIgenderRadio" value="Female">Female</label>';

 	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Nationality:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PINationality" placeholder="Nationality" value="'+ parsed.nationality +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Photo:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="file" class="form-control" id="PIPhoto">';
	html += '<img id="selectedImageBase64" src="" hidden>';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getPIData();">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';

	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;

}

//////////////

function getPGIData()
{
	var PGIstartingDate = document.getElementById('PGIstartingDate').value;
	var PGIendingDate = document.getElementById('PGIendingDate').value;
	var PGIqualificationAwarded = document.getElementById('PGIqualificationAwarded').value;
	var PGIoccupationalSkills = document.getElementById('PGIoccupationalSkills').value;
	var PGIorganizationProvidingEduction = document.getElementById('PGIorganizationProvidingEduction').value;
	var PGIlevelOfNationalClassification = document.getElementById('PGIlevelOfNationalClassification').value;

	sendPGI(PGIstartingDate, PGIendingDate, PGIqualificationAwarded, PGIoccupationalSkills, PGIorganizationProvidingEduction, PGIlevelOfNationalClassification);

}

function sendPGI(PGIstartingDate, PGIendingDate, PGIqualificationAwarded, PGIoccupationalSkills, PGIorganizationProvidingEduction, PGIlevelOfNationalClassification)
{

	//save PostGraduate Inforamtion
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/setPGI",
        async: false,
	    cache: true,
        data: {PGIstartingDate: PGIstartingDate, PGIendingDate: PGIendingDate, PGIqualificationAwarded: PGIqualificationAwarded, PGIoccupationalSkills: PGIoccupationalSkills, PGIorganizationProvidingEduction: PGIorganizationProvidingEduction, PGIlevelOfNationalClassification: PGIlevelOfNationalClassification, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
        		openUGI();
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}

function openUGI()
{

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Undergraduate Information</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Starting Date:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="UGIstartingDate" placeholder="StartingDate">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Ending Date:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="UGIendingDate" placeholder="Ending Date">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Title of qualification awarded:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="UGIqualificationAwarded" placeholder="Title of qualification awarded">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Principal subjects or occupational skills covered:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="UGIoccupationalSkills" placeholder="Principal subjects or occupational skills covered">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">GPA:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="UGIgpa" placeholder="GPA">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Name and Type of organization providing education and training:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="UGIorganizationProvidingEduction" placeholder="Name and Type of organization providing education and training">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Level in national or international classification:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="mail" class="form-control" id="UGIlevelOfNationalClassification" placeholder="Level in national or international classification">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getPGI()">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="getUGIData()">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;

}


///////////////


function getPGI()
{
	//get Postgraduate Information
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/getData",
        data: {userID: loggedUserID},
                
        success:function(data)
        {
        	drawPGI(data);
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});
}

function drawPGI(data)
{

	var parsed = JSON.parse(data);

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Postgraduate Information</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Starting Date:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PGIstartingDate" placeholder="StartingDate"> value="'+ parsed.PGIstartDate +'"';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Ending Date:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PGIendingDate" placeholder="Ending Date" value="'+ parsed.PGIendDate +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Title of qualification awarded:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PGIqualificationAwarded" placeholder="Title of qualification awarded" value="'+ parsed.PGItitleOfQualification +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Principal subjects or occupational skills covered:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PGIoccupationalSkills" placeholder="Principal subjects or occupational skills covered" value="'+ parsed.PGIoccupationalSkillsCovered +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Name and Type of organization providing education and training:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PGIorganizationProvidingEduction" placeholder="Name and Type of organization providing education and training" value="'+ parsed.PGIorganizationProvidingEducation +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Level in national or international classification:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="mail" class="form-control" id="PGIlevelOfNationalClassification" placeholder="Level in national or international classification" value="'+ parsed.PGIlevelOfClassification +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getPI();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="getPGIData();">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;

}


////////////////


function getUGIData()
{
	var UGIstartingDate = document.getElementById('UGIstartingDate').value;
	var UGIendingDate = document.getElementById('UGIendingDate').value;
	var UGIqualificationAwarded = document.getElementById('UGIqualificationAwarded').value;
	var UGIgpa = document.getElementById('UGIgpa').value;
	var UGIoccupationalSkills = document.getElementById('UGIoccupationalSkills').value;
	var UGIorganizationProvidingEduction = document.getElementById('UGIorganizationProvidingEduction').value;
	var UGIlevelOfNationalClassification = document.getElementById('UGIlevelOfNationalClassification').value;


	sendUGI(UGIstartingDate, UGIendingDate, UGIgpa, UGIqualificationAwarded, UGIoccupationalSkills, UGIorganizationProvidingEduction, UGIlevelOfNationalClassification);

}

function sendUGI(UGIstartingDate, UGIendingDate, UGIgpa, UGIqualificationAwarded, UGIoccupationalSkills, UGIorganizationProvidingEduction, UGIlevelOfNationalClassification)
{

	//save UnderGraduate Inforamtion
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/setUGI",
        async: false,
	    cache: true,
        data: {UGIgpa: UGIgpa, UGIstartingDate: UGIstartingDate, UGIendingDate: UGIendingDate, UGIqualificationAwarded: UGIqualificationAwarded, UGIoccupationalSkills: UGIoccupationalSkills, UGIorganizationProvidingEduction: UGIorganizationProvidingEduction, UGIlevelOfNationalClassification: UGIlevelOfNationalClassification, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
        		openTraining();
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}

function openTraining()
{
	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Training courses and workshops</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label for="trainingCoursesAndWorkshops">Training courses and workshops:</label>';
	html += '<textarea class="form-control" rows="5" id="trainingCoursesAndWorkshops"></textarea>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getUGI();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="getTrainingData();">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;
}


/////////////


function getUGI() 
{
	//get Undergraduate Information
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/getData",
        data: {userID: loggedUserID},
                
        success:function(data)
        {
        	drawUGI(data);
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});
}

function drawUGI(data)
{
	
	var parsed = JSON.parse(data);

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Undergraduate Information</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Starting Date:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="UGIstartingDate" placeholder="StartingDate"> value="'+ parsed.UGIstartDate +'"';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Ending Date:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="UGIendingDate" placeholder="Ending Date" value="'+ parsed.UGIendDate +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Title of qualification awarded:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="UGIqualificationAwarded" placeholder="Title of qualification awarded" value="'+ parsed.UGItitleOfQualification +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Principal subjects or occupational skills covered:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="UGIoccupationalSkills" placeholder="Principal subjects or occupational skills covered" value="'+ parsed.UGIoccupationalSkillsCovered +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">GPA:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="UGIgpa" placeholder="GPA" value="'+ parsed.UGIgpa +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Name and Type of organization providing education and training:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="UGIorganizationProvidingEduction" placeholder="Name and Type of organization providing education and training" value="'+ parsed.UGIorganizationProvidingEducation +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Level in national or international classification:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="mail" class="form-control" id="UGIlevelOfNationalClassification" placeholder="Level in national or international classification" value="'+ parsed.UGIlevelOfClassification +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getPGI();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="getUGIData();">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;
}



///////////////


function getTrainingData() 
{
	
	var training = document.getElementById('trainingCoursesAndWorkshops').value;

	sendTraining(training);

}


function sendTraining(training)
{

	//save Training Inforamtion
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/setTraining",
        async: false,
	    cache: true,
        data: {training: training, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
        		openWorkExperience();
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}

function openWorkExperience()
{

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Work experience</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Type Of Work:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="typeOfWork" placeholder="Type Of Work">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Starting Date:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="startingDate" placeholder="StartingDate">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Ending Date:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="endingDate" placeholder="Ending Date">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Occupation or Position Held:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="positionHeld" placeholder="Occupation or Position Held">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Main Activities And Responsibilities:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="mainActivities" placeholder="Main Activities And Responsibilities">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Name and Address Of Employer:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="nameAndAddressOfEmployer" placeholder="Name and Address Of Employer">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Type Of Business:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="typeOfbusiness" placeholder="Type Of Business">';
	html += '</div>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getTraining();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="addExperience();">Add to CV</button>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-warning" onclick="openPublications();">Skip</button>';
	html += '</div>';

	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;

}


////////////////


function addExperience()
{

	var typeOfWork = document.getElementById('typeOfWork').value;
	var startingDate = document.getElementById('startingDate').value;
	var endingDate = document.getElementById('endingDate').value;
	var positionHeld = document.getElementById('positionHeld').value;
	var mainActivities = document.getElementById('mainActivities').value;
	var nameAndAddressOfEmployer = document.getElementById('nameAndAddressOfEmployer').value;
	var typeOfbusiness = document.getElementById('typeOfbusiness').value;

	insertExperience(typeOfWork, startingDate, endingDate, positionHeld, mainActivities, nameAndAddressOfEmployer, typeOfbusiness);

}

function insertExperience(typeOfWork, startingDate, endingDate, positionHeld, mainActivities, nameAndAddressOfEmployer, typeOfbusiness)
{

	//save Work Experience
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/AddWorkExperience",
        async: false,
	    cache: true,
        data: {typeOfWork: typeOfWork, startingDate: startingDate, endingDate: endingDate, positionHeld: positionHeld, mainActivities: mainActivities, nameAndAddressOfEmployer: nameAndAddressOfEmployer, typeOfbusiness: typeOfbusiness, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
        		document.getElementById('typeOfWork').value = '';
				document.getElementById('startingDate').value = '';
				document.getElementById('endingDate').value = '';
				document.getElementById('positionHeld').value = '';
				document.getElementById('mainActivities').value = '';
				document.getElementById('nameAndAddressOfEmployer').value = '';
				document.getElementById('typeOfbusiness').value = '';
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}


////////////////


function getTraining() 
{
	//get Training Information
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/getData",
        data: {userID: loggedUserID},
                
        success:function(data)
        {
        	drawTraining(data);
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});
}

function drawTraining(data)
{
	
	var parsed = JSON.parse(data);

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Training courses and workshops</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<div class="form-group">';
	html += '<label for="trainingCoursesAndWorkshops">Training courses and workshops:</label>';
	html += '<textarea class="form-control" rows="5" id="trainingCoursesAndWorkshops" value="'+ parsed.TrainingCoursesAndWorkshops +'"></textarea>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getUGI();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="getTrainingData();">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;
}


////////////////



function openPublications()
{

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Publications In Peer Review Journal</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Title of Published Paper:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="typeOfPublishedPaper" placeholder="Title of Published Paper">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Authors:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="authors" placeholder="Authors">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Publisher:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="publisher" placeholder="Publisher">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Volume:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="volume" placeholder="Volume">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Issue:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="issue" placeholder="Issue">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Pages:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="pages" placeholder="Pages">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Total Citation:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="totalCitation" placeholder="Total Citation">';
	html += '</div>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="openWorkExperience();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="addPaper();">Add to CV</button>';
	html += '</div>';
	
	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-warning" onclick="openBooks();">Skip</button>';
	html += '</div>';

	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;

}

function addPaper()
{

	var typeOfPublishedPaper = document.getElementById('typeOfPublishedPaper').value;
	var authors = document.getElementById('authors').value;
	var publisher = document.getElementById('publisher').value;
	var volume = document.getElementById('volume').value;
	var issue = document.getElementById('issue').value;
	var pages = document.getElementById('pages').value;
	var totalCitation = document.getElementById('totalCitation').value;

	insertPaper(typeOfPublishedPaper, authors, publisher, volume, issue, pages, totalCitation);

}

function insertPaper(typeOfPublishedPaper, authors, publisher, volume, issue, pages, totalCitation)
{

	//save Paper
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/addPaper",
        async: false,
	    cache: true,
        data: {typeOfPublishedPaper: typeOfPublishedPaper, authors: authors, publisher: publisher, volume: volume, issue: issue, pages: pages, totalCitation: totalCitation, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
        		document.getElementById('typeOfPublishedPaper').value = '';
				document.getElementById('authors').value = '';
				document.getElementById('publisher').value = '';
				document.getElementById('volume').value = '';
				document.getElementById('issue').value = '';
				document.getElementById('pages').value = '';
				document.getElementById('totalCitation').value = '';
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}


////////////////



function openBooks()
{

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Books</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Title of Published Book:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="typeOfPublishedBook" placeholder="Title of Published Book">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Authors:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="authors" placeholder="Authors">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Publisher:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="publisher" placeholder="Publisher">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Volume:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="volume" placeholder="Volume">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Issue:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="issue" placeholder="Issue">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Pages:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="pages" placeholder="Pages">';
	html += '</div>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="openPublications();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="addBook();">Add to CV</button>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-warning" onclick="openChapters();">Skip</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;

}

function addBook()
{

	var typeOfPublishedBook = document.getElementById('typeOfPublishedBook').value;
	var authors = document.getElementById('authors').value;
	var publisher = document.getElementById('publisher').value;
	var volume = document.getElementById('volume').value;
	var issue = document.getElementById('issue').value;
	var pages = document.getElementById('pages').value;

	insertBook(typeOfPublishedBook, authors, publisher, volume, issue, pages);

}

function insertBook(typeOfPublishedBook, authors, publisher, volume, issue, pages)
{

	//save Paper
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/addBook",
        async: false,
	    cache: true,
        data: {typeOfPublishedBook: typeOfPublishedBook, authors: authors, publisher: publisher, volume: volume, issue: issue, pages: pages, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
        		document.getElementById('typeOfPublishedBook').value = '';
				document.getElementById('authors').value = '';
				document.getElementById('publisher').value = '';
				document.getElementById('volume').value = '';
				document.getElementById('issue').value = '';
				document.getElementById('pages').value = '';
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}


////////////////



function openChapters()
{

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Chapters</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Title of Published Chapter:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="typeOfPublishedChapter" placeholder="Title of Published Chapter">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Authors:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="authors" placeholder="Authors">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Publisher:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="publisher" placeholder="Publisher">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Volume:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="volume" placeholder="Volume">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Issue:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="issue" placeholder="Issue">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Pages:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="pages" placeholder="Pages">';
	html += '</div>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="openBooks();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="addChapter();">Add to CV</button>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-warning" onclick="openConferences();">Skip</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;

}

function addChapter()
{

	var typeOfPublishedChapter = document.getElementById('typeOfPublishedChapter').value;
	var authors = document.getElementById('authors').value;
	var publisher = document.getElementById('publisher').value;
	var volume = document.getElementById('volume').value;
	var issue = document.getElementById('issue').value;
	var pages = document.getElementById('pages').value;

	insertChapter(typeOfPublishedChapter, authors, publisher, volume, issue, pages);

}

function insertChapter(typeOfPublishedChapter, authors, publisher, volume, issue, pages)
{

	//save Paper
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/addChapter",
        async: false,
	    cache: true,
        data: {typeOfPublishedChapter: typeOfPublishedChapter, authors: authors, publisher: publisher, volume: volume, issue: issue, pages: pages, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
        		document.getElementById('typeOfPublishedChapter').value = '';
				document.getElementById('authors').value = '';
				document.getElementById('publisher').value = '';
				document.getElementById('volume').value = '';
				document.getElementById('issue').value = '';
				document.getElementById('pages').value = '';
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}



////////////////




function openConferences()
{

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Conference and Meeting</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Title of Publication:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="titleOfPublication" placeholder="Title of Publication">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Authors:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="authors" placeholder="Authors">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Name Of Conference:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="nameOfConference" placeholder="Name Of Conference">';
	html += '</div>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="openChapters();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="addConference();">Add to CV</button>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-warning" onclick="openResearch();">Skip</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;

}

function addConference()
{

	var titleOfPublication = document.getElementById('titleOfPublication').value;
	var authors = document.getElementById('authors').value;
	var nameOfConference = document.getElementById('nameOfConference').value;

	insertConference(titleOfPublication, authors, nameOfConference);

}

function insertConference(titleOfPublication, authors, nameOfConference)
{

	//save Conference
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/addConference",
        async: false,
	    cache: true,
        data: {titleOfPublication: titleOfPublication, authors: authors, nameOfConference: nameOfConference, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
        		document.getElementById('titleOfPublication').value = '';
				document.getElementById('authors').value = '';
				document.getElementById('nameOfConference').value = '';
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}



//////////////////



function openResearch()
{

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Research Interests And Ambition</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Main Research Orientation:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="mainResearchOrientation" placeholder="Main Research Orientation">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Ambition:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="ambition" placeholder="Ambition">';
	html += '</div>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="openConferences();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="getResearchData();">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;
}

function getResearchData()
{
	var mainResearchOrientation = document.getElementById('mainResearchOrientation').value;
	var ambition = document.getElementById('ambition').value;


	sendResearch(mainResearchOrientation, ambition);

}

function sendResearch(mainResearchOrientation, ambition)
{

	//save Research Inforamtion
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/setResearch",
        async: false,
	    cache: true,
        data: {mainResearchOrientation: mainResearchOrientation, ambition: ambition, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
        		openResearchExperience();
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}



//////////////////



function openResearchExperience()
{
	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Research Experience</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Name of project:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="nameOfProject" placeholder="Name of project">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Possition in the project:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="positionInProject" placeholder="Possition in the project">';
	html += '</div>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getResearch();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="getResearchExperienceData();">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;
}


function getResearch()
{
	//get Research Experience Information
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/getData",
        data: {userID: loggedUserID},
                
        success:function(data)
        {
        	drawResearch(data);
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});
}


function drawResearch(data)
{

	parsed = JSON.parse(data);

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Research Interests And Ambition</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Main Research Orientation:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="mainResearchOrientation" placeholder="Main Research Orientation" value="'+ parsed.mainResearchOrientation +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Ambition:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="ambition" placeholder="Ambition" value="'+ parsed.ambition +'">';
	html += '</div>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="openConferences();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="getResearchData();">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;


}



////////////////////


function getResearchExperienceData()
{
	var nameOfProject = document.getElementById('nameOfProject').value;
	var positionInProject = document.getElementById('positionInProject').value;

	sendResearchExperience(nameOfProject, positionInProject);
}


function sendResearchExperience(nameOfProject, positionInProject)
{
	//save Research Experience Inforamtion
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/setResearchExperience",
        async: false,
	    cache: true,
        data: {nameOfProject: nameOfProject, positionInProject: positionInProject, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
        		openPersonalSkills();
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});
}



//////////////



function openPersonalSkills()
{
	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Personal Skills And Competences</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Mother Tongue(s):</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="motherTongue" placeholder="Mother Tongue(s)">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Languages:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="languages" placeholder="Languages">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Social Skills and competences:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="socialSkills" placeholder="Social Skills and competences">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Communication Skills:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="CommunicationSkills" placeholder="Communication Skills">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Organizational Skills and competences:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="organizationalSkills" placeholder="Organizational Skills and competences">';
	html += '</div>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getResearchExperience();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="getPersonalSkillsData();">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;
}


function getResearchExperience()
{
	//get Research Experience Information
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/getData",
        data: {userID: loggedUserID},
                
        success:function(data)
        {
        	drawResearchExperience(data);
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});
}


function drawResearchExperience(data)
{

	parsed = JSON.parse(data);

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Research Experience</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Name of project:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="nameOfProject" placeholder="Name of project" value="'+ parsed.nameOfProject +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Possition in the project:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="positionInProject" placeholder="Possition in the project" value="'+ parsed.positionInProject +'">';
	html += '</div>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getResearch();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="getResearchExperienceData();">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;


}



///////////////////




function getPersonalSkillsData()
{
	var motherTongue = document.getElementById('motherTongue').value;
	var languages = document.getElementById('languages').value;
	var socialSkills = document.getElementById('socialSkills').value;
	var CommunicationSkills = document.getElementById('CommunicationSkills').value;
	var organizationalSkills = document.getElementById('organizationalSkills').value;


	sendPersonalSkills(motherTongue, languages, socialSkills, CommunicationSkills, organizationalSkills);

}

function sendPersonalSkills(motherTongue, languages, socialSkills, CommunicationSkills, organizationalSkills)
{

	//save Research Inforamtion
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/setPersonalSkills",
        async: false,
	    cache: true,
        data: {motherTongue: motherTongue, languages: languages, socialSkills: socialSkills, CommunicationSkills: CommunicationSkills, organizationalSkills: organizationalSkills, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
        		openAwards();
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}

function openAwards()
{

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Awards and Honors</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Year:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="year" placeholder="Year">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Award:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="award" placeholder="Award">';
	html += '</div>';
	html += '</div>';
	
	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getPersonalSkills();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="addAward();">Add to CV</button>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-success" onclick="makeCV();" style="width: 250px;">Finish</button>';
	html += '</div>';

	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;

}


////////////////


function addAward()
{

	var year = document.getElementById('year').value;
	var award = document.getElementById('award').value;

	insertAward(year, award);

}

function insertAward(year, award)
{

	//save award
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/addAward",
        async: false,
	    cache: true,
        data: {year: year, award: award, userID: loggedUserID},
                
        success:function(data)
        {
        	if(data == 'done')
        	{
				document.getElementById('year').value = '';
				document.getElementById('award').value = '';
        	}
        	else
        	{
        		alert(data);
        	}
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}


///////////////



function getPersonalSkills()
{

	//get Undergraduate Information
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/getData",
        data: {userID: loggedUserID},
                
        success:function(data)
        {
        	drawPersonalSkills(data);
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}


function drawPersonalSkills(data)
{

	parsed = JSON.parse(data);

	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Personal Skills And Competences</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Mother Tongue(s):</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="motherTongue" placeholder="Mother Tongue(s)" value="'+ parsed.motherTongue +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Languages:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="languages" placeholder="Languages"  value="'+ parsed.Languages +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Social Skills and competences:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="socialSkills" placeholder="Social Skills and competences" value="'+ parsed.socialSkills +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Communication Skills:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="CommunicationSkills" placeholder="Communication Skills" value="'+ parsed.communicationSkills +'">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Organizational Skills and competences:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="organizationalSkills" placeholder="Organizational Skills and competences" value="'+ parsed.organizationalSkills +'">';
	html += '</div>';
	html += '</div>';

	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getResearchExperience();">Previous</button>';
	html += '<button type="button" class="btn btn-danger" onclick="getPersonalSkillsData();">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	
	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;


}


function openPI()
{
	var html = '';

	html += '<div class="panel panel-primary">';
	html += '<div class="panel-heading"><h2 style="text-align: center;">Personal Information</h2></div>';
	html += '<div class="panel-body">';
	html += '<form class="form-horizontal">';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Name:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PIName" placeholder="Name">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Mobile:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PIMobile" placeholder="Mobile">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Fax:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PIFax" placeholder="Fax">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Date Of Birth:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PIdateOfBirth" placeholder="Date Of Birth">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Address:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PIAddress" placeholder="Address">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">E-Mail:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="mail" class="form-control" id="PIMail" placeholder="Mail">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Gender:</label>';
	html += '<div class="col-sm-8">';
	html += '<div class="radio">';
	html += '<label><input type="radio" name="PIgenderRadio" value="Male">Male</label>';
	html += '</div>';
	html += '<div class="radio">';
	html += '<label><input type="radio" name="PIgenderRadio" value="Female">Female</label>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Nationality:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="text" class="form-control" id="PINationality" placeholder="Nationality">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group">';
	html += '<label class="control-label col-sm-2">Photo:</label>';
	html += '<div class="col-sm-8">';
	html += '<input type="file" class="form-control">';
	html += '</div>';
	html += '</div>';
	html += '<div class="form-group" style="text-align: center;">';
	html += '<button type="button" class="btn btn-danger" onclick="getPIData();">Add to CV</button>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';

	document.getElementById('pageBody').innerHTML = '';
	document.getElementById('pageBody').innerHTML = html;

}


/////////////


function makeCV()
{
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/makeCV",
        async: false,
	    cache: true,
        data: {userID: loggedUserID},
                
        success:function(data)
        {
        	var html = '';

        	html += '<div class="form-group" style="text-align: center;">';
			html += '<button type="button" class="btn btn-danger" onclick="getCV(\''+ data +'\');">Download CV</button>';
			html += '</div>';

			html += '<div class="form-group" style="text-align: center;">';
			html += '<embed alt="CV preview" src="http://docs.google.com/gview?url=http://www.onlineresearchclub.com/CVs/'+data+'.pdf&embedded=true" style="width: 80%; height:600px;">';
			html += '</div>';

			document.getElementById('pageBody').innerHTML += html;
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});
}



function getCV(cvName)
{

	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/downloadCV",
        async: false,
	    cache: true,
        data: {cvName: cvName},
                
        success:function(data)
        {
        	clearData();
        	window.location.reload(true);
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});

}




function clearData()
{
	$.ajax({
        type: "POST",
        url: "http://www.onlineresearchclub.com/resumeBuilderWS.asmx/clearObjectCV",
        async: false,
	    cache: true,
        data: {userID: loggedUserID},
                
        success:function(data)
        {
        	
        },
        error: function (er) {
            alert('error:'+JSON.stringify(er));
        }
	});
}
