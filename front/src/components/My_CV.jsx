import React from "react";
import { Link } from "react-router-dom";
import "./css/my_cv.css";
import photo from "./IMG/my_photo_cv.jpg";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

function My_CV({ about, currentUser, setRender }) {
  function logOut() {
    document.cookie = `c_user=`;
    window.location("/");
    setRender(true);
  }
  var experience = about.working_experience;
  var education = about.education;
  return (
    <>
      <nav className="menu p-4">
        <ul className="d-flex justify-content-end fs-4">
          <li>
            <Link className="none" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="none" to="/my_abilities">
              My abilities
            </Link>
          </li>
          <li>
            <Link className="none" to="/my_cv">
              My CV
            </Link>
          </li>
          {currentUser.role === "admin" ? (
            <li>
              <Dropdown as={ButtonGroup}>
                <Link to="/admin" className="none me-1 my-0 pb-2">
                  Admin
                </Link>
                <Dropdown.Toggle
                  split
                  variant="none"
                  className="none me-3 pb-2"
                />
                <Dropdown.Menu>
                  <Link className="none p-3 fs-5" to="/admin/categories">
                    Categories
                  </Link>
                  <Link className="none p-3 fs-5" to="/admin/history">
                    History
                  </Link>
                  <Link className="none p-3 fs-5" to="/admin/users">
                    Users
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ) : (
            ""
          )}
          {currentUser.role === undefined ? (
            <>
              <li>
                <Link className="none" to="/signup">
                  Register
                </Link>
              </li>
              <li>
                <Link className="none" to="/login">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="none" onClick={logOut}>
                  Log Out
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="container_cv">
        <a
          className="photo_hover"
          href={about.personal_information.linkedin}
          target="_blank"
        >
          <img src={photo} alt="Adam Romka" className="profile_photo" />
        </a>
        <div className="cv">
          <h2>Personal information:</h2>
          <h4>Name and surname: </h4>
          <p>{about.personal_information.name_and_surname}</p>
          <h4>Birth date: </h4>
          <p>{about.personal_information.birth_date}</p>
          <h4>Place of residence: </h4>
          <p>{about.personal_information.place_of_residence}</p>
          <h4>Phone number: </h4>
          <p>{about.personal_information.phone_number}</p>
          <h4>Email: </h4>
          <p>{about.personal_information.email}</p>

          <h2>Technical skills:</h2>
          <h4>Tools</h4>
          <p>{about.technical_skills.tools}</p>
          <h4>Programming languages and skills:</h4>
          <p>{about.technical_skills.Programming_languagesAndSkills}</p>
        </div>
        <div className="new_line">
          <h2>Working Experience:</h2>
          <div className="experience">
            <div>
              <h4>Date:</h4>
              <h4>Company:</h4>
              <h4>Company website:</h4>
              <h4>Position:</h4>
              <h4>Title:</h4>
            </div>
            <div key={experience} className="flex">
              {experience.map((experience) => (
                <div key={experience.id}>
                  <p>{experience.date}</p>
                  <p>{experience.company}</p>
                  <a href={experience.company_website} target="_blank">
                    {experience.company_website}
                  </a>
                  <p>{experience.position}</p>
                  <p>{experience.title}</p>
                </div>
              ))}
            </div>
          </div>

          <h2>Education:</h2>
          <div className="education">
            <div>
              <h4>Date:</h4>
              <h4>School:</h4>
            </div>

            <div className="flex">
              {education.map((education) => (
                <div key={education.id}>
                  <p>{education.date}</p>
                  <p>{education.name}</p>
                  <a href={education.link} alt={education.link} target="_blank">
                    Link
                  </a>
                </div>
              ))}
            </div>
          </div>

          <h2>Additional information:</h2>
          <div className="flex information">
            <div>
              <h4>Languages:</h4>
              <p>{about.additional_information.languages.polish}</p>
              <p>{about.additional_information.languages.lithuanian}</p>
              <p>{about.additional_information.languages.english}</p>
              <p>{about.additional_information.languages.russian}</p>
            </div>

            <div>
              <h4>Personal characteristics:</h4>
              <p className="characteristics">
                {about.additional_information.personal_characteristics}
              </p>
            </div>

            <div>
              <h4>Driver License</h4>
              <p>{about.additional_information.driver_license}</p>
            </div>

            <div>
              <h4>Hobbies</h4>
              <p>{about.additional_information.hobbies}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default My_CV;
