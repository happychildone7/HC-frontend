import React from "react";
import '../styles/HCAdminHome.css';
import { useNavigate } from "react-router-dom";

const HCAdminHome = () => {
    const navigate = useNavigate();

    const options = [
      { key: "school", label: "School", description: "Approve, edit or add new school records.", path: "/admin-school" },
      { key: "event", label: "Event", description: "Approve, edit or add new event records.", path: "/admin-event" },
      { key: "institute", label: "Institute", description: "Approve, edit or add new institute records.", path: "/admin-institute" },
      { key: "tutor", label: "Tutor", description: "Approve, edit or add new tutor records.", path: "/admin-tutor" },
      { key: "registration", label: "Registration", description: "Approve, edit or add new registration records.", path: "/admin-registration" },
      { key: "contact", label: "Contact", description: "Approve, edit or add new contact records.", path: "/admin-contact" }
    ];

    return(
        <div className="cls_prnt_cnt">
            <div className="cls_crd_wrp">
                <div className="cls_admin_header">
                    <h2>Admin Console</h2>
                    <p>Quick access to review and manage all records.</p>
                </div>
                <div className="cls_crd_cnt_ah">
                    <div className="cls_grid_ah">
                        {options.map(opt => (
                            <button
                                key={opt.key}
                                className="cls_card_ah"
                                type="button"
                                onClick={() => navigate(opt.path)}
                            >
                                <div className="cls_card_icon_ah">
                                    {opt.label.charAt(0)}
                                </div>
                                <div className="cls_card_text_ah">
                                    <div className="cls_card_title_ah">{opt.label}</div>
                                    <div className="cls_card_desc_ah">{opt.description}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HCAdminHome;