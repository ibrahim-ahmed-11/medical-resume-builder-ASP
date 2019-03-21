using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.Services;
using System.Web.Script.Serialization;
using Novacode;
using System.IO;
using Microsoft.Office.Interop.Word;
using System.Drawing;
using SautinSoft;


namespace Resume_Builder_v1._0
{
    /// <summary>
    /// Summary description for resumeBuilderWS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class resumeBuilderWS : System.Web.Services.WebService
    {

        string rootPath = "";

        public System.Drawing.Image Base64ToImage(string base64String)
        {
            if (base64String.Contains("data:image/png;base64,"))
                base64String = base64String.Replace("data:image/png;base64,", "");
            else if (base64String.Contains("data:image/jpg;base64,"))
                base64String = base64String.Replace("data:image/jpg;base64,", "");
            else if (base64String.Contains("data:image/jpeg;base64,"))
                base64String = base64String.Replace("data:image/jpeg;base64,", "");

            byte[] imageBytes = Convert.FromBase64String(base64String);
            MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);

            ms.Write(imageBytes, 0, imageBytes.Length);
            System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
            return image;
        }

        static List<Dictionary<int, resume>> resumesList = new List<Dictionary<int, resume>>();

        

        [WebMethod]
        public void getUserID()
        {
            Random rnd2 = new Random();
            int userID = rnd2.Next(999999999);

            resume tempResume = new resume();

            Dictionary<int, resume> tempDict = new Dictionary<int, resume>();

            tempDict.Add(userID, tempResume);


            resumesList.Add(tempDict);

            Context.Response.Write(userID.ToString());
        }

        private resume getCurrentResume(int ID)
        {

            foreach(Dictionary<int,resume> d in resumesList)
            {
                if(d.ContainsKey(ID))
                {
                    resume r = d[ID];
                    return r;
                }
            }

            return new resume();

        }

        [WebMethod]
        public void setImage(string image, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);
            resumeUsed.image = image;

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

        }

        [WebMethod]
        public void getData(int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            JavaScriptSerializer js = new JavaScriptSerializer();
            string json = js.Serialize(resumeUsed);

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write(json);

        }

        [WebMethod]
        public void setPI(string Name, string Mobile, string Fax, string DateOfBirth, string Address, string Mail, string Gender, string Nationality, int userID)
        {

            resume resumeUsed = getCurrentResume(userID);

            resumeUsed.name = Name;
            resumeUsed.mobile = Mobile;
            resumeUsed.fax = Fax;
            resumeUsed.dateOfBirth = DateOfBirth;
            resumeUsed.address = Address;
            resumeUsed.mail = Mail;
            resumeUsed.gender = Gender;
            resumeUsed.nationality = Nationality;

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");

        }

        [WebMethod]
        public void setPGI(string PGIstartingDate, string PGIendingDate, string PGIqualificationAwarded, string PGIoccupationalSkills, string PGIorganizationProvidingEduction, string PGIlevelOfNationalClassification, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            resumeUsed.PGIstartDate = PGIstartingDate;
            resumeUsed.PGIendDate = PGIendingDate;
            resumeUsed.PGItitleOfQualification = PGIqualificationAwarded;
            resumeUsed.PGIoccupationalSkillsCovered = PGIoccupationalSkills;
            resumeUsed.PGIorganizationProvidingEducation = PGIorganizationProvidingEduction;
            resumeUsed.PGIlevelOfClassification = PGIlevelOfNationalClassification;

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");

        }

        [WebMethod]
        public void setUGI(string UGIgpa, string UGIstartingDate, string UGIendingDate, string UGIqualificationAwarded, string UGIoccupationalSkills, string UGIorganizationProvidingEduction, string UGIlevelOfNationalClassification, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);
            
            resumeUsed.UGIstartDate = UGIstartingDate;
            resumeUsed.UGIendDate = UGIendingDate;
            resumeUsed.UGItitleOfQualification = UGIqualificationAwarded;
            resumeUsed.UGIoccupationalSkillsCovered = UGIoccupationalSkills;
            resumeUsed.UGIorganizationProvidingEducation = UGIorganizationProvidingEduction;
            resumeUsed.UGIlevelOfClassification = UGIlevelOfNationalClassification;
            resumeUsed.UGIgpa = UGIgpa;

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");

        }

        [WebMethod]
        public void setTraining(string training, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            resumeUsed.TrainingCoursesAndWorkshops = training;

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");

        }

        [WebMethod]
        public void AddWorkExperience(string typeOfWork, string startingDate, string endingDate, string positionHeld, string mainActivities, string nameAndAddressOfEmployer, string typeOfbusiness, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            workExperience w = new workExperience();

            w.typeOfWork = typeOfWork;
            w.startingDate = startingDate;
            w.endingDate = endingDate;
            w.positionHeld = positionHeld;
            w.mainActivities = mainActivities;
            w.nameAndAddressOfEmployer = nameAndAddressOfEmployer;
            w.typeOfBusiness = typeOfbusiness;

            resumeUsed.workingExperiences.Add(w);

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");

        }

        [WebMethod]
        public void addPaper(string typeOfPublishedPaper, string authors, string publisher, string volume, string issue, string pages, string totalCitation, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            publicitations p = new publicitations();

            p.titleOfPublishedPaper = typeOfPublishedPaper;
            p.authors = authors;
            p.publisher = publisher;
            p.volume = volume;
            p.issue = issue;
            p.pages = pages;
            p.totalCitation = totalCitation;

            resumeUsed.publicitations.Add(p);

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");

        }

        [WebMethod]
        public void addBook(string typeOfPublishedBook, string authors, string publisher, string volume, string issue, string pages, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            Book b = new Book();

            b.titleOfPublishedBook = typeOfPublishedBook;
            b.authors = authors;
            b.publisher = publisher;
            b.volume = volume;
            b.issue = issue;
            b.pages = pages;

            resumeUsed.books.Add(b);

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");

        }

        [WebMethod]
        public void addChapter(string typeOfPublishedChapter, string authors, string publisher, string volume, string issue, string pages, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            chapter c = new chapter();

            c.titleOfPublishedChapter = typeOfPublishedChapter;
            c.authors = authors;
            c.publisher = publisher;
            c.volume = volume;
            c.issue = issue;
            c.pages = pages;

            resumeUsed.chapters.Add(c);

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");

        }

        [WebMethod]
        public void addConference(string titleOfPublication, string authors, string nameOfConference, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            conference c = new conference();

            c.titleOfPublicitation = titleOfPublication;
            c.authors = authors;
            c.nameOfConfrence = nameOfConference;

            resumeUsed.conferences.Add(c);

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");

        }

        [WebMethod]
        public void setResearch(string mainResearchOrientation, string ambition, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            resumeUsed.mainResearchOrientation = mainResearchOrientation;
            resumeUsed.ambition = ambition;

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");
        }

        [WebMethod]
        public void setResearchExperience(string nameOfProject, string positionInProject, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            resumeUsed.nameOfProject = nameOfProject;
            resumeUsed.positionInProject = positionInProject;

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");

        }

        [WebMethod]
        public void setPersonalSkills(string motherTongue, string languages, string socialSkills, string CommunicationSkills, string organizationalSkills, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            resumeUsed.motherTongue = motherTongue;
            resumeUsed.Languages = languages;
            resumeUsed.socialSkills = socialSkills;
            resumeUsed.communicationSkills = CommunicationSkills;
            resumeUsed.organizationalSkills = organizationalSkills;

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");

        }

        [WebMethod]
        public void addAward(string year, string award, int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            award a = new award();

            a.year = year;
            a.awardName = award;

            resumeUsed.awards.Add(a);

            foreach (Dictionary<int, resume> d in resumesList)
            {
                if (d.ContainsKey(userID))
                {
                    d[userID] = resumeUsed;
                }
            }

            Context.Response.Write("done");
        }



        // All Data are entered

        int randomNumber = 0;

        [WebMethod]
        public void makeCV(int userID)
        {
            resume resumeUsed = getCurrentResume(userID);

            Random rnd = new Random();
            int randomNum = rnd.Next(999999999);

            randomNumber = randomNum;

            try
            {
                File.Copy(@"\CV.docx", @"\CVs\CV" + randomNum + ".docx");
                rootPath = @"\";
            }
            catch (Exception)
            {
                try
                {
                    File.Copy(@"\httpdocs\CV.docx", @"\httpdocs\CVs\CV" + randomNum + ".docx");
                    rootPath = @"\httpdocs\";
                }
                catch (Exception)
                {
                    try
                    {
                        File.Copy(@"/httpdocs/CV.docx", @"/httpdocs/CVs/CV" + randomNum + ".docx");
                        rootPath = @"/httpdocs/";
                    }
                    catch (Exception)
                    {
                        try
                        {
                            string path = Server.MapPath("~");
                            File.Copy(@"" + path + @"/CV.docx", @"" + path + @"/CVs/CV" + randomNum + ".docx");
                            rootPath = path;
                        }
                        catch (Exception)
                        {
                            throw;
                        }
                    }
                }
                
            }


            using (DocX document = DocX.Load(@"" + rootPath + @"\CVs\CV" + randomNum + ".docx")) 
            {

                #region Personal Information
                document.ReplaceText("Name", " " + resumeUsed.name, false, System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                document.ReplaceText("Address", resumeUsed.address, false, System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                document.ReplaceText("Phone", resumeUsed.mobile, false, System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                document.ReplaceText("mail", resumeUsed.mail, false, System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                document.ReplaceText("userGender", resumeUsed.gender, false, System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                document.ReplaceText("DOB", resumeUsed.dateOfBirth, false, System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                document.ReplaceText("userNationality", resumeUsed.nationality, false, System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                document.ReplaceText("Fax", resumeUsed.fax, false, System.Text.RegularExpressions.RegexOptions.IgnoreCase);

                try
                {
                    using (MemoryStream ms = new MemoryStream())
                    {
                        System.Drawing.Image myImg = Base64ToImage(resumeUsed.image);

                        myImg.Save(ms, myImg.RawFormat);
                        ms.Seek(0, SeekOrigin.Begin);

                        Novacode.Image img = document.AddImage(ms);

                        Picture pic = img.CreatePicture();

                        pic.Width = 150;
                        pic.Height = 150;

                        document.Tables[0].Rows[2].Cells[0].Paragraphs.First().InsertPicture(pic);

                    }
                }
                catch (Exception)
                {

                    
                }


                #endregion

                #region Training and Education

                if (resumeUsed.TrainingCoursesAndWorkshops != "" || resumeUsed.TrainingCoursesAndWorkshops != null)
                {
                    Novacode.Table trainingTable = document.AddTable(8, 2);
                    trainingTable.Alignment = Alignment.left;
                    trainingTable.SetBorder(TableBorderType.Left, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    trainingTable.SetBorder(TableBorderType.Top, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    trainingTable.SetBorder(TableBorderType.Right, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    trainingTable.SetBorder(TableBorderType.Bottom, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    trainingTable.SetBorder(TableBorderType.InsideH, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    trainingTable.SetBorder(TableBorderType.InsideV, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));

                    for (int i = 0; i < trainingTable.RowCount; i++)
                    {
                        for (int x = 0; x < trainingTable.ColumnCount; x++)
                        {
                            trainingTable.Rows[i].Cells[x].Width = 250;
                        }
                    }

                    if ((resumeUsed.UGItitleOfQualification != null && resumeUsed.PGItitleOfQualification != null) || resumeUsed.TrainingCoursesAndWorkshops != null)
                    {
                        trainingTable.Rows[0].Cells[0].Paragraphs.First().Append("EDUCATION AND TRAINING").Bold().Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                        trainingTable.Rows[0].Cells[1].Paragraphs.First().Append("");
                    }

                    if (!(resumeUsed.UGItitleOfQualification == null && resumeUsed.PGItitleOfQualification == null))
                    {
                        trainingTable.Rows[1].Cells[0].Paragraphs.First().Append("Education").Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                        trainingTable.Rows[1].Cells[1].Paragraphs.First().Append("");
                    }

                    if (resumeUsed.UGItitleOfQualification != null)
                    {
                        trainingTable.Rows[2].Cells[0].Paragraphs.First().Append(resumeUsed.UGIstartDate + " - " + resumeUsed.UGIendDate).FontSize(12).Font(new FontFamily("Times New Roman"));
                        trainingTable.Rows[2].Cells[1].Paragraphs.First().Append(resumeUsed.UGItitleOfQualification).FontSize(12).Font(new FontFamily("Times New Roman"));
                        trainingTable.Rows[2].Cells[1].Paragraphs.First().Append(Environment.NewLine);
                        if (!String.IsNullOrEmpty(resumeUsed.UGIoccupationalSkillsCovered))
                        {
                            trainingTable.Rows[2].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.UGIoccupationalSkillsCovered).FontSize(12).Font(new FontFamily("Times New Roman"));
                            trainingTable.Rows[2].Cells[1].Paragraphs.First().Append(Environment.NewLine);
                        }
                        if (!String.IsNullOrEmpty(resumeUsed.UGIgpa))
                        {
                            trainingTable.Rows[2].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.UGIgpa).FontSize(12).Font(new FontFamily("Times New Roman"));
                            trainingTable.Rows[2].Cells[1].Paragraphs.First().Append(Environment.NewLine); 
                        }
                        if (!String.IsNullOrEmpty(resumeUsed.UGIorganizationProvidingEducation))
                        {
                            trainingTable.Rows[2].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.UGIorganizationProvidingEducation).FontSize(12).Font(new FontFamily("Times New Roman"));
                            trainingTable.Rows[2].Cells[1].Paragraphs.First().Append(Environment.NewLine); 
                        }
                        if (!String.IsNullOrEmpty(resumeUsed.UGIlevelOfClassification))
                            trainingTable.Rows[2].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.UGIlevelOfClassification).FontSize(12).Font(new FontFamily("Times New Roman"));
                    }

                    if (resumeUsed.PGItitleOfQualification != null)
                    {
                        trainingTable.Rows[3].Cells[0].Paragraphs.First().Append(resumeUsed.PGIstartDate + " - " + resumeUsed.PGIendDate).FontSize(12).Font(new FontFamily("Times New Roman"));
                        if (!String.IsNullOrEmpty(resumeUsed.PGItitleOfQualification))
                        {
                            trainingTable.Rows[3].Cells[1].Paragraphs.First().Append(resumeUsed.PGItitleOfQualification).FontSize(12).Font(new FontFamily("Times New Roman"));
                            trainingTable.Rows[3].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                        if (!String.IsNullOrEmpty(resumeUsed.PGIoccupationalSkillsCovered))
                        {
                            trainingTable.Rows[3].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.PGIoccupationalSkillsCovered).FontSize(12).Font(new FontFamily("Times New Roman"));
                            trainingTable.Rows[3].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                        if (!String.IsNullOrEmpty(resumeUsed.PGIorganizationProvidingEducation))
                        {
                            trainingTable.Rows[3].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.PGIorganizationProvidingEducation).FontSize(12).Font(new FontFamily("Times New Roman"));
                            trainingTable.Rows[3].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                        if (!String.IsNullOrEmpty(resumeUsed.PGIlevelOfClassification))
                            trainingTable.Rows[3].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.PGIlevelOfClassification).FontSize(12).Font(new FontFamily("Times New Roman"));
                    }

                    trainingTable.Rows[4].Cells[0].Paragraphs.First().Append("  ");
                    trainingTable.Rows[4].Cells[1].Paragraphs.First().Append("  ");

                    if (resumeUsed.TrainingCoursesAndWorkshops != null)
                    {
                        trainingTable.Rows[5].Cells[0].Paragraphs.First().Append("Training courses & workshops").Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                        trainingTable.Rows[5].Cells[1].Paragraphs.First().Append("");

                        trainingTable.Rows[6].Cells[0].Paragraphs.First().Append("");
                        trainingTable.Rows[6].Cells[1].Paragraphs.First().Append(resumeUsed.TrainingCoursesAndWorkshops).FontSize(12).Font(new FontFamily("Times New Roman"));
                    }


                    trainingTable.Rows[7].Cells[0].Paragraphs.First().Append("  ");
                    trainingTable.Rows[7].Cells[1].Paragraphs.First().Append("  ");

                    document.InsertTable(trainingTable);

                    document.InsertParagraph(Environment.NewLine);
                }

                #endregion

                #region Work Experience
                int workExperienceCount = resumeUsed.workingExperiences.Count;

                if (workExperienceCount != 0)
                {
                    Novacode.Table workExperienceTable = document.AddTable((workExperienceCount + 2), 2);
                    workExperienceTable.Alignment = Alignment.left;
                    workExperienceTable.SetBorder(TableBorderType.Left, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    workExperienceTable.SetBorder(TableBorderType.Top, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    workExperienceTable.SetBorder(TableBorderType.Right, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    workExperienceTable.SetBorder(TableBorderType.Bottom, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    workExperienceTable.SetBorder(TableBorderType.InsideH, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    workExperienceTable.SetBorder(TableBorderType.InsideV, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));

                    for (int i = 0; i < workExperienceTable.RowCount; i++)
                    {
                        for (int x = 0; x < workExperienceTable.ColumnCount; x++)
                        {
                            workExperienceTable.Rows[i].Cells[x].Width = 250;
                        }
                    }

                    workExperienceTable.Rows[0].Cells[0].Paragraphs.First().Append("WORK EXPERIENCE").Bold().Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));

                    for (int i = 1; i <= workExperienceCount; i++)
                    {
                        workExperienceTable.Rows[i].Cells[0].Paragraphs.First().Append(resumeUsed.workingExperiences[i - 1].startingDate + " - " + resumeUsed.workingExperiences[i - 1].endingDate).FontSize(12).Font(new FontFamily("Times New Roman"));
                        if (!String.IsNullOrEmpty(resumeUsed.workingExperiences[i - 1].typeOfWork))
                        {
                            workExperienceTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.workingExperiences[i - 1].typeOfWork).FontSize(12).Font(new FontFamily("Times New Roman"));
                            workExperienceTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman"));
                        }
                        if (!String.IsNullOrEmpty(resumeUsed.workingExperiences[i - 1].positionHeld))
                        {
                            workExperienceTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.workingExperiences[i - 1].positionHeld).FontSize(12).Font(new FontFamily("Times New Roman"));
                            workExperienceTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                        if (!String.IsNullOrEmpty(resumeUsed.workingExperiences[i - 1].mainActivities))
                        {
                            workExperienceTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.workingExperiences[i - 1].mainActivities).FontSize(12).Font(new FontFamily("Times New Roman"));
                            workExperienceTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                        if (!String.IsNullOrEmpty(resumeUsed.workingExperiences[i - 1].nameAndAddressOfEmployer))
                        {
                            workExperienceTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.workingExperiences[i - 1].nameAndAddressOfEmployer).FontSize(12).Font(new FontFamily("Times New Roman"));
                            workExperienceTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                        if (!String.IsNullOrEmpty(resumeUsed.workingExperiences[i - 1].typeOfBusiness))
                        {
                            workExperienceTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.workingExperiences[i - 1].typeOfBusiness).FontSize(12).Font(new FontFamily("Times New Roman"));
                            workExperienceTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }


                    }

                    workExperienceTable.Rows[workExperienceCount + 1].Cells[0].Paragraphs.First().Append("  ");
                    workExperienceTable.Rows[workExperienceCount + 1].Cells[1].Paragraphs.First().Append("  ");

                    document.InsertTable(workExperienceTable);

                    document.InsertParagraph(Environment.NewLine);
                }

                #endregion

                #region Papers

                int papersCount = resumeUsed.publicitations.Count;

                if (papersCount != 0)
                {
                    Novacode.Table papersTable = document.AddTable((papersCount + 2), 2);
                    papersTable.Alignment = Alignment.left;
                    papersTable.SetBorder(TableBorderType.Left, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    papersTable.SetBorder(TableBorderType.Top, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    papersTable.SetBorder(TableBorderType.Right, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    papersTable.SetBorder(TableBorderType.Bottom, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    papersTable.SetBorder(TableBorderType.InsideH, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    papersTable.SetBorder(TableBorderType.InsideV, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));

                    for (int i = 0; i < papersTable.RowCount; i++)
                    {
                        for (int x = 0; x < papersTable.ColumnCount; x++)
                        {
                            papersTable.Rows[i].Cells[x].Width = 250;
                        }
                    }

                    papersTable.Rows[0].Cells[0].Paragraphs.First().Append("PUBLICITATIONS IN PEER REVIEW JOURNAL").Bold().Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                    papersTable.Rows[0].Cells[1].Paragraphs.First().Append("");

                    for (int i = 1; i <= papersCount; i++)
                    {
                        papersTable.Rows[i].Cells[0].Paragraphs.First().Append("Publicitation " + i).Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                        papersTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 Title: " + resumeUsed.publicitations[i - 1].titleOfPublishedPaper).FontSize(12).Font(new FontFamily("Times New Roman"));
                        papersTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman"));
                        if (!String.IsNullOrEmpty(resumeUsed.publicitations[i - 1].authors))
                        {
                            papersTable.Rows[i].Cells[1].Paragraphs.First().Append(" \u2022 Authors: " + resumeUsed.publicitations[i - 1].authors).FontSize(12).Font(new FontFamily("Times New Roman"));
                            papersTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                        if (!String.IsNullOrEmpty(resumeUsed.publicitations[i - 1].publisher))
                        {
                            papersTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 Publisher: " + resumeUsed.publicitations[i - 1].publisher).FontSize(12).Font(new FontFamily("Times New Roman"));
                            papersTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                        papersTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.publicitations[i - 1].volume + ", " + resumeUsed.publicitations[i - 1].issue + ", " + resumeUsed.publicitations[i - 1].pages).FontSize(12).Font(new FontFamily("Times New Roman"));
                        papersTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman"));
                        if (!String.IsNullOrEmpty(resumeUsed.publicitations[i - 1].totalCitation))
                        {
                            papersTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 Total Citations: " + resumeUsed.publicitations[i - 1].totalCitation).FontSize(12).Font(new FontFamily("Times New Roman"));
                            papersTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                    }

                    papersTable.Rows[papersCount+1].Cells[0].Paragraphs.First().Append("  ");
                    papersTable.Rows[papersCount+1].Cells[1].Paragraphs.First().Append("  ");


                    document.InsertTable(papersTable);

                    document.InsertParagraph(Environment.NewLine);
                }

                #endregion

                #region Books

                int booksCount = resumeUsed.books.Count;

                if (booksCount != 0)
                {
                    Novacode.Table booksTable = document.AddTable((booksCount + 2), 2);
                    booksTable.Alignment = Alignment.left;
                    booksTable.SetBorder(TableBorderType.Left, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    booksTable.SetBorder(TableBorderType.Top, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    booksTable.SetBorder(TableBorderType.Right, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    booksTable.SetBorder(TableBorderType.Bottom, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    booksTable.SetBorder(TableBorderType.InsideH, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    booksTable.SetBorder(TableBorderType.InsideV, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));

                    for (int i = 0; i < booksTable.RowCount; i++)
                    {
                        for (int x = 0; x < booksTable.ColumnCount; x++)
                        {
                            booksTable.Rows[i].Cells[x].Width = 250;
                        }
                    }

                    booksTable.Rows[0].Cells[0].Paragraphs.First().Append("BOOKS").Bold().Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                    booksTable.Rows[0].Cells[1].Paragraphs.First().Append("");

                    for (int i = 0; i < booksCount; i++)
                    {
                        booksTable.Rows[i + 1].Cells[0].Paragraphs.First().Append(" ");
                        booksTable.Rows[i + 1].Cells[1].Paragraphs.First().Append("\u2022 Title: " + resumeUsed.books[i].titleOfPublishedBook).FontSize(12).Font(new FontFamily("Times New Roman"));
                        booksTable.Rows[i + 1].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman"));
                        if (!String.IsNullOrEmpty(resumeUsed.books[i].authors))
                        {
                            booksTable.Rows[i + 1].Cells[1].Paragraphs.First().Append(" \u2022 Authors: " + resumeUsed.books[i].authors).FontSize(12).Font(new FontFamily("Times New Roman"));
                            booksTable.Rows[i + 1].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                        if (!String.IsNullOrEmpty(resumeUsed.books[i].publisher))
                        {
                            booksTable.Rows[i + 1].Cells[1].Paragraphs.First().Append("\u2022 Publisher: " + resumeUsed.books[i].publisher).FontSize(12).Font(new FontFamily("Times New Roman"));
                            booksTable.Rows[i + 1].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                        booksTable.Rows[i + 1].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.books[i].volume + ", " + resumeUsed.books[i].issue + ", " + resumeUsed.books[i].pages).FontSize(12).Font(new FontFamily("Times New Roman"));
                        booksTable.Rows[i + 1].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman"));
                    }

                    booksTable.Rows[booksCount+1].Cells[0].Paragraphs.First().Append("  ");
                    booksTable.Rows[booksCount+1].Cells[1].Paragraphs.First().Append("  ");


                    document.InsertTable(booksTable);

                    document.InsertParagraph(Environment.NewLine);
                }

                #endregion

                #region Chapters

                int chaptersCount = resumeUsed.chapters.Count;

                if (chaptersCount != 0)
                {
                    Novacode.Table chaptersTable = document.AddTable((chaptersCount + 2), 2);
                    chaptersTable.Alignment = Alignment.left;
                    chaptersTable.SetBorder(TableBorderType.Left, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    chaptersTable.SetBorder(TableBorderType.Top, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    chaptersTable.SetBorder(TableBorderType.Right, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    chaptersTable.SetBorder(TableBorderType.Bottom, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    chaptersTable.SetBorder(TableBorderType.InsideH, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    chaptersTable.SetBorder(TableBorderType.InsideV, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));

                    for (int i = 0; i < chaptersTable.RowCount; i++)
                    {
                        for (int x = 0; x < chaptersTable.ColumnCount; x++)
                        {
                            chaptersTable.Rows[i].Cells[x].Width = 250;
                        }
                    }

                    chaptersTable.Rows[0].Cells[0].Paragraphs.First().Append("CHAPTERS").Bold().Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                    chaptersTable.Rows[0].Cells[1].Paragraphs.First().Append("");

                    for (int i = 1; i <= chaptersCount; i++)
                    {
                        chaptersTable.Rows[i].Cells[0].Paragraphs.First().Append(" ");
                        chaptersTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 Title: " + resumeUsed.chapters[i - 1].titleOfPublishedChapter).FontSize(12).Font(new FontFamily("Times New Roman"));
                        chaptersTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman"));
                        if (!string.IsNullOrEmpty(resumeUsed.chapters[i - 1].authors))
                        {
                            chaptersTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 Authors: " + resumeUsed.chapters[i - 1].authors).FontSize(12).Font(new FontFamily("Times New Roman"));
                            chaptersTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                        if (!string.IsNullOrEmpty(resumeUsed.chapters[i - 1].publisher))
                        {
                            chaptersTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 Publisher: " + resumeUsed.chapters[i - 1].publisher).FontSize(12).Font(new FontFamily("Times New Roman"));
                            chaptersTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman")); 
                        }
                        chaptersTable.Rows[i].Cells[1].Paragraphs.First().Append("\u2022 " + resumeUsed.chapters[i - 1].volume + ", " + resumeUsed.chapters[i - 1].issue + ", " + resumeUsed.chapters[i - 1].pages).FontSize(12).Font(new FontFamily("Times New Roman"));
                        chaptersTable.Rows[i].Cells[1].Paragraphs.First().Append(Environment.NewLine).FontSize(12).Font(new FontFamily("Times New Roman"));
                    }

                    chaptersTable.Rows[chaptersCount+1].Cells[0].Paragraphs.First().Append("  ");
                    chaptersTable.Rows[chaptersCount+1].Cells[1].Paragraphs.First().Append("  ");


                    document.InsertTable(chaptersTable);

                    document.InsertParagraph(Environment.NewLine);
                }

                #endregion

                #region interests and ambition

                if (resumeUsed.mainResearchOrientation != null && resumeUsed.ambition != null)
                {
                    Novacode.Table interestsTable = document.AddTable(3, 2);
                    interestsTable.Alignment = Alignment.left;
                    interestsTable.SetBorder(TableBorderType.Left, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    interestsTable.SetBorder(TableBorderType.Top, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    interestsTable.SetBorder(TableBorderType.Right, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    interestsTable.SetBorder(TableBorderType.Bottom, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    interestsTable.SetBorder(TableBorderType.InsideH, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    interestsTable.SetBorder(TableBorderType.InsideV, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));

                    for (int i = 0; i < interestsTable.RowCount; i++)
                    {
                        for (int x = 0; x < interestsTable.ColumnCount; x++)
                        {
                            interestsTable.Rows[i].Cells[x].Width = 250;
                        }
                    }

                    interestsTable.Rows[0].Cells[0].Paragraphs.First().Append("RESEARCH INTERESTS AND AMBITION").Bold().Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                    interestsTable.Rows[0].Cells[1].Paragraphs.First().Append("");
                    interestsTable.Rows[1].Cells[0].Paragraphs.First().Append("");

                    if (string.IsNullOrEmpty(resumeUsed.mainResearchOrientation) && !string.IsNullOrEmpty(resumeUsed.ambition))
                        interestsTable.Rows[1].Cells[1].Paragraphs.First().Append("Ambition: " + Environment.NewLine + "- " + resumeUsed.ambition).FontSize(12).Font(new FontFamily("Times New Roman"));
                    else if (!string.IsNullOrEmpty(resumeUsed.mainResearchOrientation) && string.IsNullOrEmpty(resumeUsed.ambition))
                        interestsTable.Rows[1].Cells[1].Paragraphs.First().Append("Main research orientation:" + Environment.NewLine + "\u2022 " + resumeUsed.mainResearchOrientation).FontSize(12).Font(new FontFamily("Times New Roman"));
                    else
                        interestsTable.Rows[1].Cells[1].Paragraphs.First().Append("Main research orientation:" + Environment.NewLine + "\u2022 " + resumeUsed.mainResearchOrientation + Environment.NewLine + "Ambition: " + Environment.NewLine + "\u2022 " + resumeUsed.ambition).FontSize(12).Font(new FontFamily("Times New Roman"));

                    interestsTable.Rows[2].Cells[0].Paragraphs.First().Append("  ");
                    interestsTable.Rows[2].Cells[1].Paragraphs.First().Append("  ");

                    document.InsertTable(interestsTable);

                    document.InsertParagraph(Environment.NewLine);
                }

                #endregion

                #region Research Experience

                if (!string.IsNullOrEmpty(resumeUsed.nameOfProject) && !string.IsNullOrEmpty(resumeUsed.positionInProject))
                {
                    Novacode.Table researchExperienceTable = document.AddTable(3, 2);
                    researchExperienceTable.Alignment = Alignment.left;
                    researchExperienceTable.SetBorder(TableBorderType.Left, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    researchExperienceTable.SetBorder(TableBorderType.Top, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    researchExperienceTable.SetBorder(TableBorderType.Right, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    researchExperienceTable.SetBorder(TableBorderType.Bottom, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    researchExperienceTable.SetBorder(TableBorderType.InsideH, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    researchExperienceTable.SetBorder(TableBorderType.InsideV, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));

                    for (int i = 0; i < researchExperienceTable.RowCount; i++)
                    {
                        for (int x = 0; x < researchExperienceTable.ColumnCount; x++)
                        {
                            researchExperienceTable.Rows[i].Cells[x].Width = 250;
                        }
                    }

                    researchExperienceTable.Rows[0].Cells[0].Paragraphs.First().Append("RESEARCH EXPERIENCE").Bold().Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                    researchExperienceTable.Rows[0].Cells[1].Paragraphs.First().Append("");
                    researchExperienceTable.Rows[1].Cells[0].Paragraphs.First().Append("");

                    if (!string.IsNullOrEmpty(resumeUsed.nameOfProject) && string.IsNullOrEmpty(resumeUsed.positionInProject))
                        researchExperienceTable.Rows[1].Cells[1].Paragraphs.First().Append("Project Name:" + Environment.NewLine + "\u2022 " + resumeUsed.nameOfProject).FontSize(12).Font(new FontFamily("Times New Roman"));
                    if (string.IsNullOrEmpty(resumeUsed.nameOfProject) && !string.IsNullOrEmpty(resumeUsed.positionInProject))
                        researchExperienceTable.Rows[1].Cells[1].Paragraphs.First().Append("Role in Project: " + Environment.NewLine + "\u2022 " + resumeUsed.positionInProject).FontSize(12).Font(new FontFamily("Times New Roman"));
                    else
                        researchExperienceTable.Rows[1].Cells[1].Paragraphs.First().Append("Project Name:" + Environment.NewLine + "\u2022 " + resumeUsed.nameOfProject + Environment.NewLine + "Role in Project: " + Environment.NewLine + "\u2022 " + resumeUsed.positionInProject).FontSize(12).Font(new FontFamily("Times New Roman"));

                    researchExperienceTable.Rows[2].Cells[0].Paragraphs.First().Append("  ");
                    researchExperienceTable.Rows[2].Cells[1].Paragraphs.First().Append("  ");

                    document.InsertTable(researchExperienceTable);

                    document.InsertParagraph(Environment.NewLine);
                }

                #endregion

                #region Personal skills and Competences

                Novacode.Table personalSkillsTable = document.AddTable(7, 2);
                personalSkillsTable.Alignment = Alignment.left;
                personalSkillsTable.SetBorder(TableBorderType.Left, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                personalSkillsTable.SetBorder(TableBorderType.Top, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                personalSkillsTable.SetBorder(TableBorderType.Right, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                personalSkillsTable.SetBorder(TableBorderType.Bottom, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                personalSkillsTable.SetBorder(TableBorderType.InsideH, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                personalSkillsTable.SetBorder(TableBorderType.InsideV, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));

                for (int i = 0; i < personalSkillsTable.RowCount; i++)
                {
                    for (int x = 0; x < personalSkillsTable.ColumnCount; x++)
                    {
                        personalSkillsTable.Rows[i].Cells[x].Width = 250;
                    }
                }

                if (resumeUsed.motherTongue != null || resumeUsed.Languages != null || resumeUsed.socialSkills != null || resumeUsed.organizationalSkills != null || resumeUsed.communicationSkills != null)
                {
                    personalSkillsTable.Rows[0].Cells[0].Paragraphs.First().Append("PERSONAL SKILLS AND COMPETENCES").Bold().Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                    personalSkillsTable.Rows[0].Cells[1].Paragraphs.First().Append("");
                }
                if (resumeUsed.motherTongue != null)
                {
                    personalSkillsTable.Rows[1].Cells[0].Paragraphs.First().Append("Mother Tongue: ").Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                    personalSkillsTable.Rows[1].Cells[1].Paragraphs.First().Append(resumeUsed.motherTongue).FontSize(12).Font(new FontFamily("Times New Roman"));
                }
                if (resumeUsed.Languages != null)
                {
                    personalSkillsTable.Rows[2].Cells[0].Paragraphs.First().Append("Foreign Languages: ").Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                    personalSkillsTable.Rows[2].Cells[1].Paragraphs.First().Append(resumeUsed.Languages).FontSize(12).Font(new FontFamily("Times New Roman"));
                }
                if (resumeUsed.socialSkills != null)
                {
                    personalSkillsTable.Rows[3].Cells[0].Paragraphs.First().Append("Social Skills: ").Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                    personalSkillsTable.Rows[3].Cells[1].Paragraphs.First().Append(resumeUsed.socialSkills).FontSize(12).Font(new FontFamily("Times New Roman"));
                }
                if (resumeUsed.communicationSkills != null)
                {
                    personalSkillsTable.Rows[4].Cells[0].Paragraphs.First().Append("Communication Skills: ").Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                    personalSkillsTable.Rows[4].Cells[1].Paragraphs.First().Append(resumeUsed.communicationSkills).FontSize(12).Font(new FontFamily("Times New Roman"));
                }
                if (resumeUsed.organizationalSkills != null)
                {
                    personalSkillsTable.Rows[5].Cells[0].Paragraphs.First().Append("Organization Skills: ").Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                    personalSkillsTable.Rows[5].Cells[1].Paragraphs.First().Append(resumeUsed.organizationalSkills).FontSize(12).Font(new FontFamily("Times New Roman"));
                }
                personalSkillsTable.Rows[6].Cells[0].Paragraphs.First().Append("  ");
                personalSkillsTable.Rows[6].Cells[1].Paragraphs.First().Append("  ");

                document.InsertTable(personalSkillsTable);

                document.InsertParagraph(Environment.NewLine);

                #endregion

                #region Awards and Honors

                int awardsCount = resumeUsed.awards.Count;

                if (awardsCount != 0)
                {
                    Novacode.Table awardsTable = document.AddTable((awardsCount + 2), 2);
                    awardsTable.Alignment = Alignment.left;
                    awardsTable.SetBorder(TableBorderType.Left, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    awardsTable.SetBorder(TableBorderType.Top, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    awardsTable.SetBorder(TableBorderType.Right, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    awardsTable.SetBorder(TableBorderType.Bottom, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    awardsTable.SetBorder(TableBorderType.InsideH, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                    awardsTable.SetBorder(TableBorderType.InsideV, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));

                    for (int i = 0; i < awardsTable.RowCount; i++)
                    {
                        for (int x = 0; x < awardsTable.ColumnCount; x++)
                        {
                            awardsTable.Rows[i].Cells[x].Width = 250;
                        }
                    }

                    awardsTable.Rows[0].Cells[0].Paragraphs.First().Append("AWARDS AND HONORS").Bold().Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                    awardsTable.Rows[0].Cells[1].Paragraphs.First().Append("");

                    for (int i = 1; i <= awardsCount; i++)
                    {
                        awardsTable.Rows[i].Cells[0].Paragraphs.First().Append(resumeUsed.awards[i - 1].year).FontSize(12).Font(new FontFamily("Times New Roman"));
                        awardsTable.Rows[i].Cells[1].Paragraphs.First().Append(resumeUsed.awards[i - 1].awardName).FontSize(12).Font(new FontFamily("Times New Roman"));
                    }

                    awardsTable.Rows[awardsCount+1].Cells[0].Paragraphs.First().Append("  ");
                    awardsTable.Rows[awardsCount+1].Cells[1].Paragraphs.First().Append("  ");


                    document.InsertTable(awardsTable);

                    document.InsertParagraph(Environment.NewLine);
                }

                #endregion

                #region References

                Novacode.Table referencesTable = document.AddTable(2, 2);
                referencesTable.Alignment = Alignment.left;
                referencesTable.SetBorder(TableBorderType.Left, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                referencesTable.SetBorder(TableBorderType.Top, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                referencesTable.SetBorder(TableBorderType.Right, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                referencesTable.SetBorder(TableBorderType.Bottom, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                referencesTable.SetBorder(TableBorderType.InsideH, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));
                referencesTable.SetBorder(TableBorderType.InsideV, new Novacode.Border(BorderStyle.Tcbs_double, BorderSize.one, 1, Color.Transparent));

                for (int i = 0; i < referencesTable.RowCount; i++)
                {
                    for (int x = 0; x < referencesTable.ColumnCount; x++)
                    {
                        referencesTable.Rows[i].Cells[x].Width = 250;
                    }
                }

                referencesTable.Rows[0].Cells[0].Paragraphs.First().Append("REFERENCES").Bold().Color(Color.Blue).FontSize(12).Font(new FontFamily("Times New Roman"));
                referencesTable.Rows[0].Cells[1].Paragraphs.First().Append("");
                referencesTable.Rows[1].Cells[0].Paragraphs.First().Append("");
                referencesTable.Rows[1].Cells[1].Paragraphs.First().Append("Available upon request").FontSize(12).Font(new FontFamily("Times New Roman"));

                document.InsertTable(referencesTable);

                #endregion


                document.Save();



                //Convert to PDF

                String outputFilePath = @"" + rootPath + @"CVs/CV" + randomNum + "" + ".pdf";

                SautinSoft.PdfMetamorphosis p = new SautinSoft.PdfMetamorphosis();

                string docxPath = @"" + rootPath + @"CVs/CV" + randomNum + "" + ".docx";

                p.DocxToPdfConvertFile(docxPath, outputFilePath);

                Context.Response.Write("CV" + randomNum);

            }




        }


        [WebMethod]
        public void downloadCV(string cvName)
        {

            Context.Response.Write(@"http://www.onlineresearchclub.com/CVs/" + cvName + ".pdf");

            System.Web.HttpContext.Current.Response.Redirect(@"http://www.onlineresearchclub.com/CVs/" + cvName + ".pdf");


        }

        [WebMethod]
        public void clearObjectCV(int userID)
        {
            resumesList.RemoveAll(d => d.Keys.Contains(userID));

            if (File.Exists(@"" + rootPath + @"CVs/CV" + randomNumber + "" + ".docx"))
            {
                File.Delete(@"" + rootPath + @"CVs/CV" + randomNumber + "" + ".docx");
            }

            if (File.Exists(@"" + rootPath + @"CVs/CV" + randomNumber + "" + ".pdf"))
            {
                File.Delete(@"" + rootPath + @"CVs/CV" + randomNumber + "" + ".pdf");
            }

            Context.Response.Write("done");

        }

    }
}
