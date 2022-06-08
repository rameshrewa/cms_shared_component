import React, { Fragment, memo, useMemo } from "react";

import PropTypes from "prop-types";

// components
import { Helmet } from "react-helmet";

import HFNAccordion from "./HFNAccordion";

import HFNLink from "./HFNLink";

import HFNMenu from "./HFNMenu";

import HFNSlider from "./HFNSlider";

import HFNTab from "./HFNTab";

import Header from "./Header";

import Footer from "./Footer";

// utils
import parser from "html-react-parser";

const Content = memo(({ content, data }) => {

  const pageContent = useMemo(() => {
    if (content && typeof content === "string")
      return parser(content, {
        replace: (domNode) => {
          if (domNode.name === "accordion" && data[`accordion_${domNode.attribs.id}`])
            return (<HFNAccordion {...domNode.attribs} data={data[`accordion_${domNode.attribs.id}`]} />);
          else if (domNode.name === "menu" && data[`menu_${domNode.attribs.id}`])
            return (<HFNMenu {...domNode.attribs} data={data[`menu_${domNode.attribs.id}`]} />);
          else if (domNode.name === "slider" && data[`slider_${domNode.attribs.id}`])
            return (<HFNSlider {...domNode.attribs} data={data[`slider_${domNode.attribs.id}`]} />);
          else if (domNode.name === "tab" && data[`tab_${domNode.attribs.id}`])
            return (<HFNTab {...domNode.attribs} data={data[`tab_${domNode.attribs.id}`]} />);
          else if (domNode.name === "rlink")
            return (<HFNLink {...domNode.attribs} />);
          else
            return domNode;
        }
      });
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {pageContent}
    </Fragment>
  );
});

const PageComponent = ({ pageContext: { seo, content, footerContent, menuData, pageData } }) => {

  return (
    <div>
      <Helmet>
        <title> {seo.title} </title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
      </Helmet>
      <Header data={menuData} />
      <main style={{ marginTop: "120px", width: "100%", display: "inline-block" }} className="main-wrapper" id="main-wrapper">
        <Content content={content} data={pageData} />
      </main>
      {footerContent && <Footer content={footerContent} />}
    </div>
  );
};

PageComponent.propTypes = {
  pageContext: PropTypes.shape({
    seo: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    footerContent: PropTypes.string.isRequired,
    menuData: PropTypes.array.isRequired,
    pageData: PropTypes.object.isRequired
  }).isRequired
};

export default memo(PageComponent);
