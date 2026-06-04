import React from "react";
import "../styles/HCClassesSection.css";
import ic_right from "../images/right.WebP";
import ic_wrong from "../images/wrong.WebP";

const HCClassesSection = ({ classes = [] }) => {
    const classGroups = [
        { label: 'Playgroup - KG', classes: ['Play-Group', 'Pre-Nursery', 'Nursery', 'LKG', 'UKG'] },
        { label: 'Primary', classes: ['Class_1', 'Class_2', 'Class_3', 'Class_4', 'Class_5'] },
        { label: 'Middle', classes: ['Class_6', 'Class_7', 'Class_8'] },
        { label: 'Secondary', classes: ['Class_9', 'Class_10'] },
        { label: 'Senior Secondary', classes: ['Class_11', 'Class_12'] }
    ];
    return(
        <section className="cls_classes_sctn">
            <h3>
                Classes Offerred
            </h3>
            <div className="cls_classes_grid">
                {classGroups.map((group,index) => (
                    <div key={index} className="cls_group">
                        <div className="cls_group_header">
                            {group.label}
                        </div>
                        <div className="cls_group_classes">
                            {group.classes.map(cls => (
                                classes.includes(cls) ? (
                                    <span key={cls} className="cls_class_chip active"><img src={ic_right} alt="right" className="cls_icn_clsc" /> {cls.replace('_', ' ')}</span>
                                ) : (
                                    <span key={cls} className="cls_class_chip inactive"><img src={ic_wrong} alt="right" className="cls_icn_clsc" /> {cls.replace('_', ' ')}</span>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default HCClassesSection;