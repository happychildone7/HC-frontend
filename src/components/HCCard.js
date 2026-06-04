import react, { useRef, useState } from "react";
import '../styles/HCCard.css';
import LocationIcon from "../svgIcons/locationIcon.js";

const HCCard = (props) => {
    const{
            entity, cls_crd_prnt, crdcnt, showHeader, header, clsbodycnt, clsheader, icnbcg, icon,
            iconcls, imgTitle, clsImgTitle, imgTitle2, clsImgTitle2, imgTitle3, clsImgTitle3, imgTitle4, 
            clsImgTitle4, featured, ribbonText, clsViewBtn, handleViewDetails, crdbody, clsbodysectncnt, 
            title, showImgTitle, clstitle, body1, body2, body3, body4, body5, body6, body7, body8, clsbody1, 
            clsbody2, clsbody3, clsbody4, clsbody5, clsbody6, clsbody7, clsbody8,
            foot, clsfoot, onClickFoot, hasLocationIcon
        } = props;
    let imageList = props.imageList || [];
     // Sort so primary image comes first
    imageList = [...imageList].sort((a, b) => {
    if (a.isPrimary === b.isPrimary) return 0;
    return a.isPrimary ? -1 : 1;
    });
    
    const [imgIndex, setImgIndex] = useState(0);

    const intervalRef = useRef(null);

    const startHoverSlide = (direction) => {
        if (intervalRef.current) return; // already running
        intervalRef.current = setInterval(() => {
        setImgIndex(prev =>
            direction === 'next'
            ? (prev + 1) % imageList.length
            : (prev - 1 + imageList.length) % imageList.length
        );
        }, 1000); // slide every 1 sec while hovering
    };

    const stopHoverSlide = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    return (
        <div className={cls_crd_prnt}>
            <div className={crdcnt}>
                {header && showHeader && 
                    <span className={clsheader}>{header}</span>
                }
                <div className={clsbodycnt}>
                    <div className={`${icnbcg} image-container`} style={{ position: 'relative' }} onClick={() => props.handleViewDetails && props.handleViewDetails(props.entity)}>
                        {imageList.length > 0 && (
                            <>
                                <img 
                                    src={imageList[imgIndex]?.imageURL} 
                                    className={iconcls} 
                                    alt="facility" 
                                />
                                {/* overlay title */}
                                {imgTitle && showImgTitle && 
                                    <span 
                                        className={clsImgTitle || "hc-overlay-title" }
                                        title={imgTitle}
                                    >
                                        <div dangerouslySetInnerHTML={{ __html: imgTitle }} />
                                    </span>
                                }
                                    <div className={clsImgTitle2}>{imgTitle2}</div>
                                    <div className={clsImgTitle3} dangerouslySetInnerHTML={{ __html: imgTitle3 }} />
                                    <div className={clsImgTitle4} dangerouslySetInnerHTML={{ __html: imgTitle4 }} />
                                {/* ribbon */}
                                {featured && (
                                    <span className="hc-ribbon" title={ribbonText}>
                                        {ribbonText}
                                    </span>
                                )}

                                {imageList.length > 1 && (
                                    <>
                                        {/* Hover zone - left for previous */}
                                        <div
                                            className="hover-zone left"
                                            onMouseEnter={() => startHoverSlide('prev')}
                                            onMouseLeave={stopHoverSlide}
                                        >
                                            <span className="arrow">&lt;</span>
                                        </div>
                                        {/* Hover zone - right for next */}
                                        <div
                                            className="hover-zone right"
                                            onMouseEnter={() => startHoverSlide('next')}
                                            onMouseLeave={stopHoverSlide}
                                        >   
                                            <span className="arrow">&gt;</span>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    {crdbody && 
                        <div className={crdbody}>
                            {title && 
                                <div>
                                    <span className={clstitle}>{title}</span>
                                    <hr className="cls_line"/>
                                </div>
                            }
                            {body1 ? (
                                <div className="cls_flx_row cls_center">
                                    {hasLocationIcon && <LocationIcon size={14} color="#178ae3" />}
                                    <span className={clsbody1} dangerouslySetInnerHTML={{ __html: body1 }}></span>
                                </div>
                                ) : (
                                <span className={clsbody1} style={{ visibility: 'hidden' }}>&nbsp;</span>
                            )}
                            <div className={clsbodysectncnt}>
                                {body2 &&
                                    <span className={clsbody2} dangerouslySetInnerHTML={{ __html: body2 }}></span>
                                }
                                {body3 ? (
                                    <span className={clsbody3} dangerouslySetInnerHTML={{ __html: body3 }}></span>
                                    ) : (
                                    <span className={clsbody3} style={{ visibility: 'hidden' }}>&nbsp;</span>
                                )}
                                {body4 ? (
                                    <span className={clsbody4} dangerouslySetInnerHTML={{ __html: body4 }}></span>
                                    ) : (
                                    <span className={clsbody4} style={{ visibility: 'hidden' }}>&nbsp;</span>
                                )}
                                {body5 ? (
                                    <span className={clsbody5} dangerouslySetInnerHTML={{ __html: body5 }}></span>
                                    ) : (
                                    <span className={clsbody5} style={{ visibility: 'hidden' }}>&nbsp;</span>
                                )}
                                {body6 ? (
                                    <span className={clsbody6} dangerouslySetInnerHTML={{ __html: body6 }}></span>
                                    ) : (
                                    <span className={clsbody6} style={{ visibility: 'hidden' }}>&nbsp;</span>
                                )}
                            </div>
                            {/* View Details Button - Bottom Right */}
                            {clsViewBtn && 
                                <button 
                                    className={clsViewBtn}
                                    onClick={() => props.handleViewDetails && props.handleViewDetails(props.entity)}
                                    >
                                    View Details
                                </button>
                            }
                        </div>
                    }
                </div>
            </div>
            <div className={clsfoot} onClick={() => props.onClickFoot && props.onClickFoot(entity)}>{foot}</div>
        </div>
    );
};
export default HCCard;