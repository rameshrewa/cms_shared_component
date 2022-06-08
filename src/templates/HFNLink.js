import React, { memo, Fragment, useMemo } from "react";

// components
import { Link, navigate } from "gatsby";

import Button from "react-bootstrap/Button";

const HFNLink = memo(({
  content = null,
  to = null,
  type = "link",
  variant = "",
  classname,
  state = null,
  replace = false
}) => {
  
  const linkComponent = useMemo(() => {
    if (to && content) {
      if (type === "link") {
        if (/^\d+$/.test(to))
          return (
            <Button variant={variant || ""} className={classname || ""} onClick={() => navigate(to)} >
              {content}
            </Button>
          );
        else
          return (
            <Link to={to} className={classname || ""} replace={replace} state={state} >
              {content}
            </Link>
          );
      }
      else if (type === "button")
        return (
          <Button variant={variant || ""} className={classname || ""} onClick={() => navigate(to, { state, replace })}>
            {content}
          </Button>
        )
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {linkComponent}
    </Fragment >

  );
});

export default HFNLink;
