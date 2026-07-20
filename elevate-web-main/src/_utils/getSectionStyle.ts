import React from "react";

export const getSectionStyle = (props: any): React.CSSProperties => {
  return {
    "--pt-desktop": typeof props.paddingTopDesktop === 'number' ? `${props.paddingTopDesktop}px` : "80px",
    "--pb-desktop": typeof props.paddingBottomDesktop === 'number' ? `${props.paddingBottomDesktop}px` : "80px",
    "--pt-mobile": typeof props.paddingTopMobile === 'number' ? `${props.paddingTopMobile}px` : "64px",
    "--pb-mobile": typeof props.paddingBottomMobile === 'number' ? `${props.paddingBottomMobile}px` : "64px",
    "--mt-desktop": typeof props.marginTopDesktop === 'number' ? `${props.marginTopDesktop}px` : "0px",
    "--mb-desktop": typeof props.marginBottomDesktop === 'number' ? `${props.marginBottomDesktop}px` : "0px",
    "--mt-mobile": typeof props.marginTopMobile === 'number' ? `${props.marginTopMobile}px` : "0px",
    "--mb-mobile": typeof props.marginBottomMobile === 'number' ? `${props.marginBottomMobile}px` : "0px",
  } as React.CSSProperties;
};
