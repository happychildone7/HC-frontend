import React from "react";
import "../styles/HCPostAdd.css";
import { useNavigate } from "react-router-dom";
import ic_school from '../images/school.WebP';
import ic_event from '../images/event.WebP';
import ic_institute from '../images/institute.WebP';
import ic_tutor from '../images/tutor.WebP';

const options = [
  { key: "school", label: "School", description: "List a school with full details", path: "/post-add-school", img: ic_school },
  { key: "event", label: "Event", description: "Promote an education event", path: "/post-add-event", img: ic_event },
  { key: "institute", label: "Institute", description: "Add coaching or training centre", path: "/post-add-institute", img: ic_institute },
  { key: "tutor", label: "Tutor", description: "Create a tutor profile", path: "/post-add-tutor", img: ic_tutor }
];

const HCPostAdd = () => {
  const navigate = useNavigate();

  return (
    <div className="pa-wrap">
      <div className="pa-hero">
        <h1 className="pa-title">What would you like to post?</h1>
          <p className="pa-subtitle">
            Choose a category to start creating your listing.
          </p>
          <div className="cls_crd_cnt_pa">
            {options.map(opt => (
              <div className="cls_crd_pa">
                  <div className="cls_crd_img_pa">
                      <img src={opt.img} alt="img"/>
                  </div>
                  <div className="cls_crd_body_pa" onClick={() => navigate(opt.path)}>
                      <h3 className="cls_crd_title_pa">{opt.label}</h3>
                      <p className="cls_crd_caption_pa">
                          {opt.description}
                      </p>
                  </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default HCPostAdd;
