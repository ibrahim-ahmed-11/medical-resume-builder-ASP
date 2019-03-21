<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="resumeBuilder.aspx.cs" Inherits="Resume_Builder_v1._0.resumeBuilder" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Onine Research Club</title>

	<link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

</head>
<body>



	<div id="fullPageBody" class="col-xs-12 col-sm-12">
		<div class="container col-xs-6 col-sm-3">
		  <ul class="nav nav-pills nav-stacked">
		    <li class="active"><a href="javascript: openPI();">Personal information</a></li>
		    <li class="active"><a href="javascript: openPGI();">Postgraduate information</a></li>
		    <li class="active"><a href="javascript: openUGI();">Undergraduate information</a></li>
		    <li class="active"><a href="javascript: openTraining();">Training courses and workshops</a></li>
		    <li class="active"><a href="javascript: openWorkExperience();">Work experiences</a></li>
		    <li class="active"><a href="javascript: openPublications();">Publications in Peer Review Journal</a></li>
		    <li class="active"><a href="javascript: openBooks();">Books</a></li>
		    <li class="active"><a href="javascript: openChapters();">Chapters</a></li>
		    <li class="active"><a href="javascript: openConferences();">Conferences and Meetings</a></li>
		    <li class="active"><a href="javascript: openResearch();">Research Interest and Ambition</a></li>
		    <li class="active"><a href="javascript: openResearchExperience();">Research Experience</a></li>
		    <li class="active"><a href="javascript: openPersonalSkills();">Personal Skills and Competences</a></li>
		    <li class="active"><a href="javascript: openAwards();">Awards and Honors</a></li>
 		  </ul>
		</div>

		<div class="col-xs-6 col-sm-9" id="pageBody">

			<div class="panel panel-primary">
	      		<div class="panel-heading"><h2 style="text-align: center;">Personal Information</h2></div>
	      		<div class="panel-body">
	      			
	      			<form class="form-horizontal" id="formPI">
					  <div class="form-group">
					    <label class="control-label col-sm-2">Name:</label>
					    <div class="col-sm-8">
					      <input type="text" class="form-control" id="PIName" name="PIName" placeholder="Name">
					    </div>
					  </div>

					  <div class="form-group">
					    <label class="control-label col-sm-2">Mobile:</label>
					    <div class="col-sm-8">
					      <input type="text" class="form-control" id="PIMobile" name="PIMobile" placeholder="Mobile">
					    </div>
					  </div>

					  <div class="form-group">
					    <label class="control-label col-sm-2">Fax:</label>
					    <div class="col-sm-8">
					      <input type="text" class="form-control" id="PIFax" name="PIFax" placeholder="Fax">
					    </div>
					  </div>

					  <div class="form-group">
					    <label class="control-label col-sm-2">Date Of Birth:</label>
					    <div class="col-sm-8">
					      <input type="text" class="form-control" id="PIdateOfBirth" name="PIdateOfBirth" placeholder="Date Of Birth">
					    </div>
					  </div>

					  <div class="form-group">
					    <label class="control-label col-sm-2">Address:</label>
					    <div class="col-sm-8">
					      <input type="text" class="form-control" id="PIAddress" name="PIAddress" placeholder="Address">
					    </div>
					  </div>

					  <div class="form-group">
					    <label class="control-label col-sm-2">E-Mail:</label>
					    <div class="col-sm-8">
					      <input type="mail" class="form-control" id="PIMail" name="PIMail" placeholder="Mail">
					    </div>
					  </div>

					  <div class="form-group">
					    <label class="control-label col-sm-2">Gender:</label>
					    <div class="col-sm-8">
					      	<div class="radio">
							  <label><input type="radio" name="PIgenderRadio" value="Male">Male</label>
							</div>
							<div class="radio">
							  <label><input type="radio" name="PIgenderRadio" value="Female">Female</label>
							</div>
					    </div>
					  </div>

					  <div class="form-group">
					    <label class="control-label col-sm-2">Nationality:</label>
					    <div class="col-sm-8">
					      <input type="text" class="form-control" id="PINationality" name="PINationality" placeholder="Nationality">
					    </div>
					  </div>

					  <div class="form-group">
					    <label class="control-label col-sm-2">Photo:</label>
					    <div class="col-sm-8">
					      <input type="file" class="form-control" id="userImage" name="userImage">
	    				  <img id="selectedImageBase64" src="" hidden>
					    </div>
					  </div>

					  <div class="form-group" style="text-align: center;">
					  	<button type="button" class="btn btn-danger" onclick="getPIData();">Add to CV</button>
					  </div>

					  <div id="errorAlert" class="form-group alert alert-danger" style="visibility: hidden;">
  					  	<strong>Please fill all data !</strong> ( Photo is optional )
					  </div>

					</form>



	      		</div>
		    </div>


		</div>

	</div>










	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/jquery.min.js"><\/script>')</script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.validate.js"></script>
    <script src="js/javascript.js"></script>

</body>
</html>