using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Resume_Builder_v1._0
{
    public class resume
    {

        #region Personal Informations
        public string name { set; get; }
        public string mobile { set; get; }
        public string fax { set; get; }
        public string dateOfBirth { set; get; }
        public string mail { set; get; }
        public string address { set; get; }
        public string gender { set; get; }
        public string nationality { set; get; }
        public string image { set; get; }
        #endregion

        #region Postgraduate Information
        public string PGIstartDate { set; get; }
        public string PGIendDate { set; get; }
        public string PGItitleOfQualification { set; get; }
        public string PGIoccupationalSkillsCovered { set; get; }
        public string PGIorganizationProvidingEducation { set; get; }
        public string PGIlevelOfClassification { set; get; }
        #endregion

        #region UnderGraduateInformation
        public string UGIstartDate { set; get; }
        public string UGIendDate { set; get; }
        public string UGItitleOfQualification { set; get; }
        public string UGIoccupationalSkillsCovered { set; get; }
        public string UGIgpa { set; get; }
        public string UGIorganizationProvidingEducation { set; get; }
        public string UGIlevelOfClassification { set; get; }
        #endregion

        #region Training courses and workshops
        public string TrainingCoursesAndWorkshops { set; get; }
        #endregion

        public List<workExperience> workingExperiences = new List<workExperience>();

        public List<publicitations> publicitations = new List<publicitations>();

        public List<Book> books = new List<Book>();

        public List<chapter> chapters = new List<chapter>();

        public List<conference> conferences = new List<conference>();

        #region Research Interest And Ambition
        public string mainResearchOrientation { set; get; }
        public string ambition { set; get; }
        #endregion

        #region Research Experience
        public string nameOfProject { set; get; }
        public string positionInProject { set; get; }
        #endregion

        #region Personal Skills And Competences
        public string motherTongue { set; get; }
        public string Languages { set; get; }
        public string socialSkills { set; get; }
        public string communicationSkills { set; get; }
        public string organizationalSkills { set; get; }
        #endregion

        public List<award> awards = new List<award>();

    }
}