import React from "react";
import HCCard from '../components/HCCard';
import '../styles/HCDisplayAllEntities.css';

const HCDisplayAllEntities = (props) => {
    const { 
            sectionHeader,facilityWrapper,handleClickSelect,showHeader,clsbodycnt,cls_crd_prnt,cls_crd_cnt,cls_icon,imgTitle,showImgTitle,
            clsImgTitle,clsImgTitle2,clsImgTitle3,clsImgTitle4,formatImgTitle,formatImgTitle4,featured,ribbonText,cls_view_btn,handleViewDetails,crdbody,clsbodysectncnt,clsfoot,foot 
          } = props;
    
    return (
        <div className="cls_facilties_cnt">
            {sectionHeader && 
                <span className="cls_txt_head_large text-center padding_1">{sectionHeader}</span>
            }
            <div className="cls_facilities_pnl_alsc">
                {facilityWrapper.map(entity => (
                    <HCCard 
                        entity={entity}
                        cls_crd_prnt={cls_crd_prnt}
                        crdcnt={cls_crd_cnt}
                        showHeader={showHeader}
                        header={entity.entityHeader}
                        clsbodycnt={clsbodycnt}
                        clsheader="crd_head"
                        icnbcg=""
                        icon=""
                        iconcls={cls_icon || "iconcls_allsc"}
                        imgTitle={imgTitle && imgTitle ===  "eventTitle" ? formatImgTitle(entity.entityBody8) : entity.entityHeader}
                        showImgTitle={showImgTitle}
                        clsImgTitle={clsImgTitle}
                        imgTitle2={imgTitle && imgTitle ===  "eventTitle" ? entity.entityTitle : ''}
                        imgTitle3={imgTitle && imgTitle ===  "eventTitle" ? entity.entityBody6 : ''}
                        imgTitle4={imgTitle && imgTitle ===  "eventTitle" ? formatImgTitle4(entity.entityBody3) : ''}
                        clsImgTitle2={clsImgTitle2}
                        clsImgTitle3={clsImgTitle3}
                        clsImgTitle4={clsImgTitle4}
                        crdbody={crdbody}
                        clsbodysectncnt={clsbodysectncnt}
                        title={entity.entityTitle}
                        clstitle="cls_title"
                        featured={featured}
                        ribbonText={ribbonText}
                        clsViewBtn={cls_view_btn}
                        handleViewDetails={handleViewDetails}
                        body1={entity.entityBody1}
                        body2={entity.entityBody2}
                        body3={entity.entityBody3}
                        body4={entity.entityBody4}
                        body5={entity.entityBody5}
                        body6={entity.entityBody6}
                        body7={entity.entityBody7}
                        clsbody1="cls_body2"
                        clsbody2="cls_body2"
                        clsbody3="cls_body2"
                        clsbody4="cls_body2"
                        clsbody5="cls_body2"
                        clsbody6="cls_body2"
                        clsbody7="cls_body2"
                        clsbody8="cls_body2"
                        foot={foot}
                        clsfoot={clsfoot}
                        onClickFoot={handleClickSelect}
                        imageList={entity.image}
                        hasLocationIcon={entity.hasLocationIcon}
                    />
                ))}
            </div>
        </div>
    );
}

export default HCDisplayAllEntities;