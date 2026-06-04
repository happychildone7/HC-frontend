import React from "react";
import HCCard from '../components/HCCard';
import '../styles/HCDisplayFeatured.css';

const HCDisplayFeatured = (props) => {
    const { sectionHeader,facilityWrapper,handleClickSelect,showHeader,clsbodycnt,cls_crd_prnt,showImgTitle,featured,ribbonText,crdbody,foot } = props;
    
    return (
        <div className="cls_facilties_cnt">
            {sectionHeader && 
                <span className="cls_txt_head_large text-center padding_1">{sectionHeader}</span>
            }
            <div className="cls_facilities_pnl">
                {facilityWrapper.map(entity => (
                    <HCCard 
                        entity={entity}
                        cls_crd_prnt={cls_crd_prnt}
                        crdcnt="cls_card"
                        showHeader={showHeader}
                        header={entity.entityHeader}
                        clsbodycnt={clsbodycnt}
                        clsheader="crd_head"
                        icnbcg="icnbcg"
                        icon=""
                        iconcls="iconcls"
                        imgTitle={entity.entityHeader}
                        showImgTitle={showImgTitle}
                        crdbody={crdbody}
                        title={entity.entityTitle}
                        clstitle="cls_title"
                        featured={featured}
                        ribbonText={ribbonText}
                        body1={entity.entityBody1}
                        body2={entity.entityBody2}
                        body3={entity.entityBody3}
                        clsbody1="cls_body1"
                        clsbody2="cls_body2"
                        clsbody3="cls_body3"
                        foot={foot}
                        clsfoot="cls_foot"
                        onClickFoot={handleClickSelect}
                        imageList={entity.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default HCDisplayFeatured;