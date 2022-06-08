import React, { Fragment } from "react";

// components
import { Fade } from "react-bootstrap";

import Tabs from "react-bootstrap/Tabs";

import Tab from "react-bootstrap/Tab";

// constants
const itemsKey = "data",
  idKey = "id",
  titleKey = "title",
  contentKey = "content",
  variantKey = "variant",
  transitionKey = "transition",
  disabledKey = "active";

const HFNTab = ({
  data = null,
  classname = "",
  tabclassname = "",
  tabheaderclassname = "",
  contentclassname = "",
  onSelect = null,
  tabattrs = null
}) => {

  return (
    <Fragment>
      {data?.[itemsKey]?.length ? (
        <Tabs
          id={`tabs_${data.id}`}
          className={classname || ""}
          variant={data[variantKey] || "tabs"}
          transition={data[transitionKey] ? Fade : false}
          onSelect={onSelect || null}
        >
          {data[itemsKey].map((item, index) => (item?.[idKey] ? (
            <Tab
              key={item[idKey]}
              id={`tab_${item[idKey]}`}
              className={tabclassname}
              tabClassName={tabheaderclassname}
              eventKey={item[idKey]?.toString()}
              title={item[titleKey] || "NULL"}
              disabled={item[disabledKey] || false}
              tabAttrs={tabattrs}
            >
              <div className={contentclassname} dangerouslySetInnerHTML={{ __html: item[contentKey] || "" }} />
            </Tab>
          ) : (<Fragment key={index} />)
          ))}
        </Tabs>
      ) : null}
    </Fragment>
  );
};

export default HFNTab;
