import React from "react";
import ProjectForm from "../components/ProjectForm";
import Header from "../components/Header";
import SponsorForm from "../components/SponsorForm"; // fixed spelling here

const SubmissionForm = ({ formName }) => {
  return (
    <>
      <Header />
      {formName === "projectForm" ? (
        <ProjectForm />
      ) : formName === "sponsorForm" ? ( // fixed spelling and logic here
        <SponsorForm />
      ) : null}
    </>
  );
};

export default SubmissionForm;
