import React, { memo, Fragment, useMemo } from "react";

// component
import HFNLink from "./HFNLink";

// utils
import parser from "html-react-parser";

const FooterContent = memo(({ content }) => {

  const footerContent = useMemo(() => {
    if (content && typeof content === "string")
      return parser(content, {
        replace: domNode => {
          if (domNode.name === "rlink") return (<HFNLink {...domNode.attribs} />);
          else return domNode;
        }
      });
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {footerContent}
    </Fragment>
  );
});

const Footer = memo(({ content }) => {
  
  return (
    <div className="footer-wrapper">
      <footer className="footer-section">
        <div className="container">
          <FooterContent content={content} />
        </div>
      </footer>
    </div>
  );
});

export default Footer;
